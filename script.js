/**
 * Didar Ibn Firoz - NFC Contact & Emergency Recovery Portal
 * Interactive Controller (vCard, Geolocation, Clipboard, Share, Theme, QR)
 */

(function () {
  'use strict';

  // 1. Owner Profile Data
  const OWNER_DATA = {
    firstName: "Didar",
    lastName: "Ibn Firoz",
    fullName: "Didar Ibn Firoz",
    phonePrimary: "+8801959089483",
    phoneSecondary: "+8801516500270",
    whatsapp: "+8801959089483",
    email: "didarabid@gmail.com",
    address: "Rupnagar, Mirpur 2, Dhaka-1216",
    city: "Dhaka",
    postalCode: "1216",
    country: "Bangladesh",
    org: "Bangladesh University of Professionals (BUP)",
    title: "ICE Student | UI/UX & Tech",
    linkedin: "https://www.linkedin.com/in/didar-ibn-firoz-376320414/",
    github: "https://github.com/urSushi",
    facebook: "https://www.facebook.com/share/1KmVA1VaEd/?mibextid=wwXIfr",
    instagram: "https://www.instagram.com/__only_4_potato__?stkn=Y2I2Znd5dzNxcDN4&utm_source=qr"
  };

  // DOM Elements
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeMeta = document.getElementById('theme-meta');
  const saveContactBtn = document.getElementById('saveContactBtn');
  const shareLocationBtn = document.getElementById('shareLocationBtn');
  const locBtnText = document.getElementById('locBtnText');
  const locBtnSub = document.getElementById('locBtnSub');
  const locSpinner = document.getElementById('locSpinner');
  const locArrowIcon = document.querySelector('.loc-arrow-icon');
  const sharePageBtn = document.getElementById('sharePageBtn');
  const qrModalBtn = document.getElementById('qrModalBtn');
  const qrModal = document.getElementById('qrModal');
  const closeQrModalBtn = document.getElementById('closeQrModalBtn');
  const copySiteUrlBtn = document.getElementById('copySiteUrlBtn');
  const qrCodeContainer = document.getElementById('qrCodeContainer');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  let toastTimer = null;

  // 2. Toast Notification Helper
  function showToast(message, duration = 2600) {
    if (toastTimer) clearTimeout(toastTimer);
    toastMessage.textContent = message;
    toastNotification.classList.add('show');
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, duration);
  }

  // 3. Clipboard Copy Helper with Fallback
  async function copyToClipboard(text, successMsg) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showToast(successMsg || `Copied to clipboard: ${text}`);
    } catch (err) {
      showToast('Could not copy. Please copy manually.');
    }
  }

  // Setup click listeners on all copy buttons
  document.querySelectorAll('.btn-copy[data-copy]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = btn.getAttribute('data-copy');
      copyToClipboard(val, `Copied: ${val}`);
    });
  });

  // 4. vCard 3.0 Generator & Exporter
  function generateAndDownloadVCard() {
    const vCardLines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${OWNER_DATA.lastName};${OWNER_DATA.firstName};;;`,
      `FN:${OWNER_DATA.fullName}`,
      `ORG:${OWNER_DATA.org}`,
      `TITLE:${OWNER_DATA.title}`,
      `TEL;TYPE=CELL,VOICE,PREF:${OWNER_DATA.phonePrimary}`,
      `TEL;TYPE=CELL,VOICE:${OWNER_DATA.phoneSecondary}`,
      `EMAIL;TYPE=INTERNET,PREF:${OWNER_DATA.email}`,
      `ADR;TYPE=HOME:;;${OWNER_DATA.address};${OWNER_DATA.city};;${OWNER_DATA.postalCode};${OWNER_DATA.country}`,
      `URL;TYPE=WORK:${window.location.href}`,
      `URL;TYPE=LinkedIn:${OWNER_DATA.linkedin}`,
      `URL;TYPE=GitHub:${OWNER_DATA.github}`,
      `NOTE:NFC Contact & Emergency Recovery Card. If you found an item belonging to Didar, please call or WhatsApp immediately.`,
      "END:VCARD"
    ];

    const vCardString = vCardLines.join("\r\n");
    const blob = new Blob([vCardString], { type: "text/vcard;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.setAttribute("download", `${OWNER_DATA.fullName.replace(/\s+/g, '_')}.vcf`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);

    showToast("Contact card downloaded! Open to save.");
  }

  if (saveContactBtn) {
    saveContactBtn.addEventListener('click', generateAndDownloadVCard);
  }

  // 5. Interactive "Share Found Location" Feature
  if (shareLocationBtn) {
    shareLocationBtn.addEventListener('click', () => {
      // Toggle loading state
      locSpinner.style.display = 'block';
      locArrowIcon.style.display = 'none';
      locBtnText.textContent = 'Locating GPS...';
      locBtnSub.textContent = 'Please allow location permission';

      if (!navigator.geolocation) {
        resetLocationBtn();
        showToast('Geolocation is not supported by your browser.');
        // Fallback open WhatsApp directly
        window.open(
          `https://wa.me/8801959089483?text=${encodeURIComponent("Hello Didar, I scanned your NFC card and found your item. Please let me know where to return it.")}`,
          '_blank'
        );
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lng = position.coords.longitude.toFixed(6);
          const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
          const message = `Hello Didar! I scanned your NFC card and found your item.\n\n📍 I am currently at this location:\n${mapsUrl}\n\nPlease reply or call me to arrange its return!`;

          resetLocationBtn();
          showToast('Opening WhatsApp with your location pin...');
          window.open(`https://wa.me/8801959089483?text=${encodeURIComponent(message)}`, '_blank');
        },
        (error) => {
          resetLocationBtn();
          let errDetail = 'Location permission was denied.';
          if (error.code === error.POSITION_UNAVAILABLE) errDetail = 'Location information unavailable.';
          if (error.code === error.TIMEOUT) errDetail = 'Location request timed out.';
          
          showToast(`${errDetail} Opening WhatsApp...`);
          // Graceful fallback to general WhatsApp message
          window.open(
            `https://wa.me/8801959089483?text=${encodeURIComponent("Hello Didar! I scanned your NFC card and found your item. Please contact me.")}`,
            '_blank'
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  }

  function resetLocationBtn() {
    locSpinner.style.display = 'none';
    locArrowIcon.style.display = 'block';
    locBtnText.textContent = 'Send Found Location';
    locBtnSub.textContent = 'Send Google Maps pin via WhatsApp';
  }

  // 6. Native Share API Handler
  if (sharePageBtn) {
    sharePageBtn.addEventListener('click', async () => {
      const shareData = {
        title: `${OWNER_DATA.fullName} - NFC Contact Card`,
        text: `Contact & Lost Item Recovery Card for ${OWNER_DATA.fullName}.`,
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          if (err.name !== 'AbortError') {
            copyToClipboard(window.location.href, 'Link copied to clipboard!');
          }
        }
      } else {
        copyToClipboard(window.location.href, 'Link copied to clipboard!');
      }
    });
  }

  // 7. Dynamic QR Code Generator & Modal
  function renderQrCode() {
    const currentUrl = window.location.href;
    // High-contrast clean QR code using Google Chart / QuickChart API with SVG fallback
    const encoded = encodeURIComponent(currentUrl);
    const qrImgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encoded}&margin=8&format=svg`;
    
    qrCodeContainer.innerHTML = `
      <img src="${qrImgUrl}" alt="QR Code to ${currentUrl}" style="width: 100%; height: 100%; object-fit: contain;" />
    `;
  }

  if (qrModalBtn) {
    qrModalBtn.addEventListener('click', () => {
      renderQrCode();
      qrModal.classList.add('active');
      qrModal.setAttribute('aria-hidden', 'false');
    });
  }

  if (closeQrModalBtn) {
    closeQrModalBtn.addEventListener('click', () => {
      qrModal.classList.remove('active');
      qrModal.setAttribute('aria-hidden', 'true');
    });
  }

  if (qrModal) {
    qrModal.addEventListener('click', (e) => {
      if (e.target === qrModal) {
        qrModal.classList.remove('active');
        qrModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  if (copySiteUrlBtn) {
    copySiteUrlBtn.addEventListener('click', () => {
      copyToClipboard(window.location.href, 'Website link copied to clipboard!');
    });
  }

  // 8. Dark / Light Theme Toggle & Persistence
  function initTheme() {
    const savedTheme = localStorage.getItem('didar_portal_theme');
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('didar_portal_theme', theme);
    if (themeMeta) {
      themeMeta.setAttribute('content', theme === 'light' ? '#f1f5f9' : '#090d16');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme') || 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
      showToast(`Switched to ${nextTheme} mode`, 1800);
    });
  }

  // Initialize on DOM load
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
  });

})();

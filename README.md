# Didar Ibn Firoz — NFC Contact & Emergency Recovery Portal

<div align="center">

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen?style=for-the-badge&logo=github)](https://urSushi.github.io/nfc-contact/)
[![Status](https://img.shields.io/badge/Status-Active%20NFC%20Tag-blue?style=for-the-badge&logo=nfc)](https://urSushi.github.io/nfc-contact/)
[![Built With](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-orange?style=for-the-badge)](https://urSushi.github.io/nfc-contact/)
[![Mobile](https://img.shields.io/badge/Mobile-iOS%20%26%20Android%20Optimized-9cf?style=for-the-badge&logo=apple)](https://urSushi.github.io/nfc-contact/)

<p align="center">
  <b>A lightweight, ultra-fast interactive digital identity card and emergency lost item recovery portal designed specifically for physical NFC tags, keychains, wallets, and QR codes.</b>
</p>

</div>

---

## 📌 About The Project

This website serves as my primary **Digital Identity & Lost-and-Found Recovery Hub**. Rather than a standard portfolio, it is engineered to be written onto physical **NFC cards, stickers, keychains, or tags** attached to valuables (phone, keys, wallet, backpack, laptop). 

When anyone finds a lost item and scans the NFC tag or QR code using their iPhone or Android device, this portal opens in under **0.5 seconds**, presenting verified owner identity and instant emergency contact actions.

🔗 **Live URL (after GitHub Pages deploy):** [https://urSushi.github.io/nfc-contact/](https://urSushi.github.io/nfc-contact/)

---

## ⚡ Key Features

### 🚨 1. Lost & Found Emergency Recovery (Top Priority)
* **Immediate Attention Banner**: Informs the finder that they have scanned the owner's tag and provides one-tap reach-out channels.
* **Direct Call Primary**: Taps directly to call `+880 1959-089483`.
* **Direct Call Secondary (Alternative)**: Taps to call `+880 1516-500270` if the primary line is busy or unavailable.
* **WhatsApp Direct**: One-tap opens a pre-composed WhatsApp chat to `+880 1959-089483` with:  
  `"Hello Didar, I scanned your NFC tag and found an item belonging to you. Please let me know how to return it to you."`
* **📍 Interactive "Send Found Location"**:
  * Leverages high-accuracy GPS (`navigator.geolocation`).
  * Generates an exact Google Maps pin: `https://maps.google.com/?q={latitude},{longitude}`.
  * Auto-formats and pre-fills a WhatsApp message so the finder can send their exact location in 1 click!
* **Offline Direct SMS**: Direct SMS fallback when the finder does not have active mobile data.

### 📇 2. One-Tap "Save Contact to Phone" (vCard 3.0)
* Generates and triggers download of a standardized `Didar_Ibn_Firoz.vcf` card.
* Supported natively on **iOS Apple Contacts** and **Android Google Contacts**.
* Pre-loads: Full Name, Primary Phone, Secondary Phone, WhatsApp, Email, Home Address, University, and Social Profiles into the finder's address book.

### 📍 3. Verified Owner Details & Address
* **Home Address**: Rupnagar, Mirpur 2, Dhaka-1216 (with direct Google Maps navigation button).
* **Academic Identity**: Information & Communication Engineering, Bangladesh University of Professionals (BUP).
* **Direct Email**: `didarabid@gmail.com` with one-tap copy and mailto.
* **Instant Clipboard Copying**: Interactive copy buttons for both numbers and email with animated toast notifications.

### 🌐 4. Social Accounts & Web Profiles
Direct, beautifully styled buttons with official brand colors:
* [Facebook: Didar Ibn Firoz](https://www.facebook.com/share/1KmVA1VaEd/?mibextid=wwXIfr)
* [Instagram: @__only_4_potato__](https://www.instagram.com/__only_4_potato__?stkn=Y2I2Znd5dzNxcDN4&utm_source=qr)
* [LinkedIn: didar-ibn-firoz](https://www.linkedin.com/in/didar-ibn-firoz-376320414/)
* [GitHub: @urSushi](https://github.com/urSushi)

### 🎨 5. Modern Mobile-First UX
* **Glassmorphism Design**: Obsidian/navy dark theme & clean light mode with memory persistence (`localStorage`).
* **iOS & Android Tuned**: Safe area insets for notches, Dynamic Island, and home bars (`env(safe-area-inset)`).
* **Instant QR Code Modal**: Generates a clean on-screen QR code for devices without NFC.
* **Native Web Share API**: Triggers system native share sheet (AirDrop, Nearby Share, Messages).

---

## 🚀 How to Upload & Deploy on GitHub Pages

### Step 1: Create a New Repository on GitHub
1. Log in to your GitHub account: [https://github.com/urSushi](https://github.com/urSushi).
2. Click **New Repository** (or visit [https://github.com/new](https://github.com/new)).
3. Name the repository: `nfc-contact` (or `didar-contact`).
4. Set visibility to **Public**.
5. Do **NOT** initialize with a README (we already have this comprehensive one).
6. Click **Create repository**.

---

### Step 2: Push From Your Computer (Using Git)

Open your terminal or PowerShell inside this directory (`D:\Software\AntiGravity\All projects\didar-nfc-card`) and run:

```bash
# 1. Initialize git repository
git init

# 2. Add all files
git add .

# 3. Create initial commit
git commit -m "feat: initial release of Didar Ibn Firoz NFC contact & recovery portal"

# 4. Set default branch to main
git branch -M main

# 5. Link to your newly created GitHub repository
git remote add origin https://github.com/urSushi/nfc-contact.git

# 6. Push code to GitHub
git push -u origin main
```

*(Alternatively, you can drag and drop all files directly into the GitHub repository web page).*

---

### Step 3: Activate Free GitHub Pages (30 Seconds)

1. Go to your repository on GitHub: `https://github.com/urSushi/nfc-contact`.
2. Click **Settings** (top tabs) &rarr; Click **Pages** (in the left sidebar).
3. Under **Build and deployment** &rarr; **Branch**:
   - Select **`main`** from the branch dropdown.
   - Leave the folder as **`/ (root)`**.
   - Click **Save**.
4. Within 30 to 60 seconds, GitHub Pages will deploy your site at:
   👉 **`https://urSushi.github.io/nfc-contact/`**

---

## 📲 How to Write to Your Physical NFC Card / Tag

You can program any standard NFC Card, sticker, or keychain (NTAG213, NTAG215, NTAG216):

1. **Install App**: Download the free **NFC Tools** app on your phone:
   - [Google Play Store (Android)](https://play.google.com/store/apps/details?id=com.wakdev.wdnfc)
   - [Apple App Store (iOS)](https://apps.apple.com/app/nfc-tools/id1252962749)
2. **Open NFC Tools** &rarr; Tap **Write**.
3. Tap **Add a record** &rarr; Select **URL / URI**.
4. Paste your live website link:
   `https://urSushi.github.io/nfc-contact/`
5. Tap **OK** &rarr; Tap **Write / 18 Bytes**.
6. Hold your physical NFC card, tag, or sticker to the back of your phone.
7. ✨ **Done!** Whenever anyone taps the card against an iPhone or Android phone, this webpage will instantly open.

---

## 📂 Project Structure

```
didar-nfc-card/
├── index.html              # Core semantic mobile-first landing page
├── styles.css              # Responsive styles, glassmorphism, dark/light themes
├── script.js               # Interactive controller (vCard, GPS Location, QR, Share, Copy)
├── .gitignore              # Ignores system junk and build artifacts
├── README.md               # GitHub repository documentation
└── assets/
    ├── didar-profile.jpg   # Portrait photo for profile avatar & metadata
    └── favicon.svg         # SVG app icon & browser favicon
```

---

## 🛠️ Built With

* **HTML5**: Semantic tags, safe area insets, PWA meta tags, OpenGraph previews.
* **Modern CSS3**: CSS custom variables, Glassmorphism, CSS Grid & Flexbox, micro-animations.
* **Vanilla JavaScript (ES6+)**: Zero external bloated frameworks. 100% native performance.
* **Web APIs**: Geolocation API, Web Share API, Clipboard API, vCard Blob generation.

---

## 👤 Owner & Author

**Didar Ibn Firoz**
* University: Bangladesh University of Professionals (BUP) — Information & Communication Engineering
* Location: Rupnagar, Mirpur 2, Dhaka-1216
* Primary Tel / WhatsApp: `+880 1959-089483`
* Secondary Tel: `+880 1516-500270`
* Email: [didarabid@gmail.com](mailto:didarabid@gmail.com)
* GitHub: [@urSushi](https://github.com/urSushi)
* LinkedIn: [Didar Ibn Firoz](https://www.linkedin.com/in/didar-ibn-firoz-376320414/)

---

<div align="center">
  <sub>Designed & Developed for Didar Ibn Firoz. Released under the <a href="LICENSE">MIT License</a>.</sub>
</div>

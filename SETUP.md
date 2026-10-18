# Believe AI Labs — Setup & Development Guide

This document outlines everything needed to run, configure, and develop the **Believe AI Labs** platform locally or deploy to production.

---

## 🛠️ Prerequisites

- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **Package Manager**: `npm` (bundled with Node) or `pnpm` / `yarn`
- **Git**

---

## 📦 Local Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/prateekunique17/Belive-ai-labs.git
   cd Belive-ai-labs
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

---

## 🔐 Environment Configuration

Create a local `.env` file in the project root by copying the template:

```bash
cp .env.example .env
```

Populate the `.env` file with your credentials:

```env
# Web3Forms API Configuration (Handles "Let's Connect" inquiries & job notifications)
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key

# Cloudinary Permanent Storage Configuration (Handles "Join Us" PDF/DOC resume uploads)
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
```

### Obtaining Credentials:
1. **Web3Forms**: Get a free access key at [web3forms.com](https://web3forms.com) by submitting your email.
2. **Cloudinary**:
   - Create a free account at [cloudinary.com](https://cloudinary.com).
   - Find your **Cloud name** on the dashboard.
   - Go to **Settings (⚙) $\rightarrow$ Upload $\rightarrow$ Upload presets**, create a preset set to **Unsigned**, and copy the name.
   - Ensure in **Settings $\rightarrow$ Security** that **"Allow PDF and ZIP files delivery"** is enabled.

---

## 💻 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts Vite local development server with Hot Module Replacement (HMR) |
| `npm run build` | Compiles optimized production bundle into `/dist` |
| `npm run preview` | Locally serves the production build from `/dist` |
| `npm run lint` | Runs ESLint to check syntax, formatting, and hooks |

---

## 🏗️ Codebase Organization

```text
src/
├── pages/                  # Page compositions (HomePage.jsx)
├── components/
│   ├── common/             # Reusable global components (Navbar, Footer, Preloader, BelieveLogo)
│   └── sections/           # Modular landing page sections (Hero, Purpose, Principles, Members, JoinUs, Contact)
├── styles/                 # Theme tokens & consolidated CSS stylesheets
├── App.jsx                 # GSAP animation timeline controller & scroll lifecycle
└── main.jsx                # Vite application entry point
```

---

## 🚀 Production Deployment

This project builds as a static Single Page Application (SPA):
1. Run `npm run build`.
2. Deploy the generated `dist/` directory to **Vercel**, **Netlify**, **Cloudflare Pages**, or **GitHub Pages**.
3. Add the environment variables (`VITE_WEB3FORMS_ACCESS_KEY`, `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_UPLOAD_PRESET`) in your hosting provider's project settings.

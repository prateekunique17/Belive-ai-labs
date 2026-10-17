# Developer Guide: How to Upload & Display Member Photos in Believe AI Labs

This guide explains how developers can add new member portraits to the **Believe AI Labs** project.

---

## 1. Directory Structure

In Vite / React, static files in `public/` map directly to the root URL `/`:

```
Believe-AI-Labs-main/
├── public/
│   └── images/
│       └── members/                   <── PUT MEMBER PHOTOS HERE
│           ├── anshul-sharma.jpeg     <── (Active)
│           ├── dhruv-gaur.jpeg        <── (Example)
│           ├── prateek-kumar.png      <── (Example)
│           └── tanmay.png             <── (Example)
└── src/
    └── components/
        └── Members.jsx                <── Update path in code here
```

> **Note:** Do **not** write `public/` in your code path. Vite serves `public/` at the root `/`.
> - Disk file: `public/images/members/anshul-sharma.jpeg`
> - Code path: `/images/members/anshul-sharma.jpeg`

---

## 2. Three-Step Workflow to Add a Member Photo

### Step 1: Save the photo file into the project
Place the member's photo file in:
```
public/images/members/
```
**Recommended naming convention:** lowercase kebab-case (e.g. `dhruv-gaur.jpeg`, `prateek-kumar.png`, `tanmay.png`).

### Step 2: Update `src/components/Members.jsx`
Open `src/components/Members.jsx` and find the `MEMBERS_DATA` array. Update the `image` field:

```javascript
{
  id: "dhruv-gaur",
  name: "Dhruv Gaur",
  roleBadge: "CO-FOUNDER",
  category: "CO-FOUNDER · STRATEGY",
  ...
  image: "/images/members/dhruv-gaur.jpeg", // <-- Ensure filename & extension match
  linkedin: "https://www.linkedin.com/in/...",
  github: "https://github.com/...",
}
```

### Step 3: Verify in browser
Save the file. Vite automatically reloads. The photo will display in both the member card and the interactive popup modal.

---

## 3. Specifications for Best Results

- **Aspect Ratio**: Portrait orientation `4:5` or `3:4` (e.g., `800 × 1000` px or `600 × 800` px).
- **Format**: `.jpeg`, `.jpg`, `.png`, or `.webp`.
- **Styling**: The CSS automatically applies the project's monochrome filter (`filter: grayscale(100%)`) and hover effects.

---

## 4. Built-in Safety Fallbacks

1. **Missing Image / Typo Protection**: If the image file doesn't exist or has an extension mismatch, the app suppresses broken-image icons and automatically shows the neutral `PHOTO TO BE ADDED` placeholder.
2. **Dual-Path Resolution**: The `MemberPortrait` component automatically tests both `/images/members/...` and `/members/...` so photos resolve even if stored in either directory.

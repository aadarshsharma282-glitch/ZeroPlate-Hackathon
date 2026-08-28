# Pull Request: Redesign Settings (Account & Security + General) with Global Dark Mode & Multilingual Support

**Target Repository**: [`Prashant-Singh-Rawat/ZeroPlate-Hackathon`](https://github.com/Prashant-Singh-Rawat/ZeroPlate-Hackathon)  
**Branch**: `feature/settings-appearance-language` -> `main`

---

## 📌 Summary of Changes

This pull request updates the **Food Donor Portal Settings** and implements global appearance and language systems across the entire ZeroPlate platform.

### 1. ⚙️ Streamlined Settings Page
- Redesigned the Settings page into two clear, focused sections:
  1. **🛡️ Account & Security**:
     - **Change Password**: Interactive modal with show/hide password visibility toggles and validation.
     - **Two-Factor Authentication**: Interactive toggle switch with instant toast feedback.
     - **Recent Login Activity**: Modal listing active authenticated sessions (device, IP address, location, timestamp).
     - **Log Out**: Sign-out button with modal confirmation dialog.
  2. **🌐 General**:
     - **Language**: Instant UI localization dropdown supporting **English (`en`)**, **Hindi (`hi` — हिन्दी)**, and **Marathi (`mr` — मराठी)**.
     - **Appearance**: Instant live switcher between **Light** and **Dark** themes.
     - **Location Services**: Interactive GPS telemetry toggle.
- **Unsaved Changes Detection**: Interactive banner with Discard and Save Changes actions, fully persisted in `localStorage`.

---

### 2. 🌓 Global Dark / Light Theme System
- Added `ThemeContext.tsx` and updated `tailwind.config.js` with `darkMode: 'class'`.
- Supported themes:
  - **Light**: Crisp off-white background with white cards and dark charcoal typography.
  - **Dark**: Deep navy/slate background (`#0B1120`), dark surface cards (`#1E293B`), light text, dark borders, and custom dark scrollbars while preserving the signature orange accent (`#F97316`).
- Full dark mode coverage across Navbar, Sidebar, Donor Dashboard, NGO Dashboard, Listings, Requests, Bookings, Impact Dashboard, Messages, Profile, and Settings modals.
- Persistent across page reloads via `localStorage` (`zeroplate_theme`).

---

### 3. 🌐 Global Multi-Language System (English / Hindi / Marathi)
- Added `LanguageContext.tsx` with `t(key, fallback)` and dictionary in `src/locales/translations.ts`.
- Localized all UI text (navigation, headers, cards, status badges, forms, modals) while preserving user-generated content (restaurant names, dish titles, addresses).
- Persistent across sessions via `localStorage` (`zeroplate_language`).

---

### 4. 🔒 Role-Based Access Control
- Hidden the **Subscription** tier section for Food Donors (reserved exclusively for NGO managers).

---

## 🧪 Verification & Testing
- **Unit Tests**: All 8 test suites passing (`vitest run`).
- **Production Build**: Verified with `npm run build` (TypeScript compilation & Vite bundle passed with 0 errors).
- **Manual Verification**:
  - Toggled between Light and Dark mode across all views.
  - Switched language between English, Hindi, and Marathi across all views.
  - Verified persistence upon browser refresh.

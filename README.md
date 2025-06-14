# 🔬 React Integration with Tizen OS API + HMR Support

This project is a research and implementation effort to integrate **React.js** into **Samsung Tizen OS** applications — a platform traditionally focused on **HTML**, **CSS**, **JavaScript**, and **.NET** development.

## 🎯 Project Goals

- Explore and utilize **Tizen Web APIs** within a React environment.
- Successfully implement **Hot Module Replacement (HMR)** to improve development efficiency.
- Deploy a full React app directly to **Samsung Smart TVs** running Tizen OS.

## ⚙️ Technologies Used

- **React.js** with **TypeScript**
- **Tizen Web APIs** (`tizen-tv-webapis`)
- **Webpack Dev Server** with HMR
- **Samsung Tizen Studio**

## ✅ Key Features Implemented

- ✅ React app runs smoothly on Tizen OS (both emulator and real device).
- ✅ Hot Module Replacement (HMR) enables real-time UI updates without full reloads.
- ✅ Full access to native Tizen APIs, such as:
  - `webapis.avplay` (media playback)
  - `webapis.appcommon` (app metadata)
  - Optional: `webapis.tvaudiocontrol` (requires partner-level privileges)

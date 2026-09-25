# Web Bluetooth Demo

Web Bluetooth Demo is a small single-page app, made in March 2024 for a demonstration, that shows how a web page can talk to a Bluetooth Low Energy device directly from the browser with the Web Bluetooth API, without a native app or driver. The page walks through the steps one button at a time: it asks the browser to pick a device whose name starts with `MC330`, connects to that device's GATT server, opens the standard `battery_service` to read the battery level as a percentage, and opens the standard `device_information` service to read and decode every characteristic it exposes, such as manufacturer name, model number and firmware version. Each step is logged with a timestamp and a start, success or error marker at the bottom of the page, so the audience can follow what the API is doing. It is written in React 18 and TypeScript with Vite, uses the `@types/web-bluetooth` typings, and the built site is served by GitHub Pages from the `docs/` folder. It is a demo, not a reusable library.

> Demo from 2024, prepared for demonstration purposes only. It may need adjustments to suit other devices and environments.

**Live demo:** https://www.rach.im/web-bluetooth/

## Features

- **Device selection:** "Get Device Details" opens the browser's device chooser, filtered to names starting with `MC330`. "Populate Bluetooth Devices" lists devices the site already has permission for (`navigator.bluetooth.getDevices()`).
- **GATT connection:** "Connect GATT Server" connects to the selected device and unlocks the next steps.
- **Battery information:** "Check Battery" opens the battery service, and "Check Battery Percentage" reads `battery_level`.
- **Device information:** "Check Device Info" opens the device information service, and "Check Device Info Text" reads all of its characteristics and decodes them as text.
- **Action log:** every action is wrapped so its start, success or error message is listed at the bottom of the page.

## Tech stack

React 18 · TypeScript · Vite 5 · Web Bluetooth API · CSS Modules · GitHub Pages

## Getting started

Prerequisites: Node.js and npm, and a browser that supports Web Bluetooth (for example Chrome or Edge on desktop or Android) with Bluetooth enabled. The page must run on `https://` or `localhost`.

```bash
npm install
npm run dev       # Vite dev server
npm run build     # type-check and build with base https://www.rach.im/web-bluetooth
npm run preview
npm run lint
```

To use it, make sure the device is switched on, discoverable and within range, then follow the buttons from top to bottom. To target a different device, change the `namePrefix` filter in `getDeviceDetails` in `src/App.tsx`.

## Project structure

```text
src/
├── App.tsx               # all Bluetooth logic, the step-by-step UI and the action log
├── App.module.css        # layout helpers
├── components/Button.tsx # styled button
└── main.tsx              # entry point
docs/                     # built site published by GitHub Pages
```

`App.tsx` also defines a small `Visible` component that renders its children only when a condition is true; it is used to reveal each step after the previous one succeeds.

## Limitations

- The device filter is hard-coded to names starting with `MC330`.
- The "Disconnect GATT Server" button has no handler yet.
- `npm run build` writes to `dist/`; the published copy in `docs/` has to be updated by hand.

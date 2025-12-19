# conf-banner-killer

Chrome extension that automatically closes Google Workspace confidentiality banners that say  
`"Confidencialidade / Confidentiality" label was applied to this file automatically`  
by clicking the built-in **Close banner** button (`aria-label="Close banner"`).

---

## What this extension does

- Runs on Google Docs and Google Drive
- Identifies the confidentiality banner by its text
- Walks up the DOM to find the banner container
- Clicks the **Close banner** button automatically
- Handles dynamic UI re-renders via `MutationObserver`

---

## Installation (Chrome — Developer Mode)

### 1. Create the extension folder

Create a local folder named:
```
conf-banner-killer/
├─ manifest.json
└─ content.js
```

Place the provided `manifest.json` and `content.js` files inside this folder.

---

### 2. Open the Chrome Extensions page

Navigate to:
chrome://extensions

---

### 3. Enable Developer Mode

Toggle **Developer mode** in the top-right corner.

---

### 4. Load the extension

1. Click **Load unpacked**
2. Select the `conf-banner-killer/` folder
3. The extension will appear in the extensions list

---

### 5. Reload Google Docs or Drive

Open a Docs or Drive file and perform a hard reload:

- Windows / Linux: `Ctrl + Shift + R`
- macOS: `Cmd + Shift + R`

The confidentiality banner will be closed automatically when it appears.

---

## Supported URLs

- `https://docs.google.com/*`
- `https://drive.google.com/*`

The extension runs in **all frames** to cover embedded editors and viewers.

---

## Troubleshooting

### The text disappears but the banner remains

An outdated version of `content.js` is still loaded.

**Fix**

1. Remove the extension from `chrome://extensions`
2. Restart Chrome
3. Load the unpacked extension again
4. Hard-reload the Docs / Drive page

---

### The banner briefly flashes and reappears

Expected behavior. Google Workspace frequently re-renders UI components.  
The extension automatically closes the banner again.

---

## Safety and permissions

- No network access
- No storage or tracking
- No data collection
- Runs only as a content script on Google Workspace pages

---

## Removal

To uninstall:

1. Open `chrome://extensions`
2. Click **Remove** on **conf-banner-killer**

---

## Notes

Google frequently changes internal DOM structures.  
This extension avoids fragile class selectors and relies only on:

- Banner text
- Accessibility label `aria-label="Close banner"`

This keeps it resilient to UI changes.

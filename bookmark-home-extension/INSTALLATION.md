# Installing the Bookmark Home Extension for Microsoft Edge

This guide provides detailed instructions for installing the Bookmark Home extension in Microsoft Edge.

## Prerequisites

- Microsoft Edge browser (Chromium-based version)
- The Bookmark Home extension files (this repository)

## Installation Steps

### Method 1: Developer Mode (Recommended for Testing)

1. **Prepare the Extension**
   - Ensure you have all the extension files in the `bookmark-home-extension` folder
   - Add icon files to the `icons` directory (see `icons/README.md` for details)

2. **Open Microsoft Edge Extensions Page**
   - Launch Microsoft Edge
   - Type `edge://extensions/` in the address bar and press Enter
   - Or navigate through: Settings (... menu) → Extensions

3. **Enable Developer Mode**
   - Find the "Developer mode" toggle in the bottom-left corner
   - Switch it to the "On" position

4. **Load the Extension**
   - Click the "Load unpacked" button that appears
   - Browse to and select the `bookmark-home-extension` folder
   - Click "Select Folder"

5. **Verify Installation**
   - The extension should appear in your list of installed extensions
   - Open a new tab to see if the bookmark home page appears

### Method 2: Installing from a Package (.crx file)

If someone has provided you with a packaged version of the extension:

1. **Download the .crx File**
   - Save the `.crx` file to your computer

2. **Open Microsoft Edge Extensions Page**
   - Type `edge://extensions/` in the address bar

3. **Enable Developer Mode**
   - Turn on "Developer mode" using the toggle

4. **Install the Extension**
   - Drag and drop the `.crx` file onto the extensions page
   - Click "Add extension" when prompted

## Troubleshooting Installation Issues

### Extension Won't Load

- Ensure all required files are present in the extension folder
- Check that you've added the icon files to the `icons` directory
- Look for errors in the browser console (F12 → Console tab)

### Permission Errors

- If you see permission warnings, make sure to grant the extension access to:
  - Your bookmarks
  - Storage for saving settings

### Extension Doesn't Appear on New Tab

- Check if another extension is overriding the new tab page
- Disable other new tab extensions temporarily
- Ensure the extension is enabled in the extensions page

## Updating the Extension

To update the extension after making changes:

1. Go to `edge://extensions/`
2. Find the Bookmark Home extension
3. Click the refresh icon (↻) on the extension card
4. Open a new tab to see your changes

## Uninstalling the Extension

If you need to remove the extension:

1. Go to `edge://extensions/`
2. Find the Bookmark Home extension
3. Click "Remove" or the trash icon
4. Confirm removal when prompted

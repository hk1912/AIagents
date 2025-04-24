# Bookmark Home Extension for Microsoft Edge

A browser extension that displays your bookmarks on the home screen with an intuitive folder-based interface. Each bookmark folder appears as a separate icon, and clicking on a folder reveals its contents in a clean, organized view.

## Features

- **Folder-Based Organization**: Displays bookmark folders as icons on your new tab page
- **Intuitive Navigation**: Click on folders to view their contents
- **Search Functionality**: Quickly find bookmarks by searching titles and URLs
- **Customizable Display**: Choose between grid or list view
- **Adjustable Icon Size**: Select small, medium, or large icons
- **Favicon Support**: Shows website favicons for bookmarks
- **Smooth Animations**: Provides a polished user experience
- **Responsive Design**: Works well on various screen sizes

## Installation

### Method 1: Loading the Unpacked Extension (Development)

1. Clone or download this repository to your local machine
2. Open Microsoft Edge and navigate to `edge://extensions/`
3. Enable "Developer mode" using the toggle in the bottom-left corner
4. Click "Load unpacked" and select the `bookmark-home-extension` folder
5. The extension should now be installed and active

### Method 2: Packaging for Distribution

1. Add icon files to the `icons` directory (see `icons/README.md` for details)
2. Zip the entire `bookmark-home-extension` folder
3. Rename the zip file to have a `.crx` extension
4. Share the `.crx` file with users who can then drag and drop it into their `edge://extensions/` page

## Usage

1. Open a new tab in Microsoft Edge
2. You'll see your bookmark folders displayed as icons
3. Click on any folder to view its contents
4. Click on a bookmark to navigate to that website
5. Use the search bar to find specific bookmarks
6. Click the settings icon to customize the display

## Customization

Click the settings icon (gear) in the top-right corner to access these options:

- **Display Mode**: Choose between grid view (default) or list view
- **Icon Size**: Select small, medium, or large icons
- **Show Favicons**: Toggle favicon display for bookmarks
- **Enable Animations**: Toggle animation effects

## Permissions

This extension requires the following permissions:

- **bookmarks**: To access and display your browser bookmarks
- **storage**: To save your display preferences

## Development

### Project Structure

```
bookmark-home-extension/
├── manifest.json         # Extension configuration
├── background.js         # Background script for bookmark access
├── newtab/
│   ├── newtab.html       # Custom new tab page
│   ├── newtab.css        # Styling for new tab page
│   └── newtab.js         # Logic for displaying bookmarks
├── icons/
│   ├── icon16.png        # Extension icons of various sizes
│   ├── icon48.png
│   └── icon128.png
└── README.md             # This documentation file
```

### Modifying the Extension

- Edit `newtab.css` to change the appearance
- Modify `newtab.js` to alter functionality
- Update `manifest.json` to change permissions or basic configuration

## Troubleshooting

- If bookmarks don't appear, ensure you've granted the extension bookmark access permissions
- If the extension doesn't load, check for errors in the browser console
- If icons are missing, add the required icon files to the `icons` directory

## License

This project is available as open source under the terms of the MIT License.

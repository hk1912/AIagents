// Main JavaScript for the Bookmark Home extension new tab page

// DOM Elements
const bookmarksContainer = document.getElementById('bookmarks-container');
const folderView = document.getElementById('folder-view');
const folderContent = document.getElementById('folder-content');
const folderTitle = document.getElementById('folder-title');
const backButton = document.getElementById('back-button');
const closeFolder = document.getElementById('close-folder');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const settingsButton = document.getElementById('settings-button');
const settingsPanel = document.getElementById('settings-panel');
const saveSettingsButton = document.getElementById('save-settings');

// Settings form elements
const displayModeSelect = document.getElementById('display-mode');
const iconSizeSelect = document.getElementById('icon-size');
const showFaviconsCheckbox = document.getElementById('show-favicons');
const animationsEnabledCheckbox = document.getElementById('animations-enabled');

// Global variables
let currentBookmarks = [];
let currentFolderId = null;
let folderHistory = [];
let settings = {
    displayMode: 'grid',
    iconSize: 'medium',
    showFavicons: true,
    animationsEnabled: true
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    loadBookmarks();
    setupEventListeners();
});

// Load user settings
function loadSettings() {
    chrome.runtime.sendMessage({ action: 'getSettings' }, (response) => {
        if (response && response.settings) {
            settings = response.settings;
            applySettings();
        }
    });
}

// Apply settings to the UI
function applySettings() {
    // Update form elements
    displayModeSelect.value = settings.displayMode;
    iconSizeSelect.value = settings.iconSize;
    showFaviconsCheckbox.checked = settings.showFavicons;
    animationsEnabledCheckbox.checked = settings.animationsEnabled;
    
    // Apply display mode
    if (settings.displayMode === 'list') {
        bookmarksContainer.classList.add('list-view');
        folderContent.classList.add('list-view');
    } else {
        bookmarksContainer.classList.remove('list-view');
        folderContent.classList.remove('list-view');
    }
    
    // Apply icon size
    document.body.classList.remove('icon-size-small', 'icon-size-medium', 'icon-size-large');
    document.body.classList.add(`icon-size-${settings.iconSize}`);
    
    // Apply animations setting
    if (settings.animationsEnabled) {
        document.body.classList.add('animations-enabled');
    } else {
        document.body.classList.remove('animations-enabled');
    }
}

// Save settings
function saveSettings() {
    settings = {
        displayMode: displayModeSelect.value,
        iconSize: iconSizeSelect.value,
        showFavicons: showFaviconsCheckbox.checked,
        animationsEnabled: animationsEnabledCheckbox.checked
    };
    
    chrome.runtime.sendMessage({ 
        action: 'updateSettings', 
        settings: settings 
    }, () => {
        applySettings();
        toggleSettingsPanel();
    });
}

// Load bookmarks from Chrome API
function loadBookmarks() {
    chrome.runtime.sendMessage({ action: 'getBookmarks' }, (response) => {
        if (response && response.bookmarks) {
            currentBookmarks = response.bookmarks;
            displayBookmarkFolders();
        }
    });
}

// Display bookmark folders at the root level
function displayBookmarkFolders() {
    // Clear loading indicator
    bookmarksContainer.innerHTML = '';
    
    // Get root bookmark folders
    const rootNode = currentBookmarks[0];
    const rootChildren = rootNode.children || [];
    
    // Display each folder
    rootChildren.forEach(child => {
        if (child.children) {
            // This is a folder
            const folderElement = createFolderElement(child);
            bookmarksContainer.appendChild(folderElement);
        }
    });
    
    // If no folders were found
    if (bookmarksContainer.children.length === 0) {
        bookmarksContainer.innerHTML = '<p class="no-bookmarks">No bookmark folders found. Create some bookmarks to get started!</p>';
    }
}

// Create a folder element
function createFolderElement(folder) {
    const folderElement = document.createElement('div');
    folderElement.className = 'bookmark-folder';
    folderElement.dataset.id = folder.id;
    
    const iconElement = document.createElement('div');
    iconElement.className = 'folder-icon';
    iconElement.innerHTML = '<i class="fas fa-folder"></i>';
    
    const nameElement = document.createElement('div');
    nameElement.className = 'folder-name';
    nameElement.textContent = folder.title;
    
    folderElement.appendChild(iconElement);
    folderElement.appendChild(nameElement);
    
    // Add click event to open folder
    folderElement.addEventListener('click', () => {
        openFolder(folder);
    });
    
    return folderElement;
}

// Open a folder and display its contents
function openFolder(folder) {
    currentFolderId = folder.id;
    folderHistory.push(folder.id);
    
    // Set folder title
    folderTitle.textContent = folder.title;
    
    // Clear previous content
    folderContent.innerHTML = '';
    
    // Display folder contents
    if (folder.children && folder.children.length > 0) {
        folder.children.forEach(item => {
            if (item.children) {
                // This is a subfolder
                const subfolderElement = createFolderElement(item);
                folderContent.appendChild(subfolderElement);
            } else {
                // This is a bookmark
                const bookmarkElement = createBookmarkElement(item);
                folderContent.appendChild(bookmarkElement);
            }
        });
    } else {
        folderContent.innerHTML = '<p class="empty-folder">This folder is empty.</p>';
    }
    
    // Show folder view
    folderView.classList.add('active');
}

// Create a bookmark element
function createBookmarkElement(bookmark) {
    const bookmarkElement = document.createElement('div');
    bookmarkElement.className = 'bookmark-item';
    bookmarkElement.dataset.id = bookmark.id;
    
    // Create favicon or default icon
    const iconElement = document.createElement('div');
    if (settings.showFavicons && bookmark.url) {
        const img = document.createElement('img');
        img.className = 'bookmark-icon';
        img.src = `https://www.google.com/s2/favicons?domain=${new URL(bookmark.url).hostname}`;
        img.alt = '';
        img.onerror = () => {
            img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 3c1.82 0 3.413.973 4.288 2.428l-1.714 1.029A3 3 0 0 0 12 9a3 3 0 0 0-2.574 1.457l-1.714-1.029A5 5 0 0 1 12 7zm0 10c-1.82 0-3.413-.973-4.288-2.428l1.714-1.029A3 3 0 0 0 12 15a3 3 0 0 0 2.574-1.457l1.714 1.029A5 5 0 0 1 12 17z" fill="rgba(0,120,215,1)"/></svg>';
        };
        iconElement.appendChild(img);
    } else {
        iconElement.className = 'bookmark-icon';
        iconElement.innerHTML = '<i class="fas fa-globe"></i>';
    }
    
    const titleElement = document.createElement('div');
    titleElement.className = 'bookmark-title';
    titleElement.textContent = bookmark.title || 'Untitled';
    
    bookmarkElement.appendChild(iconElement);
    bookmarkElement.appendChild(titleElement);
    
    // Add URL as tooltip and data attribute
    if (bookmark.url) {
        bookmarkElement.title = bookmark.url;
        bookmarkElement.dataset.url = bookmark.url;
        
        // Add click event to open bookmark
        bookmarkElement.addEventListener('click', () => {
            chrome.tabs.update({ url: bookmark.url });
        });
    }
    
    return bookmarkElement;
}

// Go back to previous folder
function goBack() {
    // Remove current folder from history
    folderHistory.pop();
    
    // If history is empty, close folder view
    if (folderHistory.length === 0) {
        closeFolder.click();
        return;
    }
    
    // Get previous folder ID
    const previousFolderId = folderHistory[folderHistory.length - 1];
    
    // Find folder in bookmarks tree
    const findFolder = (node) => {
        if (node.id === previousFolderId) {
            return node;
        }
        
        if (node.children) {
            for (const child of node.children) {
                const found = findFolder(child);
                if (found) return found;
            }
        }
        
        return null;
    };
    
    // Find and open previous folder
    const previousFolder = findFolder(currentBookmarks[0]);
    if (previousFolder) {
        // Remove the current folder from history since openFolder will add it again
        folderHistory.pop();
        openFolder(previousFolder);
    }
}

// Close folder view
function closeFolderView() {
    folderView.classList.remove('active');
    folderHistory = [];
    currentFolderId = null;
}

// Search bookmarks
function searchBookmarks() {
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
        displayBookmarkFolders();
        return;
    }
    
    // Clear current display
    bookmarksContainer.innerHTML = '';
    
    // Function to search recursively through bookmarks
    const searchRecursive = (nodes, results = []) => {
        for (const node of nodes) {
            // Check if bookmark title or URL matches query
            if (node.title && node.title.toLowerCase().includes(query)) {
                results.push(node);
            } else if (node.url && node.url.toLowerCase().includes(query)) {
                results.push(node);
            }
            
            // Search in children
            if (node.children) {
                searchRecursive(node.children, results);
            }
        }
        
        return results;
    };
    
    // Perform search
    const results = searchRecursive(currentBookmarks);
    
    // Display results
    if (results.length > 0) {
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';
        
        const resultsHeader = document.createElement('h2');
        resultsHeader.textContent = `Search results for "${query}"`;
        resultsContainer.appendChild(resultsHeader);
        
        results.forEach(result => {
            if (result.children) {
                // This is a folder
                const folderElement = createFolderElement(result);
                resultsContainer.appendChild(folderElement);
            } else {
                // This is a bookmark
                const bookmarkElement = createBookmarkElement(result);
                resultsContainer.appendChild(bookmarkElement);
            }
        });
        
        bookmarksContainer.appendChild(resultsContainer);
    } else {
        bookmarksContainer.innerHTML = `<p class="no-results">No bookmarks found matching "${query}"</p>`;
    }
}

// Toggle settings panel
function toggleSettingsPanel() {
    settingsPanel.classList.toggle('active');
}

// Setup event listeners
function setupEventListeners() {
    // Settings panel
    settingsButton.addEventListener('click', toggleSettingsPanel);
    saveSettingsButton.addEventListener('click', saveSettings);
    
    // Folder navigation
    backButton.addEventListener('click', goBack);
    closeFolder.addEventListener('click', closeFolderView);
    
    // Search
    searchButton.addEventListener('click', searchBookmarks);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchBookmarks();
        }
    });
}

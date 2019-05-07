// this preload script makes the ipcRenderer available in the rendering process (along with ts adjustments in the individual tsx file)
window.ipcRenderer = require('electron').ipcRenderer;
import { app, BrowserWindow, remote, Menu, MenuItem, ipcMain } from 'electron';
import * as path from 'path';
import * as isDev from 'electron-is-dev';
import * as process from 'process';
import Axios, * as axios from 'axios';

if (isDev) {
  import('electron-compile')
    .then(({ enableLiveReload }) => {
      enableLiveReload({strategy: 'react-hmr'});
    });
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    darkTheme: true,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/preload.js'
    },
    title: 'JitCoin',
    icon: path.join(__dirname, 'public/icons/coin.png')
  });

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, './build/index.html')}`
  );

  // Open the DevTools.
  if (isDev) {
    // import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
    import('electron-devtools-installer')
      .then(({ default: installExtension, REACT_DEVELOPER_TOOLS }) => {
        installExtension(REACT_DEVELOPER_TOOLS)
          .then(() => {
            mainWindow!.webContents.openDevTools();
          });
      });
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});


// Create the request for user verification/initWallet via Axios
ipcMain.on("walletRequest", function (event) {
  Axios.post("http://localhost:7179/length") // length is used for debugging purposes here
  .then((response) => {
    console.log(response.data); // TODO: send back to render process(?)
  })
  .catch((error) => {
    console.error(error);
  });
})
/* eslint-disable */
const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const startNightmare = require('./fccRobo');
const { 
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} = require('electron-devtools-installer');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 856 });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  mainWindow.loadURL(startUrl);

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

ipcMain.on('startNightmare', (event, args = []) => {
  const answers = args.join(' ');
  const { exec } = require('child_process');
  exec(`node src/fccRobo.js ${answers}`);
});

app.on('ready', () => {
  [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach(extension => {
    installExtension(extension)
      .then(name => console.log(`Added Extension: ${name}`))
      .catch(error => console.log(`Error adding React Dev Tools`, error));
  });
});

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

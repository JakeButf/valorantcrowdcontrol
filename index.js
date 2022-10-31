const { app, BrowserWindow, ipcRenderer, webContents } = require('electron')
const tmi = require('tmi.js');
//
// electron info
//
var document = null;
let win;
app.on('ready', () => {

// Create the browser window.
    win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
    }
    
  }  )
  
  document = win.webContents;

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  //win.webContents.openDevTools()
});
  

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

///
///TWITCH BOT
///




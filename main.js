const { BrowserWindow, app, webContents, shell } = require("electron");
const path = require("path");
const url = require("url");

let mainWindow;
let development = process.env.NODE_ENV === "development";

function loadWindow(thisWindow) {
  if (development) {
    thisWindow.loadURL("http://localhost:3000");
  } else {
    thisWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "build/index.html"),
        icon: path.join(__dirname, "icons/512x512.png"),
        protocol: "file:",
        slashes: true,
      })
    );
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    title: "Bookmarket",
    width: 1200,
    height: 750,
    minWidth: 800,
    minHeight: 500,
    titleBarStyle: "hidden",
    trafficLightPosition: { x: 10, y: 10 },
    frame: false,
    hasShadow: true,
    
    webPreferences: {
      scrollBounce: true,
      enableRemoteModule: true,
      nodeIntegrationInSubFrames: true,
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: true,
      preload: __dirname + "/electron/preload.js",
    },
  });

  loadWindow(mainWindow);

  require("electron-context-menu")({
      window: mainWindow,
      showInspectElement: true,
      showSaveImageAs: true,
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {createWindow()});
app.once('window-all-closed', () => app.quit());

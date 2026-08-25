import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 900,
        icon: path.join(__dirname, '../public/colmeia.png'),
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
        titleBarStyle: "hidden",
    });

    mainWindow.removeMenu();

    mainWindow.loadURL(
        app.isPackaged 
            ? `file://${path.join(__dirname, "../dist/index.html")}`
            : "http://localhost:5173"
    );

    if (!app.isPackaged) {
        mainWindow.webContents.openDevTools();
    }
};

app.whenReady().then(createWindow);

ipcMain.on("window:minimize", () => {
    mainWindow?.minimize();
})

ipcMain.on("window:maximize", () => {
    mainWindow?.maximize();
})

ipcMain.on("window:close", () => {
    mainWindow?.close();
})

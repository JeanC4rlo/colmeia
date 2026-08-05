import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        title: "Colmeia",
        width: 1600,
        height: 900,
        minWidth: 1000,
        minHeight: 750,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    if (!app.isPackaged) { // Ambiente de desenvolvimento
        mainWindow.loadURL("http://localhost:5173");
        mainWindow.webContents.openDevTools();
    } else { // Ambiente de produção
        mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
    }

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

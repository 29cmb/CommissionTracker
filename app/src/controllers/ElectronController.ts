import { app, BrowserWindow } from 'electron';
import path from 'path';
import ControllerSuper from '../modules/ControllerSuper';
import { IController } from '../../Types';

export default class ElectronController extends ControllerSuper implements IController {
    getName(): string {
        return "ElectronController";
    }

    protected override init(): void {
        app.whenReady().then(() => {
            this.createWindow();
            app.on('activate', () => {
                if (BrowserWindow.getAllWindows().length === 0) this.createWindow();
            });
        });

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') app.quit();
        });
    }

    private createWindow(): void {
        const win = new BrowserWindow({
            width: 1000,
            height: 800,
            resizable: true,
            webPreferences: {
                contextIsolation: true,
            },
        });

        win.setMenu(null);

        if (!app.isPackaged) {
            win.loadURL('http://localhost:3000');
        } else {
            win.loadFile(path.join(__dirname, '../..', 'client', 'out', 'index.html'));
        }
    }
}
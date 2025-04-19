import * as fs from 'fs'
import * as path from 'path'
import Registry from './modules/Registry'
import { IController } from '../Types'

console.log("🚀 | Electron app is starting...")

fs.readdirSync(path.join(__dirname, 'controllers'))
    .forEach(async (file) => {
        const module = await import(`./controllers/${file}`);
        if (module.default) {
            const ControllerClass = module.default as { new (): IController };
            const controller = new ControllerClass();

            Registry.register(controller.getName(), controller);
        } else {
            console.error(`Failed to load controller from file: ${file}`);
        }
    });
export default class ControllerSuper {
    constructor() {
        this.init();
    }

    protected init(): void {
        console.warn("⚠️ | init() method not implemented in controller class. Please implement it in the derived class.");
    }
}
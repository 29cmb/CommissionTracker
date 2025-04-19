export default class Registry {
    public static registry: Map<string, any> = new Map<string, any>();

    public static register(name: string, controller: any): void {
        if (this.registry.has(name)) {
            throw new Error(`Controller with name ${name} already exists.`)
        }

        this.registry.set(name, controller);
        console.log("✅ | Controller registered:", name);
    }
}
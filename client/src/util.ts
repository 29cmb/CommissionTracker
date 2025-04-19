export const isElectron = (): boolean => {
    return !!(typeof window !== "undefined" && window.process && window.process.versions && window.process.versions.electron);
};
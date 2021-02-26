export const debounce = (callback: Function, wait: number) => {
    let interval: NodeJS.Timeout | null;
    return (...args: any[]) => {
        if (interval) clearTimeout(interval);
        interval = setTimeout(() => {
            interval = null;
            callback(...args);
        }, wait);
    };
};

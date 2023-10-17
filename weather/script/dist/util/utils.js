export class Utils {
    static debounce(func, beforeCall, afterCall, delay = 1000) {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        beforeCall();
        this.timeoutId = setTimeout(() => {
            func();
            afterCall();
        }, delay);
    }
}

export class Utils {
    private static timeoutId: number | undefined;

    public static debounce(
        func: () => void,
        beforeCall: () => void,
        afterCall: () => void,
        delay = 1000
    ) {
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

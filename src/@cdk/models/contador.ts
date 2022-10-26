export class Contador {
    private value = 1;
    reset(): void {
        this.value = 1;
    }
    inc(): number {
        return this.value++;
    }
    getCount(): number {
        return this.value;
    }
}

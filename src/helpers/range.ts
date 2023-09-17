export const range: (start: number, end: number) => number[] = (start, end) => {
    if (start >= end) {
        return [];
    }

    return Array.from(new Array(end - start + 1).keys()).map(
        (key: number): number => key + start
    );
};

export function getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

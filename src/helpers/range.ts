export const range: (start: number, end: number) => number[] = (start, end) => {
    if (start >= end) {
        return [];
    }

    return Array.from(new Array(end - start + 1).keys()).map(
        (key: number): number => key + start
    );
};

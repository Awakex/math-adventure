export const getRandomValueInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomValue = (max: number) => {
    return Math.floor(Math.random() * max);
};

export const shuffleArray = (array: any[]) => {
    return array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
};

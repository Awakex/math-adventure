export const getRandomValueInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomValue = (max: number) => {
    return Math.floor(Math.random() * max);
};

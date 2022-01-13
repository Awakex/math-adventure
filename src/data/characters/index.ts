export const EmptyCharacter: ICharacter = {
    name: "Пропавший воин",
    id: 1,
    attack: 0,
    imageSrc: "",
};

export const Characters: ICharacter[] = [
    {
        id: 2,
        name: "Цифровой воин",
        attack: 5,
        imageSrc: require("../../../assets/images/characters/warrior/warrior.png"),
    },
];

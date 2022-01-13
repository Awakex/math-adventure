export const Monsters: IMonster[] = [
    {
        id: 1,
        name: "Светлячок",
        health: 10,
        level: 1,
        imageSrc: require("./../../../assets/images/monsters/wisp.png"),
        rewardCoin: 2,
    },
    {
        id: 2,
        name: "Водный элементаль",
        health: 15,
        level: 2,
        imageSrc: require("./../../../assets/images/monsters/water-elemental.png"),
        rewardCoin: 4,
    },
    {
        id: 3,
        name: "Земной элементаль",
        health: 20,
        level: 3,
        imageSrc: require("./../../../assets/images/monsters/ground-elemental.png"),
        rewardCoin: 6,
    },
    {
        id: 4,
        name: "Воздушный элементаль",
        health: 25,
        level: 4,
        imageSrc: require("./../../../assets/images/monsters/air-elemental.png"),
        rewardCoin: 10,
    },
    {
        id: 5,
        name: "Огненный элементаль",
        health: 30,
        level: 5,
        imageSrc: require("./../../../assets/images/monsters/fire-elemental.png"),
        rewardCoin: 15,
    },
];

export const Bosses: IMonster[] = [
    {
        id: 5000,
        name: "Главный элементаль",
        health: 50,
        level: 5,
        imageSrc: require("./../../../assets/images/monsters/boss-elemental.png"),
        rewardCoin: 25,
    },
    {
        id: 5001,
        name: "Хранитель ключа",
        health: 100,
        level: 10,
        imageSrc: require("./../../../assets/images/monsters/key-keeper.png"),
        rewardCoin: 55,
    },
];

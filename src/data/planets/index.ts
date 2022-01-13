import { Operations } from "../../enums/Operations";
import { IPlanet } from "../../interfaces/IPlanet";

export const Planets: IPlanet[] = [
    {
        id: 1,
        name: "Бездна",
        description: "Отличная планета для старта своего приключения!",
        requiredLevel: 1,
        imageSrc: require("../../../assets/images/planets/abyss.png"),
        config: {
            totalLands: 100,
            minimumNumber: 1,
            maximumNumber: 10,
            operations: [Operations.ADDITION],
            maximumMonsterLevel: 5,
            maximumBossLevel: 5,
        },
    },
    {
        id: 2,
        name: "Пандора",
        description: "Пандора поможет выйти на новый уровень знаний!",
        requiredLevel: 10,
        imageSrc: require("../../../assets/images/planets/pandora.png"),
        config: {
            totalLands: 100,
            minimumNumber: 10,
            maximumNumber: 20,
            operations: [Operations.ADDITION],
            maximumMonsterLevel: 10,
            maximumBossLevel: 10,
        },
    },
    // {
    //     id: 3,
    //     name: "Пандора",
    //     description: "Пандора поможет выйти на новый уровень знаний!",
    //     requiredLevel: 10,
    //     imageSrc: require("../../../assets/images/planets/pandora.png"),
    // },
    // {
    //     id: 4,
    //     name: "Пандора",
    //     description: "Пандора поможет выйти на новый уровень знаний!",
    //     requiredLevel: 10,
    //     imageSrc: require("../../../assets/images/planets/pandora.png"),
    // },
    // {
    //     id: 5,
    //     name: "Пандора",
    //     description: "Пандора поможет выйти на новый уровень знаний!",
    //     requiredLevel: 10,
    //     imageSrc: require("../../../assets/images/planets/pandora.png"),
    // },
    // {
    //     id: 6,
    //     name: "Пандора",
    //     description: "Пандора поможет выйти на новый уровень знаний!",
    //     requiredLevel: 10,
    //     imageSrc: require("../../../assets/images/planets/pandora.png"),
    // },
    // {
    //     id: 7,
    //     name: "Пандора",
    //     description: "Пандора поможет выйти на новый уровень знаний!",
    //     requiredLevel: 10,
    //     imageSrc: require("../../../assets/images/planets/pandora.png"),
    // },
];

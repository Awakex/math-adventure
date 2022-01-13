import { Characters, EmptyCharacter } from "../data/characters";
import { makeAutoObservable } from "mobx";
import { IPlanet } from "../interfaces/IPlanet";

export class UserStore {
    public user: IUser = {
        level: 0,
        name: "",
        coins: 0,
        character: EmptyCharacter,
    };

    public stat: IStat = {
        totalDecisions: 0,
        totalSolvedDecisions: 0,
        planetGrab: 0,
    };

    public selectedPlanet: IPlanet | undefined = {
        id: 0,
        requiredLevel: 0,
        imageSrc: "",
        description: "",
        name: "",
        config: {
            totalLands: 0,
            minimumNumber: 0,
            maximumNumber: 0,
            operations: [],
            maximumMonsterLevel: 0,
            maximumBossLevel: 0,
        },
    };

    constructor() {
        makeAutoObservable(this);
    }

    public getRewardByKillMonster = (monster: IMonster) => {
        return {
            coins: monster.rewardCoin,
            experience: 0,
        };
    };

    public getUserAttack = () => {
        return {
            attack: this.user.character.attack,
            criticalMultiplier: 1,
            isCritical: false,
        };
    };

    public getUserStats = () => {
        Promise.resolve().then(() => {
            this.stat = {
                totalDecisions: 450,
                totalSolvedDecisions: 445,
                planetGrab: 34,
            };
        });
    };

    public loadUser = () => {
        Promise.resolve().then(() => {
            this.user = {
                level: 25,
                coins: 25,
                name: "AwakexDev",
                character: Characters.find((character) => character.id === 2) || EmptyCharacter,
            };
        });
    };

    public updateLocalStore = async (key: string) => {
        // try {
        //     await AsyncStorage.setItem("test", "work test!!");
        // } finally {
        //     console.log("update ended");
        // }
    };
}

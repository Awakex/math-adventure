import { Operations } from "../enums/Operations";

export interface IGeneratedPlanet {
    a: number;
    b: number;
    operation: Operations;
    monster: IMonster;
}

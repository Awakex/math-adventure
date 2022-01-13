import { Operations } from "../enums/Operations";

export interface IPlanetConfig {
    totalLands: number;
    minimumNumber: number;
    maximumNumber: number;
    maximumMonsterLevel: number;
    maximumBossLevel: number;
    operations: Operations[];
}

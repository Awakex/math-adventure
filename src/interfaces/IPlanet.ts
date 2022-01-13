import { IPlanetConfig } from "./IPlanetConfig";

export interface IPlanet {
    id: number;
    name: string;
    description: string;
    requiredLevel: number;
    imageSrc: any;
    config: IPlanetConfig;
}

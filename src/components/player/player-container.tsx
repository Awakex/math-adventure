import React, { useEffect, useState } from "react";
import Player from "./player";
import { useStores } from "../../hooks/useStores";
import { getRandomValue, getRandomValueInRange } from "../../helpers/helpers";
import { IGeneratedPlanet } from "../../interfaces/IGeneratedPlanet";
import { Bosses, Monsters } from "../../data/monsters";
import { IPlanet } from "../../interfaces/IPlanet";

const PlayerContainer = () => {
    const { userStore } = useStores();
    const [planetContent, setPlanetContent] = useState<IGeneratedPlanet[]>([]);
    const [step, setStep] = useState(1);

    useEffect(() => {
        if (userStore.selectedPlanet) {
            generatePlanet(userStore.selectedPlanet);
        }
    }, [userStore.selectedPlanet]);

    const generatePlanet = (planetData: IPlanet) => {
        let generatedContent: IGeneratedPlanet[] = [
            ...Array(userStore.selectedPlanet?.config.totalLands),
        ].map((_, index) => {
            let planetConfig = planetData.config;
            let operations = planetConfig.operations;
            let generatedOperation =
                operations.length > 1 ? getRandomValue(operations.length) : operations[0];

            let generatedA = getRandomValueInRange(
                planetConfig.minimumNumber,
                planetConfig.maximumNumber
            );

            let generatedB = getRandomValueInRange(
                planetConfig.minimumNumber,
                planetConfig.maximumNumber
            );

            let generatedMonster: IMonster;

            if (index > 0 && (index + 1) % 5 === 0) {
                let availableBosses = Bosses.filter(
                    (boss) => boss.level <= planetConfig.maximumBossLevel
                );
                generatedMonster = availableBosses[getRandomValue(availableBosses.length)];
            } else {
                let availableMonsters = Monsters.filter(
                    (monster) => monster.level <= planetConfig.maximumMonsterLevel
                );
                generatedMonster = availableMonsters[getRandomValue(availableMonsters.length)];
            }

            return {
                a: generatedA,
                b: generatedB,
                operation: generatedOperation,
                monster: generatedMonster,
            };
        });

        setPlanetContent(generatedContent);
    };

    return <Player planetContent={planetContent} step={step} />;
};

export default PlayerContainer;

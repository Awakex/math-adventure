import React, { useEffect, useState } from "react";
import Player from "./player";
import { useStores } from "../../hooks/useStores";
import { getRandomValue, getRandomValueInRange, shuffleArray } from "../../helpers/helpers";
import { Bosses, Monsters } from "../../data/monsters";
import { IPlanet } from "../../interfaces/IPlanet";
import { Operations } from "../../enums/Operations";
import { IPlanetConfig } from "../../interfaces/IPlanetConfig";
import { IGeneratedRoom } from "../../interfaces/IGeneratedRoom";

export const EmptyRoomContent = {
    a: 0,
    b: 0,
    answers: [],
    monster: {
        health: 0,
        rewardCoin: 0,
        id: 0,
        level: 0,
        name: "",
    },
    operation: "0",
};

const PlayerContainer = () => {
    const { userStore } = useStores();
    const [roomContent, setRoomContent] = useState<IGeneratedRoom>(EmptyRoomContent);
    const [topBarItems, setTopBarItems] = useState<any>([]);
    const [step, setStep] = useState(1);

    useEffect(() => {
        if (userStore.selectedPlanet) {
            if (!topBarItems.length) {
                generateTopBarItems();
            }
        }
    }, [userStore.selectedPlanet]);

    useEffect(() => {
        setRoomContent(generateRoom(userStore.selectedPlanet, false));
    }, [step]);

    const generateTopBarItems = () => {
        setTopBarItems([...Array(userStore.selectedPlanet?.config.totalLands)]);
    };

    const generateRoom = (planetData: IPlanet | undefined, withoutMonsterGenerate: boolean) => {
        if (!planetData) {
            return EmptyRoomContent;
        }

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

        if (!withoutMonsterGenerate) {
            generatedMonster = generateMonster(step - 1, planetConfig);
        } else {
            generatedMonster = roomContent.monster;
        }

        let answers = generateAnswers(generatedA, generatedB, generatedOperation, planetConfig);

        let convertedOperation =
            generatedOperation === Operations.SUBTRACTION
                ? "-"
                : generatedOperation === Operations.ADDITION
                ? "+"
                : generatedOperation === Operations.DIVISION
                ? "?"
                : generatedOperation === Operations.DIVISION
                ? "/"
                : "";

        return {
            a: generatedA,
            b: generatedB,
            operation: convertedOperation,
            monster: generatedMonster,
            answers,
        };
    };

    const generateAnswers = (
        generatedA: number,
        generatedB: number,
        generatedOperation: Operations,
        planetConfig: IPlanetConfig
    ) => {
        let answers: IAnswer[] = [];

        let correctAnswer: IAnswer = solveExample(generatedOperation, generatedA, generatedB, true);
        answers.push(correctAnswer);

        while (answers.length < 4) {
            let a = getRandomValueInRange(planetConfig.minimumNumber, planetConfig.maximumNumber);
            let b = getRandomValueInRange(planetConfig.minimumNumber, planetConfig.maximumNumber);
            let answer = solveExample(generatedOperation, a, b, false);
            let findIndex = answers.findIndex((a) => a.value === answer.value);
            if (findIndex === -1) {
                answers.push(answer);
            }
        }

        answers = shuffleArray(answers);

        return answers;
    };

    const solveExample = (operation: Operations, a: number, b: number, isCorrect: boolean) => {
        let result: IAnswer;
        switch (operation) {
            case Operations.ADDITION:
                result = { value: a + b, isCorrect };
                break;
            case Operations.DIVISION:
                result = { value: a / b, isCorrect };
                break;
            case Operations.MULTIPLICATION:
                result = { value: a * b, isCorrect };
                break;
            case Operations.SUBTRACTION:
                result = { value: a - b, isCorrect };
                break;
        }

        return result;
    };

    const generateMonster = (index: number, planetConfig: IPlanetConfig) => {
        let generatedMonster: IMonster;

        if (index > 0 && (index + 1) % 5 === 0) {
            let availableBosses = Bosses.filter(
                (boss) => boss.level <= planetConfig.maximumBossLevel
            );
            generatedMonster = availableBosses[getRandomValue(availableBosses.length)];
        } else {
            let availableMonsters = Monsters.filter(
                (monster) =>
                    monster.level <= planetConfig.maximumMonsterLevel &&
                    monster.id !== roomContent?.monster.id
            );
            generatedMonster = availableMonsters[getRandomValue(availableMonsters.length)];
        }

        return generatedMonster;
    };

    const handleCheckAnswer = (answer: IAnswer) => {
        if (answer.isCorrect) {
            let monsterHealth = roomContent?.monster.health;
            let userAttack = getUserAttack();

            if (monsterHealth && monsterHealth - userAttack > 0) {
                let updatedContentRoom = generateRoom(userStore.selectedPlanet, true);
                setRoomContent({
                    ...updatedContentRoom,
                    monster: { ...roomContent?.monster, health: monsterHealth - userAttack },
                });
            } else {
                userStore.user.coins += roomContent?.monster.rewardCoin;
                setStep((prev) => step + 1);
            }
        }
    };

    const getUserAttack = () => {
        return userStore.user.character.attack;
    };

    return (
        <Player
            roomContent={roomContent}
            step={step}
            topBarItems={topBarItems}
            handleCheckAnswer={handleCheckAnswer}
        />
    );
};

export default PlayerContainer;

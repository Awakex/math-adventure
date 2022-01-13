import React, { useEffect, useState } from "react";
import Player from "./player";
import { useStores } from "../../hooks/useStores";
import { getRandomValue, getRandomValueInRange, shuffleArray } from "../../helpers/helpers";
import { Bosses, Monsters } from "../../data/monsters";
import { IPlanet } from "../../interfaces/IPlanet";
import { Operations } from "../../enums/Operations";
import { IPlanetConfig } from "../../interfaces/IPlanetConfig";
import { IGeneratedRoom } from "../../interfaces/IGeneratedRoom";

const PlayerContainer = () => {
    const { userStore } = useStores();
    const [roomContent, setRoomContent] = useState<IGeneratedRoom | undefined>(undefined);
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
        generateRoom(userStore.selectedPlanet);
    }, [step]);

    const generateTopBarItems = () => {
        setTopBarItems([...Array(userStore.selectedPlanet?.config.totalLands)]);
    };

    const generateRoom = (planetData: IPlanet | undefined) => {
        if (!planetData) {
            return;
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

        let generatedMonster: IMonster = generateMonster(step - 1, planetConfig);
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

        setRoomContent({
            a: generatedA,
            b: generatedB,
            operation: convertedOperation,
            monster: generatedMonster,
            answers,
        });
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
                (monster) => monster.level <= planetConfig.maximumMonsterLevel
            );
            generatedMonster = availableMonsters[getRandomValue(availableMonsters.length)];
        }

        return generatedMonster;
    };

    const handleCheckAnswer = (answer: IAnswer) => {
        if (answer.isCorrect) {
            setStep((prev) => step + 1);
        }
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

import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../../styles";
import CustomButton from "../custom-button/custom-button";
import { useStores } from "../../hooks/useStores";
import PlayerTopBar from "../player-top-bar/player-top-bar";
import { useState } from "react";
import { IGeneratedRoom } from "../../interfaces/IGeneratedRoom";
import CustomText from "../custom-text/custom-text";

interface IProps {
    roomContent: IGeneratedRoom | undefined;
    topBarItems: [];
    step: number;
    handleCheckAnswer: (answer: IAnswer) => void;
}

const Player = (props: IProps) => {
    const { userStore } = useStores();
    const [currentMonster, setCurrentMonster] = useState<IMonster | null>(null);

    useEffect(() => {
        if (!props.roomContent) {
            return;
        }

        setCurrentMonster(props.roomContent.monster);
    }, [props.step, props.roomContent]);

    return (
        <View style={styles.container}>
            <PlayerTopBar
                styles={{ width: "90%", marginTop: 5 }}
                items={props.topBarItems}
                step={props.step}
            />

            <View style={styles.player}>
                <CustomText size={24} styles={{ marginTop: 15 }} center>
                    {currentMonster?.name}
                </CustomText>
                <CustomText size={18} center color={COLORS.SKY}>
                    Уровень: {currentMonster?.level}
                </CustomText>
                <CustomText size={18} center color={COLORS.RED} styles={{ marginTop: 10 }}>
                    Здоровье: {currentMonster?.health}
                </CustomText>
            </View>

            <View style={styles.answersWrapper}>
                <View style={styles.exampleWrapper}>
                    <CustomText size={34}>
                        {props.roomContent?.a} {props.roomContent?.operation} {props.roomContent?.b}{" "}
                        = ?
                    </CustomText>
                </View>

                <View style={styles.answers}>
                    {props.roomContent?.answers.map((answer, index) => (
                        <CustomButton
                            styles={styles.button}
                            key={index}
                            onPress={() => props.handleCheckAnswer(answer)}
                            title={answer.value}
                        />
                    ))}
                </View>
            </View>

            {/*<CustomButton*/}
            {/*    onPress={() => (userStore.selectedPlanet = undefined)}*/}
            {/*    title={"Вернуться к выбору планеты"}*/}
            {/*    styles={{ marginBottom: 15 }}*/}
            {/*/>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 50,
        backgroundColor: COLORS.BLACK,
    },
    player: {
        flex: 1,
    },
    answersWrapper: {
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
    },
    exampleWrapper: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        width: "95%",
        height: 80,
        borderRadius: 10,
    },
    answers: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        marginBottom: 15,
    },
    button: {
        width: "47%",
        marginBottom: 15,
    },
});

export default Player;

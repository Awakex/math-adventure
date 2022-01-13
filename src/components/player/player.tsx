import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../../styles";
import CustomButton from "../custom-button/custom-button";
import { useStores } from "../../hooks/useStores";
import PlayerTopBar from "../player-top-bar/player-top-bar";
import { IGeneratedPlanet } from "../../interfaces/IGeneratedPlanet";
import { useState } from "react";

interface IProps {
    planetContent: IGeneratedPlanet[];
    step: number;
}

const Player = (props: IProps) => {
    const { userStore } = useStores();
    const [currentMonster, setCurrentMonster] = useState<IMonster | null>(null);

    useEffect(() => {
        if (!props.planetContent.length) {
            return;
        }

        setCurrentMonster(props.planetContent[props.step - 1].monster);
    }, [props.step, props.planetContent]);

    return (
        <View style={styles.container}>
            <PlayerTopBar
                styles={{ width: "90%", marginTop: 5 }}
                items={props.planetContent}
                step={props.step}
            />

            <View style={styles.player}></View>

            <CustomButton
                onPress={() => (userStore.selectedPlanet = undefined)}
                title={"Вернуться к выбору планеты"}
                styles={{ marginBottom: 15 }}
            />
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
});

export default Player;

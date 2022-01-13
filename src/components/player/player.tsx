import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { COLORS } from "../../styles";
import CustomButton from "../custom-button/custom-button";
import PlayerTopBar from "../player-top-bar/player-top-bar";
import { IGeneratedRoom } from "../../interfaces/IGeneratedRoom";
import CustomText from "../custom-text/custom-text";
import Header from "../header/header";
import LottieView from "lottie-react-native";
import InfoOverlay from "../info-overlay/info-overlay";

interface IProps {
    roomContent: IGeneratedRoom | undefined;
    topBarItems: [];
    step: number;
    overlayIsOpen: boolean;
    overlayReward: IMonsterReward;
    damageOverlayIsOpen: boolean;
    damageOverlay: IUserAttack;
    handleCheckAnswer: (answer: IAnswer) => void;
}

const Player = (props: IProps) => {
    const [currentMonster, setCurrentMonster] = useState<IMonster | null>(null);
    const backgroundAnimationRef = useRef(null);

    useEffect(() => {
        if (!props.roomContent) {
            return;
        }

        setCurrentMonster(props.roomContent.monster);
    }, [props.step, props.roomContent]);

    useEffect(() => {
        // @ts-ignore
        backgroundAnimationRef?.current?.play();
    }, []);

    return (
        <View style={styles.container}>
            <LottieView
                source={require("../../../assets/animations/background3-forest.json")}
                autoPlay={true}
                loop={true}
                speed={1}
                resizeMode="cover"
                ref={backgroundAnimationRef}
            />

            <Header styles={{ marginBottom: 5, marginTop: 35 }} />

            <PlayerTopBar
                styles={{ width: "90%", marginTop: 5 }}
                items={props.topBarItems}
                step={props.step}
            />

            <View style={styles.player}>
                {props.overlayIsOpen && (
                    <InfoOverlay fromX={0} toX={100} styles={{ top: `25%` }} duration={1000}>
                        <CustomText>+{props.overlayReward.coins} монет(ы)</CustomText>
                        <CustomText>+{props.overlayReward.experience} опыта</CustomText>
                    </InfoOverlay>
                )}

                {props.damageOverlayIsOpen && (
                    <InfoOverlay fromX={0} toX={-100} styles={{ top: `45%` }} duration={1000}>
                        <Image
                            source={require("./../../../assets/images/effects/space-dust.png")}
                            style={{ zIndex: 10, width: 150, height: 150 }}
                        />

                        <CustomText
                            size={40}
                            styles={{
                                zIndex: 11,
                                position: "absolute",
                                top: 60,
                                left: "30%",
                                textShadowColor: "rgba(0, 0, 0, 1)",
                                textShadowOffset: { width: 1, height: 1 },
                                textShadowRadius: 10,
                            }}
                        >
                            -{props.damageOverlay.attack}
                        </CustomText>
                    </InfoOverlay>
                )}

                <CustomText size={24} styles={{ marginTop: 15 }} center>
                    {currentMonster?.name}{" "}
                    <CustomText size={24} center color={COLORS.SKY}>
                        (Ур: {currentMonster?.level})
                    </CustomText>
                </CustomText>

                <CustomText size={28} center color={COLORS.RED} styles={{ marginTop: 5 }}>
                    Здоровье: {currentMonster?.health}
                </CustomText>
                {props.roomContent?.monster.imageSrc && (
                    <Image style={styles.image} source={props.roomContent.monster.imageSrc} />
                )}
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
        backgroundColor: COLORS.BLACK,
    },
    player: {
        flex: 1,
        alignItems: "center",
    },
    image: {
        flex: 1,
        width: 250,
        height: "auto",
        padding: 10,
        marginBottom: 10,
        resizeMode: "stretch",
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

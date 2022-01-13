import React, { FC, useEffect, useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
import { COLORS } from "../../styles";
import CustomText from "../custom-text/custom-text";
import { observer } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores";
import LottieView from "lottie-react-native";
import UserStats from "../user-stats/users-stats";

const CharacterPage: FC = observer(() => {
    const { userStore } = useStores();
    const backgroundAnimationRef = useRef(null);

    useEffect(() => {
        // @ts-ignore
        backgroundAnimationRef?.current?.play();
    }, []);

    return (
        <View style={styles.container}>
            <LottieView
                source={require("../../../assets/animations/background1.json")}
                autoPlay={true}
                loop={true}
                speed={2}
                resizeMode="cover"
                ref={backgroundAnimationRef}
            />
            <CustomText center size={28}>
                {userStore.user.name}
            </CustomText>
            <CustomText center size={24} color={COLORS.PURPLE}>
                Уровень: {userStore.user.level}
            </CustomText>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                }}
            >
                <CustomText center color={COLORS.ORANGE} styles={{ marginTop: 20 }}>
                    Персонаж: {userStore.user.character.name}
                </CustomText>
                <Image
                    style={{ width: "50%", height: "50%", marginTop: 20 }}
                    source={userStore.user.character.imageSrc}
                />

                <UserStats />
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: COLORS.BLACK,
    },
});

export default CharacterPage;

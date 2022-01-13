import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../custom-text/custom-text";
import { COLORS } from "../../styles";
import LottieView from "lottie-react-native";
import PlanetsList from "../planets-list/planets-list";
import { observer } from "mobx-react-lite";

const SelectPlanetPage = observer(() => {
    const backgroundAnimationRef = useRef(null);

    useEffect(() => {
        // @ts-ignore
        backgroundAnimationRef?.current?.play();
    }, []);

    return (
        <View style={styles.container}>
            <LottieView
                source={require("../../../assets/animations/background2-space.json")}
                autoPlay={true}
                loop={true}
                speed={0.8}
                resizeMode="cover"
                ref={backgroundAnimationRef}
            />
            <CustomText center size={28} styles={{ marginBottom: 15 }}>
                Выбор планеты
            </CustomText>

            <PlanetsList styles={{ width: "95%" }} />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 50,
        backgroundColor: COLORS.BLACK,
    },
});

export default SelectPlanetPage;

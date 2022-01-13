import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { StyleSheet, View } from "react-native";
import CustomText from "../custom-text/custom-text";
import { useStores } from "../../hooks/useStores";
import LottieView from "lottie-react-native";

interface IProps {
    styles?: object;
}

const Header = observer((props: IProps) => {
    const { userStore } = useStores();
    const coinsAnimationRef = useRef(null);
    const [localCoins, setLocalCoins] = useState(0);

    useEffect(() => {
        // @ts-ignore
        coinsAnimationRef?.current?.play();
    }, [userStore.user.coins]);

    return (
        <View style={[styles.container, props.styles]}>
            <CustomText size={24}>{userStore.selectedPlanet?.name}</CustomText>
            <View>
                <CustomText size={24}>Монеты: {localCoins}</CustomText>
                <LottieView
                    source={require("../../../assets/animations/coins-animation.json")}
                    autoPlay={false}
                    loop={false}
                    speed={1}
                    ref={coinsAnimationRef}
                    style={{
                        position: "absolute",
                        zIndex: 10,
                        height: 240,
                        width: "100%",
                    }}
                    onAnimationFinish={() => setLocalCoins(userStore.user.coins)}
                />
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 40,
        width: "100%",
        backgroundColor: "rgba(255,255,255, 0.5)",
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
    },
});

export default Header;

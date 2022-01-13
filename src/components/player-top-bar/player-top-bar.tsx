import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import CustomText from "../custom-text/custom-text";
import { COLORS } from "../../styles";

interface IProps {
    step: number;
    items: any[];
    styles?: object;
}

const PlayerTopBar = (props: IProps) => {
    const translateXAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // @ts-ignore
        Animated.timing(translateXAnimation, {
            toValue: -props.step * 55 + 55,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, [props.step]);

    return (
        <View
            style={{
                ...styles.container,
                ...props.styles,
            }}
        >
            {props.items.length > 0 ? (
                <View style={styles.items}>
                    {props.items.map((item, index) => {
                        return (
                            <Animated.View
                                style={[
                                    styles.item,
                                    props.step === index + 1 && styles.selectedItem,
                                    (index + 1) % 5 === 0 && styles.specialItem,
                                    { transform: [{ translateX: translateXAnimation }] },
                                ]}
                                key={index}
                            >
                                <CustomText>{index + 1}</CustomText>
                            </Animated.View>
                        );
                    })}
                </View>
            ) : (
                <CustomText>Загрузка данных...</CustomText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    items: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    item: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.ORANGE,
        height: 35,
        width: 45,
        borderRadius: 10,
        marginRight: 10,
        opacity: 0.5,
    },
    selectedItem: {
        backgroundColor: COLORS.SKY,
        opacity: 1,
    },
    specialItem: {
        backgroundColor: COLORS.GREEN,
    },
});

export default PlayerTopBar;

import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import CustomText from "../custom-text/custom-text";

interface IProps {
    fromX: number;
    toX: number;
    duration: number;
    styles?: any;
    children: any;
}

const InfoOverlay = (props: IProps) => {
    const translateXAnimation = useRef(new Animated.Value(props.fromX)).current;
    const fadeAnimation = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(translateXAnimation, {
                toValue: props.toX,
                duration: props.duration,
                useNativeDriver: true,
            }),

            Animated.timing(fadeAnimation, {
                toValue: 0,
                duration: props.duration,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={[
                { transform: [{ translateX: translateXAnimation }], opacity: fadeAnimation },
                props.styles,
                { position: "absolute", zIndex: 10 },
            ]}
        >
            {props.children}
        </Animated.View>
    );
};

const styles = StyleSheet.create({});

export default InfoOverlay;

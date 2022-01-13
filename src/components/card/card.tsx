import React from "react";
import { Image, StyleSheet, View } from "react-native";
import CustomText from "../custom-text/custom-text";
import CustomButton from "../custom-button/custom-button";
import { COLORS } from "../../styles";

interface IProps {
    title: string;
    imageSrc: any;
    description: string;
    onPress: () => void;
    buttonTitle: string;
    isAvailable: boolean;
    requiredLevel?: number;
    styles?: any;
}

const Card = (props: IProps) => {
    return (
        <View
            style={{
                ...styles.card,
                ...props.styles,
            }}
        >
            <Image style={styles.image} source={props.imageSrc} />
            <View style={styles.text}>
                <CustomText styles={{ marginBottom: 10 }} size={24}>
                    {props.title}
                </CustomText>
                <CustomText size={20}>{props.description}</CustomText>

                {props.requiredLevel && (
                    <CustomText size={18} color={COLORS.PEACH} styles={{ marginTop: 5 }}>
                        Необходимый уровень -{" "}
                        <CustomText size={18} color={COLORS.SKY}>
                            {props.requiredLevel}
                        </CustomText>
                    </CustomText>
                )}

                <CustomButton
                    onPress={props.onPress}
                    title={props.buttonTitle}
                    styles={{ marginTop: 15 }}
                    color={COLORS.BLACK}
                    isDisabled={!props.isAvailable}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        padding: 10,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    image: {
        width: 100,
        height: 100,
    },
    text: {
        width: "70%",
    },
});

export default Card;

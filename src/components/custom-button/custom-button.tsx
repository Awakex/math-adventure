import React from "react";
import { TouchableOpacity } from "react-native";
import { COLORS } from "../../styles";
import CustomText from "../custom-text/custom-text";

interface IProps {
    onPress: () => void;
    title: string | number;
    color?: string;
    isDisabled?: boolean;
    styles?: any;
}

const CustomButton = (props: IProps) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            disabled={props.isDisabled}
            style={{
                padding: 10,
                backgroundColor: props.color ? props.color : COLORS.SKY,
                borderRadius: 10,
                alignItems: "center",
                opacity: props.isDisabled ? 0.5 : 1,
                ...props.styles,
            }}
        >
            <CustomText>{props.title}</CustomText>
        </TouchableOpacity>
    );
};

export default CustomButton;

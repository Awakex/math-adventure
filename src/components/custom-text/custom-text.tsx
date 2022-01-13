import React from "react";
import { Text } from "react-native";

interface IProps {
    size?: number;
    center?: boolean;
    color?: string;
    children: React.ReactNode;
    styles?: object;
}

const CustomText = (props: IProps) => {
    return (
        <Text
            style={{
                fontFamily: "OrelegaOne",
                fontSize: props.size ? props.size : 24,
                textAlign: props.center ? "center" : "auto",
                color: props.color ? props.color : "white",
                ...props.styles,
            }}
        >
            {props.children}
        </Text>
    );
};

export default CustomText;

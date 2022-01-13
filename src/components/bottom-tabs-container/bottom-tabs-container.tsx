import React, { FC } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import CharacterPage from "../character-page/character-page";
import { COLORS } from "../../styles";
import AdventurePage from "../adventure-page/adventure-page";

interface ITabs extends IRoute {
    tabBarColor: string;
}

const BottomTabsContainer: FC = () => {
    const Tab = createMaterialBottomTabNavigator();

    const Routes: ITabs[] = [
        {
            id: 1,
            component: CharacterPage,
            name: "CharacterPage",
            title: "Персонаж",
            icon: "user",
            tabBarColor: COLORS.SKY,
        },
        {
            id: 2,
            component: AdventurePage,
            name: "AdventurePage",
            title: "Приключения",
            icon: "globe",
            tabBarColor: COLORS.ORANGE,
        },
    ];

    return (
        <NavigationContainer>
            <Tab.Navigator
                barStyle={{
                    backgroundColor: COLORS.BLACK,
                }}
                shifting={true}
            >
                {Routes.map((route) => (
                    <Tab.Screen
                        key={route.id}
                        name={route.name}
                        component={route.component}
                        options={{
                            tabBarIcon: () => (
                                // @ts-ignore
                                <FontAwesome name={route.icon} size={24} color="white" />
                            ),
                            title: route.title,
                            tabBarColor: route.tabBarColor,
                        }}
                    />
                ))}
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default BottomTabsContainer;

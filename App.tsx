import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import BottomTabsContainer from "./src/components/bottom-tabs-container/bottom-tabs-container";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useStores } from "./src/hooks/useStores";

let customFonts = {
    OrelegaOne: require("./assets/fonts/OrelegaOne-Regular.ttf"),
};

export default function App() {
    const { userStore } = useStores();
    const [appIsLoading, setAppIsLoading] = useState(true);

    useEffect(() => {
        Font.loadAsync(customFonts)
            .then(async () => {
                await userStore.loadUser();
                await userStore.getUserStats();
            })
            .finally(() => setAppIsLoading(false));
    }, []);

    if (appIsLoading) {
        return <AppLoading />;
    }

    return (
        <View style={styles.container}>
            <BottomTabsContainer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

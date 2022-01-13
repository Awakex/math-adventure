import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../custom-text/custom-text";
import { COLORS } from "../../styles";
import { observer } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores";

const UserStats = observer(() => {
    const { userStore } = useStores();
    return (
        <View style={styles.container}>
            <CustomText center={true} color={COLORS.GREEN} size={28} styles={{ marginBottom: 15 }}>
                Статистика
            </CustomText>
            <View>
                <CustomText>Всего решений: {userStore.stat.totalDecisions}</CustomText>
                <CustomText>Правильных решений: {userStore.stat.totalSolvedDecisions}</CustomText>
                <CustomText>
                    Процент решений:{" "}
                    {Math.floor(
                        (userStore.stat.totalSolvedDecisions / userStore.stat.totalDecisions) * 100
                    )}
                    %
                </CustomText>
                <CustomText color={COLORS.PEACH}>
                    Захвачено планет: {userStore.stat.planetGrab}
                </CustomText>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
    },
});

export default UserStats;

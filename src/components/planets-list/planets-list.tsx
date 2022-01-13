import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Planets } from "../../data/planets";
import Card from "../card/card";
import { observer } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores";
import { configure } from "mobx";

configure({
    enforceActions: "never",
});

interface IProps {
    styles?: any;
}

const PlanetsList = observer((props: IProps) => {
    const { userStore } = useStores();

    const handleSelectPlanet = (planetId: number) => {
        userStore.selectedPlanet = Planets.find((planet) => planet.id === planetId);
    };

    return (
        <ScrollView
            style={{
                ...props.styles,
                ...styles.container,
            }}
        >
            {Planets.map((planet) => (
                <Card
                    key={planet.id}
                    title={planet.name}
                    description={planet.description}
                    imageSrc={planet.imageSrc}
                    onPress={() => handleSelectPlanet(planet.id)}
                    isAvailable={userStore.user.level >= planet.requiredLevel}
                    styles={{ marginBottom: 15 }}
                    buttonTitle="Выбрать"
                    requiredLevel={planet.requiredLevel}
                />
            ))}
        </ScrollView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default PlanetsList;

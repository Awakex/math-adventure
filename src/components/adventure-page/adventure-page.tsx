import React from "react";
import SelectPlanetPage from "../select-planet-page/select-planet-page";
import { observer } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores";
import PlayerContainer from "../player/player-container";

const AdventurePage = observer(() => {
    const { userStore } = useStores();

    if (userStore.selectedPlanet?.id) {
        return <PlayerContainer />;
    } else {
        return <SelectPlanetPage />;
    }
});

export default AdventurePage;

import { createContext } from "react";
import { UserStore } from "./user-store";

export const rootStoreContext = createContext({
    userStore: new UserStore(),
});

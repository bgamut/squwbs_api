import { createContext } from "react";

export const WholeContext = createContext({
    loading:false,
    date:[],
    page:1,
    seed:1,
    error:null,
    refreshing:false,
    perpage:50,
    screenHeight:0
});
import React, { useState, useEffect } from "react";
import {Animated} from "react-native"
export const Context = React.createContext();


export function ContextController({ children }) {
  let intialState = {
    posts: [],
    //data:[[0,1],[1,2]],
    random: "",
    yscroll: new Animated.Value(0),
    //yscroll:0,
    headerHeight:22,
    loading: true,
    data: [],
    page: 1,
    seed: 1,
    error: null,
    refreshing: false,
    closedIndices:[],
    index:0,
    dataManipulated:false,
    filteredData:[],
    dy: new Animated.Value(0),
    horizontalscroll:new Animated.Value(0),
    opacity:1,
    drawerToggle:true,
    drawerAnimation:new Animated.Value(0),
    translateY:new Animated.Value(0),
    userData:undefined,
    spinValue:new Animated.Value(0),
    words:[],
    sheet:{},
    headerOpen:true,
    headerTranslation:new Animated.Value(0)
  };

  const [state, setState] = useState(intialState);

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
}
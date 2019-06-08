import React from 'react';
//import { createStackNavigator, createAppContainer } from '@react-navigation/native';
// import { CatalogueScreen, 
//          CategoryScreen, 
//          ProductScreen,  
//          SearchScreen,
//          SearchResultsScreen,
//          BagScreen } from './screens';
import {createSwitchNavigator,createBottomTabNavigator} from "@react-navigation/core"
import {createBrowserApp} from "@react-navigation/web"
import CatalogueScreen from './screens/CatalogueScreen'
import CategoryScreen from './screens/CategoryScreen'
import ProductScreen from './screens/ProductScreen'
import SearchScreen from './screens/SearchScreen'
import SearchResultsScreen from './screens/SearchResultsScreen'
import BagScreen from './screens/BagScreen'
//import Ionicons from 'react-native-vector-icons/Ionicons';




const Nav = createSwitchNavigator({
   catalogue: CatalogueScreen,
    category: CategoryScreen,
     product: ProductScreen
}, {
    //configuration options...
    defaultNAvigationOptions:{
        headerStyle:{
            backgroundColor:'orange'
        }
    }
});
const Navigator = createBrowserApp(Nav)
// const Navigator = createDrawerNavigator({
//     SearchHome: SearchScreen,
//  SearchResults: SearchResultsScreen
// }, {
//   //configuration options...
// });
 
//export default createBrowserApp(Navigator)

export default Navigator


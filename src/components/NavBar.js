import React from 'react'
//import { Link } from 'react-router-dom'
import { BrowserRouter,HashRouter, Route, Link,Router,Switch } from "react-router-dom";
import {ScrollView} from 'react-native'
import Navigator from './Navigator'
import Catalogue from './screens/CatalogueScreen'
import Category from './screens/CategoryScreen'
import Product from './screens/ProductScreen'
const NavBar = () => (
  <div>
    <div>
      
        <a id="linkLogin" href="/login">login</a><br/>
        <Link id="linkHome" to="/">Home</Link><br/>
        <Link id="linkTodo" to="/todo">todo</Link><br/>
        <Link id="linkMap" to="/map">map</Link><br/>
        
        
    </div>
  </div>
)
export default NavBar

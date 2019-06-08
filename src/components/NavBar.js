import React from 'react'
import { Link } from 'react-router-dom'
import {ScrollView} from 'react-native'
const NavBar = () => (
  <div>
    <div>
      
        <Link id="linkHome" to="/">Home</Link><br/>
        <Link id="linkTodo" to="/todo">todo</Link><br/>
        <Link id="linkMap" to="/map">map</Link><br/>
        <a id="linkhome" href="/login">login</a><br/>
     
    </div>
  </div>
)
export default NavBar

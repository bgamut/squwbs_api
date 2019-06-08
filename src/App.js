 
 import React, {useReducer,useState,Component} from 'react'
 import Todo from './components/Todo'
 import './App.css'
 import Header from './components/Header';
 import { BrowserRouter,HashRouter, Route, Link,Router,Switch } from "react-router-dom";
 //import{IndexRedirect} from "react-router"
 import Home from './components/Home'
 import NoMatch from './components/NoMatch'
 import NavBar from './components/NavBar'
 import Map from './components/Map'
 import RouterElement from './components/RouterElement'
 //import {name} from '/package.json'
 
 //var envs = require('./expressServer/keysconfig');
//console.log(envs)
//var dotenv= require('dotenv') ;
//const result = dotenv.config();
//console.log(dotenv.parse())
import {produce} from "immer"
import {WholeContext} from './WholeContext'
var {name} =require( '../package.json')
//  var i=1
// const object=React.createContext({})
// class App extends Component{

//   constructor(props){
//     super(props)
//     this.state={
//       items:[],
//     }
//     this.handleItems=(items)=>{
//       this.setState({items:[...items]})
//     }
//   }
//   // const [state, setState]=useState(
//   //   {items:[],
//   //   }
//   // )
//   // function handleItems(items){
//   //   setState({items:[...items]})
//   //   console.log(state)
//   // }
//   render(){
//     return (
//     <div>
//       <Header title = 'template'/>
//       <RouterElement/>
//     </div>
//     );
//   }
    
//   }
//   export default App
function useImmerReducer(reducer, initialState)
{
  return React.useReducer(produce(reducer),initialState);
}  
const wholeReducer=(obj, action)=>{
  switch (action.type) {
    case "ADD_TODO":
      obj.unshift({ text: action.text, complete: false });
      return;
    case "TOGGLE_COMPLETE":
      obj[action.i].complete = !obj[action.i].complete;
      return;
    case "RESET":
      return [];
    default:
      return obj;
  }
}
export default () => {
  const [obj, dispatch] = useImmerReducer(wholeReducer, []);

  return (
    <WholeContext.Provider value={{ obj, dispatch }}>
      <Header title = {name}/>
      <RouterElement/>
    </WholeContext.Provider>
  );
};
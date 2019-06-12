 
 import React, {useReducer,useContext,useState,Component} from 'react'
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
 import HorizontalScroller from './components/HorizontalScroller'
 import VerticalScroller from './components/VerticalScroller'
 //import Navigator from './components/Navigator'
 //import {name} from '/package.json'
 
 //var envs = require('./expressServer/keysconfig');
//console.log(envs)
//var dotenv= require('dotenv') ;
//const result = dotenv.config();
//console.log(dotenv.parse())
import {produce} from "immer"
import {WholeContext} from './WholeContext'
//var {name} =require( '../package.json')

// var toTitle=0
// //  var i=1
// // const object=React.createContext({})
// // class App extends Component{

// //   constructor(props){
// //     super(props)
// //     this.state={
// //       items:[],
// //     }
// //     this.handleItems=(items)=>{
// //       this.setState({items:[...items]})
// //     }
// //   }
// //   // const [state, setState]=useState(
// //   //   {items:[],
// //   //   }
// //   // )
// //   // function handleItems(items){
// //   //   setState({items:[...items]})
// //   //   console.log(state)
// //   // }
// //   render(){
// //     return (
// //     <div>
// //       <Header title = 'template'/>
// //       <RouterElement/>
// //     </div>
// //     );
// //   }
    
// //   }
// //   export default App
// function useImmerReducer(reducer, initialState)
// {
//   return React.useReducer(produce(reducer),initialState);
// }  
// const handleScroll = (input)=>{
//   toTitle=input
// }
// const wholeReducer=(obj, action)=>{
//   switch (action.type) {
//     case "ADD_TODO":
//         //obj.todo.unshift({ text: action.text, complete: false });
        
//         console.log({text:action.text,complete: false})
//         return obj.todo.push({text:action.text,complete: false})
//       //obj.unshift({ text: action.text, complete: false });
//       //obj.push({ text: action.text, complete: false });
//       //return;
//       // return produce(obj, draftState=>{
//       //   draftState.unshift({text:action.text, complete:false})
//       // })
      
//     case "TOGGLE_COMPLETE":
//       //obj.todo[action.i].complete = !obj.todo[action.i].complete;
//       return;
//     case "RESET":
//       obj.todo=[];
//       return;
//     case "SET_TITLE":
//       //console.log(obj)
//       //console.log(action.title)
//       obj.currentTitle=action.title
//       document.title=action.title
//       return;
//     case "Y_SCROLLED":
//       //console.log(obj)
//       //obj.yScroll=action.yScroll
//       obj.yScrolled=action.yScroll
//       //this.handleScroll({yScrolled:action.yScroll})
//       toTitle=action.yScroll
//       console.log(obj.yScrolled)
      
//       return; 
//     default:
//       return obj;
//   }}


// class App extends Component{
//   //const [obj, dispatch] = useImmerReducer(wholeReducer, []);

//   constructor(props){
//     super(props)
//     this.state=useContext(WholeContext)
//   }
//   //const [obj, dispatch] = useImmerReducer(wholeReducer, WholeContext);
//   render(){
//     return (
    
//       // <WholeContext.Provider value={{ obj, dispatch }}>
//       <WholeContext.Provider value={this.state}>
//         <Header title = {name} toTitle={toTitle}/>
        
//         <VerticalScroller/>
//         <RouterElement/>
//       </WholeContext.Provider>
  
//     );
//   }



// };
// export default App

import {Provider} from 'react-redux'
import store from './store'
import {setTitle} from './actions/postActions'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//var {name} =require( '../package.json')

class App extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
//         setTitle:this.props.setTitle
//       };
//       this.setTitle = this.setTitle.bind(this)
// }
//   componentDidMount(){
//     console.log(name)
//     setTitle(name);
//   }
  render(){
    return(
      <Provider store={store}>
        <div className="App">
          <Header/>
          {/* <VerticalScroller/> */}
          <RouterElement/>
        </div>
      </Provider>
    )
  }
}
export default App;
// App.propTypes = {
//   setTitle: PropTypes.func.isRequired
// };
// export default connect(null,{setTitle})(App);

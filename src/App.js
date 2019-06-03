
 import React, {useReducer,useState} from 'react'
 import Todo from './components/Todo'
 import './App.css'
 import Header from './components/Header';
 import { BrowserRouter,HashRouter, Route, Link,Router,Switch } from "react-router-dom";
 //import{IndexRedirect} from "react-router"
 import Home from './components/Home'
 import NoMatch from './components/NoMatch'
 import NavBar from './components/NavBar'
 var i=1
 export default function App(props){

    
  const [state, setState]=useState(
    {items:[],
    }
  )
  function handleItems(items){
    setState({items:[...items]})
    console.log(state)
  }
      return (
      <div>
      <Header title = 'Reader'/>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/todo" render={()=><Todo itemsChanged={handleItems} items={state.items}/>}>
            
          </Route>
          <Route component={NoMatch} />
        </Switch>
        <NavBar />
      </BrowserRouter>
    </div>
      );
    
  }

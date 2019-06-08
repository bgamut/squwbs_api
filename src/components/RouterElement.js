import React, { Component } from 'react';
import { BrowserRouter,HashRouter, Route, Link,Router,Switch } from "react-router-dom";
import NavBar from './NavBar'
import Todo from './Todo'
import Home from './Home'
import NoMatch from './NoMatch'
import Map from './Map'
// class RouterElement extends Component {
//     render() {
//         return (
//             <BrowserRouter>
//                 <Switch>
//                     <Route exact path="/" component={Home} />
//                     <Route exact path="/todo" render={()=><Todo itemsChanged={handleItems} items={state.items}/>}>
//                     </Route>
//                     <Route exact path="/map" component={Map}/>
//                     <Route component={NoMatch} />
//                 </Switch>
//                 <NavBar />
//             </BrowserRouter>
//         );
//     }
// }
class RouterElement extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/todo" component={Todo}/>
                    <Route exact path="/map" component={Map}/>
                    <Route component={NoMatch} />
                </Switch>
                <NavBar />
            </BrowserRouter>
        );
    }
}
export default RouterElement;
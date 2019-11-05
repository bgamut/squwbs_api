import React, { Component,memo } from 'react';
import { BrowserRouter,HashRouter, Route, Link,Router,Switch } from "react-router-dom";
import NavBar from './NavBar'
//import Todo from './Todo'
import Home from './Home'
import NoMatch from './NoMatch'
import NotFound from './NotFound'
import WordDeckWrapper from './WordDeckWrapper'
import ReadPDF from './ReadPDF'
import UploadWords from './UploadWords'
import Sound from './Sound'
import Login from './Login'
//import TermsAndConditions from './TermsAndConditions'
// import Map from './Map'
// import Catalogue from './screens/CatalogueScreen'
// import Category from './screens/CategoryScreen'
// import Product from './screens/ProductScreen'
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
                    {/* <Route exact path="/todo" component={Todo}/> */}
                    <Route exact path="/cards" component={WordDeckWrapper}/>
                    <Route exact path="/PDF" component={ReadPDF}/>
                    <Route path ="/uploadjw" component={UploadWords}/>
                    <Route exact path="/map" component={Map}/>
                    <Route exact path = "/sound" component={Sound}/>
                    {/* <Route exact path = "/termsandconditions" componenet = {TermsAndConditions}/> */}
                    {/* <Route exact path ="/login" component={Login}/> */}
                    {/* <Route exact path ="/login/*" component={Home}/> */}
                    {/* <Route exact path="/Catalogue" component={Catalogue} />
                    <Route exact path="/Category" component={Category}/>
                    <Route exact path="/Product" component={Product}/>
                    <Route component={NoMatch} /> */}
                    {/* <Route path="*" component={NotFound} /> */}
                    
                </Switch>

                {/* <NavBar /> */}
            </BrowserRouter>
        );
    }
}
export default memo(RouterElement);
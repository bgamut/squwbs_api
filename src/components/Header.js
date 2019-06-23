import React from 'react'; 
//import {WholeContext} from "../WholeContext"
var {name} =require( '../package.json')



function Header () {
  
    return(
        <div style={divStyle}>        
            <p style ={pStyle} >
                {name}
            </p>
        </div>
    
    ) 
};

const divStyle = {
    flex:1,
    margin:1,
    borderColor:'#000000',
    borderWidth:5,
    // shadowColor: 'rgba(1, 1, 1, 1)',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 20,
    backgroundColor:'#ffffff',
    alignItems:'center',
    justifyContent:'space-evenly',
    height:22,
};
  const pStyle = {
    color:'black',
    fontSize: 12,
    //textAlign: 'center',
    // textShadowColor: 'rgba(1, 1, 1, 1)',
    // textShadowOffset: {width: 0, height: 0},
    // textShadowRadius: 20
  };


export default (Header)
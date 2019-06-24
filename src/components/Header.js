import React from 'react'; 
//import {WholeContext} from "../WholeContext"
import {Text,View} from 'react-native'
//import MenuDrawer from 'react-native-side-drawer'
var {name} =require( '../../package.json')





function Header () {
  
    return(
        <View style={divStyle}>        
            <Text style ={pStyle} >
                {name}
            </Text>
        </View>
    
    ) 
};

const divStyle = {
    margin:0,
    //padding:1,
    height:22,
    backgroundColor:'#ffffff',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    flex:1,
    borderColor:'black',
    borderRadius:2,
    color:'black',
    borderColor:'#cfcfcf',
    borderWidth:1,
};
  const pStyle = {
    color:'white',
    fontSize: 12,
    textShadowColor: 'rgba(128, 128, 128, 1)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
    //textAlign: 'center',
    // textShadowColor: 'rgba(1, 1, 1, 1)',
    // textShadowOffset: {width: 0, height: 0},
    // textShadowRadius: 20
  };


export default (Header)
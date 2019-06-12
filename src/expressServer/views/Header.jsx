import React from 'react';
// import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
//import '../../css/header.css'
var {name} =require( '../../../package.json')
const Header = ({ onBack, title }) => (
    <div id='titleBar' styles={{ 
                                    margin:1,
                                    borderColor:'#cfcfcf',
                                    borderWidth:1,
                                    shadowColor: 'rgba(1, 1, 1, 1)',
                                    shadowOffset: {width: 0, height: 0},
                                    shadowRadius: 1,
                                    backgroundColor:'#ffffff',
                                    alignItems:'center',
                                    justifyContent:'space-evenly',
                                }}>        
        <div accessibilityRole="heading" id='title'>{title}</div>
    </div>
);

// const styles = StyleSheet.create({
//     headerContainer: {
//         margin:1,
//         borderColor:'#cfcfcf',
//         borderWidth:1,
//         shadowColor: 'rgba(1, 1, 1, 1)',
//         shadowOffset: {width: 0, height: 0},
//         shadowRadius: 1,
//         backgroundColor:'#ffffff',
//         alignItems:'center',
//         justifyContent:'space-evenly',
    
//     },
//     header: {
//         height:22,
//         flexDirection:'row',
//         flex:1,
//         fontSize:12,
//         color:'white',
//         textShadowColor: 'black',
//         textShadowOffset: {width: 0, height: 0},
//         textShadowRadius: 5
//     },
// });

export default Header;

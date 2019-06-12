import React, { Component } from 'react';
import Header from './Header'
import PropTypes from 'prop-types';
import {View,Text,StyleSheet} from 'react'
var {name} =require( '../../../package.json')


class home extends Component {
    constructor(props) {
        super(props);
        this.state={
            
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        //var redercomponent
        if(this.props.user!==undefined){
            return(
                <div>
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
                        <div id='title'>{name}</div>
                    </div>
                    <div style={{margin:1,
                                borderColor:'#cfcfcf',
                                borderWidth:1,
                                shadowColor: 'rgba(1, 1, 1, 1)',
                                shadowOffset: {width: 0, height: 0},
                                shadowRadius: 1,
                                backgroundColor:'#ffffff',
                                alignItems:'center',
                                justifyContent:'space-evenly',
                                }}>
                        <div style={{color:'white', textDecorationLine:'none',borderColor:'white',borderWidth:2 }}>Hello, {this.props.user}. View your <a href="/login">profile</a>.</div>
                        <div style={{color:'white', textDecorationLine:'none',borderColor:'white',borderWidth:2 }} href="/logout">log out</div>
                    </div>
                </div>
            )

            
        }
        else{
            return (
                <div>
                                <style>{`
                                    .container{
                                    
                                        margin:2px;
                                        width:100vw;
                                        height:22px;
                                        -webkit-app-region:drag;
                                        shadow: 0px 0px 5px rgba(1, 1, 1, 1)
                                    }
                                    #text{
                                        
                                        text-shadow: 0px 0px 5px rgba(1, 1, 1, 1);
                                        font-size:14px;
                                        text-align: center;
                                        color:rgb(256, 256, 256);
                                        width:100vw;
                                        height:50px;
                                        padding-top:2px;
                                        -webkit-app-region:drag;
                                        -moz-user-select: -moz-none;
                                        -khtml-user-select: none;
                                        -webkit-user-select: none;
                                        -ms-user-select: none;
                                        user-select: none;

                                    }
                                `}
                                </style>
                    <div id='titleBar' className='container'>        
                        <div accessibilityRole="heading" id='title' style = {{color:'white', textDecorationLine:'none',borderColor:'white',borderWidth:2,textShadowColor: 'rgba(1, 1, 1, 1)',textShadowOffset: {width: 0, height: 0},textShadowRadius: 5 }}>{name}</div>
                    </div>
                    <div className='container'>
                        <div style = {{color:'black', textDecorationLine:'none',borderColor:'white',borderWidth:2,textShadowColor: 'rgba(1, 1, 1, 1)',textShadowOffset: {width: 0, height: 0},textShadowRadius: 5 }}>
                            Welcome! Please 
                        <div style = {{color:'black', textDecorationLine:'none',borderColor:'white',borderWidth:2,textShadowColor: 'rgba(1, 1, 1, 1)',textShadowOffset: {width: 0, height: 0},textShadowRadius: 5 }} href="/login">log in</div>.</div>
                    </div>
                </div>
            );
        }
    }
}

home.propTypes = {

};
// const styles = StyleSheet.create({
//     container: {
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
//     text: {
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
export default home;
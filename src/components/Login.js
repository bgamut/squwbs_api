import React, { Component } from 'react';
//import Header from './Header'
import PropTypes from 'prop-types';
import {SafeAreaView,KeyboardAvoidingView,Text,View,StyleSheet,Dimensions,TouchableOpacity} from 'react-native'
//var {name} =require( '../../../package.json')


class Login extends Component {
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

    
        return(
    <View 
        style ={{
            width:'100vw',
            height:'100vh',
            justifyContent:'center',
            alignItems:'center'
        }}
    >
    <View style={styles.box}>
        <a style={
          {
            // flex:1,
            textDecorationLine:'none',
            //borderColor:'black',
            //borderWidth:2,
            backgroundColor:'transparent',
            fontSize: 17,
            fontWeight:700,
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 2,
            // flex:1,
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
            textAlign:'center'
          }
        } href="/login/google">
          <TouchableOpacity style={styles.touch}>
          
          <Text id="linkLoginGoogle" 
          style={{
            // color:'black', 
            textDecorationLine:'none',
            color:'white',
            fontSize: 17,
            fontWeight:'700',
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 2,
            // flex:1,
            textAlign:'center',
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
          }}
          >Google Login</Text>
          {/* <i class="fa fa-google" aria-hidden="true"
          style={{
            height:33,
              color:'white',
              display:'block',
              margin:3,
              textShadowColor: 'rgba(0, 0, 0, 1)',
              textShadowOffset: {width: 0, height: 0},
              textShadowRadius: 3,
              shadowColor:'#000',
              shadowOpacity:0.25,
              shadowRadius:2,
              shadowOffset:{
              width:0,
              height:0
              },
              elevation:2
          }}></i> */}
          </TouchableOpacity>
        </a><br/>
        </View>
       
        <View style={styles.box}>
        <a style={
          {
            // flex:1,
            textDecorationLine:'none',
            //borderColor:'black',
            //borderWidth:2,
            backgroundColor:'transparent',
            fontSize: 17,
            fontWeight:'700',
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 2,
            // flex:1,
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
            textAlign:'center'
          }
        } href="/login/facebook">
          <TouchableOpacity style={styles.touch}>
    
          <Text id="linkLoginFacebook" 
          style={{
            // color:'black', 
            textDecorationLine:'none',
            color:'white',
            fontSize: 17,
            fontWeight:'700',
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 2,
            // flex:1,
            textAlign:'center',
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
          }}
          >Facebook Login</Text>
          {/* <i class="fa fa-facebook" aria-hidden="true"
          style={{
            height:33,
              color:'white',
              display:'block',
              margin:3,
              textShadowColor: 'rgba(0, 0, 0, 1)',
              textShadowOffset: {width: 0, height: 0},
              textShadowRadius: 3,
              shadowColor:'#000',
              shadowOpacity:0.25,
              shadowRadius:2,
              shadowOffset:{
              width:0,
              height:0
              },
              elevation:2
          }}></i> */}
          </TouchableOpacity>
        </a><br/>
        </View>
        </View>
        );
        }
    }



const styles = StyleSheet.create({

    box:{
        margin:0,
        //padding:1,
        height:50,
        backgroundColor:'transparent',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        // flex:1,
        //fontSize:12,
        //borderColor:'black',
        //borderRadius:2,
        //fontWeight:'700',
        //color:'black',
        // textShadowColor: 'rgba(1, 1, 1, 1)',
        // textShadowOffset: {width: 0, height: 0},
        // textShadowRadius: 20,
        //borderColor:'#cfcfcf',
        //borderWidth:1,
      },
      touch:{
        margin:0,
        //padding:1,
        //fontWeight:700,
        height:22,
        backgroundColor:'transparent',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        // flex:1
      },
      link:{
        fontWeight:'700',
        color:'black', 
        textDecorationLine:'none',
        //borderColor:'black',
        //borderWidth:1 
      }
});
export default Login;
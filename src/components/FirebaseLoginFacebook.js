import React,{Component,useContext,useState,useEffect,memo,useRef} from 'react'
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import {SafeAreaView,KeyboardAvoidingView,Text,View,StyleSheet,Dimensions,TouchableOpacity,Linking} from 'react-native'
import {Context} from '../context'
// const firebaseApp=firebase.initializeApp({
//     apiKey:'AIzaSyA9VVBgegATYGan6PGuvCjsuG0JL2OIX14',
//     authDomain:'assistant-569a2.firebaseapp.com',
//     databaseURL:'https://assistant-569a2.firebaseio.com',
//     projectId:'assistant-569a2',
//     storageBucket:'assistant-569a2.appspot.com',
//     messagingSenderId:'404719977912',

// })
var provider = new firebase.auth.FacebookAuthProvider()
//provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
firebase.auth().languageCode = 'eng';
// console.log("beyond insanity provider", provider )
// provider.setCustomParameters({
//   'login_hint': 'user@example.com'
// });
// const popup = ()=>{firebase.auth().signInWithRedirect(provider) 
// firebase.auth().getRedirectResult().then(function(result){
//   if (result.credential) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // ...
//   }
//   // The signed-in user info.
//   var user = result.user;
//   console.log('firebase Login user info',user)
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });}


// firebase.auth().getRedirectResult().then(function(result) {
//   if (result.credential) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // ...
//   }
//   // The signed-in user info.
//   var user = result.user;
//   console.log('firebase Login user info',user)
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });

const FirebaseLoginFacebook=() =>{
  const [state,setState]=useContext(Context)
  const popup =()=> {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log('firebase Login user info',user)
      setState({...state,userData:user})
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
    //firebase.auth().signInWithRedirect(provider);
  
  
  }
  return (
    // <View>
      
      
    //   <button onClick={popup}>google popup</button>
    // </View>

<View style={styles.box}>

  <TouchableOpacity style={styles.touch}
    onPress={popup}
  >
  
  <Text id="linkLoginGoogle" 
  style={{
    // color:'black', 
    textDecorationLine:'none',
    color:'white',
    fontSize: 30,
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
  ><i class="fab fa-facebook"></i>
  </Text>
  <Text
    selectable={false} 
    style ={{
        fontSize: 25,
        fontWeight:'700',
        textDecorationLine:'none',
        color:'white',
        
        textShadowColor: 'rgba(0, 0, 0, 0.85)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 2,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        margin:11,
        pointerEvents:'none'
    }}
  >
    Facebook
  </Text>
  </TouchableOpacity>
<br/>
</View>
)}

// const firebaseAppAuth = firebaseApp.auth()

// const providers ={
//     googleProvider: firebase.auth.GoogleAuthProvider_Instance,
// }
//providers.googleProvider.setCustomParameters({hd:'squwbs website'})
// export default withFirebaseAuth({
//     providers,
//     firebaseAppAuth,
// })(firebaseLogin)
const styles = StyleSheet.create({
  
  box:{
    margin:0,
    padding:0,
    height:45,
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
    // borderColor:'#cfcfcf',
    // borderWidth:1,
  },
  link:{
    textDecorationLine:'none',
    margin:0,
    padding:0,
    backgroundColor:'transparent',
    fontSize: 17,
    fontWeight:'700',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 2,
    height:45,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    textAlign:'center'
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
      
})
export default FirebaseLoginFacebook

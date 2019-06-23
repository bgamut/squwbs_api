import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context";
import {TextInput,View,TouchableOpacity,Dimensions,Text} from "react-native"

const AddPost = () => {
const [state, setState] = useContext(Context);
const[userInput,setUserInput,Refs] = useState("")
//const [userInput, setUserInput] = useState("");
//const [trackTitle, setTrackTitle] = useState("");
//const [posts] =useState("")

// useEffect(() => {
// //     axios
// //       .get(
// //         `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${
// //           process.env.REACT_APP_MM_KEY
// //         }`
// //       )
// //       .then(res => {
// //         let track_list = res.data.message.body.track_list;
// //         setState({ track_list: track_list, heading: "Search Results" });
// //       })
// //       .catch(err => console.log(err));
// //   }, [trackTitle]
// // this.refs.addPost.value=""
//     },[state.posts]
// );
   
    // window.addEventListener("resize", updateDimensions);
    // window.addEventListener("orientationchange",updateDimensions);
    const addTodo = (e) => {
    //e.preventDefault();
    //setTrackTitle(userInput);
    if(state.text==""){
        //console.log('stop')
    }
    else{
        alert(state.text)
        setState({...state,posts:[...state.posts,state.text],text:""})
    }
    //console.log(state)
    //console.log(Refs)
    //document.getElementById('addPost').value=''
    
  };


  const onChange = (e) => {
    //e.preventDefault()
    //setUserInput(e.target.value)
    //console.log()
    
    setState({...state,userInput:e.target.value})
    //console.log(e.nativeEvent.inputType)
    
        if(e.nativeEvent.inputType=='insertLineBreak'){
            addTodo()
            //console.log('we should be here')
            //setState({...state,posts:[...state.posts,state.text],text:""})
        }
        else if(e.nativeEvent.inputType=='insertText'){
            
            setState({...state,text:e.target.value})
        }
    

    
  };

  return (
    // eslint-disable-next-line no-use-before-define
    <View style={{
      marginTop:1,
      borderColor:'transparent',
      borderWidth:1,
      flexDirection:'row',
      flex:1,
      // width:Dimensions.get('window').width,
    }}>
      {/* <form onSubmit={addTodo}  style={{
              margin:1,
              borderColor:'#cfcfcf',
              borderWidth:1,
              alignItems:'center',
              flexDirection:'column',
              flex:1,
              
              // shadowColor: 'rgba(1, 1, 1, 1)',
              // shadowOffset: {width: 0, height: 0},
              // shadowRadius: 1,
              color:'black',
              // textShadowColor: 'rgba(1, 1, 1, 1)',
              // textShadowOffset: {width: 0, height: 0},
              // textShadowRadius: 5
            }}> */}
        
          {/* <input
            id="addPost"
            type="text"
            className="form-control form-control-lg"
            placeholder="type todo..."
            name="userInput"
            value={state.text}
            onChange={onChange}
          /> */}
        <TextInput 
            className='inputText'
            editable = {true}
            autoCorrect={false}
            blurOnSubmit={false}
            maxLength = {40}
            multiline = {false}
            numberOfLines = {1}
            caretHidden={true}
            //onChangeText={(text) => setState({...state,text:text})}
            onChangeText={(text)=>{ 
              setState({...state,text:text})
              //console.log(text)
            }}
            keyboardType={'default'}
            value={state.text}
            onChange={onChange}
            onSubmitEditing={addTodo}
            //onClick={console.log('clicked')}
            returnKeyType='search'
            clearButtonMode="while-editing"
            autoFocus
            //onFocus={()=>{console.log('on focus')}}
            theme={{ colors: { placeholder: 'white', text: 'white', primary: 'white', 
  underlineColor: 'transparent', background: '#003489' } }}
            style={{
              marginLeft:1,
              paddingLeft:3,
              borderColor:'#cfcfcf',
              borderWidth:1,
              alignItems:'center',
              flexDirection:'row',
              flex:1,

              //outline:'none',
              width:Dimensions.get('window').width-26,
              // shadowColor: 'rgba(1, 1, 1, 1)',
              // shadowOffset: {width: 0, height: 0},
              // shadowRadius: 1,
              color:'black',
              // paddingBottom:2,
              height:22,
              // textShadowColor: 'rgba(1, 1, 1, 1)',
              // textShadowOffset: {width: 0, height: 0},
              // textShadowRadius: 5
              
            }}
          />
        
        {/* <button className="button" type="submit">
          add
        </button> */}
        <TouchableOpacity 
           
            type="submit" 
            style={{
                height:22,
                width:22,
                backgroundColor:'#ffffff',
                
                alignItems:'center',
                justifyContent:'center',
                marginLeft:2,
                marginRight:1,
                borderColor:'#cfcfcf',
                borderWidth:1,
                paddingLeft:2,
                paddingRight:2,
                //flex:1,
                //shadowColor: 'rgba(1, 1, 1, 1)',
                //shadowOffset: {width: 0, height: 0},
                //shadowRadius: 20
                }}
            onPress={addTodo}>
          <Text style={{
              color:'black',
              fontSize:12,
              paddingBottom:2,
              //textShadowColor: 'rgba(1, 1, 1, 1)',
              //textShadowOffset: {width: 0, height: 0},
              //textShadowRadius: 20,
            }}>
                +
            </Text>
        </TouchableOpacity>
      {/* </form> */}
    </View>
  );
};

export default AddPost;
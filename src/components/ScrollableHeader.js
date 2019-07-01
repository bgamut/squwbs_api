import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context";
import {TextInput,View,TouchableOpacity,List,ListItem,FlatList,ScrollView,Animated,Dimensions,Text} from "react-native"
import Posts from './Posts'
import AddPost from './AddPost'
import Post from './Post'
const ScrollableHeader = () => {
const [state, setState] = useContext(Context);
const [userInput,setUserInput,Refs] = useState("")

    // const addTodo = () => {
    //     if(state.text==""){
    //         //console.log('stop')
    //     }
    //     else{
    //         setState({...state,posts:[...state.posts,state.text],text:""})
    //     }
    // };

    // const onChange = (e) => {

        
    //     if(e.nativeEvent.inputType=='insertLineBreak'){
    //         addTodo()
    //     }
    //     else if(e.nativeEvent.inputType=='insertText'){
            
    //         setState({...state,text:e.target.value})
    //     }  
    // };
  
  const handleScroll=(e)=>{
    console.log(String(22-e.nativeEvent.contentOffset.y)+'px')
    
    //document.getElementById('what').style.height=String(22-e.nativeEvent.contentOffset.y)+'px'
    // if (e.nativeEvent.contentOffset.y>=0){
    //   if(e.nativeEvent.contentOffset.y<=22){
    //     document.getElementById('title').style.height=String(22-e.nativeEvent.contentOffset.y)+'px'
    //     //setState({...state,yscroll:Animated.Value(22-e.nativeEvent.contentOffset.y)})
    //   }
    //   else{

    //   }
    // }
    // else{
    //   //setState({...state,yscroll:Animated.Value(0)})
    // }
    
    

  }
  return (
   
        <ScrollView 
          onScroll={handleScroll}
          scrollEventThrottle={0.1}
          setVerticalScrollBarEnabled={false}
          setHorizontalScrollBarEnabled={false}
          //onScrollBeginDrag={console.log('began')}
          //onScrollEndDrag={console.log('ended')}
          //onMomentumScrollBegin={console.log('momentum started')}
          //onMomentumScrollEnd={console.log('momentum end')}
          style={{
            //height:Dimensions.get('window').height*2,
            backgroundColor:'transparent'
          }}
        >
            
            <Posts/>
        </ScrollView>
      
  );
};

export default ScrollableHeader;
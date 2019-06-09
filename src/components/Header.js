import React,{useContext, useEffect,memo} from 'react';
import {SafeAreaView, View, Text, StyleSheet,Animated} from 'react-native';
//import '../css/header.css'
import {WholeContext} from "../WholeContext"

var header_max_height = 50
var header_min_height = 22
var profile_max_height = 80
var profile_min_height = 13

class Header extends React.PureComponent {
    static contextType = WholeContext;
  
    state = {
      title: this.props.title
    };
    componentDidMount(){
        const { obj, dispatch } = this.context;
        const { title } = this.state;
        dispatch({ type: "SET_TITLE", title })
    }
    render(){
        const { title } = this.state;
        //const { obj, dispatch } = this.context;
        return(
            <Animated.View id='titleBar' style={styles.headerContainer}>        
                <Text 
                    accessibilityRole="heading" 
                    id='title' 
                    style={styles.title} 
                >
                    {title}
                </Text>
            </Animated.View>
        )
    }
    
};

const styles = StyleSheet.create({
    headerContainer: {
    backgroundColor:'#333333',
    width:'100vw',
    height:header_max_height,
    flex:1
    },
    title: {
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white'
    },
});

export default memo(Header)

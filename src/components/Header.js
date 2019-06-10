import React,{useContext, useEffect,memo} from 'react';
import {SafeAreaView, View, Text, StyleSheet,Animated,Dimensions} from 'react-native';
//import '../css/header.css'
import {WholeContext} from "../WholeContext"

var header_max_height = 50
var header_min_height = 22
var profile_max_height = 80
var profile_min_height = 13

class Header extends React.PureComponent {
    static contextType = WholeContext;
  
    state = {
      title: this.props.title,
      width:0
    };
    updateDimensions =(e) =>{
        this.setState(
            {
                width: Math.floor(
                    Dimensions.get('window').width
                )
            }
        )
    }
    componentDidMount(){
        const { obj, dispatch } = this.context;
        const { title } = this.state;
        dispatch({ type: "SET_TITLE", title })
        window.addEventListener("resize", this.updateDimensions);
        window.addEventListener("orientationchange",this.updateDimensions);
    }
    componentWillMount=()=>{
        //this.setState({ screenHeight: Dimensions.get('window').height});
        //console.log('componenet updated' +this.state.screenHeight)
        this.updateDimensions();
    }
    componentWillUnmount=()=>{
        window.removeEventListener("resize", this.updateDimensions);
        window.removeEventListener("orientationchange",this.updateDimensions);
    }
    render(){
        const { title } = this.state;
        //const { obj, dispatch } = this.context;
        return(
        <View accessibilityRole="heading" style={styles.headerContainer}>
            <div id='titleBar'>        
                <div 
                    id='title' 
                >
                    {title}
                </div>
            </div>
            <style>{`
                #titleBar{
                
                    background-color:#333333;
                    width:100vw;
                    height:22px;
                    -webkit-app-region:drag;
                }
                #title{

                    font-size:19px;
                    text-align: center;
                    color:rgb(256, 256, 256);
                    width:100vw;
                    height:50px;
                    
                    -webkit-app-region:drag;
                    -moz-user-select: -moz-none;
                    -khtml-user-select: none;
                    -webkit-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
            `}
            </style>
        </View>
        )
    }
    
};

const styles = StyleSheet.create({
    headerContainer: {
    backgroundColor:'#333333',
    width:'100vw',
    height:header_max_height,
    display:'flex',
//    textAlign:'center',
    alignItems:'center',
    justifyContent:'center'

    },
    // title: {
    // fontSize: 19,
    // fontWeight: '600',
    // textAlign: 'center',
    // color: 'white'
    // },
});

export default memo(Header)

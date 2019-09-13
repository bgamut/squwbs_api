import React, {Component,useContext,useEffect,useState,useRef} from 'react'
import {View, Text, StyleSheet, TouchableOpacity , Image, Platform, Animated,Dimensions,Easing,ScrollView} from 'react-native'
import NavBar from './NavBar'
import {Context} from '../context'
import './css/Drawer.css'
var {name} =require( '../../package.json')

const SLIDING_DRAWER_WIDTH =300;
const maxHeight=50
const imageLength=30
let currentHeight=maxHeight

const Drawer =(props)=>{

    const [state,setState]=useContext(Context)
    const [height,setHeight]=useState(0)
    const scroller=useRef('')
    const drawerInterp =state.drawerAnimation.interpolate(
        {
            inputRange:[0,1],
            outputRange:[-SLIDING_DRAWER_WIDTH,0]
        }
    )
    let translateYInterp = state.yscroll.interpolate(
        {
            inputRange:[-100,-51,-50,0,50,51,100],
            outputRange:[100,-50,-50,0,50,50,50]
        }
    )
    const ShowSlidingDrawer = ()=>
    {
        if(state.drawerToggle==true)
        {
            Animated.timing(
                //this.Animation,
                state.drawerAnimation,
                {
                    duration:500,
                    toValue:1,
                }
            ).start(()=>
            {
                setState({...state,drawerToggle:false})
                
            })
        }
        else
        {
            Animated.timing(
                state.drawerAnimation,
                {
                    duration:500,
                    toValue:0, 
                }
            ).start(()=>
            {
                setState({...state,drawerToggle:true})
            })
        }
    }
    const updateDimensions=()=>{
        setHeight(Dimensions.get('window').height)
        //style.height=Math.floor(Dimensions.get('window').height)
        //console.log(this.state)
        console.log(Dimensions.get('window').height)
        //scroller.current.props.style.height=Dimensions.get('window').height-150
    }
    useEffect(()=>{
        //console.log(state.translateY._parent)
        //setHeight(Math.floor(Dimensions.get('window').height)-maxHeight)
        Animated.timing(state.spinValue,
            {
                toValue:360,
                duration:3000,
                easing:Easing.linear
            }).start()
        //window.addEventListener("resize", updateDimensions);
        Dimensions.addEventListener('change',(e)=>{
            updateDimensions()
        })
        updateDimensions()
    },[])
    // const spin = state.spinValue.interpolate({
    //     inputRange:[0,1],
    //     ouputRange:['0deg','360deg']
    // })
    if(state.userData!==undefined && state.userData.provider!==undefined){
        return(
            <Animated.View style={{            
                height:height-50,
                // width:Dimensions.get('window').width,
                width:"100vw",
                backgroundColor:'red',
               
            }}>
                <View style={{
                    //backgroundColor:'yellow',
                    // borderColor:'transparent',
                    borderColor:'transparent',
                    borderRadius:2,
                    borderWidth:1,
                    height:maxHeight,
                    justifyContent:'center',
                    marginBottom :2,
                    backgroundColor:'transparent'
                    //opacity:state.opacity
                }}>  
                    <View style={{
                        alignItems:'center',
                        padding:0,
                        height:maxHeight,
                        position:'absolute',
                        width:maxHeight,
                        // flex:1,
                        justifyContent:'center',
                        zIndex:'97',
                        backgroundColor:'white'
                    }}>
                        <TouchableOpacity 
                            onPress = {ShowSlidingDrawer}
                            style={{
                                backgroundColor:'transparent',
                                zIndex:'99',
                            }}>
                            {/* <Image source={require('./icons/96x96.png')} style={{
                                Top:(maxHeight-imageLength)/2,
                                position:'absolue',
                                height:imageLength,
                                resizeMode:'contain',
                                width:imageLength,
                                zIndex:'98'
                                //Right:0
                            }}/> */}
                            <div style={{height:imageLength/3-4,width:imageLength,margin:2,backgroundColor: 'black',}}></div>
                            <div style={{height:imageLength/3-4,width:imageLength,margin:2,backgroundColor: 'black',}}></div>
                            <div style={{height:imageLength/3-4,width:imageLength,margin:2,backgroundColor: 'black',}}></div>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        alignItems:'center',
                        zIndex:0,
                    }}>
                        {/* <Text selectable={false} style ={[styles.textStyle,{fontFamily:'alienEncounters'}]} >
                            {name}
                        </Text> */}
                        <Image href = "/#slider"source={require('./icons/96x96.png')} style={{
                            // Top:(maxHeight-imageLength)/2,
                            // position:'absolue',
                            height:25,
                            resizeMode:'contain',
                            width:25,
                            justifyContent:'center',
                            alignItems:'center',
                            marginRight:5,
                            marginBottom:2
                            //Right:0
                        }}/>
                    </View> 
                </View> 
                {props.children}
                <Animated.View style={[styles.ROOT_SLIDING_DRAWER_CONTAINER, {
                    transform:[{
                        translateX:drawerInterp
                    },{
                        translateY:maxHeight+2
                    }]
                    },
                    // {height:Dimensions.get('window').height*9/30-maxHeight}
                    {height:height*9/30-maxHeight}
                ]}>
                    <View style = {[styles.MAIN_SLIDING_DRAWER_CONTAINER,{height:50}]}>
                    <ScrollView
                        ref={scroller}
                        style={{backgroundColor:'transparent',zIndex:98}}
                        onScroll={(e)=>{
                            // onScroll(e)
                        }
                        }
                        scrollEnabled={true}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={true}
                    >
                        <NavBar/>
                    </ScrollView>
                    </View>
                </Animated.View> 
            </Animated.View>    
        ) 
    }
    else{
        return(
            <Animated.View style={{            
                height:150,
                // width:Dimensions.get('window').width,
                width:"100vw",
                backgroundColor:'transparent',
               
            }}>
                <View style={{
                    backgroundColor:'#ffffff',
                    //borderColor:'#cfcfcf',
                    borderColor:'transparent',
                    borderRadius:2,
                    borderWidth:1,
                    height:maxHeight,
                    justifyContent:'center',
                    marginBottom :0,
                    //opacity:state.opacity
                    // backgroundColor:'orange'
                }}>  
                    <Animated.View style={{
                        alignItems:'center',
                        padding:0,
                        height:maxHeight,
                        position:'absolute',
                        width:maxHeight,
                        // flex:1,
                        justifyContent:'center',
                        zIndex:'99',
                        
                    }}>
                        <TouchableOpacity 
                            onPress = {ShowSlidingDrawer}
                            style={{
                                backgroundColor:'transparent',
                            }}>
                            {/* <Image source={require('./icons/96x96.png')} style={{
                                Top:(maxHeight-imageLength)/2,
                                position:'absolue',
                                height:imageLength,
                                resizeMode:'contain',
                                width:imageLength,
                                //Right:0
                            }}/> */}
                            <div style={{height:imageLength/3-4,width:imageLength,margin:2,backgroundColor: 'rgb(211,211,211)',}}></div>
                            <div style={{height:imageLength/3-4,width:imageLength,margin:2,backgroundColor: 'rgb(211,211,211)',}}></div>
                            <div style={{height:imageLength/3-4,width:imageLength,margin:2,backgroundColor: 'rgb(211,211,211)',}}></div>
                        </TouchableOpacity>
                    </Animated.View>
                    <View style={{
                        alignItems:'center',
                        zIndex:0,
                        
                    }}>
                        {/* <Text selectable = {false} style ={[styles.textStyle,{fontFamily:'alienEncounters'}]} >
                            {name}
                        </Text> */}
                        <a  href = "/#slider" >
                         <Image 
                           
                            source={require('./icons/96x96.png')} style={{
                            // Top:(maxHeight-imageLength)/2,
                            // position:'absolue',
                            height:35,
                            resizeMode:'contain',
                            width:35,
                            justifyContent:'center',
                            alignItems:'center',
                            marginRight:5,
                            marginbottom:2
                            //Right:0
                        }}/>
                        </a>
                    </View> 
                </View> 
                {props.children}
                <Animated.View style={[styles.ROOT_SLIDING_DRAWER_CONTAINER, {
                    transform:[{
                        translateX:drawerInterp
                    },{
                        translateY:maxHeight
                    }]
                    },
                    {
                    // height:300,
                    height:height-50,
                    width:SLIDING_DRAWER_WIDTH,
                    //backgroundColor:'white',
                    backgroundColor:'white',
                    borderColor:'rgb(200,200,200)',
                    justifyContent:'center',

                    padding:0,
                    // borderColor:'transparent',
                    borderRadius:4,
                    borderWidth:1,}]}>
                    <View style = {[
                        styles.MAIN_SLIDING_DRAWER_CONTAINER,
                        {
                            height:50,
                            alignItems:'center',
                            padding:0,
                            paddingTop:3,
                            margin:0,
                            marginRight:2,
                            marginLeft:2,
                            backgroundColor:'rgb(211,211,211)',
                            //backgroundColor:'purple',
                            //borderColor:"rgb(211,211,211)",
                            borderColor:'rgb(200,200,200)',
                            
                            borderRadius:2,
                            borderWidth:1,
                            width:298,
                        }]
                    }>
                        <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center',
                            marginBottom:6,
                            paddingTop:8,
                            paddingBottom:8,
                            paddingRight:25,
                            paddingLeft:25,
                            backgroundColor:'transparent',
                            zIndex:0,
                            
                            
                        }}>
                            {/* <Image source={require('./icons/96x96.png')} style={{
                                    // Top:(maxHeight-imageLength)/2,
                                    // position:'absolue',
                                    height:25,
                                    resizeMode:'contain',
                                    width:25,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    marginRight:5,
                                    marginbottom:2
                                    //Right:0
                                }}/> */}
                            <a  style ={{textDecorationLine:'none'}}
                            
                            href = "/#slider" >
                                <Text selectable={false} style ={styles.textStyle}>
                                    {/* Welcome to  */}
                                    <Text style={{fontFamily:'alienEncounters', fontSize:15}}> Squwbs</Text>
                                </Text>
                            </a>
                        </View>
                        <View
                            style={{
                                backgroundColor:'trarensparent',
                                width:'100%',
                                borderColor:'transparent',
                                borderRadius:2,
                                borderWidth:1,
                               // height:height,
                            }}
                        >
                            <ScrollView
                                ref={scroller}
                                scrollIndicatorInsets={300,300,300,300}
                                indicatorStyle='white'
                                style={{
                                    backgroundColor:'transparent',
                                    zIndex:98,
                                    height:height-150,
                                }}
                                onScroll={(e)=>{
                                    // onScroll(e)
                                }
                                }
                                scrollEnabled={true}
                                scrollEventThrottle={16}
                                showsVerticalScrollIndicator={false}
                            >
                            <NavBar/>
                            </ScrollView>
                        </View>
                    <View
                    style={{
                        position:'absolute',
                        top:height-maxHeight-53,
                        backgroundColor:'rgb(211,211,211)',
                        //backgroundColor:'purple',
                        width:298,
                        height:maxHeight,
                        marginTop:0,
                        marginBottom:0,
                        marginLeft:0,
                        marginRight:0,
                        
                        borderRadius:2,
                        borderWidth:1,
                        
                        //backgroundColor:'purple',
                        //borderColor:"rgb(211,211,211)",
                        borderColor:'rgb(200,200,200)',
                        //borderColor:'transparent',
                        
                        borderRadius:2,
                        borderWidth:1,
                        paddingBottom:0,
                        height:maxHeight,
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                    >
                       <Text
                        style ={[
                            styles.textStyle,
                            {
                                fontSize:14,

                            }
                        ]}
                       >
                           2019
                        </Text>
                    </View>
                    </View>
                    
                </Animated.View> 
            </Animated.View>  
        )
    }
  
     
} 
export default Drawer
const styles=StyleSheet.create(
    {
        MAIN_SLIDING_DRAWER_CONTAINER:{
            backgroundColor:'#cfcfcf',
            borderColor:"transparent",
            borderRadius:2,
            borderWidth:1,
            // flex:1,
            paddingHorizontal:0,
            zIndex:1,
            padding:5,
        },
        MainContainer:
        {
            top:0
        },
        ROOT_SLIDING_DRAWER_CONTAINER:
        {
            bottom:0,
            flexDirection:'row',
            left:0,
            position:'absolute',
            top:(Platform.OS==='ios')? 20:0,
            width:SLIDING_DRAWER_WIDTH,
            zIndex:99,
            backgroundColor:'red'
        },
        textStyle:{
            color:'white',
            
            fontWeight:700,
            fontSize: 19,
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 4,
        },
    }
)

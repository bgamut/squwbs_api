import React, {Component,useContext,useEffect,useState,useRef} from 'react'
import {View, Text, StyleSheet, TouchableOpacity , Image, Platform, Animated,Dimensions,Easing,ScrollView} from 'react-native'
import NavBarWithLogIn from './NavBarWithLogIn'
import NavBar from './NavBar'
import {Context} from '../context'
import './css/Drawer.css'
import importScripts from 'import-scripts'
var {name} =require( '../../package.json')
const withQuery = require('with-query').default
var diff = require('object-diff')
const _ = require('lodash')
const stringifyObject= require('stringify-object')
//importScripts('https://cdn.jsdelivr.net/npm/stringify-object@3.3.0/index.min.js')

const SLIDING_DRAWER_WIDTH =250;
const maxHeight=50
const imageLength=30
let currentHeight=maxHeight

const Drawer =(props)=>{

    const [state,setState]=useContext(Context)
    const [user,setUser]=useState({})
    const [userName,setUserName]=useState('')
    const [userPhotoLink,setUserPhotoLink]=useState('')
    const [height,setHeight]=useState(0)
    // const [overlaySwitch,setOverlaySwitch]=useState(true)
    const scroller=useRef('')
    // const overlay=useRef('')
    const yScroll = new Animated.Value(0)
    var currentY=0
    var prevY=0
    var buffer=[0,0]
    
    const getUserData=async(itemList)=>{
        const responded= await fetch('https://squwbs.herokuapp.com/readCookies',{mode:'cors'})
        const userCookie = await responded.json()
        //console.log('userCookie : '+stringifyObject(userCookie))
        if(Object.keys(userCookie).length>1){
        console.log('user info sent to server')
        // fetch(withQuery('https://squwbs.herokuapp.com/user', {
        //     ...userCookie,
        //     mode:'cors'
        // }))
        // .then(result=>{
        //     console.log('got result from user fetch')
        //     return result.json()
        //     })
        //     .then((json)=>{
        //     //setState({...state,userData:{...json}})
            
        //     console.log(stringifyObject(json))
        //     setUser(json)
        //     })
        //     .catch((err)=>{
        //     console.error(err)
        //     })
        
        // }
        setUserPhotoLink(userCookie.photo)
        console.log(stringifyObject(
            {
                ...userCookie,
                itemList:itemList,
                mode:'cors',
            }
        ))
        fetch(withQuery('https://squwbs.herokuapp.com/info', {
        //fetch(withQuery('https://squwbs.herokuapp.com/getpaypalsandboxid', {
            ...userCookie,
            //itemList:[{kind:'beat',itemID:'00'},{kind:'plugin',itemID:'00'}],
            itemList:itemList,
            mode:'cors',
        }))
            .then(result=>{
            console.log('got result from info')
            return result.json()
            })
            .then((json)=>{
                //setState({...state,userData:{...json}})
                setUser(json)
                console.log(stringifyObject(json))
            //setpaypalID(json)
            //return json
            
            })
            .catch((err)=>{
                console.error(err)
            })
        }
        
    }
    const onScroll=(e)=>{
    
        //console.log(e.nativeEvent.contentOffset.y)
        currentY=(e.nativeEvent.contentOffset.y)
        
        //
        //console.log(currentY-prevY)
        buffer=buffer.splice(-1)
        buffer.push(currentY-prevY)
        var average=0
        for (var i=0; i<buffer.length; i++){
          average+=buffer[i]
        }
        //console.log('average : '+average)
        if(average<0){
          Animated.spring(yScroll,
            {
              toValue: 50,
              overshootClamping:true,
              stiffness:1000
             //speed:12,
            
             }
          ).start()
        }
        else{
          Animated.spring(yScroll,
            {
              toValue: 0,
              overshootClamping:true,
              stiffness:1000
             //speed:12,
            
             }
          ).start()
        }
    
        let translateYInterp = yScroll.interpolate(
          {
              inputRange:[0,50,51,100],
              outputRange:[0,50,50,50]
          }
        )
        setState({...state,translateY:translateYInterp})
        //setState({...state,yscroll:yScroll})
        prevY=currentY
        
      }
    const drawerInterp =state.drawerAnimation.interpolate(
        {
            inputRange:[0,1],
            outputRange:[-SLIDING_DRAWER_WIDTH,0]
        }
    )
    // let translateYInterp = state.yscroll.interpolate(
    //     {
    //         inputRange:[-100,-51,-50,0,50,51,100],
    //         outputRange:[100,-50,-50,0,50,50,50]
    //     }
    // )
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
    const delayedSlidingDrawer=()=>{
        setTimeout(ShowSlidingDrawer,270)
    }
    const updateDimensions=()=>{
        setHeight(Dimensions.get('window').height)
        //style.height=Math.floor(Dimensions.get('window').height)
        //console.log(this.state)
        //console.log(Dimensions.get('window').height)
        //scroller.current.props.style.height=Dimensions.get('window').height-150
    }

    const popLogin = () =>{
        props.popLogin()
        //console.log('coming to you live from the DRAWER!!')
    }
    
    const loginAndCloseDrawer=()=>{
        popLogin()
        setTimeout(ShowSlidingDrawer(),720)
        
    }
    
    // const overlayToggle=()=>{
    //     console.log(overlay.current.props.style.zIndex)
    //     if(overlay.current.props.style.zIndex==100){
    //         overlay.current.props.style.zIndex=1
    //         overlay.current.props.style.display='none'
    //         setOverlaySwitch(false)
    //         console.log('block to none')
    //     }
    //     else{
    //         overlay.current.props.style.zIndex=100
    //         overlay.current.props.style.display='block'
    //         setOverlaySwitch(true)
    //         console.log('none to block')
    //     }
        
    // }
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
        yScroll.addListener(({value})=>{
            //console.log(state.yscroll)
            //global.headerHeight=value
            //console.log(value)
        })
        updateDimensions()
    },[])
    useEffect(()=>{
        //console.log(state)
    }
    ,[state])
    // const spin = state.spinValue.interpolate({
    //     inputRange:[0,1],
    //     ouputRange:['0deg','360deg']
    // })
    

    useEffect(()=>{
        getUserData([{kind:'service',id:'00'}])
    },[])

    useEffect(()=>{
        //console.log(stringifyObject(user)=='{}')
        //console.log(stringifyObject(user))
        if(stringifyObject(user)!=='{}'){ 
            if(user.provider!=undefined){
                console.log(user.provider)
                for (var i =0; i<Object.keys(user.provider).length; i++){
                    console.log(user.names[Object.keys(user.provider)[i]])
                    if(user.names[Object.keys(user.provider)[i]]!==''&&user.names[Object.keys(user.provider)[i]]!=='undefined'){
                        setUserName(user.names[Object.keys(user.provider)[i]])
                        break
                    }
                }
            }
        }

    },[user])
    useEffect(()=>{
     //console.log(userName)
    },[userName])

    if(stringifyObject(user)!=='{}'){
        return(
            <Animated.View style={{            
                height:150,
                // width:Dimensions.get('window').width,
                width:"100vw",
                backgroundColor:'transparent',
                zIndex:99,
                // transform:[{
                //     translateX:0
                // },{
                //     translateY:-50+state.yscroll
                // }]
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
                        zIndex:99,
                        
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
                        userSelect:'none'
                    }}
                    //pointerEvents='none'
                    
                    >
                        {/* <Text selectable = {false} style ={[styles.textStyle,{fontFamily:'alienEncounters'}]} >
                            {name}
                        </Text> */}
                        <a  href = "/#slider"
                            style={{
                                textDecorationLine:'none'
                            }}
                        >
                         {/* <Image 
                           
                            source={require('./icons/96x96.png')} style={{
                            // Top:(maxHeight-imageLength)/2,
                            // position:'absolue',
                            height:35,
                            resizeMode:'contain',
                            width:35,
                            justifyContent:'center',
                            alignItems:'center',
                            marginRight:5,
                            marginBottom:2
                            //Right:0
                        }}/> */}
                            <Text
                                style ={[
                                    styles.textStyle,
                                    {
                                        fontSize:16,
                                        textDecorationLine:'none'
                                    }
                                ]}
                            >
                                {userName}
                            </Text>
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
                            //width:298,
                            width:SLIDING_DRAWER_WIDTH-2,
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
                            <a style ={{textDecorationLine:'none'}}
                            
                            href = "/#slider" >
                                <TouchableOpacity
                                    onPress={delayedSlidingDrawer}
                                >
                                <Text selectable={false} style ={styles.textStyle}>
                                    {/* Welcome */}
                                    {/* <Text style={{fontFamily:'alienEncounters', fontSize:15}}> {userName}</Text> */}
                                    <Text style={{fontFamily:'alienEncounters', fontSize:15}}> Squwbs</Text>
                                </Text>
                                </TouchableOpacity>
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
                            <NavBar ShowSlidingDrawer={delayedSlidingDrawer}/>
                            </ScrollView>
                        </View>
                    <View
                    style={{
                        position:'absolute',
                        top:height-maxHeight-53,
                        backgroundColor:'rgb(211,211,211)',
                        //backgroundColor:'purple',
                        //width:298,
                        width:SLIDING_DRAWER_WIDTH-2,
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
                       {/* <Text
                        style ={[
                            styles.textStyle,
                            {
                                fontSize:14,

                            }
                        ]}
                       >
                           2019
                        </Text> */}
                        <a style={
                        {
                            textDecorationLine:'none',
                
                            backgroundColor:'transparent',
                            fontSize: 17,
                            fontWeight:'700',
                            textShadowColor: 'rgba(0, 0, 0, 0.5)',
                            textShadowOffset: {width: 0, height: 0},
                            textShadowRadius: 2,

                            alignItems:'center',
                            justifyContent:'center',
                            flexDirection:'row',
                            textAlign:'center'
                        }
                        } href="/removeme">
                        <TouchableOpacity style={styles.touch}>
                        
                        <Text id="Contact" 
                        style={{

                            textDecorationLine:'none',
                            color:'white',
                            fontWeight:'700',
                            fontSize: 17,
                            textShadowColor: 'rgba(0, 0, 0, 0.5)',
                            textShadowOffset: {width: 0, height: 0},
                            textShadowRadius: 2,
                            textAlign:'center',
                            alignItems:'center',
                            justifyContent:'center',
                            flexDirection:'row',
                        }}
                        >Remove My Profile</Text>
                        </TouchableOpacity>
                        </a>
                    </View>
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
                // transform:[{
                //     translateX:0
                // },{
                //     translateY:-50+state.yscroll
                // }]
            }}>
                {/* {overlaySwitch && 
                    <View
                    ref={overlay}
                    style={{
                        position:'fixed',
                        height:'100vh',
                        width:'100vw',
                        top:0,
                        left:0,
                        backgroundColor:'rgba(0,0,0,0.4)',
                        justifyContent:'center',
                        alignItems:'center',
                        zIndex:100,
                        //display:'block',
                    }}
                  >
                    
                    <View
                    style={{
                        
                        height:'50vh',
                        width:'50vw',
                        //opacity:0.4,
                        //backgroundColor:'orange',
                        backgroundColor:'transparent',
                        //backgroundImage:'',
                        justifyContent:'center',
                        alignItems:'center',
                        textAlign:'center'
                    }}>
                        <TouchableOpacity
                        style={{
                            position:'fixed',
                            height:25,
                            width:25,
                            top:15,
                            right:15,
                            //backgroundColor:'white',
                            zIndex:101
                        }}
                        onPress={
                            overlayToggle
                        }
                    >
                        <Text
                            style={{
                                fontSize:16,
                                fontWeight:'700',
                                color:'white',
                                
                            }}
                        >
                            X
                        </Text>
                    </TouchableOpacity>
                        <Text>this is showing somewhere I think</Text>
                    </View>
                </View>
                } */}
                
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
                        zIndex:99,
                        
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
                        userSelect:'none'
                    }}
                    //pointerEvents='none'
                    >
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
                            marginBottom:2
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
                            width:SLIDING_DRAWER_WIDTH-2,
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
                            <NavBarWithLogIn 
                                //popLogin={popLogin}
                                popLogin={props.popLogin}
                                ShowSlidingDrawer={delayedSlidingDrawer}
                                loginAndCloseDrawer={loginAndCloseDrawer}
                            />
                            </ScrollView>
                        </View>
                    <View
                    style={{
                        position:'absolute',
                        top:height-maxHeight-53,
                        backgroundColor:'rgb(211,211,211)',
                        //backgroundColor:'purple',
                        width:SLIDING_DRAWER_WIDTH-2,
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
                           {new Date().getFullYear()}
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
            
            fontWeight:'700',
            fontSize: 19,
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 4,
        },
    }
)

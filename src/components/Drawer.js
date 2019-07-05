import React, {Component,useContext,useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity , Image, Platform, Animated,Dimensions,Easing} from 'react-native'
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
    useEffect(()=>{
        //console.log(state.translateY._parent)
        Animated.timing(state.spinValue,
            {
                toValue:360,
                duration:3000,
                easing:Easing.linear
            }).start()
    },[])
    // const spin = state.spinValue.interpolate({
    //     inputRange:[0,1],
    //     ouputRange:['0deg','360deg']
    // })
    if(state.userData!==undefined && state.userData.provider!==undefined){
        return(
            <Animated.View style={{            
                height:Dimensions.get('window').height-props.footerHeight,
                width:Dimensions.get('window').width,
                backgroundColor:'transparent',
               
            }}>
                <View style={{
                    backgroundColor:'#ffffff',
                    borderColor:'#cfcfcf',
                    borderRadius:2,
                    borderWidth:1,
                    height:maxHeight,
                    justifyContent:'center',
                    marginBottom :2,
                    //opacity:state.opacity
                }}>  
                    <View style={{
                        alignItems:'center',
                        padding:0,
                        height:maxHeight,
                        position:'absolute',
                        width:maxHeight,
                        flex:1,
                        justifyContent:'center',
                        zIndex:'97',
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
                        <Text selectable={false} style ={styles.textStyle} >
                            {name}
                        </Text>
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
                    {height:Dimensions.get('window').height*9/30-maxHeight}]}>
                    <View style = {[styles.MAIN_SLIDING_DRAWER_CONTAINER,{height:Dimensions.get('window').height*9/30-maxHeight}]}>
                        <NavBar/>
                    </View>
                </Animated.View> 
            </Animated.View>    
        ) 
    }
    else{
        return(
            <Animated.View style={{            
                height:Dimensions.get('window').height-props.footerHeight,
                width:Dimensions.get('window').width,
                backgroundColor:'transparent',
               
            }}>
                <View style={{
                    backgroundColor:'#ffffff',
                    borderColor:'#cfcfcf',
                    borderRadius:2,
                    borderWidth:1,
                    height:maxHeight,
                    justifyContent:'center',
                    marginBottom :2,
                    //opacity:state.opacity
                }}>  
                    <Animated.View style={{
                        alignItems:'center',
                        padding:0,
                        height:maxHeight,
                        position:'absolute',
                        width:maxHeight,
                        flex:1,
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
                            <div style={{height:imageLength/3-4,width:imageLength,margin:2,backgroundColor: 'lightgrey',}}></div>
                            <div style={{height:imageLength/3-4,width:imageLength,margin:2,backgroundColor: 'lightgrey',}}></div>
                            <div style={{height:imageLength/3-4,width:imageLength,margin:2,backgroundColor: 'lightgrey',}}></div>
                        </TouchableOpacity>
                    </Animated.View>
                    <View style={{
                        alignItems:'center',
                        zIndex:0,
                    }}>
                        <Text selectable = {false} style ={styles.textStyle} >
                            {name}
                        </Text>
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
                    {height:Dimensions.get('window').height*9/30-maxHeight}]}>
                    <View style = {[styles.MAIN_SLIDING_DRAWER_CONTAINER,{height:Dimensions.get('window').height*9/30-maxHeight,alignItems:'center'}]}>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:8,marginBottom:8}}>
                        <Image source={require('./icons/96x96.png')} style={{
                                // Top:(maxHeight-imageLength)/2,
                                // position:'absolue',
                                height:25,
                                resizeMode:'contain',
                                width:25,
                                justifyContent:'center',
                                alignItems:'center',
                                marginRight:5
                                //Right:0
                            }}/>
                        <Text selectable={false} style ={styles.textStyle}>
                            Welcome to Squwbs
                        </Text>
                        </View>
                        <NavBar/>
                    </View>
                </Animated.View> 
            </Animated.View>  
        )
    }
    // if(-maxHeight<=state.yscroll._value && state.yscroll._value<0){
    //     return(
    //         <Animated.View style={{            
    //             height:Dimensions.get('window').height-props.footerHeight+state.yscroll,
    //             width:Dimensions.get('window').width,
    //             backgroundColor:'transparent',
    //             transform:[{
    //                 //translateY:state.yscroll
    //                 //translateY:100
    //                 translateY:state.yscroll
    //             }],
    //         }}>
    //             <View style={{
    //                 backgroundColor:'#ffffff',
    //                 borderColor:'#cfcfcf',
    //                 borderRadius:2,
    //                 borderWidth:1,
    //                 height:maxHeight,
    //                 justifyContent:'center',
    //                 marginBottom :2,
    //                 opacity:state.opacity
    //             }}>  
    //                 <View style={{
    //                     alignItems:'center',
    //                     padding:0,
    //                     height:maxHeight,
    //                     position:'absolute',
    //                     width:maxHeight,
    //                     flex:1,
    //                     justifyContent:'center',
    //                     zIndex:'99',
    //                 }}>
    //                     <TouchableOpacity 
    //                         onPress = {ShowSlidingDrawer}
    //                         style={{
    //                             //backgroundColor:'black',
    //                         }}>
    //                         <Image source={require('./icons/96x96.png')} style={{
    //                             Top:(maxHeight-imageLength)/2,
    //                             position:'absolue',
    //                             height:imageLength,
    //                             resizeMode:'contain',
    //                             width:imageLength,
    //                             //Right:0
    //                         }}/>
    //                     </TouchableOpacity>
    //                 </View>
    //                 <View style={{
    //                     alignItems:'center',
    //                     zIndex:0,
    //                 }}>
    //                     <Text style ={styles.textStyle} >
    //                         {name}
    //                     </Text>
    //                 </View> 
    //             </View> 
    //             {props.children}
    //             <Animated.View style={[styles.ROOT_SLIDING_DRAWER_CONTAINER, {
    //                 transform:[{
    //                     translateX:drawerInterp
    //                 },{
    //                     translateY:maxHeight
    //                 }],
    //                 height:Dimensions.get('window').height-currentHeight-props.footerHeight,
    //                 }]}>
    //                 <View style = {styles.MAIN_SLIDING_DRAWER_CONTAINER}>
    //                     <NavBar/>
    //                 </View>
    //             </Animated.View> 
    //         </Animated.View>    
    //     ) 
    // }
    // else if(0<=state.yscroll._value){
    //     return(
    //         <Animated.View style={{            
    //             height:Dimensions.get('window').height-props.footerHeight,
    //             width:Dimensions.get('window').width,
    //             backgroundColor:'transparent',
    //             transform:[{
    //                 //translateY:state.yscroll
    //                 //translateY:100
    //                 translateY:0
    //             }],
    //         }}>
    //             <View style={{
    //                 backgroundColor:'#ffffff',
    //                 borderColor:'#cfcfcf',
    //                 borderRadius:2,
    //                 borderWidth:1,
    //                 height:maxHeight,
    //                 justifyContent:'center',
    //                 marginBottom :2,
    //                 opacity:state.opacity
    //             }}>  
    //                 <View style={{
    //                     alignItems:'center',
    //                     padding:0,
    //                     height:maxHeight,
    //                     position:'absolute',
    //                     width:maxHeight,
    //                     flex:1,
    //                     justifyContent:'center',
    //                     zIndex:'99',
    //                 }}>
    //                     <TouchableOpacity 
    //                         onPress = {ShowSlidingDrawer}
    //                         style={{
    //                             //backgroundColor:'black',
    //                         }}>
    //                         <Image source={require('./icons/96x96.png')} style={{
    //                             Top:(maxHeight-imageLength)/2,
    //                             position:'absolue',
    //                             height:imageLength,
    //                             resizeMode:'contain',
    //                             width:imageLength,
    //                             //Right:0
    //                         }}/>
    //                     </TouchableOpacity>
    //                 </View>
    //                 <View style={{
    //                     alignItems:'center',
    //                     zIndex:0,
    //                 }}>
    //                     <Text style ={styles.textStyle} >
    //                         {name}
    //                     </Text>
    //                 </View> 
    //             </View> 
    //             {props.children}
    //             <Animated.View style={[styles.ROOT_SLIDING_DRAWER_CONTAINER, {
    //                 transform:[{
    //                     translateX:drawerInterp
    //                 },{
    //                     translateY:maxHeight
    //                 }],
    //                 height:Dimensions.get('window').height-currentHeight-props.footerHeight,
    //                 }]}>
    //                 <View style = {styles.MAIN_SLIDING_DRAWER_CONTAINER}>
    //                     <NavBar/>
    //                 </View>
    //             </Animated.View> 
    //         </Animated.View>    
    //     ) 
    // }
    // else if(state.yscroll._value<(-maxHeight)){
    //     return(
    //         <Animated.View style={{            
    //             height:Dimensions.get('window').height-props.footerHeight-maxHeight,
    //             width:Dimensions.get('window').width,
    //             backgroundColor:'transparent',
    //             transform:[{
    //                 //translateY:state.yscroll
    //                 //translateY:100
    //                 translateY:-maxHeight
    //             }],
    //         }}>
    //             <View style={{
    //                 backgroundColor:'#ffffff',
    //                 borderColor:'#cfcfcf',
    //                 borderRadius:2,
    //                 borderWidth:1,
    //                 height:maxHeight,
    //                 justifyContent:'center',
    //                 marginBottom :2,
    //                 opacity:state.opacity
    //             }}>  
    //                 <View style={{
    //                     alignItems:'center',
    //                     padding:0,
    //                     height:maxHeight,
    //                     position:'absolute',
    //                     width:maxHeight,
    //                     flex:1,
    //                     justifyContent:'center',
    //                     zIndex:'99',
    //                 }}>
    //                     <TouchableOpacity 
    //                         onPress = {ShowSlidingDrawer}
    //                         style={{
    //                             //backgroundColor:'black',
    //                         }}>
    //                         <Image source={require('./icons/96x96.png')} style={{
    //                             Top:(maxHeight-imageLength)/2,
    //                             position:'absolue',
    //                             height:imageLength,
    //                             resizeMode:'contain',
    //                             width:imageLength,
    //                             //Right:0
    //                         }}/>
    //                     </TouchableOpacity>
    //                 </View>
    //                 <View style={{
    //                     alignItems:'center',
    //                     zIndex:0,
    //                 }}>
    //                     <Text style ={styles.textStyle} >
    //                         {name}
    //                     </Text>
    //                 </View> 
    //             </View> 
    //             {props.children}
    //             <Animated.View style={[styles.ROOT_SLIDING_DRAWER_CONTAINER, {
    //                 transform:[{
    //                     translateX:drawerInterp
    //                 },{
    //                     translateY:maxHeight
    //                 }],
    //                 height:Dimensions.get('window').height-currentHeight-props.footerHeight,
    //                 }]}>
    //                 <View style = {styles.MAIN_SLIDING_DRAWER_CONTAINER}>
    //                     <NavBar/>
    //                 </View>
    //             </Animated.View> 
    //         </Animated.View>    
    //     ) 
    // }
     
} 
export default Drawer
const styles=StyleSheet.create(
    {
        MAIN_SLIDING_DRAWER_CONTAINER:{
            backgroundColor:'#ffffff',
            borderColor:"#cacaca",
            borderRadius:2,
            borderWidth:1,
            flex:1,
            paddingHorizontal:10,
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
            backgroundColor:'white'
        },
        textStyle:{
            color:'white',
            fontSize: 19,
            textShadowColor: 'rgba(0, 0, 0, 1)',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 8,
        },
    }
)

// class Drawer extends Component{
//     // maxheight=22
//     constructor(props){
//         super(props)
//         this.Animation = new Animated.Value(0)
//         this.Sliding_Drawer_Toggle = true;
//         this.scroller=React.createRef()
//         this.maxheight=50
//         this.imageLength=30
//         this.state = {
//             dy:new Animated.Value(0),
//             height:this.maxheight,
//             lastscroll:0,
//             maxheight:this.maxheight,
//             opacity:new Animated.Value(1),
//             yscroll: new Animated.Value(0),
//         };
//         this.state.yscroll.addListener(({value})=>{
//             //console.log(value)
//             // this.scroller.current.scrollTo({
//             //     y:-1*value
//             // })
//             // this.forceUpdate()     
//         })
//     }
//     static defaultProps ={
//         footerHeight:2
//     }
//     UNSAFE_componentWillReceiveProps(nextProps){
//         //console.log(nextProps)
//         //this.setState({...this.state,height:nextProps.style.height})
//         var maxheight = this.state.maxheight
//         var limit=maxheight
        
//         // console.log(height)
//         // console.log(height-nextProps.yscroll)
//         // console.log(height-nextProps.yscroll/height)
        
//             this.setState({opacity:((limit-nextProps.yscroll)/limit),height:maxheight-(maxheight*(nextProps.yscroll/(limit*5)))})
//             //console.log(this.props.scrollValue)
//             //this.opacity.setValue((this.height-this.props.scrollValue._value)/this.height)
        
//        // console.log(this.state)

//     }
//     ShowSlidingDrawer = ()=>
//     {
       
//         if(this.Sliding_Drawer_Toggle==true)
//         {
            
//             Animated.timing(
//                 this.Animation,
//                 {
//                     duration:500,
//                     toValue:1,
//                 }
//             ).start(()=>
//             {
//                 this.Sliding_Drawer_Toggle=false;
//             })
//         }
//         else
//         {
          
//             Animated.timing(
//                 this.Animation,
//                 {
//                     duration:500,
//                     toValue:0, 
//                 }
//             ).start(()=>
//             {
//                 this.Sliding_Drawer_Toggle=true;
//             })
//         }
//     }
//     render(){
//         const ANIMATION_INTERPOLATE =this.Animation.interpolate(
//             {
//                 inputRange:[0,1],
//                 outputRange:[-SLIDING_DRAWER_WIDTH,0]
//             }
//         )
//         return(
//             <View style={{            
//                 height:Dimensions.get('window').height-this.props.footerHeight,
//                 width:Dimensions.get('window').width,
//                 backgroundColor:'transparent'
//             }}>
//                 <Animated.View style={
//                 {
//                     // alignItems:'center',
//                     backgroundColor:'#ffffff',
//                     borderColor:'#cfcfcf',
//                     borderRadius:2,
//                     borderWidth:1,
//                     // flexDirection:'row',
//                     height:this.state.height,
//                     justifyContent:'center',
//                     marginBottom :2,
//                     opacity:this.state.opacity      
//                 }
//                 }>  
//                     <View style={{
//                         alignItems:'center',
//                         // backgroundColor:'black',
//                         padding:0,
//                         height:this.maxheight,
//                         //right:0,
//                         position:'absolute',
//                         width:this.maxheight,
//                         flex:1,
//                         justifyContent:'center',
//                         zIndex:'99',
//                     }}>
//                         <TouchableOpacity 
//                             onPress = {this.ShowSlidingDrawer}
//                             style={{
//                                 //backgroundColor:'black',
//                             }}>
//                             <Image source={require('./icons/96x96.png')} style={{
//                                 Top:(this.maxheight-this.imageLength)/2,
//                                 position:'absolue',
//                                 height:this.imageLength,
//                                 resizeMode:'contain',
//                                 width:this.imageLength,
//                                 //Right:0
//                             }}/>
//                         </TouchableOpacity>
//                     </View>
//                     <View style={{
//                         alignItems:'center',
//                         zIndex:0,
//                     }}>
//                         <Text style ={styles.textStyle} >
//                             {name}
//                         </Text>
//                     </View> 
//                 </Animated.View> 
//                 {this.props.children}
//                 <Animated.View style={[styles.ROOT_SLIDING_DRAWER_CONTAINER, {
//                     transform:[{
//                         translateX:ANIMATION_INTERPOLATE
//                         //translateX:0
//                     },{
//                         translateY:this.state.height
//                     }],
//                     height:Dimensions.get('window').height-this.state.height-this.props.footerHeight,
                    
//                     }]}>
//                     <View style = {styles.MAIN_SLIDING_DRAWER_CONTAINER}>
//                         {/* <Text style ={styles.TextStyle}>another put stuff here placeholder </Text> */}
//                         <NavBar/>
//                     </View>
//                 </Animated.View>
                
                
                
                
//             </View>
            
//         )

        
//     }
// } 
// export default Drawer
// const styles=StyleSheet.create(
//     {
//         MAIN_SLIDING_DRAWER_CONTAINER:{
//             //alignItems:'center',
//             backgroundColor:'#ffffff',
//             borderColor:"#cacaca",
//             borderRadius:2,
//             borderWidth:1,
//             flex:1,
//             //justifyContent: 'center',
//             paddingHorizontal:10,
//             zIndex:1,
//             padding:5,
//         },
//         MainContainer:
//         {
//             top:0
//         },
//         ROOT_SLIDING_DRAWER_CONTAINER:
//         {
//             bottom:0,
//             flexDirection:'row',
//             left:0,
//             position:'absolute',
//             top:(Platform.OS==='ios')? 20:0,
//             width:SLIDING_DRAWER_WIDTH,
//             // margin:4,
//             // padding:1,
//             zIndex:99,
//         },
//         textStyle:{
//             color:'white',
//             fontSize: 19,
//             textShadowColor: 'rgba(128, 128, 128, 1)',
//             textShadowOffset: {width: 0, height: 0},
//             textShadowRadius: 8,
//             //height:this.maxheight
//             //textAlign: 'center',
//             // textShadowColor: 'rgba(1, 1, 1, 1)',
//             // textShadowOffset: {width: 0, height: 0},
//             // textShadowRadius: 20
//         },

//     }
// )
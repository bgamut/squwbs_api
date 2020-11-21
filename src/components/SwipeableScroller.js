
import React,{Component,useContext,useEffect,useState,useRef} from 'react'
import {Animated,PanResponder,Dimensions,View,Text,Image,TouchableOpacity,ScrollView} from 'react-native'
import { Context } from "../context"
import Swiper from './Swiper'
import SwipeableList from './SwipeableList'
import Header from './Header'
import ReadPDF from './ReadPDF'
import WordDeckWrapper from './WordDeckWrapper'
import Sound from './Sound'
import Instagram from './Instagram'
import Contact from './Contact'
import UploadWords from './UploadWords'
import DLLink from './DLLink'
//import {Slider,Slide,Caption,Card} from 'react-materialize'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import './css/Image.css'
import Fade from 'react-reveal/Fade'
// import { PayPalButton } from "react-paypal-button-v2"
import {PayPalButton} from 'react-paypal-button'
import GoogleCardV2 from './GoogleCardV2'
import GoogleDeck from './GoogleDeck'
//import GoogleDeck from './GoogleDeckV2'
import Message from './MessageV2'
import Kakao from './Kakao'
import './css/ClickOpacity.css'


//import GooglePay from './GooglePay'
//import {StripeProvider} from 'react-stripe-elements'
//import MyStoreCheckout from './MyStoreCheckout'
var uuid = require('uuid')
const withQuery = require('with-query').default
const stringifyObject= require('stringify-object')
try{
  var NODE_ENV = require('./private')
}
catch(e){
  //console.log('we are probably in production mode')
  var NODE_ENV = {...process.env};
}
// const translateY = new Animated.Value(0);

const getUserData=async()=>{
  const responded= await fetch('https://squwbs-252702.appspot.com/readCookies',{mode:'cors'})
  const userCookie = await responded.json()
  console.log('userCookie : '+stringifyObject(userCookie))
}
const extraHeight=30
let currentY=0
//const prevY=new Animated.Value(0)
let prevY=0
let buffer=[0,0,0,0,0,0,0,0]
const yScroll = new Animated.Value(0)
const YParallax = new Animated.Value(0)
var date = new Date()
const SwipeableScroller = (props) => {
  
  const [state, setState] = useContext(Context);
  const [user,setUser]=useState(undefined)
  //const [user,setUser]=useState('bernard')
  const [height,setHeight]=useState(0)
  const [iframeHeight,setIframeHeight]=useState(0)
  const [iframeWidth,setIframeWidth]=useState(0)
  const [paypalID,setpaypalID] = useState("AX-RoA6udFnBXtye_ygrvAlQD6EOWSEzu4v8j7ijKmNT7GWTonG_HF93Z_YOJILjl0NGE4v12YxJ0Lkd")
  const paypalRef = useRef('')
  const heightRef = useRef('')
  const scrollerRef = useRef('')
  const bottomRef=useRef('')
  const [partHeight,setPartHeight] = useState(Dimensions.get('window').height)
  const [currentEntry,setCurrentEntry] = useState(0)
  //const [mouseEnterFunction,setMouseEnterFunction]=useState(false)
  var mouseEnterFunction=false
  var animatedHeaderHeight = new Animated.Value(height)
  
  useEffect(()=>{
    yScroll.addListener(({value})=>{
      //console.log(state.yscroll)
      console.log('yval:',value)
      //setState({...state,yscroll:value})
      //global.header=value
    })
    //window.addEventListener("resize", updateDimensions);
    //window.addEventListener('orientationchange', updateDimensions)

    Dimensions.addEventListener('change',(e)=>{
      updateDimensions()
    })
    updateDimensions()
    //setHeight(Math.floor(Dimensions.get('window').height))
    // fetch(withQuery('https://squwbs-252702.appspot.com/getpaypalliveid', {
    //   //fetch(withQuery('https://squwbs-252702.appspot.com/getpaypalsandboxid', {
    //   mode:'cors'
    // }))
    // .then(result=>{
    //   console.log('got result from getPaypalID')
    //   return result.json()
    // })
    // .then((json)=>{
    //   //setState({...state,userData:{...json}})
      
    //   console.log(stringifyObject(json))
    //   setpaypalID(json.paypalid)
    //   //return json
    // })
    // .catch((err)=>{
    //   console.error(err)
    // })

    // fetch(withQuery('https://squwbs-252702.appspot.com/info', {
    //   //fetch(withQuery('https://squwbs-252702.appspot.com/getpaypalsandboxid', {
    //   mode:'cors',
    //   itemList:[{kind:'beat',itemID:'00'},{kind:'plugin',itemID:'00'}]
    // }))
    // .then(result=>{
    //   console.log('got result from info/')
    //   return result.json()
    // })
    // .then((json)=>{
    //   //setState({...state,userData:{...json}})
      
    //   console.log(stringifyObject(json))
    //   //setpaypalID(json)
    //   //return json
    //   getUserData()
    // })
    // .catch((err)=>{
    //   console.error(err)
    // })
    
          setHeight(Math.floor(Dimensions.get('window').height))
         
          
      
  },[])
  useEffect(()=>{
    //console.log('height changed!')
    //console.log(Dimensions.get('window').height)
    
  },[height])
  const XAlign=()=>{
    if(mouseEnterFunction==false){
      mouseEnterFunction=true
      //scrollerRef.current.getNode().scrollTo({x:0,y:currentEntry*height,animated:true})
      scrollerRef.current.getNode().scrollTo({x:0,y:currentEntry*Dimensions.get('window').height,animated:true})
      
      setTimeout(
        ()=>{
          mouseEnterFunction=false
          // props.headerOpen(false)
        },720
      )
      //setState({...state,alignmentFunction:false})
    }
  }
  const toggleBottom = ()=>{
    setTimeout(
      ()=>{
        //console.log('this is the bottom ref : ',bottomRef.current.props.style.height)
        // if(bottomRef.current.props.style.height==50){
        //   bottomRef.current.props.style.height=0
        // }
        // else if(bottomRef.current.props.style.height==0){
        //   bottomRef.current.props.style.height=50
        // }

      },720
    )
  }
  useEffect(()=>{
    // if(state.headerOpen==true)
    //     {
    //       //setPartHeight(height-50)
    //       //setPartHeight(height)
    //         Animated.timing(
    //             //this.Animation,
    //             animatedHeaderHeight,
    //             {
    //                 duration:7,
    //                 toValue:height-50,
    //             }
    //         ).start(()=>
    //         {
                
    //             //console.log("Animated header Open has been toggled to ", interpolatedHeader)
    //             console.log("header Open has been toggled to ", state.headerOpen)
    //             //interpolatedHeader
    //             toggleBottom()
    //         })
    //     }
    // else
    //     {
    //       //setPartHeight(height)
    //         Animated.timing(
    //             animatedHeaderHeight,
    //             {
    //                 duration:7,
    //                 toValue:height, 
    //             }
    //         ).start(()=>
    //         {
                
    //             console.log("header Open has been toggled to ", state.headerOpen)
    //             toggleBottom()
    //         })
    //     }
      if(state.userData!==undefined){
        props.overlayOff()
        //props.headerOpen()
        setUser(state.userData)
        //setState({...state,headerOpen:false})
      }
    //console.log("eyo!!!!!!!!!!!!!!!!!! user data ==undefined returns",stringifyObject(state.userData)=='undefined')
    //console.log('swipeablescroller.js userData:',stringifyObject(state.userData))

    // if(stringifyObject(state.userData)=='undefined'){
    //   console.log("swipeablescroller.js userData is ",stringifyObject(state.userData))
    //   console.log("swipeablescroller.js user is ",stringifyObject(user))
      
    // }
    // else{
    //   console.log("swipeablescroller.js userData is ",stringifyObject(state.userData))
    //   console.log("swipeablescroller.js user is ",stringifyObject(user))
    //   setUser(state.userData)
    // }


    // if(state.alignmentFunction==true){
    //   XAlign()
      
    // }
  },[...Object.values(state)])
  // useEffect(()=>{
  //   console.log('context changed! headerOpen = ',state.headerOpen)
  // },[...Object.values(state)])

  const updateDimensions=()=>{
    setHeight(Math.floor(Dimensions.get('window').height))
    //style.height=Math.floor(Dimensions.get('window').height)
    //console.log('dimensions update')
    if(Math.floor((Dimensions.get('window').height)-230)*560/315>(Dimensions.get('window').width-60)){
      //base on width
      setIframeWidth(Math.floor(Dimensions.get('window').width-60))
      setIframeHeight(Math.floor((Dimensions.get('window').width-60)*315/560))
      // setIframeWidth(Math.floor(Dimensions.get('window').width))
      // setIframeHeight(Math.floor(Dimensions.get('window').height))
      

  }
  else if(Math.floor((Dimensions.get('window').width)-60)*315/560>(Dimensions.get('window').height-230)){
      //base on height
      // setIframeWidth(Math.floor(Dimensions.get('window').height-230)*560/315)
      //setIframeHeight(Math.floor(Dimensions.get('window').height-230))
      setIframeWidth(Math.floor(Dimensions.get('window').width))
      setIframeHeight(Math.floor(Dimensions.get('window').height-100))
  }
  }
  
  const onMouseEnter=(e)=>{
    
    //XAlign()

  }
  const getInterpolate = (YParallaxRaw, imageHeight, extraHeight)=>{
    const inputRange = [0, imageHeight]
    const outputRange = [-extraHeight/2,extraHeight/2]
    return YParallaxRaw.interpolate({
      inputRange,
      outputRange
    })
  }
  const onScroll=(e)=>{
    
    //console.log(e.nativeEvent.contentOffset.y)
    
    if(mouseEnterFunction==false){
      currentY=(e.nativeEvent.contentOffset.y)
      
      Animated.timing(
        //this.Animation,
        YParallax,
        {
            duration:1,
            //toValue:(extraHeight/2-(((currentY%height)*(extraHeight))/height)),
            //toValue:((((currentY%(height*2))/(height*2))-0.5)*extraHeight)
            //toValue:(((currentY%(1000))/(2*1000))-0.5*extraHeight)
            toValue:((((currentY%(height*6))/(height*6))-0.5)*extraHeight)
        }
      ).start(()=>
      {
          
          console.log("parallax ", YParallax._value)
          
      })
      //console.log('currenty:',currentY)
      if(state.drawerToggle==true){
      buffer.splice(0,1)
        if(currentY>prevY){
          //console.log('currentY is bigger')
          //close
          //setState({...state,headerOpen:false})
          
          //props.headerOpen(false)
          buffer.push(-1)
        }
        else if (currentY<prevY){
          //console.log('prevY is bigger')
          //open
          //setState({...state,headerOpen:true})
          
          //props.headerOpen(true)
          buffer.push(1)
        }
        const average = (arr)=>arr.reduce((a,b)=>a+b,0)/arr.length
        if(isNaN(average(buffer))==false){
          //console.log(average(buffer))
          if(currentY>1){}
            // if(average(buffer)<=0){
            //   //console.log('close')
            //   props.headerOpen(false)
            // }
            // else{
            //   //console.log('open')
            //   props.headerOpen(true)
            // }
            
        }
        
      prevY=currentY
    }
    var maxNum=e.nativeEvent.contentSize.height-(height-30)
      //console.log(e.nativeEvent.contentOffset.x+'/'+maxNum)
      if(e.nativeEvent.contentOffset.y%(height)<(height-30)/2){
        
          setCurrentEntry(Math.floor(e.nativeEvent.contentOffset.y/(height)))
        
      }
      else if (e.nativeEvent.contentOffset.y%(height)>=(height)/2){
        
          setCurrentEntry(Math.ceil(e.nativeEvent.contentOffset.y/(height)))
        
      }
    }
  }
  const paypalPressed = ()=>{
    //console.log('paypalPressed triggered')
    console.log('paypalRef : ',paypalRef.current)
  }
  //if(stringifyObject(user)=='undefined'){
  if(user==undefined){
    return(
            
      <View>
        <Animated.ScrollView 
          // style={{backgroundColor:'transparent',height:(Dimensions.get('window').height*13/15-60),zIndex:98}}
          ref={scrollerRef}
          style={{
            backgroundColor:'transparent',
            //height:height-50,
            //height:partHeight,
            height:'100vh',
            zIndex:98
        }}
          onMouseEnter={(e)=>{
            //console.log('current entry is ', currentEntry)
            //console.log(scrollerRef.current)
            onMouseEnter()
            //scrollerRef.scrollTo({x:0,y:currentEntry*height})
          }}
          onScroll={(e)=>{
              onScroll(e)
            }
          }
          scrollEnabled={true}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={true}
          //snapToInterval={height-50}
          //snapToInterval = {partHeight}
          snapeToAlignment='end'
          decelerationRate="fast"
          alwaysBounceVertial={false}
          bounces={false}
        >
        
          <View style={{backgroundColor:'transparent',flexDirection:'column',margin:0,paddingRight:0,paddingLeft:0}}>
            {/* <View style={{backgroundColor:'transparent',height:Dimensions.get('window').height*2/3,flexDirection:'column',margin:0,paddingRight:0,paddingLeft:0}}> */}
              {/* <View  style={{height:"38vh",width:Dimensions.get('window').width-2}}> */}
                {/* <Swiper buttonsEnabled={false} loop={true} autoplayTimeout={5} direction='row'>

                  <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgb(20,20,20)",
                    textAlaign:'center',
                    borderRadius:4,
                    
                    overflow:'hidden',
                    
                  }}>
                  </View>
                  <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgb(110,110,110)",
                    
                    borderRadius:4,
                    overflow:'hidden',
                    
                  }}>

                  </View>
                  <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgb(200,200,200)",
                    borderRadius:4,
                    
                    overflow:'hidden',
                    
                  }}>

                  </View>
                </Swiper> */}
          
            {/* </View> */}
            <View>
            {/* <TouchableOpacity
              onPress={()=>{
                //console.log('carousel pressed')
                XAlign()
              }}
              activeOpacity={1}
            > */}
          
          {/* <a style={{
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
            textAlign:'center',
            height:"100%",
            width:'100%'
          }} href="/#slider"> */}
            <section id="slider"
              ref={heightRef}
              style={{
                //height:"38vh",
                
                width:"100vw",
                backgroundColor:'white',
                textAlign:'center'
              }}
            >
              <Animated.View
                style={{
                  //height:partHeight,
                  height:'100vh',
                    width:"100vw",
                    //backgroundImage:"url("+process.env.PUBLIC_URL+"/images/wbgf.gif"+")",
                    // textAlign:'center',
                    backgroundSize: '100% 100%',
                    backgroundColor:'transparent',
                    textAlign:'center',
                  //backgroundImage:"url("+process.env.PUBLIC_URL+"/images/highlightcamo.gif"+")",
                    backgroundRepeat:"no-repeat",
                    
                }}
                
              >
              <Carousel 
                
                showArrows={false} 
                showStatus={false} 
                showIndicators={true}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={4500}
                transitionTime={500}
                emulateTouch={true}
                stopOnHover={false}
                //swipeScrollTolerance={1}
                useKeyboardArrows={true}
                //centerSlidePercentage={10}
              >
                {/* <div 
                ref={heightRef}
                style={{
                  //height:"38vh",
                  
                  height:'100%',
                  width:"100%",
                  backgroundSize: '100% 100%',
                  //backgroundColor:'rgb(250,250,250)',
                  //backgroundColor:'rgb(135,135,135)',
                  //backgroundColor:'rgb(192,164,242)',
                  backgroundColor:'rgb(186,214,227)',
                  textAlign:'center',
                  
                  backgroundRepeat:"no-repeat",
                  //backgroundImage: 'radial-gradient(farthest-corner at 150% -50%,purple,rgb(137,137,137))'
                  }}>
                    <Animated.View
                      style={{
                        width:"100%",
                        //height:partHeight,
                        height:'100vh',
                        backgroundColor:'transparent',
                        justifyContent:'center',
                        alignItems:'center',
                        // backgroundColor:'orange',
                        //padding:25,
                      }}
                      
                    > */}
                    {/* <div
                      style={{
                        height:'100%',
                        width:'100%',
                        
                      }}
                    >
                    </div> */}
                    {/* <img src={process.env.PUBLIC_URL+"./wbgf.gif"} />  */}
                    {/* <img 
                      src={process.env.PUBLIC_URL+"./images/club1.jpg"}
                      style={{
                        width:'100vw',
                       // height:height+50,
                       height:height,
                        objectFit:'cover',
                       // opacity:0.3,
                        zIndex:99
                      }}
                    /> */}
                    <div
                      style={{
                        overflow:'hidden',
                        height:height,
                        width:'100vw'
                      }}
                    >
                    {/* <div
                      
                      style={{
                        width:'100vw',
                       // height:height+50,
                       height:'100vh',
                        //objectFit:'cover',
                        alignItems:'center',
                          justifyContent:'center',
                        
                        backgroundImage:'url('+process.env.PUBLIC_URL+"./images/club1.jpg"+')',
                       // opacity:0.3,
                       //backgroundColor:'magenta',
                        zIndex:99,
                        backgroundRepeat:'no-repeat',
                        backgroundSize:'cover',
                        backgroundPosition:'center',
                        transform:[{
                          translateX:0,
                      },
                      {
                          translateY:0
                      },
                     
                    
                    ],
                      }}
                    > */}
                    <Animated.Image
                      source={{
                        uri: process.env.PUBLIC_URL+"./images/club1.jpg"
                      }}
                      style={{
                        width:'100vw',
                      //height:height+extraHeight,
                        height:height,
                      //height:'100vh',
                        //objectFit:'cover',
                        alignItems:'center',
                        justifyContent:'center',
                        
                        //backgroundImage:'url('+process.env.PUBLIC_URL+"./images/club1.jpg"+')',
                      // opacity:0.3,
                      //backgroundColor:'magenta',
                        zIndex:99,
                        backgroundRepeat:'no-repeat',
                        backgroundSize:'cover',
                        backgroundPosition:'center',
                        transform:[{
                          translateX:0,
                      },
                      {
                          //translateY:-(((currentY%height)*(150/2))/height)
                          //translateY:YParallax
                          //translateY:getInterpolate(YParallax,height,150)
                          translateY:0
                      },
                    
                    
                    ],
                      }}
                      />
                    {/* <p className="legend">1</p> */}
                    <Fade
                     
                    >
                    <a 
                      style={{
                        textDecorationLine:'none',
                        
                      }}
                      href='#download'
                    >
                      <View
                      style={{
                        width:'100%',
                        height:height,
                        transform:[{
                            translateX:0,
                        },
                        {
                            //translateY:-(height+150)/2,
                            //translateY:-(height+extraHeight)/2
                            translateY:-height/2
                        },

                        
                    
                      ],
                      zIndex:100,
                      }}
                      
                      >
                        
                      
                      <Text
                        //className='Unselectable'
                        style={{
                          // backgroudColor:'purple',
                          textDecorationLine:'none',
                          color:'white',
                          fontWeight:'700',
                          fontSize: 25,
                          textShadowColor: 'rgba(0, 0, 0, 1)',
                          textShadowOffset: {width: 0, height: 0},
                          textShadowRadius: 2,
              
                          textAlign:'center',
                          alignItems:'center',
                          justifyContent:'center',
                          flexDirection:'row',
                          userSelection:'none',
                          zIndex:100,

                            
                          
                        }}
                      >
                        Get the Sound You Want
                      </Text>
                      </View>
                    </a>
                      </Fade>
                      {/* </Animated.Image> */}
                      {/* </div> */}
                      
                      </div>
                      
                    {/* </Animated.View>
                </div> */}
                {/* <div 
                  ref={heightRef}
                  style={{
                    //height:"38vh",
                    height:"100%",
                    width:"100vw",
                    //backgroundImage:"url("+process.env.PUBLIC_URL+"/images/wbgf.gif"+")",
                    // textAlign:'center',
                    backgroundSize: '100% 100%',
                    //backgroundColor:'rgb(250,250,250)',
                    //backgroundImage: 'radial-gradient(farthest-corner at 100% -100%,rgb(242,235,242),rgb(186,214,227))',
                    backgroundImage: 'radial-gradient(farthest-corner at 100% -100%,white,rgb(186,214,227))',
                    textAlign:'center',
                  //backgroundImage:"url("+process.env.PUBLIC_URL+"/images/highlightcamo.gif"+")",
                    backgroundRepeat:"no-repeat",
                    //backgroundImage: 'radial-gradient(farthest-corner at 150% -50%,purple,white)'
                  }}
                >
                  <Animated.View
                      style={{
                        width:"100%",
                        //height:partHeight,
                        height:'100vh',
                        backgroundColor:'transparent',
                        justifyContent:'center',
                        alignItems:'center',
                        //padding:25,
                      }}
                    > */}
                    {/* <div
                      style={{
                        height:'100%',
                        width:'100%',
                        
                      }}
                    >
                    </div> */}
                    {/* <img src={process.env.PUBLIC_URL+"./wbgf.gif"} />  */}
                    {/* <p className="legend">1</p> */}
                    {/* <img 
                      src={process.env.PUBLIC_URL+"./images/computerdesk1.jpg"}
                      style={{
                        width:'100vw',
                       // height:height+50,
                       height:height,
                        objectFit:'cover',
                       // opacity:0.3,
                        zIndex:99
                      }}
                      /> */}
                      {/* <div
                      
                      style={{
                        width:'100vw',
                       // height:height+50,
                       height:'100vh',
                        //objectFit:'cover',
                        backgroundRepeat:'no-repeat',
                        backgroundSize:'cover',
                        backgroundImage:'url('+process.env.PUBLIC_URL+"./images/dj.jpg"+')',
                       // opacity:0.3,
                       //backgroundColor:'magenta',
                        zIndex:99,
                        alignItems:'center',
                          justifyContent:'center',
                        backgroundPosition:'center',
                        overflow:'hidden'

                      }}
                    > */}
                    <div
                      style={{
                        height:height,
                        width:'100vw',
                        overflow:'hidden'
                      }}
                    >
                      <Animated.Image
                      source={{
                        uri: process.env.PUBLIC_URL+"./images/dj.jpg"
                      }}
                      style={{
                        width:'100vw',
                      //height:height+extraHeight,
                      //height:'100vh',
                        //objectFit:'cover',
                        height:height,
                        alignItems:'center',
                        justifyContent:'center',
                        
                        //backgroundImage:'url('+process.env.PUBLIC_URL+"./images/club1.jpg"+')',
                      // opacity:0.3,
                      //backgroundColor:'magenta',
                        zIndex:99,
                        backgroundRepeat:'no-repeat',
                        backgroundSize:'cover',
                        backgroundPosition:'center',
                        transform:[{
                          translateX:0,
                      },
                      {
                          //translateY:-(((currentY%height)*(150/2))/height)
                          //translateY:YParallax
                          //translateY:getInterpolate(YParallax,height,150)
                          translateY:0
                      },
                    
                    
                    ],
                      }}
                      />
                    <Fade
                      
                    >
                      <a 
                        style={{
                          textDecorationLine:'none'
                        }}
                        href='#download'
                      >
                        <View
                          style={{
                            width:'100%',
                            height:height,
                              transform:[{
                                translateX:0,
                            },
                            {
                                translateY:-(height)/2,
                                //translateY:-(height+extraHeight)/2
                                // translateY:-(height+150)
                            }],
                            zIndex:100,
                          }}
                        >
                        <Text
                          //className='Unselectable'
                          style={{
                            

                            
                            
                            textDecorationLine:'none',
                            color:'white',
                            fontWeight:'700',
                            fontSize: 25,
                            textShadowColor: 'rgba(0, 0, 0, 1)',
                            textShadowOffset: {width: 0, height: 0},
                            textShadowRadius: 2,
                            zIndex:100,
                            textAlign:'center',
                            alignItems:'center',
                            justifyContent:'center',
                            flexDirection:'row',
                            userSelection:'none',
                          }}
                        >
                        Your Idea To A Song In Minutes  
                        </Text>
                        </View>
                      </a>
                    </Fade>
                    </div>
                    {/* </div> */}
                    {/* </Animated.View> */}
                    {/* <img src="assets/2.jpeg" /> */}
                    {/* <p className="legend">2</p> */}
                {/* </div> */}
                {/* <div 
                  ref={heightRef}
                  style={{
                    //height:"38vh",
                    height:"100%",
                    width:"100vw",
                    
                    //backgroundColor:'rgb(255,255,255)',
                    //backgroundColor:'rgb(229,154,198)',
                    backgroundColor:'white',
                    textAlign:'center'
                  }}
                >
                  <Animated.View
                      style={{
                        width:"100%",
                        //height:partHeight,
                        height:'100vh',
                        backgroundColor:'transparent',
                        justifyContent:'center',
                        alignItems:'center',
                        //padding:25,
                      }}
                    > */}
                    {/* <div
                      style={{
                        height:'100%',
                        width:'100%',
                        
                      }}
                    >
                    </div> */}
                    {/* <img src={process.env.PUBLIC_URL+"./wbgf.gif"} />  */}
                    {/* <p className="legend">1</p> */}
                    {/* <img 
                      src={process.env.PUBLIC_URL+"./images/dj.jpg"}
                      style={{
                        width:'100vw',
                       // height:height+50,
                       height:height,
                        objectFit:'cover',
                       // opacity:0.3,
                        zIndex:99
                      }}
                    /> */}
                    {/* <div
                      
                      style={{
                        width:'100vw',
                       // height:height+50,
                       height:'100vh',
                        //objectFit:'cover',
                        backgroundRepeat:'no-repeat',
                        backgroundSize:'cover',
                        backgroundImage:'url('+process.env.PUBLIC_URL+"./images/computerdesk1.jpg"+')',
                       // opacity:0.3,
                       //backgroundColor:'magenta',
                        zIndex:99,
                        alignItems:'center',
                          justifyContent:'center',
                        backgroundPosition:'center',
                        overflow:'hidden'
                      }}
                    > */}
                    <div
                      style={{
                        height:height,
                        width:'100vw',
                        overflow:'hidden'
                      }}
                    >
                      <Animated.Image
                      source={{
                        uri: process.env.PUBLIC_URL+"./images/computerdesk1.jpg"
                      }}
                      style={{
                        width:'100vw',
                      //height:height+150,
                      //height:height+extraHeight,
                      //height:'100vh',
                        height:height,
                        //objectFit:'cover',
                        alignItems:'center',
                        justifyContent:'center',
                        
                        //backgroundImage:'url('+process.env.PUBLIC_URL+"./images/club1.jpg"+')',
                      // opacity:0.3,
                      //backgroundColor:'magenta',
                        zIndex:99,
                        backgroundRepeat:'no-repeat',
                        backgroundSize:'cover',
                        backgroundPosition:'center',
                        transform:[{
                          translateX:0,
                      },
                      {
                          //translateY:-(((currentY%height)*(150/2))/height)
                          //translateY:YParallax
                          //translateY:getInterpolate(YParallax,height,150)
                          translateY:0
                      },
                    
                    
                    ],
                      }}
                      />
                      <Fade
                        
                      >
                      <a 
                        style={{
                          textDecorationLine:'none'
                        }}
                        href='#download'
                      >
                        <View
                          style={{
                            width:'100%',
                            height:height,
                              transform:[{
                                translateX:0,
                            },
                            {
                              // translateY:-(height+150)/2,
                                //translateY:-(height+150),
                                //translateY:-(height+extraHeight)/2
                                translateY:-(height)/2,
                                //translateY:-(height+extraHeight+30+15)/2
                            }],
                            zIndex:100,
                          }}
                          >
                        <Text
                          //className='Unselectable'
                          style={{
                           
                            textDecorationLine:'none',
                            color:'white',
                            fontWeight:'700',
                            fontSize: 25,
                            textShadowColor: 'rgba(0, 0, 0, 1)',
                            textShadowOffset: {width: 0, height: 0},
                            textShadowRadius: 2,
                            zIndex:100,
                            textAlign:'center',
                            alignItems:'center',
                            justifyContent:'center',
                            flexDirection:'row',
                            userSelection:'none',
                          }}
                        >
                          
                          Available for MacOS
                        </Text>
                      </View>
                      </a>
                      </Fade>
                      </div>
                    {/* </div> */}
                    {/* </Animated.View> */}
                    {/* <img src="assets/3.jpeg" /> */}
                    {/* <p className="legend">3</p> */}
                {/* </div> */}
              </Carousel>
              </Animated.View>
                          
            </section>
          {/* </a> */}
          
            {/* </TouchableOpacity> */}
            </View>
            
            <View style={{flexDirection:'column'}}>
              
            {/* <TouchableOpacity
              onPress={()=>{
                //console.log('carousel pressed')
                XAlign()
              }}
              activeOpacity={1}
            >  */}

              {/* <section id="download">
             
                <Animated.View
                  ref={heightRef}
                  style={{
                    height:"100vh",
                    width:"100%",
                    padding:15,
                    backgroundColor:'white',
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundImage:'radial-gradient(farthest-corner at 100% 0%,rgb(242,235,242),rgb(186,214,227))',
                  }}
                >
                  <View 
                    style={{
                      height:"100%",
                      width:"100%",
                      justifyContent:'center',
                      alignItems:'center',
                      zIndex:0,
                      backgroundColor:'transparent',
                      backgroundRepeat:'no-repeat',
                      backgroundSize:'cover',
                      backgroundPosition:'center',
                      borderColor:'#aaa',
                      borderStyle:'solid',
                      overflow:'hidden',
                      boxSizing:"border-box",
                      shadowColor:'black',
                      shadowOpacity:0.25,
                      shadowRadius:2,
                      shadowOffset:{
                        width:0,
                        height:0
                      },
                      elevation:2,
                      overflow:'hidden'
                    }}
                  >
                    <Animated.Image
                      source={{
                        uri: process.env.PUBLIC_URL+"./images/computerdesk2.jpg"
                      }}
                      style={{
                        width:'100vw',
                        height:height+extraHeight,
                        alignItems:'center',
                        justifyContent:'center',
                        zIndex:-1,
                        backgroundRepeat:'no-repeat',
                        backgroundSize:'cover',
                        backgroundPosition:'center',
                        transform:[{
                          translateX:0,
                      },
                      {
                          translateY:YParallax
                      },
                    
                    
                    ],
                      }}
                    />
                    <Text
                        selectable={false}
                        style={{
                          zIndex:100,
                          textDecorationLine:'none',
                          color:'white',
                          fontWeight:'700',
                          fontSize: 15,
                          textShadowColor: 'rgba(0, 0, 0, 1)',
                          textShadowOffset: {width: 0, height: 0},
                          textShadowRadius: 2,
                          margin:15,
                          textAlign:'center',
                          alignItems:'center',
                          justifyContent:'center',
                          flexDirection:'row',
                          transform:[{
                            translateX:0,
                        },
                        {
                            translateY:-(height+extraHeight+30+15)/2
                        },
                      ],
                        }}
                      >
                        SQUWBS VST & AU
                      </Text>                    
                    <View style={{
                        height:33,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'transparent',
                        transform:[{
                          translateX:0,
                      },
                      {
                          translateY:-(height+extraHeight+30+15)/2
                      },
                    ],
                        
                    }}>
                      <View 
                      style={{ 
                        height:30,
                        width:150,
                        backgroundImage:'radial-gradient(farthest-corner at 100% 0%,rgb(242,235,242),rgb(186,214,227))',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center',
                        borderColor:'lightgrey',
                        borderStyle:'solid',
                        overflow:'hidden',
                        boxSizing:"border-box",
                        shadowColor:'#000',
                        shadowOpacity:0.85,
                        shadowRadius:2,
                        shadowOffset:{
                        width:0,
                        height:0
                        },
                        elevation:2
                    }} 
                    >
                      <View
                        className='ClickOpacity'
                        style={{
                          backgroundColor:'white'
                        }}
                      >
                      <View
                          style={{
                            zIndex:100,
                            display:'absolute',
                            top:0,
                            width:150,
                            height:30,
                            justifyContent:'center',
                            alignItems:'center',
                            pointerEvents:'none',
                            overflow:'hidden',
                            backgroundImage:'radial-gradient(farthest-corner at 100% 0%,rgb(242,235,242),rgb(186,214,227))',
                          }}
                        >

                          <View
                            style={{
                              pointerEvents:'none',
                              flexDirection:'row',
                              justifyContest:'center',
                              alignItems:'center',
                              zIndex:100
                            }}
                          >
                              <Text 
                              selectable={false} 
                              style ={{
                                  fontSize: 20,
                                  fontWeight:'700',
                                  textDecorationLine:'none',
                                  color:'rgb(196,196,196)',
                                  textShadowColor: 'rgba(0, 0, 0, 0.85)',
                                  textShadowOffset: {width: 0, height: 0},
                                  textShadowRadius: 2,
                                  textAlign:'center',
                                  alignItems:'center',
                                  justifyContent:'center',
                                  flexDirection:'row',
                                  margin:5,
                                  pointerEvents:'none',
                                  zIndex:101
                              }}>
                                  <i class="fab fa-paypal"></i>
                              </Text>
                              <Text
                                selectable={false} 
                                style ={{
                                    fontSize: 13,
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
                                    margin:5,
                                    pointerEvents:'none'
                                }}
                              >
                                Paypal
                              </Text>
                            </View>
                        </View>
                        <View
                          
                          style={{
                            zIndex:98,
                            position:'absolute',
                            top:0,
                            pointerEvents:'auto',
                            display:'hidden',
                            shadowOpacity: 0.75,
                            shadowRadius: 5,
                            shadowColor: 'red',
                            shadowOffset: { height: 0, width: 0 }
                          }}
                        >
                      
                        <PayPalButton
                          ref={paypalRef}
                          paypalOptions={{
                            clientId:"AX-RoA6udFnBXtye_ygrvAlQD6EOWSEzu4v8j7ijKmNT7GWTonG_HF93Z_YOJILjl0NGE4v12YxJ0Lkd",
                            intent:'capture'
                          }}
                          buttonStyles={{
                            layout:'horizontal',
                            shape:'rect',
                            color:'white',
                            tagline:true,
                            
                          }}
                          amount={9.99}
                          onApprove={(data,authId)=>{
                            console.log('onApprove')
                          }}
                          onPaymentSuccess={(data)=>{
                            console.log('onPaymentSuccess')
                          }}
                          />
                        
                        </View>

                    </View>
                    </View>
                </View>  
                  </View>
                </Animated.View>
              </section> */}
            {/* </TouchableOpacity>  */}
            {/* <TouchableOpacity
              onPress={()=>{
                //console.log('carousel pressed')
                XAlign()
              }}
              activeOpacity={1}
            >   */}

{/* this part needs to be reimplemented */}


            <section id="sound">
             
                <Animated.View 
                ref={heightRef}
                style={{
                  height:"100vh",
                  width:"100%",
                  padding:15,
                  zIndex:100,
                  overflow:'hidden',
                  backgroundColor:'white',
                  backgroundImage:'radial-gradient(farthest-corner at 0% 50%,rgb(242,235,242),rgb(186,214,227))',
                  //backgroundImage:'radial-gradient(farthest-corner at 0% 100%,white,rgb(186,214,227))',
                  }}
                >
                  
                  
                   <View 
                    style={{
                      height:"100%",
                      width:"100%",
                      //justifyContent:'center',
                      //alignItems:'center',
                      zIndex:100,
                      transform:[{
                        translateX:0,
                      },
                      {

                          translateyY:0
                      }],

                      backgroundColor:'transparent',

                      borderColor:'#aaa',
                      borderStyle:'solid',
                      overflow:'hidden',
                      boxSizing:"border-box",
                      shadowColor:'black',
                      shadowOpacity:0.25,
                      shadowRadius:2,
                      shadowOffset:{
                        width:0,
                        height:0
                      },
                      elevation:2
                    }}
                  >
                  <View
                    style={{
                      height:height,
                      width:'100vw',
                      overflow:'hidden',
                      backgroundColor:'transparent',
                      zIndex:99
                    }}
                  >
                    <Animated.Image
                      
                      source={{
                        uri: process.env.PUBLIC_URL+"./images/speaker1.jpg"
                      }}
                      style={{
                        width:'100vw',
                        height:height+extraHeight,
                        alignItems:'center',
                        justifyContent:'center',
                        zIndex:-1,
                        backgroundRepeat:'no-repeat',
                        backgroundSize:'cover',
                        backgroundPosition:'center',
                        transform:[{
                          translateX:0,
                          },
                          {
                            translateY:YParallax
                            //translateY:0
    
                        },],
                      }}
                    />
                  </View>
                    <View
                      style={{
                        height:height,
                        width:"100%",
                        justifyContent:'center',
                        alignItems:'center',
                        zIndex:100,
                        transform:[{
                          translateX:0,
                        },
                        {
                            translateY:-height
                            //translateyY:0
                        }],
                
                        backgroundColor:'translate',
                       
                        borderColor:'#aaa',
                        borderStyle:'solid',
                        overflow:'hidden',
                        boxSizing:"border-box",
                        shadowColor:'black',
                        shadowOpacity:0.25,
                        shadowRadius:2,
                        shadowOffset:{
                          width:0,
                          height:0
                        },
                        elevation:2
                      }}
                    >
                      <Sound/>
                    </View>
                  </View>
                </Animated.View>
               
              </section>

              {/* <section id="blog">
                <Animated.View
                  ref={heightRef}
                  style={{
                    height:"100vh",
                    width:"100%",
                    padding:15,
                    
                    backgroundColor:'transparent',
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundImage: 'radial-gradient(farthest-corner at 50% 50%,rgb(242,235,242),rgb(186,214,227))'
                  }}
                >
                  <View 
                    style={{
                      height:"100%",
                      width:"100%",
                      justifyContent:'center',
                      alignItems:'center',
                      zIndex:0,
                      backgroundColor:'transparent',
                      paddingTop:0,
                      paddingLeft:0,
                      paddingRight:0,
                      paddingBottom:0,
                      borderColor:'#aaa',
                      borderStyle:'solid',
                      overflow:'hidden',
                      boxSizing:"border-box",
                      transform:[{
                        translateX:0,
                    },
                    {
                        translateY:30,
                    }]
                    }}
                  >
                    <GoogleDeck 
                      
                      shareButtonPressed={props.shareOverlayToggle}
                      slackHashButtonPressed={props.slackHashOverlayToggle}
                      commentButtonPressed={props.commentOverlayToggle}
                      starButtonPressed={props.starOverlayToggle}
                      XAlign={XAlign}
                    />
                  </View>
                </Animated.View>
              </section> */}

            {/* </TouchableOpacity>  */}
              {/* <section id="testDownloadLink">
                <Animated.View
                  ref={heightRef}
                  style={{
                    height:"100vh",
                    //height:partHeight,
                    width:"100%",
                    padding:15,
                    
                    backgroundColor:'white',
                    justifyContent:'center',
                    alignItems:'center',
                  }}
                >
                  <View 
                    style={{
                      height:"100%",
                      width:"100%",
                      justifyContent:'center',
                      alignItems:'center',
                      zIndex:0,
                      backgroundColor:'rgb(135,135,135)',
                      borderRadius:4,
                      //borderBottom:2,
                      //borderTop:1,
                      borderColor:'#aaa',
                      borderStyle:'solid',
                      overflow:'hidden',
                      boxSizing:"border-box",
                      shadowColor:'black',
                      shadowOpacity:0.25,
                      shadowRadius:2,
                      shadowOffset:{
                        width:0,
                        height:0
                      },
                      elevation:2,
                      backgroundImage:'radial-gradient(farthest-corner at -300% 400%,rgb(137,137,137),white)',
                    }}
                  >
                    <DLLink/>
                  </View>
                </Animated.View>
              </section> */}
            {/* <TouchableOpacity
              onPress={()=>{
                //console.log('carousel pressed')
                XAlign()
              }}
              activeOpacity={1}
            >   */}
              

              {/* <section id="follow">
                <Animated.View
                  ref={heightRef}
                  style={{
                    height:"100vh",
                    width:"100%",
                    padding:15,
                    backgroundColor:'rgb(135,135,135)',
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundImage: 'radial-gradient(farthest-corner at 100% 100%,rgb(242,235,242),rgb(186,214,227))',
                  }}
                >
                  <View 
                    style={{
                      height:"100%",
                      width:"100%",
                      justifyContent:'center',
                      alignItems:'center',
                      zIndex:0,
                      backgroundColor:'white',
                      borderColor:'#aaa',
                      borderStyle:'solid',
                      overflow:'hidden',
                      boxSizing:"border-box",
                      shadowColor:'#000',
                      shadowOpacity:0.25,
                      shadowRadius:2,
                      shadowOffset:{
                        width:0,
                        height:0
                      },
                      elevation:2,
                    }}
                  >
                    <Instagram/>
                  </View>
                </Animated.View>
              </section> */}

              <section id="contact">
                {/* <a style={{
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
                  textAlign:'center',
                  height:"100%",
                  width:'100%'
                }} href="/#contact"> */}
                <Animated.View
                  ref={heightRef}
                  style={{
                    //height:"100vh",
                    height:180,
                    //height:partHeight,
                    width:"100%",
                    padding:15,
                    
                    backgroundColor:'white',
                    //backgroundImage:'radial-gradient(farthest-corner at -100% 100%,white,rgb(186,214,227))',

                    justifyContent:'center',
                    //alignItems:'center',
                    borderColor:'#aaa',
                      borderStyle:'solid',

                      overflow:'hidden',
                      boxSizing:"border-box",
                      // shadowColor:'black',
                      // shadowOpacity:0.25,
                      // shadowRadius:2,
                      // shadowOffset:{
                      //   width:0,
                      //   height:0
                      // },
                      // elevation:2,
                  }}
                >
                  <View 
                    style={{
                      //height:"100%",
                      height:180,
                      width:"100%",
                      justifyContent:'center',
                      // alignItems:'center',
                      zIndex:0,
                      //backgroundColor:'rgb(135,135,135)',
                      backgroundColor:'transparent',
                      //borderRadius:4,
                      //borderBottom:2,
                      //borderTop:1,
                      
                      // overflow:'hidden',
                      // boxSizing:"border-box",
                      // shadowColor:'black',
                      // shadowOpacity:0.25,
                      // shadowRadius:2,
                      // shadowOffset:{
                      //   width:0,
                      //   height:0
                      // },
                      // elevation:2,
                      //backgroundImage:'radial-gradient(farthest-corner at -400% 400%,rgb(137,137,137),white)',
                      // backgroundImage:'radial-gradient(farthest-corner at -100% 100%,white,rgb(186,214,227))',
                    }}
                  >
                    <Contact/>
                  </View>
                </Animated.View>
                {/* </a> */}
              </section>
              {/* </TouchableOpacity>  */}
              {/* {state.headerOpen&& */}
                {/* <View
                  ref={bottomRef}
                  style={{
                    height:50,
                    width:'100vw',
                    backgroundColor:'transparent'
                  }}
                  >
                  <Text
                    style={{
                      color:'transparent'
                    }}
                  > bars</Text>
                </View> */}
               {/* } */}
              
            </View>
          
        </View>
      </Animated.ScrollView>
      
    </View>
    )
  }
  else{
    return(
      <View>
        <Animated.ScrollView 
          // style={{backgroundColor:'transparent',height:(Dimensions.get('window').height*13/15-60),zIndex:98}}
          ref={scrollerRef}
          style={{
            backgroundColor:'transparent',
            //height:height-50,
            //height:partHeight,
            height:'100vh',
            zIndex:98
        }}
          
          onScroll={(e)=>{
              onScroll(e)
            }
          }
          onMouseEnter={(e)=>{
            console.log('current entry is ', currentEntry)
            console.log(scrollerRef.current)
            onMouseEnter()
            //scrollerRef.scrollTo({x:0,y:currentEntry*height})
          }}
          scrollEnabled={true}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={true}
          //snapToInterval={height-50}
          //snapToInterval = {partHeight}
          snapeToAlignment='end'
          decelerationRate="fast"
          alwaysBounceVertial={false}
          bounces={false}
        >
        
          <View style={{backgroundColor:'transparent',flexDirection:'column',margin:0,paddingRight:0,paddingLeft:0}}>
            {/* <View style={{backgroundColor:'transparent',height:Dimensions.get('window').height*2/3,flexDirection:'column',margin:0,paddingRight:0,paddingLeft:0}}> */}
              {/* <View  style={{height:"38vh",width:Dimensions.get('window').width-2}}> */}
                {/* <Swiper buttonsEnabled={false} loop={true} autoplayTimeout={5} direction='row'>

                  <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgb(20,20,20)",
                    textAlaign:'center',
                    borderRadius:4,
                    
                    overflow:'hidden',
                    
                  }}>
                  </View>
                  <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgb(110,110,110)",
                    
                    borderRadius:4,
                    overflow:'hidden',
                    
                  }}>

                  </View>
                  <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgb(200,200,200)",
                    borderRadius:4,
                    
                    overflow:'hidden',
                    
                  }}>

                  </View>
                </Swiper> */}
          
            {/* </View> */}
           
            <View style={{flexDirection:'column'}}>
              
            {/* <TouchableOpacity
              onPress={()=>{
                //console.log('carousel pressed')
                XAlign()
              }}
              activeOpacity={1}
            >    */}
              {/* <section id="download">
                <Animated.View
                  ref={heightRef}
                  style={{
                    height:"100vh",
                    //height:partHeight,
                    width:"100%",
                    padding:15,
                    overflow:'hidden',
                    backgroundColor:'transparent',
                    backgroundImage: 'radial-gradient(farthest-corner at 100% 100%,rgb(242,235,242),white)'
                  }}
                >
                   
                  <View 
                    style={{
                      height:"100%",
                      width:"100%",
                      zIndex:0,
                      backgroundImage:'url('+process.env.PUBLIC_URL+"./images/computerdesk2.jpg"+')',
                      backgroundRepeat:'no-repeat',
                      backgroundSize:'cover',
                      backgroundPosition:'center',
                      borderColor:'#aaa',
                      borderStyle:'solid',
                      overflow:'hidden',
                      boxSizing:"border-box",
                      shadowColor:'black',
                      shadowOpacity:0.25,
                      shadowRadius:2,
                      shadowOffset:{
                        width:0,
                        height:0
                      },
                      elevation:2
                    }}
                  >
                    <Animated.Image
                      source={{
                        uri: process.env.PUBLIC_URL+"./images/computerdesk2.jpg"
                      }}
                      style={{
                        width:'100vw',
                        height:height+extraHeight,
                        alignItems:'center',
                        justifyContent:'center',
                        zIndex:-1,
                        backgroundRepeat:'no-repeat',
                        backgroundSize:'cover',
                        backgroundPosition:'center',
                        transform:[{
                          translateX:0,
                      },
                      {
                          translateY:YParallax
                      },
                    ],
                      }}
                    />
                    <View
                      style={{
                        height:height,
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:'tranparent',
                        transform:[{
                          translateX:0,
                      },
                      {
                          translateY:-(height+extraHeight)
                      },
                    ], 
                      }}
                    >
                    <View>
                      <Text
                        style={{
                          textDecorationLine:'none',
                          color:'white',
                          fontWeight:'700',
                          fontSize: 15,
                          textShadowColor: 'rgba(0, 0, 0, 1)',
                          textShadowOffset: {width: 0, height: 0},
                          textShadowRadius: 2,
                          margin:15,
                          textAlign:'center',
                          alignItems:'center',
                          justifyContent:'center',
                          flexDirection:'row',
                        }}
                      >
                        SQUWBS VST & AU
                      </Text>

                    
                    <View style={{
                        height:33,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'transparent',
                        
                    }}>

                      <View 
                      
                      style={{ 
                        height:30,
                        width:150,
                        backgroundColor:'white',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center',
                        borderColor:'lightgrey',
                        borderStyle:'solid',
                        overflow:'hidden',
                        boxSizing:"border-box",
                        shadowColor:'#000',
                        shadowOpacity:0.85,
                        shadowRadius:2,
                        shadowOffset:{
                        width:0,
                        height:0
                        },
                        elevation:2
                    }} 
                    >
                      <View
                        className='ClickOpacity'
                        style={{
                          backgroundColor:'transparent'
                          
                        }}
                      >
                      <View
                          
                          style={{
                            zIndex:100,
                            display:'absolute',
                            top:0,
                            width:150,
                            height:30,
                            
                            backgroundColor:'white',
                            justifyContent:'center',
                            alignItems:'center',
                            pointerEvents:'none',
                            overflow:'hidden'
                          }}
                        >
                          <View
                            style={{
                              pointerEvents:'none',
                              flexDirection:'row',
                              justifyContest:'center',
                              alignItems:'center'
                            }}
                          >
                              <Text 
                                
                              selectable={false} 
                              style ={{
                                  fontSize: 20,
                                  fontWeight:'700',
                                  textDecorationLine:'none',
                                  color:'rgb(196,196,196)',
                                  
                                  textShadowColor: 'rgba(0, 0, 0, 0.85)',
                                  textShadowOffset: {width: 0, height: 0},
                                  textShadowRadius: 2,
                                  textAlign:'center',
                                  alignItems:'center',
                                  justifyContent:'center',
                                  flexDirection:'row',
                                  margin:5,
                                  pointerEvents:'none'
                              }}>
                                  <i class="fab fa-paypal"></i>
                              </Text>
                              <Text
                                selectable={false} 
                                style ={{
                                    fontSize: 13,
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
                                    margin:5,
                                    pointerEvents:'none'
                                }}
                              >
                                Paypal
                              </Text>
                            </View>
                        </View>
                        <View
                          
                          style={{
                            zIndex:'0',
                            position:'absolute',
                            top:0,
                            pointerEvents:'auto',
                            shadowOpacity: 0.75,
                            shadowRadius: 5,
                            shadowColor: 'red',
                            shadowOffset: { height: 0, width: 0 }
                          }}
                        >
                      
                        <PayPalButton
                          paypalOptions={{
                            clientId:"AX-RoA6udFnBXtye_ygrvAlQD6EOWSEzu4v8j7ijKmNT7GWTonG_HF93Z_YOJILjl0NGE4v12YxJ0Lkd",
                            intent:'capture'
                          }}
                          buttonStyles={{
                            layout:'horizontal',
                            shape:'rect',
                            color:'white',
                            tagline:true,
                            
                          }}
                          amount={9.99}
                          onApprove={(data,authId)=>{
                            console.log('onApprove')
                          }}
                          onPaymentSuccess={(data)=>{
                            console.log('onPaymentSuccess')
                          }}
                          />
                        </View>
                    </View>
                    </View>
                </View>  
                  </View>
                  </View>
                  </View>
                </Animated.View>
              </section> */}
            {/* </TouchableOpacity>  */}
            {/* <TouchableOpacity
              onPress={()=>{
                //console.log('carousel pressed')
                XAlign()
              }}
              activeOpacity={1}
            >  */}
              <section id="testDownloadLink">
                {/* <a style={{
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
                  textAlign:'center',
                  height:"100%",
                  width:'100%'
                }} href="/#testDownloadLink"> */}
                <Animated.View
                  ref={heightRef}
                  style={{
                    height:"100vh",
                    //height:partHeight,
                    width:"100%",
                    padding:15,
                    
                    backgroundColor:'white',
                    justifyContent:'center',
                    alignItems:'center',

                    
                    backgroundImage: 'radial-gradient(farthest-corner at 0% 100%,rgb(186,214,227),rgb(242,235,242))'
                  }}
                >
                  <View 
                    style={{
                      height:"100%",
                      width:"100%",
                      // justifyContent:'center',
                      // alignItems:'center',
                      zIndex:0,
                      //backgroundColor:'rgb(135,135,135)',
                      backgroundColor:'transparent',
                      //borderRadius:4,
                      //borderBottom:2,
                      //borderTop:1,
                      borderColor:'#aaa',
                      borderStyle:'solid',
                      overflow:'hidden',
                      boxSizing:"border-box",
                      shadowColor:'black',
                      shadowOpacity:0.25,
                      shadowRadius:2,
                      shadowOffset:{
                        width:0,
                        height:0
                      },
                      elevation:2,
                      //backgroundImage:'radial-gradient(farthest-corner at -300% 400%,rgb(137,137,137),white)',
                      //backgroundImage:'radial-gradient(farthest-corner at -100% 100%,white,rgb(186,214,227))',
                      backgroundRepeat:'no-repeat',
                      backgroundSize:'cover',
                      backgroundPosition:'center',
                      //backgroundImage:'url('+process.env.PUBLIC_URL+"./images/mic.jpg"+')',
                      overflow:'hidden',
                    }}
                  >
                    <View
                      style={{
                        height:height,
                        width:'100%',
                        overflow:'hidden'
                      }}
                    >
                      <Animated.Image
                        source={{
                          uri: process.env.PUBLIC_URL+"./images/mic.jpg"
                        }}
                        style={{
                          width:'100vw',
                          //height:height+150,
                          height:height+extraHeight,
                          //height:'100vh',
                          //objectFit:'cover',
                          alignItems:'center',
                          justifyContent:'center',
                          
                          //backgroundImage:'url('+process.env.PUBLIC_URL+"./images/club1.jpg"+')',
                        // opacity:0.3,
                        //backgroundColor:'magenta',
                          zIndex:-1,
                          backgroundRepeat:'no-repeat',
                          backgroundSize:'cover',
                          backgroundPosition:'center',
                          transform:[{
                            translateX:-15,
                        },
                        {
                            //translateY:-(((currentY%height)*(150/2))/height)
                            translateY:YParallax
                            //translateY:getInterpolate(YParallax,height,150)
                        },
                      
                      
                      ],
                        }}
                      />
                    </View>
                    <View
                      style={{
                        justifyContent:'center',
                        alignItems:'center',
                        height:height,
                        width:"100%",
                        backgroundColor:'transparent',
                        transform:[{
                          translateX:0,
                      },
                      {
                          translateY:-(height)
                          
                      },
                    
                    
                    ],
                      
                      }}
                    >
                      <DLLink/>
                    </View>
                    
                  </View>
                </Animated.View>
                {/* </a> */}
              </section>
            {/* </TouchableOpacity>  */}
            {/* <TouchableOpacity
              onPress={()=>{
                //console.log('carousel pressed')
                XAlign()
              }}
              activeOpacity={1}
            >  */}


      {/* this part needs to be reimplemented */}
              <section id="sound">
                
                <Animated.View 
                ref={heightRef}
                style={{

                  height:"100vh",
                  //height:partHeight,
                  width:"100%",
                  padding:15,
                  zIndex:0,
                  alignContent:'center',
                  justifyContent:'center',
                  overflow:'hidden',
                  //backgroundColor:'rgb(229,154,198)',
                  //backgroundColor:'white',
                  padding:15,
                  backgroundImage: 'radial-gradient(farthest-corner at 0% 0%,rgb(186,214,227),white)'
                  }}
                >
                  <View 
                    style={{
                      height:"100%",
                      width:"100%",
                      //justifyContent:'center',
                      //alignItems:'center',
                      zIndex:0,
                      // marginTop:15,
                      // marginBottom:15,
                      // marginLeft:15,
                      // marginRight:15,
                      //backgroundColor:'rgb(135,135,135)',
                      //backgroundColor:'transparent',
                      //backgroundImage: 'radial-gradient(farthest-corner at 50% 50%,rgb(186,214,227),rgb(229,154,198))',
                      //backgroundImage: 'radial-gradient(farthest-corner at 50% 50%,rgb(186,214,227),white)',
                      //backgroundImage:'radial-gradient(farthest-corner at 0% 100%,rgb(242,235,242),rgb(186,214,227))',
                      //borderRadius:4,
                      //borderBottom:2,
                      //borderTop:1,
                      backgroundRepeat:'no-repeat',
                      backgroundSize:'cover',
                      backgroundPosition:'center',
                      //backgroundImage:'url('+process.env.PUBLIC_URL+"./images/club2.jpg"+')',
                      backgroundColor:'transparent',
                      borderColor:'#aaa',
                      borderStyle:'solid',
                      overflow:'hidden',
                      boxSizing:"border-box",
                      shadowColor:'black',
                      shadowOpacity:0.25,
                      shadowRadius:2,
                      shadowOffset:{
                        width:0,
                        height:0
                      },
                      elevation:2
                    }}
                  >
                    <View
                      style={{
                        height:height,
                        width:'100%',
                        overflow:'hidden'
                      }}
                    >
                    <Animated.Image
                        source={{
                          uri: process.env.PUBLIC_URL+"./images/club2.jpg"
                        }}
                        style={{
                          width:'100vw',
                          //height:height+150,
                          height:height+extraHeight,
                          //height:'100vh',
                          //objectFit:'cover',
                          alignItems:'center',
                          justifyContent:'center',
                          
                          //backgroundImage:'url('+process.env.PUBLIC_URL+"./images/club1.jpg"+')',
                        // opacity:0.3,
                        //backgroundColor:'magenta',
                          zIndex:-1,
                          backgroundRepeat:'no-repeat',
                          backgroundSize:'cover',
                          backgroundPosition:'center',
                          transform:[{
                            translateX:-15,
                        },
                        {
                            //translateY:-(((currentY%height)*(150/2))/height)
                            translateY:YParallax
                            //translateY:getInterpolate(YParallax,height,150)
                        },
                      
                      
                      ],
                        }}
                      />
                      </View>
                    <View
                      style={{
                        height:height,
                        width:'100%',
                        alignItems:'center',
                        justifyContent:'center',

                        transform:[{
                          translateX:0,
                        },
                        {
                          
                            translateY:-(height)
                          
                        },
                        
                      
                      ],
                      zIndex:100,
                      }}
                    >
                      <Sound/>
                    </View>
                  </View>
                </Animated.View>
               
              </section>
            {/* </TouchableOpacity>  */}
            {/* <TouchableOpacity
              onPress={()=>{
                //console.log('carousel pressed')
                XAlign()
              }}
              activeOpacity={1}
            >  */}
             
             
              <section id="contact">
                {/* <a style={{
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
                  textAlign:'center',
                  height:"100%",
                  width:'100%'
                }} href="/#contact"> */}
                <Animated.View
                  ref={heightRef}
                  style={{
                    //height:"100vh",
                    height:165,
                    //height:partHeight,
                    width:"100%",
                    //padding:15,
                    
                    //backgroundColor:'transparent',
                    justifyContent:'center',
                    alignItems:'center',
                    //backgroundImage:'radial-gradient(farthest-corner at -100% 100%,white,rgb(186,214,227))',
                    backgroundColor:'white',
                    borderColor:'#aaa',
                      borderStyle:'solid',
                      overflow:'hidden',
                      boxSizing:"border-box",
                      // shadowColor:'black',
                      // shadowOpacity:0.25,
                      // shadowRadius:2,
                      // shadowOffset:{
                      //   width:0,
                      //   height:0
                      // },
                      // elevation:2,
                  }}
                >
                  <View 
                    style={{
                      //height:"100%",
                      height:165,
                      width:"100%",
                      justifyContent:'center',
                      alignItems:'center',
                      zIndex:0,
                      backgroundColor:'transparent',
                      //borderRadius:4,
                      //borderBottom:2,
                      //borderTop:1,
                      
                      //backgroundImage:'radial-gradient(farthest-corner at -400% 400%,rgb(137,137,137),white)',
                      // backgroundImage:'radial-gradient(farthest-corner at -100% 100%,white,rgb(186,214,227))',
                    }}
                  >
                    <Contact/>
                  </View>
                </Animated.View>
                {/* </a> */}
              </section>
            {/* </TouchableOpacity>  */}
            
              {/* <section id="kakao">
                <Animated.View
                  ref={heightRef}
                  style={{
                    height:"100vh",
                    //height:partHeight,
                    width:"100%",
                    padding:15,
                    
                    backgroundColor:'white',
                    justifyContent:'center',
                    alignItems:'center',
                  }}
                >
                  <View 
                    style={{
                      height:"100%",
                      width:"100%",
                      justifyContent:'center',
                      alignItems:'center',
                      zIndex:0,
                      //backgroundColor:'rgb(135,135,135)',
                      backgroundColor:'white',
                      borderRadius:4,
                      //borderBottom:2,
                      //borderTop:1,
                      borderColor:'#aaa',
                      borderStyle:'solid',
                      overflow:'hidden',
                      boxSizing:"border-box",
                      shadowColor:'black',
                      shadowOpacity:0.25,
                      shadowRadius:2,
                      shadowOffset:{
                        width:0,
                        height:0
                      },
                      elevation:2
                    }}
                  >
                    
                    <Kakao/>
                  </View>
                </Animated.View>
              </section> */}
              {/* <section id="message">
                <Animated.View
                  ref={heightRef}
                  style={{
                    height:"100vh",
                    //height:partHeight,
                    width:"100%",
                    padding:15,
                    
                    backgroundColor:'white',
                    justifyContent:'center',
                    alignItems:'center',
                  }}
                >
                  <View 
                    style={{
                      height:"100%",
                      width:"100%",
                      justifyContent:'center',
                      alignItems:'center',
                      zIndex:0,
                      //backgroundColor:'rgb(135,135,135)',
                      backgroundColor:'white',
                      borderRadius:4,
                      //borderBottom:2,
                      //borderTop:1,
                      borderColor:'#aaa',
                      borderStyle:'solid',
                      overflow:'hidden',
                      boxSizing:"border-box",
                      shadowColor:'black',
                      shadowOpacity:0.25,
                      shadowRadius:2,
                      shadowOffset:{
                        width:0,
                        height:0
                      },
                      elevation:2
                    }}
                  >
                    <Message/>
                    
                  </View>
                </Animated.View>
              </section> */}
              {/* <View
                style={{
                  height:125,
                  // backgroundColor:'rgb(135,135,135)'
                  backgroundColor:'white'
                }}
              >
              </View> */}
            
            
              
              {/* <View
                style={{
                  height:125,
                  // backgroundColor:'rgb(135,135,135)'
                  backgroundColor:'white'
                }}
              >
              </View> */}
              {/* <section id="PDF">
                <Animated.View 
                  ref={heightRef}
                  style={{
                    height:"100vh",
                    //height:partHeight,
                    zIndex:0,
                    backgroundColor:'transparent',
                    alignItems:'center',
                    justifyContent:'center',
                    
                }}>
                  
                  <ReadPDF/>
                </Animated.View>
              </section> */}
              {/* <section id="cards">
                <Animated.View 
                  ref={heightRef}
                  style={{
                  height:"100vh",
                  //height:partHeight,
                  zIndex:0,
                  backgroundColor:'white',
                  alignContent:'center',
                  justifyContent:'center',
                  overflow:'hidden',
                  // borderWidth:1,
                  // borderColor:'rgb(135,135,135)',
              }}>
                  <WordDeckWrapper/>
                </Animated.View>
              </section> */}
              {/* <section id="uploadwords">
                <Animated.View
                  ref={heightRef}
                  style={{
                    height:"100vh",
                    //height:partHeight,
                    width:"100%",
                    padding:15,
                    
                    backgroundColor:'rgb(135,135,135)',
                    justifyContent:'center',
                    alignItems:'center',
                  }}
                >
                  <View 
                    style={{
                      height:"100%",
                      width:"100%",
                      justifyContent:'center',
                      alignItems:'center',
                      zIndex:0,
                      backgroundColor:'white',
                      borderRadius:4,
                      //borderBottom:2,
                      //borderTop:1,
                      borderColor:'#aaa',
                      borderStyle:'solid',
                      overflow:'hidden',
                      boxSizing:"border-box",
                      shadowColor:'black',
                      shadowOpacity:0.25,
                      shadowRadius:2,
                      shadowOffset:{
                        width:0,
                        height:0
                      },
                      elevation:2
                    }}
                  >
                    <UploadWords/>
                  </View>
                </Animated.View>
              </section> */}
              
              {/* {state.headerOpen&& */}
                {/* <View
                  ref={bottomRef}
                  style={{
                    height:50,
                    width:'100vw',
                    backgroundColor:'transparent'
                  }}
                  >
                  <Text
                    style={{
                      color:'transparent'
                    }}
                  > bars</Text>
                </View> */}
              {/* } */}
              
            </View>
          
        </View>
      </Animated.ScrollView>
    </View>
    )
  }

     

}
export default SwipeableScroller


// class SwipeableScroller extends Component {
//   //static context = Context
//   //const [state, setState] = useContext(Context);
//   constructor(props) {
//       super(props);
//       //this.scroller=React.createRef()
//       //this.Header=React.createRef()
//       this.state = {
//           yscroll: new Animated.Value(0),
//           dy:new Animated.Value(0),
//           lastscroll:0,
//           scroll:0,
//           headerheight:22,
//           change:0
//       };
//     }
//   componentDidMount(){
//       translateY.addListener(({value})=>{
//           console.log(value)
//           //this.setState({...this.state,scroll:value})
//           // var limit=this.state.headerheight
//           //   this.setState({scroll:value})
//           //   if(value<=limit){
//           //     this.setState({change:(limit*(value/limit))})
//           //     console.log(limit*(value/limit))
//           //   }
          
//           //this.Header.setNativeProps({scrollValue:value})
//           // this.scroller.current.scrollTo({
//           //     y:-1*value
//           // })
//           //console.log(this.Header)
//           //this.Header.props.yscroll=value
//       })
//   }
//   onScroll=(e)=>{
//       //const [state, setState] = this.context
//       //console.log()
//       //console.log(e.nativeEvent.contentOffset.y)
//       //setState({...state,yscroll:e.nativeEvent.contentOffset.y})
//       translateY.setValue(e.nativeEvent.contentOffset.y)
//       //setState({...state,yscroll:e.nativeEvent.contentOffset.y})
      
//       //console.log(state.yscroll)
//     }
//   // _panResponder = PanResponder.create({
//   //     onMoveShouldSetResponderCapture: () => true,
//   //     onMoveShouldSetPanResponderCapture: () => true,
//   //     onPanResponderMove: (e,gestureState)=>{
//   //         translateY.setValue(this.state.lastscroll+gestureState.dy)

//   //         // this.scroller.current.scrollTo({
//   //         //     y:-1*this.state.lastscroll+translateY._value,
//   //         //     animated:true,
//   //         //     duration:1
//   //         // })
          
//   //     },

//   //     onPanResponderRelease: (e, {vy, dy}) => {
//   //         //translateY.setValue(state.yscroll._value+dy)
//   //         //console.log(this.state.yscroll+translateY._value)
//   //         this.setState(
//   //             (state,props)=>(
//   //                 {
//   //                     ...this.state,
//   //                     lastscroll:state.lastscroll+dy}
//   //             ))
//   //         //console.log(this.state.yscroll)
//   //     }
//   // });

//   render(){
//       //const [{yscroll},setState]= this.context
//       //setState()
//       //console.log(this.context)
      
//       return(
         
//           <View>
//           {/* <Header ref = {header=>{this.Header=header}} style = {{height:22}} yscroll={this.state.scroll}/> */}
//           <ScrollView 
//               //ref={this.scroller}
//               style={{backgroundColor:'transparent',height:(Dimensions.get('window').height*13/15-60),zIndex:98}}
//               onScroll={(e)=>{
//                 // setState({
//                 //   yscroll:e.nativeEvent.contentOffset.y
//                 // })
//                 // console.log(yscroll)
//                   this.onScroll(e)
//                 }
//               }
//               //onScroll={}
//               //scrollTop={state.yscroll}
//               scrollEnabled={false}
//               scrollEventThrottle={16}
//               // {...this._panResponder.panHandlers}
//           >
          
//           <View style={{backgroundColor:'transparent',flex:1,flexDirection:'column',margin:0,paddingRight:0,paddingLeft:0}}>
//               {/* {props.children} */}
              
//               <View style={{backgroundColor:'transparent',flex:1,height:Dimensions.get('window').height*2/3,flexDirection:'column',margin:0,paddingRight:0,paddingLeft:0}}>
              
//         <View  style={{height:Dimensions.get('window').height/6,width:Dimensions.get('window').width-2}}>
        
//           <Swiper buttonsEnabled={false} loop={true} autoplayTimeout={5}>

//             <View style={{
//               flex: 1,
//               alignItems: "center",
//               justifyContent: "center",
//               backgroundColor: "rgb(20,20,20)",
//               textAlaign:'center',
//               borderRadius:4,
              
//               overflow:'hidden',
              
//               }}>
//                 {/* <Text style={{           
//                   textDecorationLine:'none',
//                   color:'white',
//                   fontSize: 12,
//                   textShadowColor: 'rgba(128, 128, 128, 1)',
//                   textShadowOffset: {width: 0, height: 0},
//                   textShadowRadius: 8,
//                   flex:1,
//                   // textAlign:'center',
//                   // alignItems:'center',
//                   // justifyContent:'center',
//                   // flexDirection:'row',
//                 }}>Slide 1</Text> */}
//             </View>
//             <View style={{
//               flex: 1,
//               alignItems: "center",
//               justifyContent: "center",
//               backgroundColor: "rgb(110,110,110)",
              
//               borderRadius:4,
//               overflow:'hidden',
              
//             }}>

//                 {/* <Text style={{           
//                   textDecorationLine:'none',
//                   color:'white',
//                   fontSize: 12,
//                   textShadowColor: 'rgba(128, 128, 128, 1)',
//                   textShadowOffset: {width: 0, height: 0},
//                   textShadowRadius: 8,
//                   flex:1,
//                   textAlign:'center',
//                   // alignItems:'center',
//                   // justifyContent:'center',
//                   // flexDirection:'row',
//                 }}>Slide 2</Text> */}
//             </View>
//             <View style={{
//               flex: 1,
//               alignItems: "center",
//               justifyContent: "center",
//               backgroundColor: "rgb(200,200,200)",
//               borderRadius:4,
             
//               overflow:'hidden',
             
//             }}>
//                 {/* <Text style={{           
//                   textDecorationLine:'none',
//                   color:'white',
//                   fontSize: 12,
//                   textShadowColor: 'rgba(128, 128, 128, 1)',
//                   textShadowOffset: {width: 0, height: 0},
//                   textShadowRadius: 8,
//                   flex:1,
//                   textAlign:'center',
//                   alignItems:'center',
//                   justifyContent:'center',
//                   // flexDirection:'row',
//                 }}>Slide 3</Text> */}
//             </View>
//           </Swiper>
//         </View>

//         </View>
//         <View style={{height:Dimensions.get('window').height/2}}>
//           <SwipeableList/>
//         </View>
//           </View>
//       </ScrollView>
//       </View>
//       )
//    }

// }
// export default SwipeableScroller


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
  const responded= await fetch('https://squwbs.herokuapp.com/readCookies',{mode:'cors'})
  const userCookie = await responded.json()
  console.log('userCookie : '+stringifyObject(userCookie))
}

let currentY=0
//const prevY=new Animated.Value(0)
let prevY=0
let buffer=[0,0]
const yScroll = new Animated.Value(0)
const SwipeableScroller = (props) => {
  
  const [state, setState] = useContext(Context);
  const [height,setHeight]=useState(0)
  const [paypalID,setpaypalID] = useState("AX-RoA6udFnBXtye_ygrvAlQD6EOWSEzu4v8j7ijKmNT7GWTonG_HF93Z_YOJILjl0NGE4v12YxJ0Lkd")
  const heightRef = useRef('')
  
  useEffect(()=>{
    yScroll.addListener(({value})=>{
      //console.log(state.yscroll)
      //console.log(value)
      setState({...state,yscroll:value})
      //global.header=value
    })
    //window.addEventListener("resize", updateDimensions);
    //window.addEventListener('orientationchange', updateDimensions)
    Dimensions.addEventListener('change',(e)=>{
      updateDimensions()
    })
    updateDimensions()
    //setHeight(Math.floor(Dimensions.get('window').height))
    // fetch(withQuery('https://squwbs.herokuapp.com/getpaypalliveid', {
    //   //fetch(withQuery('https://squwbs.herokuapp.com/getpaypalsandboxid', {
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

    // fetch(withQuery('https://squwbs.herokuapp.com/info', {
    //   //fetch(withQuery('https://squwbs.herokuapp.com/getpaypalsandboxid', {
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

  },[])
  useEffect(()=>{
    //console.log('height changed!')
    //console.log(Dimensions.get('window').height)
  },[height])
  const updateDimensions=()=>{
    setHeight(Math.floor(Dimensions.get('window').height))
    //style.height=Math.floor(Dimensions.get('window').height)
    //console.log('dimensions update')
    
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
          stiffness:100
         //speed:12,
        
         }
      ).start()
    }
    else{
      Animated.spring(yScroll,
        {
          toValue: 0,
          overshootClamping:true,
          stiffness:100
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
    //setState({...state,translateY:translateYInterp})
    //setState({...state,yscroll:yScroll})
    //setState
    prevY=currentY
    
  }
  return(
           
  <View>
    <ScrollView 
      // style={{backgroundColor:'transparent',height:(Dimensions.get('window').height*13/15-60),zIndex:98}}
      style={{backgroundColor:'transparent',height:height-50,zIndex:98}}
      onScroll={(e)=>{
          onScroll(e)
        }
      }
      scrollEnabled={true}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={true}
      snapToInterval={height-50}
      snapeToAlignment='end'
      decelerationRate="fast"
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
        <section id="slider"
          ref={heightRef}
          style={{
            //height:"38vh",
            height:height-50,
            width:"100vw",
            backgroundColor:'white',
            textAlign:'center'
          }}
        >
          <Carousel 
            
            showArrows={true} 
            showStatus={false} 
            showIndicators={false}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={4500}
            transitionTime={500}
            //emulateTouch={true}
            stopOnHover={true}
            //swipeScrollTolerance={1}
            useKeyboardArrows={true}
            //centerSlidePercentage={10}
          >
            <div 
            ref={heightRef}
            style={{
              //height:"38vh",
              
              height:height-50,
              width:"100vw",
              backgroundSize: '100% 100%',
              //backgroundColor:'rgb(250,250,250)',
              backgroundColor:'rgb(211,211,211)',
              textAlign:'center',
              
              backgroundRepeat:"no-repeat",
              }}>
                <View
                  style={{
                    width:"100%",
                    height:"100%",
                    backgroundColor:'transparent',
                    justifyContent:'center',
                    alignItems:'center',
                    // backgroundColor:'orange',
                    padding:25,
                  }}
                >
                {/* <div
                  style={{
                    height:'100%',
                    width:'100%',
                    
                  }}
                >
                </div> */}
                {/* <img src={process.env.PUBLIC_URL+"./wbgf.gif"} />  */}
                {/* <p className="legend">1</p> */}
                <Fade>
                <a 
                  style={{
                    textDecorationLine:'none',
                    
                  }}
                  href='#download'
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
                      
                    }}
                  >
                    Get the Sound You Want
                  </Text>
                  
                </a>
                  </Fade>
                </View>
            </div>
            <div 
              ref={heightRef}
              style={{
                //height:"38vh",
                height:height-50,
                width:"100vw",
                //backgroundImage:"url("+process.env.PUBLIC_URL+"/images/wbgf.gif"+")",
                // textAlign:'center',
                backgroundSize: '100% 100%',
                backgroundColor:'rgb(250,250,250)',
                textAlign:'center',
               //backgroundImage:"url("+process.env.PUBLIC_URL+"/images/highlightcamo.gif"+")",
                backgroundRepeat:"no-repeat",
              }}
            >
              <View
                  style={{
                    width:"100%",
                    height:"100%",
                    backgroundColor:'transparent',
                    justifyContent:'center',
                    alignItems:'center',
                    padding:25,
                  }}
                >
                {/* <div
                  style={{
                    height:'100%',
                    width:'100%',
                    
                  }}
                >
                </div> */}
                {/* <img src={process.env.PUBLIC_URL+"./wbgf.gif"} />  */}
                {/* <p className="legend">1</p> */}
                <Fade>
                  <a 
                     style={{
                      textDecorationLine:'none'
                    }}
                    href='#download'
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
            
                        textAlign:'center',
                        alignItems:'center',
                        justifyContent:'center',
                        flexDirection:'row',
                      }}
                    >
                    Your Idea To A Song In Minutes  
                    </Text>
                  </a>
                </Fade>
                </View>
                {/* <img src="assets/2.jpeg" /> */}
                {/* <p className="legend">2</p> */}
            </div>
            <div 
              ref={heightRef}
              style={{
                //height:"38vh",
                height:height-50,
                width:"100vw",
                
                backgroundColor:'rgb(255,255,255)',
                textAlign:'center'
              }}
            >
              <View
                  style={{
                    width:"100%",
                    height:"100%",
                    backgroundColor:'transparent',
                    justifyContent:'center',
                    alignItems:'center',
                    padding:25,
                  }}
                >
                {/* <div
                  style={{
                    height:'100%',
                    width:'100%',
                    
                  }}
                >
                </div> */}
                {/* <img src={process.env.PUBLIC_URL+"./wbgf.gif"} />  */}
                {/* <p className="legend">1</p> */}
                  <Fade>
                  <a 
                    style={{
                      textDecorationLine:'none'
                    }}
                    href='#download'
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
          
                      textAlign:'center',
                      alignItems:'center',
                      justifyContent:'center',
                      flexDirection:'row',
                    }}
                  >
                    
                    Available in Mac & PC
                  </Text>
                  </a>
                  </Fade>
                </View>
                {/* <img src="assets/3.jpeg" /> */}
                {/* <p className="legend">3</p> */}
            </div>
          </Carousel>
        </section>
        <View style={{flexDirection:'column'}}>
          
          
          <section id="download">
            <View
              ref={heightRef}
              style={{
                //height:"100vh",
                height:height-50,
                width:"100%",
                padding:15,
                
                backgroundColor:'rgb(211,211,211)',
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
                <Text
                    //className='Unselectable'
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
                  {/* <GooglePay/> */}
                  {/* <div
                    style={{
                      marginBottom:13
                    }}
                    /> */}
                {/* <PayPalButton
                  amount="9.99"
                  options={{clientId: ''}}
                  onSuccess={(details, data) => {
                    alert("Transaction completed by " + details.payer.name.given_name);
          
                    // OPTIONAL: Call your server to save the transaction
                    // return fetch("/paypal-transaction-complete", {
                    //   method: "post",
                    //   body: JSON.stringify({
                    //     orderID: data.orderID
                    //   })
                    // });
                  }}
                /> */}
                <PayPalButton
                  paypalOptions={{
                    
                    //clientId:paypalID,
                    //clientId:NODE_ENV.PAYPAL_LIVE_CLIENT_ID,
                    clientId:"AX-RoA6udFnBXtye_ygrvAlQD6EOWSEzu4v8j7ijKmNT7GWTonG_HF93Z_YOJILjl0NGE4v12YxJ0Lkd",
                    intent:'capture'
                  }}
                  buttonStyles={{
                    layout:'horizontal',
                    // layout:'vertical',
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
                {/* <StripeProvider apiKey="">
                  <MyStoreCheckout/>
                </StripeProvider> */}
                  {/* <MyStoreCheckout/> */}
                  
              </View>
            </View>
          </section>
           
          <section id="testDownloadLink">
            <View
              ref={heightRef}
              style={{
                //height:"100vh",
                height:height-50,
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
                  backgroundColor:'rgb(211,211,211)',
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
                <DLLink/>
              </View>
            </View>
          </section>
          <section id="sound">
            <View 
            ref={heightRef}
            style={{
              height:height-50,
              zIndex:0,
              alignContent:'center',
              justifyContent:'center',
              overflow:'hidden',
              }}
            >
              {/* <SwipeableList/> */}
              <Sound/>
            </View>
          </section>
         
          <section id="follow">
            <View
              ref={heightRef}
              style={{
                //height:"100vh",
                height:height-50,
                width:"100%",
                padding:15,
                
                backgroundColor:'rgb(211,211,211)',
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
                  shadowColor:'#000',
                  shadowOpacity:0.25,
                  shadowRadius:2,
                  shadowOffset:{
                    width:0,
                    height:0
                  },
                  elevation:2
                }}
              >
                <Instagram/>
              </View>
            </View>
          </section>
          <section id="contact">
            <View
              ref={heightRef}
              style={{
                //height:"100vh",
                height:height-50,
                width:"100%",
                padding:15,
                
                backgroundColor:'transparent',
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
                  backgroundColor:'rgb(211,211,211)',
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
                <Contact/>
              </View>
            </View>
          </section>
         
          {/* <View
            style={{
              height:125,
              // backgroundColor:'rgb(211,211,211)'
              backgroundColor:'white'
            }}
          >
          </View> */}
        
        
          
          {/* <View
            style={{
              height:125,
              // backgroundColor:'rgb(211,211,211)'
              backgroundColor:'white'
            }}
          >
          </View> */}
          <section id="PDF">
            <View 
              ref={heightRef}
              style={{
                //height:"100vh",
                height:height-50,
                zIndex:0,
                backgroundColor:'transparent',
                alignItems:'center',
                justifyContent:'center',
                
            }}>
              
              <ReadPDF/>
            </View>
          </section>
          <section id="cards">
            <View 
              ref={heightRef}
              style={{
              //height:"100vh",
              height:height-50,
              zIndex:0,
              backgroundColor:'white',
              alignContent:'center',
              justifyContent:'center',
              overflow:'hidden',
              // borderWidth:1,
              // borderColor:'rgb(211,211,211)',
          }}>
              <WordDeckWrapper/>
            </View>
          </section>
          <section id="uploadwords">
            <View
              ref={heightRef}
              style={{
                //height:"100vh",
                height:height-50,
                width:"100%",
                padding:15,
                
                backgroundColor:'rgb(211,211,211)',
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
            </View>
          </section>
        </View>
      
    </View>
  </ScrollView>
</View>
)
     

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

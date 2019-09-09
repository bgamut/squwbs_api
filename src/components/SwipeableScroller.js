
import React,{Component,useContext,useEffect} from 'react';
import {Animated,PanResponder,Dimensions,View,Text,Image,TouchableOpacity,ScrollView} from 'react-native'
import { Context } from "../context";
import Swiper from './Swiper'
import SwipeableList from './SwipeableList'
import Header from './Header'
import ReadPDF from './ReadPDF'
import WordDeckWrapper from './WordDeckWrapper'
import Sound from './Sound'
import Instagram from './Instagram'
//import {Slider,Slide,Caption,Card} from 'react-materialize'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
// const translateY = new Animated.Value(0);

let currentY=0
//const prevY=new Animated.Value(0)
let prevY=0
const yScroll = new Animated.Value(0)
const SwipeableScroller = (props) => {
  const [state, setState] = useContext(Context);
  
  
  useEffect(()=>{
    yScroll.addListener(({value})=>{
      //console.log(state.yscroll)
      //console.log(value)
    })
  },[])
  const onScroll=(e)=>{
    
    //console.log(e.nativeEvent.contentOffset.y)
    currentY=(e.nativeEvent.contentOffset.y)
    //console.log(yScroll._value+prevY-currentY)
    yScroll.setValue(yScroll._value+prevY-currentY)
    // const ANIMATION_INTERPOLATE =currentY.interpolate(
    //   {
    //       inputRange:[0,50,100],
    //       outputRange:[0,50,50]
    //   }
    // )
    //setState({...state,yscroll:ANIMATION_INTERPOLATE})
    //prevY.setValue(e.nativeEvent.contentOffset.y)
    state.yscroll.setValue(yScroll._value)
    let translateYInterp = state.yscroll.interpolate(
      {
          inputRange:[0,50,51,100],
          outputRange:[0,50,50,50]
      }
    )
    setState({...state,translateY:translateYInterp})
    //setState({...state,yscroll:yScroll})
    prevY=e.nativeEvent.contentOffset.y
    
  }
  return(
           
  <View>
    <ScrollView 
      // style={{backgroundColor:'transparent',height:(Dimensions.get('window').height*13/15-60),zIndex:98}}
      style={{backgroundColor:'transparent',height:"100vh",zIndex:98}}
      onScroll={(e)=>{
          // onScroll(e)
        }
      }
      scrollEnabled={true}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={true}

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
          style={{
            height:"38vh",
            width:"100vw",
            backgroundColor:'white',
            textAlign:'center'
          }}
        >
          <Carousel 
            
            showArrows={false} 
            showStatus={false} 
            showIndicators={false}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}
            transitionTime={750}
            emulateTouch={true}
          >
            <div style={{
              height:"38vh",
              width:"100vw",
              backgroundColor:'darkGrey',
              textAlign:'center'
              }}>
                {/* <img src="assets/1.jpeg" /> */}
                {/* <p className="legend">1</p> */}
            </div>
            <div 
              style={{
                height:"38vh",
                width:"100vw",
                backgroundColor:'grey',
                textAlign:'center'
              }}
            >
                {/* <img src="assets/2.jpeg" /> */}
                {/* <p className="legend">2</p> */}
            </div>
            <div 
              style={{
                height:"38vh",
                width:"100vw",
                backgroundColor:'lightGrey',
                textAlign:'center'
              }}
            >
                {/* <img src="assets/3.jpeg" /> */}
                {/* <p className="legend">3</p> */}
            </div>
          </Carousel>
        </section>
        <View style={{flexDirection:'column'}}>
          
          <section id="PDF">
            <View style={{height:"100vh",zIndex:0}}>
              {/* <SwipeableList/> */}
              <ReadPDF/>
            </View>
          </section>
          <section id="cards">
            <View style={{height:"100vh",zIndex:0}}>
              <WordDeckWrapper/>
            </View>
          </section>
          <section id="sound">
            <View style={{height:"100vh",zIndex:0}}>
              {/* <SwipeableList/> */}
              <Sound/>
            </View>
          </section>
          <section id="follow">
            <View style={{height:500,
            width:"100%",justifyContent:'center',
                    alignItems:'center',zIndex:0,backgroundColor:'grey'}}>
              <Instagram/>
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

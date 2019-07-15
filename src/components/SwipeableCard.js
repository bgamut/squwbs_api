import React,{Component,useContext} from 'react';
import {Animated,PanResponder,Dimensions,View,Text,Image,TouchableHighlight,TouchableOpacity,StyleSheet} from 'react-native'
import { Context } from "../context";
import ReactDOM from 'react-dom'
import Fade from 'react-reveal/Fade'
import './css/SwipeableCard.css'
import Flippy, {FrontSide,BackSide} from 'react-flippy'
// import AdSense from 'react-adsense';
import Swipeout from 'react-native-swipeout'
//import GoogleAds from 'react-google-ads'
//import CardFlip from './Card';
//import CardFlip from 'react-native-card-flip'
//import {geolocated,geolocatedProps} from 'react-geolocated'
import Geolocation from 'react-geolocation'
import CPB from './CPB'
class SwipeableCard extends Component {
  
 
  constructor(props){
    super(props)
    this.state = {
      styleCondition:false,
      flipLock:false
    };
    // this.state.yscroll.addListener(({value})=>{
    
    // })
    this.myRef=React.createRef();
    this.swipeoutButtons =[
      {
        text:'Button'
      }
    ]
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })

  }
  
  style={
    // height:Dimensions.get('window').height/11,
    height:200
  }
  refsCollection={}
  dragPos = new Animated.ValueXY({x:0,y:this.style.height});
  translateX = new Animated.Value(0);
  translateY=new Animated.Value(0)
  dismiss= (itemIndex,state,setState)=>{
      
    var filtered =this.state.filteredData.filter(item => item.index !== itemIndex);

    setState({
      ...state,
      filteredData:[...filtered],
      dataManipulated:true,
      refreshing:false
    })
    //console.log(state.filteredData)
    
  }
  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }

  }

  flip=()=>{
    // console.log(this.state)
    // if(this.state.flipLock==false){
    //   if(this.state.styleCondition==false){
    //     this.setState({styleCondition:true})
    //   }
    //   else{
    //     this.setState({styleCondition:false})
    //   }
    // }
    // console.log(this.state)
    
    if(this.state.flipLock==false){
      this.flipCard()
    //   if(this.state.styleCondition==false){
    //     this.setState({styleCondition:true})
    //   }
    //   else{
    //     this.setState({styleCondition:false})
    //   }
    }
  
  }
  remove=()=>{
    if(this.state.styleCondition==false){
      this.setState({styleCondition:true})
    }
    else{
      this.setState({styleCondition:false})
    }
  }
  _panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (e,gestureState)=>{
      this.setState({flipLock:true})
      this.dragPos.setValue({x:gestureState.dx,y:0})
      //this.onPress()
    },
    onPanResponderRelease: (e, {vx, dx}) => {
      //const [state, setState] = useContext(Context);
      //console.log(dx)
      const screenWidth = Dimensions.get("window").width;
      if (Math.abs(vx) >= 0.35 || Math.abs(dx) >= 0.75 * screenWidth) {
        if(vx>0){
          console.log('right')
        }
        else if(vx<0){
          console.log('left')
        }
        Animated.sequence([
          Animated.spring(this.dragPos, {
            toValue: dx > 0 ? {x:screenWidth,y:this.style.height} : {x:-screenWidth,y:this.style.height },
            duration: 250
            
          // }).start(props.onDismiss);
        }).start(
          ()=>
          {
            // this.dismiss(this.props.index)
            //this.flip()
            this.remove()
          },
        Animated.spring(this.dragPos,{
          toValue: this.dragPos.x > 0 ?{x:screenWidth,y:0} : {x:-screenWidth,y:0},
          duration:750
        })
          
        )
          //console.log("yo this element's index was "+props.name_first)
          //setState()
        ])
        
      } else {
        Animated.spring(this.dragPos, {
          toValue: {x:0,y:this.style.height},
          bounciness: 10
        }).start();
      }
      this.setState({flipLock:false})
      //this.onPress()
    }
  })

  

 
  
  
    onPress=(e)=>{
          // console.log(this.props)
          //console.log(this.state)
      }
    
    render(){
  //     // const [state, setState] = useContext(Context);
      const frontAnimatedStyle = {
        transform: [
          { rotateX: this.frontInterpolate}
        ]
      }
      const backAnimatedStyle = {
        transform: [
          { rotateX: this.backInterpolate }
        ]
      }
      if(this.state.styleCondition==false){
      return (
        
        <Fade >
        
         <Animated.View
                 style={{alignItems:'center',transform: [{translateX: this.dragPos.x}],backgroundColor:'transparent',margin:1,}} 
                 {...this._panResponder.panHandlers}
            >
            <TouchableHighlight onPress={this.flip} underlayColor={'transparent'}>
        {/* <Flippy
          flipOnClick={true}
          flipDirection='vertical'
          ref={(r)=>this.flippy=r}
          style={{width:Dimensions.get('window').width,height:this.dragPos.y}}
          
        > */}
              <View>
            
                  {/* <FrontSide> */}
                  <Animated.View style={[styles.flipCard, frontAnimatedStyle,{width:Dimensions.get('window').width-4}]}>
                    <View 
                    style={{
                        
                        flexDirection:'row',
                        
                    }}
                    >
                    {/* <Swipeout right={this.swipeoutButtons}> */}
                    <View>
                      <Image
                          style={{width: 90, height: 90,borderRadius:4,top:0,margin:0}}
                          source={{uri: this.props.picture}}
                      />
                    </View>
                    <View style={{alignItems:'center',justifyContent:'center',flex:1,backgroundColor:'transparent'}}>
                        <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'transparent'}}>
                          <Text selectable={false} style={{           
                            textDecorationLine:'none',
                            color:'white',
                            fontSize: 15,
                            textShadowColor: 'rgba(0, 0, 0, 1)',
                            textShadowOffset: {width: 0, height: 0},
                            textShadowRadius: 8,
                            flex:1,
                            textAlign:'center',
                            alignItems:'center',
                            justifyContent:'center',
                            flexDirection:'row',
                            margin:0,
                          }}>
                              {String(this.props.name_first) +" " +String(this.props.name_last)}
                          </Text>
                          <Text selectable={false}
                          style={{           
                            textDecorationLine:'none',
                            color:'white',
                            fontSize: 15,
                            textShadowColor: 'rgba(0, 0, 0, 1)',
                            textShadowOffset: {width: 0, height: 0},
                            textShadowRadius: 8,
                            // flex:1,
                            textAlign:'center',
                            alignItems:'center',
                            justifyContent:'center',
                            flexDirection:'row',
                            margin:0,
                          }}>
                              {this.props.email}
                          </Text>
                        </View>
                        </View>
                      {/* </Swipeout> */}
                    </View>
                  </Animated.View>
                  {/* </FrontSide>
                  <BackSide> */}
                  <Animated.View style={[backAnimatedStyle,styles.flipCard, styles.flipCardBack,{width:Dimensions.get('window').width-4,padding:5,alignItems:'stretch',justifyContent:'center'}]}>
                    <View style={{backgroundColor:'transparent',marginBottom:0,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
                    {/* <Swipeout right={this.swipeoutButtons}> */}
                        {/* <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between',backgroundColor:"red",margin:0}}> */}
                          {/* <CPB currentNumber={Math.random()*100} endNumber={100}/> */}
                          <CPB/>
                          <Geolocation
                              render={({
                                fetchingPosition,
                                position: { coords: { latitude, longitude } = {} } = {},
                                error,
                                getCurrentPosition
                              }) =>
                                <View style={{flexDirection:'column',justifyContent: 'space-between',backgroundColor:'transparent',flex:1}} >
                                  
                                  {error &&
                                    <Text style={{           
                                      textDecorationLine:'none',
                                      color:'red',
                                      fontSize: 15,
                                      textShadowColor: 'rgba(0, 0, 0, 1)',
                                      textShadowOffset: {width: 0, height: 0},
                                      textShadowRadius: 8,
                                      margin:0,
                                    }}>
                                      {error.message}
                                    </Text>}
                                  <View style={{flexDirection:'row',justifyContent: 'space-between'}} >
                                  <View style={{paddingLeft:8,backgroundColor:"transparent",justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{           
                                      textDecorationLine:'none',
                                      color:'white',
                                      fontSize: 15,
                                      textShadowColor: 'rgba(0, 0, 0, 1)',
                                      textShadowOffset: {width: 0, height: 0},
                                      textShadowRadius: 8,
                                      margin:0,
                                    }}>
                                      latitude: {Number(latitude).toFixed(2)} longitude: {Number(longitude).toFixed(2)}
                                    </Text>
                                  </View>
                                    {/* <View style={{marginLeft:15,paddingLeft:8,borderRadius:2,borderColor:'#cfcfcf',borderWidth:1}}>
                                      <TouchableOpacity onPress={getCurrentPosition} style={{backGroundColor:'#cfcfcf'}}>
                                        <Text style={{           
                                          textDecorationLine:'none',
                                          color:'white',
                                          fontSize: 12,
                                          textShadowColor: 'rgba(0, 0, 0, 1)',
                                          textShadowOffset: {width: 0, height: 0},
                                          textShadowRadius: 4,
                                          marginRight:10,
                                          

                                        }}>
                                        update
                                      </Text>
                                    </TouchableOpacity>
                                  </View> */}
                                </View>
                              </View>}
                            />
                          {/* <Text selectable={false} style={{           
                            textDecorationLine:'none',
                            color:'white',
                            fontSize: 15,
                            textShadowColor: 'rgba(0, 0, 0, 1)',
                            textShadowOffset: {width: 0, height: 0},
                            textShadowRadius: 8,
                            margin:0,
                          }}>
                              filler
                              
                              
                          </Text> */}
                        {/* </View> */}
                      
                      {/* </Swipeout> */}
                      </View>
                  </Animated.View>
                  {/* </BackSide> */}
            
        </View>
      {/* </Flippy> */}
      </TouchableHighlight>
      </Animated.View>
      
      </Fade>
      
  );
}
// if(this.state.styleCondition==false){
//   return(
//   <Fade>
   
//     {/* <Flippy
//       flipOnClick={true}
//       flipDirection='vertical'
//       ref={(r)=>this.flippy=r}
//       style={{width:Dimensions.get('window').width,height:this.dragPos.y}}
      
//     > */}
     
//         <CardFlip ref={this.myRef}>
            
//                   <TouchableOpacity>
//                     <View 
//                     style={{
//                         flex:1,
//                         flexDirection:'row',
//                         margin:2
                        
//                     }}
//                     >
//                     {/* <Swipeout right={this.swipeoutButtons}> */}
//                     <View>
//                       <Image
//                           style={{width: Dimensions.get('window').height/12, height: Dimensions.get('window').height/12,borderRadius:4}}
//                           source={{uri: this.props.picture}}
//                       />
//                     </View>
//                     <View style={{alignItems:'center',justifyContent:'center',flex:1,backgroundColor:'transparent'}}>
//                         <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'transparent'}}>
//                           <Text selectable={false} style={{           
//                             textDecorationLine:'none',
//                             color:'white',
//                             fontSize: 15,
//                             textShadowColor: 'rgba(0, 0, 0, 1)',
//                             textShadowOffset: {width: 0, height: 0},
//                             textShadowRadius: 8,
//                             flex:1,
//                             textAlign:'center',
//                             alignItems:'center',
//                             justifyContent:'center',
//                             flexDirection:'row',
//                             margin:5,
//                           }}>
//                               {String(this.props.name_first) +" " +String(this.props.name_last)}
//                           </Text>
//                           <Text selectable={false}
//                           style={{           
//                             textDecorationLine:'none',
//                             color:'white',
//                             fontSize: 15,
//                             textShadowColor: 'rgba(0, 0, 0, 1)',
//                             textShadowOffset: {width: 0, height: 0},
//                             textShadowRadius: 8,
//                             flex:1,
//                             textAlign:'center',
//                             alignItems:'center',
//                             justifyContent:'center',
//                             flexDirection:'row',
//                             margin:5,
//                           }}>
//                               {this.props.email}
//                           </Text>
//                         </View>
//                         </View>
//                       {/* </Swipeout> */}
//                     </View>
//                   </TouchableOpacity>
//                   <TouchableOpacity>
//                   <Swipeout right={this.swipeoutButtons} style={{backgroundColor:'transparent'}}> 
//                     <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'transparent'}}>
//                       <Text
//                       style={{           
//                         textDecorationLine:'none',
//                         color:'white',
//                         fontSize: 15,
//                         textShadowColor: 'rgba(0, 0, 0, 1)',
//                         textShadowOffset: {width: 0, height: 0},
//                         textShadowRadius: 8,
//                         flex:1,
//                         textAlign:'center',
//                         alignItems:'center',
//                         justifyContent:'center',
//                         flexDirection:'row',
//                         margin:5,
//                       }}
//                       >
//                         filler 
//                         <AdSense.Google 
//                           client='ca-pub-7292810486004926'
//                           slot='7806394673'
//                           style={{height:50,width:200,display:'block'}}
//                           layout='in-article'
//                           format='fluid'
//                         />
//                       </Text>
//                     </View>
//                     </Swipeout>
//                   </TouchableOpacity>
            
//         </CardFlip>
        
//       {/* </Flippy> */}
   
//   </Fade>
//   )
// }
else{
  return(
    <View style={{height:0}}>

    </View>
  )
}
    }
    
};
const styles = StyleSheet.create({
  container: {
    margin:0,
  },
  flipCard: {
    backgroundColor:'transparent',
    borderWidth:1,
    borderColor: 'rgba(128,128,128,0)',
    paddingTop:2,
    paddingBottom:2,
    paddingLeft:2,
    paddingRight:2,
    margin:0,
    backfaceVisibility: 'hidden',
    height: 100,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 3,
    shadowOpacity: 0.25
  },
  flipCardBack: {
    backgroundColor:'transparent',
    height: 100,
    position: "absolute",
    top: 0,
    margin:0,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 3,
    shadowOpacity: 0.25
  }
});
export default SwipeableCard;




// // export class SwipeableCard extends Component {
   
// //     translateX = new Animated.Value(0);
// //     _panResponder = PanResponder.create({
// //       onMoveShouldSetResponderCapture: () => true,
// //       onMoveShouldSetPanResponderCapture: () => true,
// //       onPanResponderMove: Animated.event([null, {dx: this.translateX}]),
// //       onPanResponderRelease: (e, {vx, dx}) => {
// //         //const [state, setState] = useContext(Context);

// //         const screenWidth = Dimensions.get("window").width;
// //         if (Math.abs(vx) >= 0.5 || Math.abs(dx) >= 0.5 * screenWidth) {
// //           Animated.timing(this.translateX, {
// //             toValue: dx > 0 ? screenWidth : -screenWidth,
// //             duration: 200
// //           }).start(this.props.onDismiss);
// //           //console.log("yo this element's index was "+this.props.name_first)
// //           //setState()
// //         } else {
// //           Animated.spring(this.translateX, {
// //             toValue: 0,
// //             bounciness: 10
// //           }).start();
// //         }
// //       }
// //     });
// //     onPress(){
        
// //         //console.log(this.state)
// //     }
// //     render() {
// //     //const [state, setState] = useContext(Context);
// //       return (
// //         <View>
// //             <Animated.View
// //                 style={{transform: [{translateX: this.translateX}], height: 75}} {...this._panResponder.panHandlers}
// //             >
// //                 {/* <Text>
// //                     {this.props.title}
// //                 </Text> */}
// //                 <TouchableOpacity onPress={
// //                     console.log(this.props)
                    
// //                 }>
// //                     <View 
// //                     style={{
// //                         flex:1,
// //                         flexDirection:'row'
// //                     }}
// //                     >
// //                     <View>
// //                     <Image
// //                         style={{width: 50, height: 50}}
// //                         source={{uri: this.props.picture}}
// //                     />
// //                     </View>
// //                     <View>
// //                     <Text selectable={false}>
// //                         {String(this.props.name_first) +" " +String(this.props.name_last)}
// //                     </Text>
// //                     <Text selectable={false}>
// //                         {this.props.email}
// //                     </Text>
// //                     </View>
// //                     </View>
// //                 </TouchableOpacity>
// //             </Animated.View>
// //         </View>
  
// //       );
// //     }
// //   }

// const SwipeableCard = (props) => {
//     const [state, setState] = useContext(Context);
//     // const dismiss= (itemIndex)=>{
//     //   var filtered= []
//     //   var appliedIndex=0
//     //   for (var i = 0; i<state.data.length; i++){
//     //     if(itemIndex!=i){
//     //       filtered.push({...state.data[i],index:appliedIndex})
//     //       appliedIndex++
//     //     }
//     //   }

//     //   console.log(filtered)
//     //   setState({
//     //     ...state,
//     //     data:[...filtered]
//     //   })
      
//     // }
//     const dismiss= (itemIndex)=>{
//       // console.log('dismiss fired')
//       // setState({
//       //   ...state,
//       //   refreshing:true
//       // })
      
      
//         // var filtered= []
//         // for (var i = 0; i<state.data.length; i++){
//         //   if(itemIndex!=i){
//         //     filtered.push({...state.data[i],index:i})
//         //   }
//         // }
//         //console.log(translateX)
        
//         var filtered =state.filteredData.filter(item => item.index !== itemIndex);
//         // for (var i=0;i<filtered.length;i++){
//         //   filtered[i].index=i
//         // }
//         // console.log(filtered)
//         setState({
//           ...state,
//           filteredData:[...filtered],
//           dataManipulated:true,
//           refreshing:false
//         })
//         //console.log(state.filteredData)
        
//     }
//     const style={
//       height:Dimensions.get('window').height/11,

//     }
//     //const [userInput,setUserInput,Refs] = useState("")
//     const dragPos = new Animated.ValueXY({x:0,y:style.height});
//     const translateX = new Animated.Value(0);
//     const translateY=new Animated.Value(0)
//     const _panResponder = PanResponder.create({
//       onMoveShouldSetResponderCapture: () => true,
//       onMoveShouldSetPanResponderCapture: () => true,
//       onPanResponderMove: (e,gestureState)=>{
//         //translateX.setValue(gestureState.dx)
//         //Animated.event([null, {dx: translateX}])
//         dragPos.setValue({x:gestureState.dx,y:style.height})
//         //translateY.setValue(state.dy._value+gestureState.dy)
//         //console.log(translateX._value)
//         //console.log(position.x._value +" : "+position.y._value)
//         //setState({...state,dy:translateY})
//         //console.log(state.dy)
//       } ,
//       // onPanResponderRelease: (e, {vx, dx}) => {
//       //   //const [state, setState] = useContext(Context);
//       //   console.log(dx)
//       //   const screenWidth = Dimensions.get("window").width;
//       //   if (Math.abs(vx) >= 0.5 || Math.abs(dx) >= 0.5 * screenWidth) {
//       //     Animated.timing(translateX, {
//       //       toValue: dx > 0 ? screenWidth : -screenWidth,
//       //       duration: 200
//       //     // }).start(props.onDismiss);
//       //   }).start(
          
//       //     dismiss(props.index)
          
//       //     );
//       //     //console.log("yo this element's index was "+props.name_first)
//       //     //setState()
//       //   } else {
//       //     Animated.spring(translateX, {
//       //       toValue: 0,
//       //       bounciness: 10
//       //     }).start();
//       //   }
//       // }
//       onPanResponderRelease: (e, {vx, dx}) => {
//         //const [state, setState] = useContext(Context);
//         //console.log(dx)
//         const screenWidth = Dimensions.get("window").width;
//         if (Math.abs(vx) >= 0.35 || Math.abs(dx) >= 0.35 * screenWidth) {
//           Animated.sequence([
//             Animated.spring(dragPos, {
//               toValue: dx > 0 ? {x:screenWidth,y:style.height} : {x:-screenWidth,y:style.height },
//               duration: 250
              
//             // }).start(props.onDismiss);
//           }),
//           Animated.spring(dragPos,{
//             toValue: dragPos.x > 0 ?{x:screenWidth,y:0} : {x:-screenWidth,y:0},
//             // duration:750
//           }).start(
//             ()=>
//             {
//               dismiss(props.index)
//               // Animated.timing(position, {
//               //   toValue: dx > 0 ? {x:screenWidth,y:0} : {x:-screenWidth,y:0 },
//               //   duration: 200
//               // }).start()
//             }
            
//           )
//             //console.log("yo this element's index was "+props.name_first)
//             //setState()
//           ])
          
//         } else {
//           Animated.spring(dragPos, {
//             toValue: {x:0,y:style.height},
//             bounciness: 10
//           }).start();
//         }
//       }
//     });
//         const onPress=(e)=>{
//             console.log(props)
//         }
    
//       return (
      
//             <View>
//                 <Animated.View
//                     style={{left:dragPos.x,height:dragPos.y,alignItems:'center',}} {..._panResponder.panHandlers}
//                 >
//                     {/* <Text>
//                         {props.title}
//                     </Text> */}
//                     <View style={{width:Dimensions.get('window').width-4,background:'transparent'}}>
//                     <TouchableOpacity onPress={
//                         onPress
                        
//                     }>
//                         <View 
//                         style={{
//                             flex:1,
//                             flexDirection:'row',
//                             margin:2
                            
//                         }}
//                         >
//                         <View>
//                           <Image
//                               style={{width: Dimensions.get('window').height/12, height: Dimensions.get('window').height/12,borderRadius:4}}
//                               source={{uri: props.picture}}
//                           />
//                         </View>
//                         <View style={{alignItems:'center',justifyContent:'center',flex:1,backgroundColor:'transparent'}}>
//                             <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'transparent'}}>
//                               <Text selectable={false} style={{           
//                                 textDecorationLine:'none',
//                                 color:'white',
//                                 fontSize: 15,
//                                 textShadowColor: 'rgba(128, 128, 128, 1)',
//                                 textShadowOffset: {width: 0, height: 0},
//                                 textShadowRadius: 8,
//                                 flex:1,
//                                 textAlign:'center',
//                                 alignItems:'center',
//                                 justifyContent:'center',
//                                 flexDirection:'row',
//                                 margin:5,
//                               }}>
//                                   {String(props.name_first) +" " +String(props.name_last)}
//                               </Text>
//                               <Text selectable={false}
//                               style={{           
//                                 textDecorationLine:'none',
//                                 color:'white',
//                                 fontSize: 15,
//                                 textShadowColor: 'rgba(128, 128, 128, 1)',
//                                 textShadowOffset: {width: 0, height: 0},
//                                 textShadowRadius: 8,
//                                 flex:1,
//                                 textAlign:'center',
//                                 alignItems:'center',
//                                 justifyContent:'center',
//                                 flexDirection:'row',
//                                 margin:5,
//                               }}>
//                                   {props.email}
//                               </Text>
//                             </View>
//                             </View>
//                         </View>
//                     </TouchableOpacity>
//                   </View>
//                 </Animated.View>
//             </View>
      
          
//       );
// };
    
// export default SwipeableCard;
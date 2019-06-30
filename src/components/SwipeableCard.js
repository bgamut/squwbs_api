import React,{Component,useContext} from 'react';
import {Animated,PanResponder,Dimensions,View,Text,Image,TouchableOpacity} from 'react-native'
import { Context } from "../context";

// export class SwipeableCard extends Component {
   
//     translateX = new Animated.Value(0);
//     _panResponder = PanResponder.create({
//       onMoveShouldSetResponderCapture: () => true,
//       onMoveShouldSetPanResponderCapture: () => true,
//       onPanResponderMove: Animated.event([null, {dx: this.translateX}]),
//       onPanResponderRelease: (e, {vx, dx}) => {
//         //const [state, setState] = useContext(Context);

//         const screenWidth = Dimensions.get("window").width;
//         if (Math.abs(vx) >= 0.5 || Math.abs(dx) >= 0.5 * screenWidth) {
//           Animated.timing(this.translateX, {
//             toValue: dx > 0 ? screenWidth : -screenWidth,
//             duration: 200
//           }).start(this.props.onDismiss);
//           //console.log("yo this element's index was "+this.props.name_first)
//           //setState()
//         } else {
//           Animated.spring(this.translateX, {
//             toValue: 0,
//             bounciness: 10
//           }).start();
//         }
//       }
//     });
//     onPress(){
        
//         //console.log(this.state)
//     }
//     render() {
//     //const [state, setState] = useContext(Context);
//       return (
//         <View>
//             <Animated.View
//                 style={{transform: [{translateX: this.translateX}], height: 75}} {...this._panResponder.panHandlers}
//             >
//                 {/* <Text>
//                     {this.props.title}
//                 </Text> */}
//                 <TouchableOpacity onPress={
//                     console.log(this.props)
                    
//                 }>
//                     <View 
//                     style={{
//                         flex:1,
//                         flexDirection:'row'
//                     }}
//                     >
//                     <View>
//                     <Image
//                         style={{width: 50, height: 50}}
//                         source={{uri: this.props.picture}}
//                     />
//                     </View>
//                     <View>
//                     <Text selectable={false}>
//                         {String(this.props.name_first) +" " +String(this.props.name_last)}
//                     </Text>
//                     <Text selectable={false}>
//                         {this.props.email}
//                     </Text>
//                     </View>
//                     </View>
//                 </TouchableOpacity>
//             </Animated.View>
//         </View>
  
//       );
//     }
//   }

const SwipeableCard = (props) => {
    const [state, setState] = useContext(Context);
    // const dismiss= (itemIndex)=>{
    //   var filtered= []
    //   var appliedIndex=0
    //   for (var i = 0; i<state.data.length; i++){
    //     if(itemIndex!=i){
    //       filtered.push({...state.data[i],index:appliedIndex})
    //       appliedIndex++
    //     }
    //   }

    //   console.log(filtered)
    //   setState({
    //     ...state,
    //     data:[...filtered]
    //   })
      
    // }
    const dismiss= (itemIndex)=>{
      // console.log('dismiss fired')
      // setState({
      //   ...state,
      //   refreshing:true
      // })
      
      
        // var filtered= []
        // for (var i = 0; i<state.data.length; i++){
        //   if(itemIndex!=i){
        //     filtered.push({...state.data[i],index:i})
        //   }
        // }
        //console.log(translateX)
        
        var filtered =state.filteredData.filter(item => item.index !== itemIndex);
        // for (var i=0;i<filtered.length;i++){
        //   filtered[i].index=i
        // }
        // console.log(filtered)
        setState({
          ...state,
          filteredData:[...filtered],
          dataManipulated:true,
          refreshing:false
        })
        //console.log(state.filteredData)
        
    }
    const style={
      height:55,

    }
    //const [userInput,setUserInput,Refs] = useState("")
    const dragPos = new Animated.ValueXY({x:0,y:style.height});
    const translateX = new Animated.Value(0);
    const translateY=new Animated.Value(0)
    const _panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (e,gestureState)=>{
        //translateX.setValue(gestureState.dx)
        //Animated.event([null, {dx: translateX}])
        dragPos.setValue({x:gestureState.dx,y:style.height})
        //translateY.setValue(state.dy._value+gestureState.dy)
        //console.log(translateX._value)
        //console.log(position.x._value +" : "+position.y._value)
        //setState({...state,dy:translateY})
        //console.log(state.dy)
      } ,
      // onPanResponderRelease: (e, {vx, dx}) => {
      //   //const [state, setState] = useContext(Context);
      //   console.log(dx)
      //   const screenWidth = Dimensions.get("window").width;
      //   if (Math.abs(vx) >= 0.5 || Math.abs(dx) >= 0.5 * screenWidth) {
      //     Animated.timing(translateX, {
      //       toValue: dx > 0 ? screenWidth : -screenWidth,
      //       duration: 200
      //     // }).start(props.onDismiss);
      //   }).start(
          
      //     dismiss(props.index)
          
      //     );
      //     //console.log("yo this element's index was "+props.name_first)
      //     //setState()
      //   } else {
      //     Animated.spring(translateX, {
      //       toValue: 0,
      //       bounciness: 10
      //     }).start();
      //   }
      // }
      onPanResponderRelease: (e, {vx, dx}) => {
        //const [state, setState] = useContext(Context);
        //console.log(dx)
        const screenWidth = Dimensions.get("window").width;
        if (Math.abs(vx) >= 0.35 || Math.abs(dx) >= 0.35 * screenWidth) {
          Animated.sequence([
            Animated.spring(dragPos, {
              toValue: dx > 0 ? {x:screenWidth,y:style.height} : {x:-screenWidth,y:style.height },
              duration: 250
              
            // }).start(props.onDismiss);
          }),
          Animated.spring(dragPos,{
            toValue: dragPos.x > 0 ?{x:screenWidth,y:0} : {x:-screenWidth,y:0},
            // duration:750
          }).start(
            ()=>
            {
              dismiss(props.index)
              // Animated.timing(position, {
              //   toValue: dx > 0 ? {x:screenWidth,y:0} : {x:-screenWidth,y:0 },
              //   duration: 200
              // }).start()
            }
            
          )
            //console.log("yo this element's index was "+props.name_first)
            //setState()
          ])
          
        } else {
          Animated.spring(dragPos, {
            toValue: {x:0,y:style.height},
            bounciness: 10
          }).start();
        }
      }
    });
        const onPress=(e)=>{
            console.log(props)
        }
    
      return (
      
            <View>
                <Animated.View
                    style={{left:dragPos.x,height:dragPos.y,alignItems:'center',}} {..._panResponder.panHandlers}
                >
                    {/* <Text>
                        {props.title}
                    </Text> */}
                    <View style={{width:Dimensions.get('window').width*0.618,background:'transparent'}}>
                    <TouchableOpacity onPress={
                        onPress
                        
                    }>
                        <View 
                        style={{
                            flex:1,
                            flexDirection:'row'
                        }}
                        >
                        <View>
                          <Image
                              style={{width: Dimensions.get('window').height/12, height: Dimensions.get('window').height/12,borderRadius:4}}
                              source={{uri: props.picture}}
                          />
                        </View>
                        <View style={{alignItems:'center',justifyContent:'center',flex:1,backgroundColor:'white'}}>
                            <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
                              <Text selectable={false} style={{           
                                textDecorationLine:'none',
                                color:'white',
                                fontSize: 12,
                                textShadowColor: 'rgba(128, 128, 128, 1)',
                                textShadowOffset: {width: 0, height: 0},
                                textShadowRadius: 8,
                                flex:1,
                                textAlign:'center',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                margin:5,
                              }}>
                                  {String(props.name_first) +" " +String(props.name_last)}
                              </Text>
                              <Text selectable={false}
                              style={{           
                                textDecorationLine:'none',
                                color:'white',
                                fontSize: 12,
                                textShadowColor: 'rgba(128, 128, 128, 1)',
                                textShadowOffset: {width: 0, height: 0},
                                textShadowRadius: 8,
                                flex:1,
                                textAlign:'center',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                margin:5,
                              }}>
                                  {props.email}
                              </Text>
                            </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
            </View>
      
          
      );
};
    
export default SwipeableCard;
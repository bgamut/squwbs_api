
import React,{Component,useContext} from 'react';
import {Animated,PanResponder,Dimensions,View,Text,Image,TouchableOpacity,ScrollView} from 'react-native'
import { Context } from "../context";
const translateY = new Animated.Value(0);



class SwipeableScroller extends Component {
    constructor(props) {
        super(props);
        this.scroller=React.createRef()
        this.state = {
            yscroll: new Animated.Value(0),
            dy:new Animated.Value(0),
            lastscroll:0,
        };
      }
      onScroll=(e)=>{
        //console.log(e.nativeEvent.contentOffset.y)
        
      }
//     _panResponder = PanResponder.create({
//     onMoveShouldSetResponderCapture: () => true,
//     onMoveShouldSetPanResponderCapture: () => true,
//     onPanResponderMove: (e,gestureState)=>{
//         translateY.setValue(gestureState.dy)

//         // this.scroller.current.scrollTo({
//         //     y:-1*this.state.lastscroll+translateY._value,
//         //     animated:true,
//         //     duration:1
//         // })
        
//     },

//     onPanResponderRelease: (e, {vy, dy}) => {
//     //translateY.setValue(state.yscroll._value+dy)
//     //console.log(this.state.yscroll+translateY._value)
//     this.setState(
//         (state,props)=>(
//             {
//                 ...this.state,
//                 lastscroll:state.lastscroll+translateY._value}
//         ))
//     //console.log(this.state.yscroll)
//   }
// });
    render(){
        return(
            <ScrollView 
            ref={this.scroller}
            style={{backgroundColor:'transparent',height:Dimensions.get('window').height*13/15-50}}
            onScroll={this.onScroll}
            //scrollTop={state.yscroll}
            scrollEnabled={false}
            scrollEventThrottle={1}
            // {...this._panResponder.panHandlers}
        >
            <View style={{backgroundColor:'transparent',flex:1,flexDirection:'column',margin:5,paddingRight:2,paddingLeft:2}}>
                {this.props.children}
            </View>
        </ScrollView>
        )
    }

}
export default SwipeableScroller

// import React, {memo,useContext} from 'react'
// import {Text,View,Dimensions,ScrollView,PanResponder,Animated} from 'react-native'
// import {Context} from '../context'

import React,{Component} from 'react'
import {
  StyleSheet, 
  View, 
  ViewPropTypes,
  Text,
  Animated, 
  PanResponder,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import PropTypes from "prop-types"
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const _animatedValue = new Animated.Value(0);
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "transparent",
  },
  sliderContainer: {
      backgroundColor: "transparent",
      overflow: "hidden",
      position: "relative",
      flex: 1,
  },
  controlsWrapperStyle: {
      position: "absolute",
      alignItems: "center",
      justifyContent: "space-between",
      right: 0,
      bottom: 0,
      padding: 10
  },
  dotsWrapperStyle: {
      alignItems: "center",
      justifyContent: "center"
  },
  activeDotStyle: {
      backgroundColor: '#007aff',
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3
  },
  dotStyle: {
      backgroundColor: 'rgba(0,0,0,.2)',
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3
  },
  prevButtonStyle: {
      color: '#777777'
  },
  nextButtonStyle: {
      color: '#007aff'
  },
});

export default class HorizontalSwipeElements extends Component {
  constructor(props) {
    super(props);

    this.state = {
        width: Dimensions.get('window').width,
        height: 200,
        activeIndex: props.index,
        pan: new Animated.ValueXY(),
    };
    this._animatedValueX=0;  
    this._animatedValueY=0;
    this._panResponder = PanResponder.create({
      onPanResponderTerminationRequest:()=>false,
      onMoveShouldSetPanResponderCapture:()=>true,
      onMoveShouldSetPanResponderCapture:(e,gestureState)=>{
       return(Math.abs(gestureState.dx)>5)
      },
      onPanResponderGrant:(e,gestureState)=>{this._fixState()},
      onPanResponderMove:Animated.event([
        null, {dx:this.state.pan.x}
      ]),
      onPanResponderRelease:(e,gesture)=>{
        const correction=gesture.moveX-gesture.x0
        if(Math.abs(correction)<(this.state.width*this.props.actionMinWidth)){
          return Animated.spring(this.state.pan,{toVlue:{x:0,y:0}}).start(()=>{
            if(this.props.onAnimationEnd){
              this.props.onAnimationEnd(this.state.activeIndex);
            }
          })
          this._changeIndex(correction>0 ? -1 :1)
        }
      }
    })
  }
  componentDidMount(){
    this.state.pan.x.addListener((value)=> this._animatedValueX=value.value)
    //this.startAutoplay()
  }
  componentWillUnmount(){
    //this.stopAutoplay()
    this.state.pan.x.removeAllListeners()
  }
  _fixState(){
    this._animatedValueX=this.state.width*this.state.activeIndex*-1
    this.state.pan.setOffset({x:this._animatedValueX, y:0})
    this.state.pan.setValue({x:0,y:0})
  }
  _changeIndex(delta=1){
    let move = {x:0,y:0}
    let skipChange=(!delta)
    let calcDelta = delta
    if(this.state.activeIndex<=0 && delta<0){
      skipChange=(!this.props.loop)
      calcDelta = this.count+delta
    } else if(this.state.activeIndex+1>=this.cound &&delta>0){
      skipChange=(!this.props.loop)
      calcDelta=-1*this.state.activeIndex+delta-1
    }
    if(skipChange){
      return Animated.spring(this.state.pan,{toValue:move}).start(()=>{
        if(this.props.onAnimationEnd){
          this.props.onAnimationEnd(this.state.activeIndex)
        }
      })
    }
    let index = this.state.activeIndex+calcDelta
    this.setState({activeIndex:index})
    move.x=this.state.width*-1*calcDelta
    Animated.spring(this.state.pan,{toValue:move}).start(()=>{
      if(this.props.onAnimationEnd){
        this.props.onAnimationEnd(index)
      }
    })
    //this.startAutoplay();
    this.props.onIndexChanged && this.props.onIndexChanged(index)
  }
  _onLayout(e){
    console.log(e.nativeEvent.layout)
    const {width,height}=e.nativeEvent.layout
    this.setState({width,height},()=>this._fixState())
  }

  render(){
    const {pan,width,height,activeIndex}=this.state
    const {
      direction,
      containerStyle,
      swipeAreaStyle,
      swipeWrapperStyle,
      controlsWrapperStyle,
      dotsWrapperStyle,
      dotElement,
      dotStyle,
      activeDotElement,
      activeDotStyle,
      prevButtonElement,
      prevButtonStyle,
      prevButtonText,
      nextButtonElement,
      nextButtonStyle,
      nextButtonText,
      loop,
      buttonsEnabled,
    } = this.props;
    if (!width){
      return (<View style={[styles.container, containerStyle]} onLayout={this._onLayout.bind(this)}/>)
    }
    const overRangeButtonOpacity = !loop? this.props.overRangeButtonOpacity: this.props.overRangeButtonsOpacity|| 1;
    let {children}=this.props;
    if(!Array.isArray(children)){children=[children]}
    this.count=children.length
    return(
      <View style={[styles.container,containerStyle]} onLayout={this._onLayout.bind(this)}>
        <View style={[styles.sliderContainer,swipeAreaStyle]}>
          <Animated.View
            style={[{
              position:"relative",
              top:0,
              left:0,
            },swipeWrapperStyle,{
              flexDirection:direction,
              width:width*this.count*width,
              height:height
            },{transform:[{translateX:pan.x},{translateY:pan.y}]}
            ]}
            {...this._panResponder.panHandlers}
            >
              {children.map((el,i)=>(<View key={i} style={{width,height}}>{el}</View>))}
          </Animated.View>
        </View>
      </View>
    )
  }
}
//     <Animated.View style={{
//       position: "relative",
//       top: 0,
//       //left: _animatedValue._value,
//       flexDirection: 'row',
//       width: width*2,
//       height: height,
//       transform:[{translateX:_animatedValue._value}]
//       }}
//       {..._panResponder.panHandlers} 
//       horizontal = {true}>
// <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'white',flex:1,flexDirection:'column',marginRight:2,marginLeft:3}}>
// <Text selectable={false}>one</Text>
// </View>
// <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'lightgrey',flex:1,flexDirection:'column',marginRight:2,marginLeft:2}}>
// <Text selectable={false}>two</Text>
// </View>
// <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'darkgrey',flex:1,flexDirection:'column',marginRight:2,marginLeft:2}}>
// <Text selectable={false}>three</Text>
// </View>
// <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'black',flex:1,flexDirection:'column',marginRight:2,marginLeft:2}}>
// <Text selectable={false}>four</Text>
// </View>
// <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'white', flex:1,flexDirection:'column',marginRight:2,marginLeft:2}}>
// <Text selectable={false}>one</Text>
// </View>
// <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'lightgrey',flex:1,flexDirection:'column',marginRight:2,marginLeft:2}}>
// <Text selectable={false}>two</Text>
// </View>
// <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'darkgrey',flex:1,flexDirection:'column',marginRight:2,marginLeft:2}}>
// <Text selectable={false}>three</Text>
// </View>
// <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'black',flex:1,flexDirection:'column',marginRight:2,marginLeft:2}}>
// <Text selectable={false}>four</Text>
// </View>
// </Animated.View>
//   )

// }


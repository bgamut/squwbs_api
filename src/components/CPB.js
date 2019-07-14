// import React, { Component,Text,View } from 'react';
// // import {TouchableHighlight, Animated} from 'react-native'
import Svg, { Circle, Rect, Line,Path,Text} from "react-native-svg-web-transform";
import './css/Svg.css'
// export const CPB=(props)=>{
//     // // constructor(props){
//     // //     super(props)
//     // //     this.state = {
 
//     // //     };
        
//     // //     this.svgRef=React.createRef();
//     // //     this.textRef=React.createRef();
//     // //     this.animatedValue = new Animated.Value(0);
//     // //     this.value = 0;
//     // //     this.animatedValue.addListener(({ value }) => {
//     // //       this.value = value;
//     // //     })
//     // //     this.frontInterpolate = this.animatedValue.interpolate({
//     // //       inputRange: [0, 360],
//     // //       outputRange: ['0deg', '360deg'],
//     // //     })
//     // //     this.backInterpolate = this.animatedValue.interpolate({
//     // //       inputRange: [0, 360],
//     // //       outputRange: ['180deg', '360deg']
//     // //     })
    
//     // //   }
//     // const svgRef=React.createRef();
//     // const textRef=React.createRef();
//     // const animatedValue = new Animated.Value(0);
//     // const value = 0;
//     // animatedValue.addListener(({ val }) => {
//     //   value = val;
//     // })
//     // const frontInterpolate = animatedValue.interpolate({
//     //   inputRange: [0, 360],
//     //   outputRange: ['0deg', '360deg'],
//     // })
//     // const backInterpolate = animatedValue.interpolate({
//     //   inputRange: [0, 360],
//     //   outputRange: ['180deg', '360deg']
//     // })
//     // const test=()=>{
//     //     console.log(svgRef.current)
//     //     console.log(textRef.current)
//     // }
    
//     return(
//         <View style={{backgrounColor:'black', height:100, width:100}}>
//             {/* <TouchableHighlight onPress={test}> */}
//             {/* <ref ={this.textRef}Text>random</Text> */}
//             {/* <Svg id="svg1" style={{widht:200,height:200,zIndex:9999}} >
//                 <Path ref={this.svgRef} fill="none" stroke="rgb(140,140,140)" stroke-width="15" d="M 82.79668840566598 346.1805350275177 A 37.5 37.5 0 0 0 75 272"></Path>
//             </Svg> */}
//             {/* </TouchableHighlight> */}
//         </View>
//     );
    
// }

import React,{Component,useContext} from 'react';
import {Animated,PanResponder,Dimensions,View,Image,TouchableHighlight,StyleSheet} from 'react-native'
import { Context } from "../context";
import ReactDOM from 'react-dom'
import Fade from 'react-reveal/Fade'
import './css/SwipeableCard.css'
import Flippy, {FrontSide,BackSide} from 'react-flippy'

import Swipeout from 'react-native-swipeout'


class CPB extends Component {
  
 
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     styleCondition:false,
  //     flipLock:false
  //   };

  //   this.myRef=React.createRef();
  //   this.swipeoutButtons =[
  //     {
  //       text:'Button'
  //     }
  //   ]
  //   this.animatedValue = new Animated.Value(0);
  //   this.value = 0;
  //   this.animatedValue.addListener(({ value }) => {
  //     this.value = value;
  //   })
  //   this.frontInterpolate = this.animatedValue.interpolate({
  //     inputRange: [0, 180],
  //     outputRange: ['0deg', '180deg'],
  //   })
  //   this.backInterpolate = this.animatedValue.interpolate({
  //     inputRange: [0, 180],
  //     outputRange: ['180deg', '360deg']
  //   })

  // }
    constructor(props){
        super(props)
        this.state = {
          styleCondition:false,
          flipLock:false
        };
        this.fontSize=15
        this.svgRef=React.createRef();
        this.textRef=React.createRef();
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.width=200
        this.height=200
        this.centerX=100
        this.centerY=100
        this.radius=70
        this.startAngle=90
        this.endAngle=270
        this.animatedValue.addListener(({ value }) => {
          this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
          inputRange: [0, 360],
          outputRange: ['0deg', '360deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
          inputRange: [0, 360],
          outputRange: ['180deg', '360deg']
        })

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

    
    if(this.state.flipLock==false){
      this.flipCard()

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

    },
    onPanResponderRelease: (e, {vx, dx}) => {

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

        }).start(
          ()=>
          {

            this.remove()
          },
        Animated.spring(this.dragPos,{
          toValue: this.dragPos.x > 0 ?{x:screenWidth,y:0} : {x:-screenWidth,y:0},
          duration:750
        })
          
        )

        ])
        
      } else {
        Animated.spring(this.dragPos, {
          toValue: {x:0,y:this.style.height},
          bounciness: 10
        }).start();
      }
      this.setState({flipLock:false})

    }
  })


  
    onPress=(e)=>{

      }
    test=()=>{
      console.log(this.svgRef.current)
      console.log(this.textRef.current)
    }
    polarToCartesian=(centerX, centerY, radius, angleInDegrees)=>{
      var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
      return {
          x: centerX + (radius * Math.cos(angleInRadians)),
          y: centerY + (radius * Math.sin(angleInRadians))
      };
    }
    describeArc=(x, y, radius, startAngle, endAngle)=>{
      var start = this.polarToCartesian(x, y, radius, endAngle);
      var end = this.polarToCartesian(x, y, radius, startAngle);
      var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      var d = [
          "M", start.x, start.y, 
          "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
      ].join(" ");
      return d;       
    }
    render(){

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
    


const translateHeight= Dimensions.get("window").height*-0.5
var arc = this.describeArc(this.centerX, this.centerY, this.radius, this.startAngle, this.endAngle)
var textX = this.centerX-(this.fontSize*1.618)
var textY = this.centerY
console.log(this.textRef.x)     
// this.svgRef.d=(this.describeArc(this.centerX, this.centerY, this.radius, this.startAngle, this.endAngle));
return(
          <View style={{backgroundColor:'transparent'}}>
            {/* <TouchableHighlight onPress={this.test()} style={{backgroundColor:'grey', height:100, width:100}}> */}
              {/* <View> */}
              {/* <Text ref ={this.textRef}>random</Text> */}
              
              <Svg height={200} width={200} style={{display:'absolute',margin:0,top:0,left:0}}>
              
                <Path x="0" y="0" height="100%" width="100%"ref={this.svgRef} fill="none" style={{...styles.path,strokeLinecap:'round'}} stroke="rgb(140,140,140)" strokeWidth="15" d={arc}></Path>
                  {/* <Svg x='0' y={textY} width={150} height={150}> */}
                  <Text x={textX} y={textY} height="100%" width="100%" ref={this.textRef} style={{display:'block',textAlign:'center'}} textAnchor ="center" dominantBaseline="middle" alignmentBaseline ="middle" fontSize = {this.fontSize}>35.65%</Text>
                {/* </Svg> */}
              </Svg> 
              
              
              {/* </View> */}
            {/* </TouchableHighlight> */}
          </View>
      );
}

    }
    
};
const styles = StyleSheet.create({
  path:{
    transform:[{translateX:(-50)},{translateY:(-Dimensions.get("window").width/2)}]
    
  },
  container: {
    margin:0,
  },
  flipCard: {
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
  },
});
export default CPB;

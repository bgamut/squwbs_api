// import React, { Component,Text,View } from 'react';
// // import {TouchableHighlight, Animated} from 'react-native'
import Svg, { Circle, Rect, Line,Path,Text,G,Defs,Filter,FeGaussianBlur,FeMerge,FeMergeNode} from "react-native-svg-web-transform";
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
  
    constructor(props){
        super(props)
        this.state = {
          percentage:0,
          styleCondition:false,
          flipLock:false,
          width:100,
          height:100,
          centerX:100,
          centerY:100,
          radius:62,
          startAngle:0,
          endAngle:0,
          color:'rgb(169,169,169)',
          value:0,
          fontSize:14,
          translateHeight:0,
          arc:"",
          textX:0,
          textY:0,
          endNumber:100,
          currentNumber:0,
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
        this.startAngle=0
        this.endAngle=0
        this.color='rgb(128,128,128)'
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
      pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
      }
      update=(current, end)=>{
        var centerX = this.state.width/2
        var centerY = this.state.height/2
        var radius = Number((centerX*0.68).toFixed(0))
        if(current/end>=1){
          var fraction = 1
        }
        else{
          var fraction = current / end
        }
        
        //var percentage=Number((fraction*100).toFixed(2))
        var percentage = this.pad(parseFloat(Math.round(fraction*10000)/100).toFixed(2),5)
        var addAngle=0
        if(fraction==1){
          addAngle=359
        }
        else{
          addAngle=fraction*360
        }
        var endAngle=this.state.startAngle+addAngle
        var translateHeight= Dimensions.get("window").height*-0.5
        var arc = this.describeArc(centerX, centerY, radius, this.state.startAngle, endAngle)
        var textX = centerX-(Number((this.state.fontSize*1.618).toFixed(0)))
        var textY = centerY
        this.setState({
          percentage:percentage,
          endAngle:endAngle,
          translateHeight:translateHeight,
          arc:arc,
          textX:textX,
          textY:textY,
          centerX:centerX,
          centerY:centerY,
          radius:radius,
        })
        //console.log(this.state)
      }
      pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
      }
      demo(){
        if(this.value<100){ 
          this.value+=Math.random()
        }
        else{
          this.value=0
        }
        this.update(this.value,100)
      }
      componentDidMount(){
        this.update(0,100)
        //setInterval(this.demo.bind(this), 100);
      }
  
      // UNSAFE_componentWillReceiveProps(nextProps){
      //   var width=nextProps.width
      //   var height=nextProps.height
      //   var endNumber=nextProps.endNumber
      //   var currentNumber = nextProps.currentNumber
      //   this.update(currentNumber,endNumber)
      //   this.setState({
      //     width:width,
      //     height:height,
      //     endNumber:endNumber,
      //     currentNumber:currentNumber
      //   })
      // }
      componentWillReceiveProps(nextProps){
        if(nextProps.currentNumber!==undefined&&nextProps.endNumber){
          this.update(nextProps.currentNumber,nextProps.endNumber)
        }
        
      }
    onPress=(number)=>{
      if(this.value<100){ 
        this.value+=1
      }
      else{
        this.value=0
      }
      this.update(this.value,100)
    }
    test(){
      console.log(this.svgRef.current)
      console.log(this.textRef.current)
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
    


// var translateHeight= Dimensions.get("window").height*-0.5
// var arc = this.describeArc(this.centerX, this.centerY, this.radius, this.startAngle, this.endAngle)
// var textX = this.centerX-(this.fontSize*1.618)
// var textY = this.centerY
//console.log(this.textRef.current)     
// this.svgRef.d=(this.describeArc(this.centerX, this.centerY, this.radius, this.startAngle, this.endAngle));
return(
        //<TouchableHighlight onPress={this.onPress()}>
          <View style={{backgroundColor:'transparent'}}>
            {/* <TouchableHighlight onPress={this.test()} style={{backgroundColor:'grey', height:100, width:100}}> */}
              {/* <View> */}
              {/* <Text ref ={this.textRef}>random</Text> */}
              
              <Svg height={this.state.width} width={this.state.height} style={{display:'absolute',margin:0,top:0,left:0}}>
              
                <Path x="0" y="0" height="100%" width="100%"ref={this.svgRef} fill="none" style={{...styles.path,strokeLinecap:'round'}} stroke={this.state.color} strokeWidth="15" d={this.state.arc}></Path>
                  {/* <G style={{
                    
                    fontSize:15, 
                    fontFamily: "Roboto"
                    }}
                    textAnchor= "middle">
                  <Defs>
                  <Filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                  <FeGaussianBlur stdDeviation="10 10" result="glow"/>
                  <FeMerge>
                  <FeMergeNode in="glow"/>
                  <FeMergeNode in="glow"/>
                  <FeMergeNode in="glow"/>
                  </FeMerge>
                  </Filter>
                  </Defs>
                  <Text style={{filter: "url(#glow)"}} fill= "#0c9" x="175" y="55"> Simple Glow </Text>
                  <Text x="175" y="55" fill="white"> Simple Glow </Text>
                  </G> */}
                  {/* <Defs>
                    <Filter id="f1" x="0" y="0">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
                    </Filter>
                  </Defs> */}
                  <Text filter="url(#f1)" x={this.state.textX} y={this.state.textY} height="100%" width="100%" ref={this.textRef} fill={this.state.color }style={{display:'block',textAlign:'center',fontFamily:'Roboto',textShadowColor: 'rgba(0, 0, 0, 1)',
                            textShadowOffset: {width: 0, height: 0},
                            textShadowRadius: 8,}} textAnchor ="center" dominantBaseline="middle" alignmentBaseline ="middle" fontSize = {this.fontSize}>
                    {this.state.percentage}%
                  </Text>
                
              </Svg> 
              
              
              {/* </View> */}
            {/* </TouchableHighlight> */}
          </View>
        //</TouchableHighlight>
      );
}

    }
    
};
const styles = StyleSheet.create({
  path:{
    transform:[{translateX:(-50)},{translateY:(-Dimensions.get("window").width/2)}]
    
  },
  text:{
    color:'${ this.state.color }'
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

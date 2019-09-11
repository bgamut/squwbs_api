import React,{Component,useContext,useState,useRef,useEffect} from 'react';
import {Animated,PanResponder,Dimensions,View,Text,Image,TouchableHighlight,TouchableOpacity,StyleSheet} from 'react-native'
import { Context } from "../context";
import ReactDOM from 'react-dom'
import Fade from 'react-reveal/Fade'
import './css/SwipeableCard.css'
import Flippy, {FrontSide,BackSide} from 'react-flippy'
import Swipeout from 'react-native-swipeout'

const WordCardV2 = (props)=> {
  
  const [styleCondition, setStyleCondition]=useState(false)
  const [flipLock,setFlipLock]=useState(false)
  const [filteredData,setFilteredData]=useState(null)
  const [height,setHeight]=useState(0)
  const [dataManipulated,setDatamanipulated]=useState(false)
  const [refreshing,setRefreshing]=useState(true)
  const myRef = useRef(null)
  var swipeoutButtons =[
    {
      text:'Button'
    }
  ]
  var animatedValue = new Animated.Value(0)
  var value = 0
  animatedValue.addListener(({val})=>{
      value=val;
  })
  var frontInterpolate=animatedValue.interpolate({
      inputRange:[0,180],
      outputRange:['0deg','180deg'],
  })
  var backInterpolate=animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
  })


  var style={
    // height:Dimensions.get('window').height/11,
    height:Dimensions.get('window').height
  }
  var refsCollection={}
  //dragPos = new Animated.ValueXY({x:0,y:this.style.height});
  var dragPos = new Animated.ValueXY({x:0,y:100})
  var translateX = new Animated.Value(0);
  var translateY=new Animated.Value(0)
  const dismiss= (itemIndex,state,setState)=>{
      
    var filtered =filteredData.filter(item => item.index !== itemIndex);

    setFilteredData(filtered)
    setDatamanipulated(true)
    setRefreshing(false)
  }
 const flipCard=()=>{
     console.log('value : '+value)
    // if (value >= 90) {
    if(animatedValue.Value>=90){ 
      Animated.spring(animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
      value=0
    } else {
      Animated.spring(animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
      value=180
    }

  }

  const flip=()=>{
 
    console.log('flip pressed')
    console.log(flipLock)
    if(flipLock==false){
      flipCard()
    }
  
  }
  const remove=()=>{
    if(styleCondition==false){
        setStyleCondition(true)
    }
    else{
      setStyleCondition(false)
    }
    props.onRemove();
    dragPos.setValue({x:0,y:0})
    setStyleCondition(false)
  }
  var _panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (e,gestureState)=>{

      setFlipLock(true)
      dragPos.setValue({x:gestureState.dx,y:0})
    },
    onPanResponderRelease: (e, {vx, dx}) => {

      const screenWidth = Dimensions.get("window").width;
      if (Math.abs(vx) >= 0.1 || Math.abs(dx) >= 0.1 * screenWidth) {
        if(vx>0){
          props.onRightSwipe()
          //console.log('right')
        }
        else if(vx<0){
          props.onLeftSwipe()
          //console.log('left')
        }
        Animated.sequence([
          Animated.spring(dragPos, {
            //toValue: dx > 0 ? {x:screenWidth*1.5,y:style.height} : {x:-screenWidth*1.5,y:style.height },
            toValue: dx > 0 ? {x:screenWidth*1.5,y:height} : {x:-screenWidth*1.5,y:height },
            duration: 250
            
        }).start(
          ()=>
          {
            remove()
          },
        Animated.spring(dragPos,{
          toValue: dragPos.x > 0 ?{x:screenWidth*1.5,y:0} : {x:-screenWidth*1.5,y:0},
          duration:750
        })
          
        )
          //console.log("yo this element's index was "+props.name_first)
          //setState()
        ])
        
      } else {
        Animated.spring(dragPos, {
          //toValue: {x:0,y:style.height},
          toValue:{x:0,y:height},
          bounciness: 10
        }).start();
      }
      //this.setState({flipLock:false})
      //this.onPress()
      setFlipLock(false)
    }
  })
//   componentDidMount(){
//     window.addEventListener("resize", this.updateDimensions);
//     setHeight(Math.floor(Dimensions.get('window').height))
//   }
  const updateDimensions=()=>{
    setHeight(Math.floor(Dimensions.get('window').height-50))
    style.height=Math.floor(Dimensions.get('window').height-50)
    //console.log(this.state)
  }
  useEffect(()=>{
    window.addEventListener("resize", updateDimensions);
    window.addEventListener('orientationchange', updateDimensions)
    setHeight(Math.floor(Dimensions.get('window').height-50))
  },[])
  

  
  const onPress=(e)=>{
    // console.log(this.props)
    //console.log(this.state)
  }
    
   
  
    
  var frontAnimatedStyle = {
    transform: [
        { rotateX: frontInterpolate}
    ]
  }
  var backAnimatedStyle = {
    transform: [
        { rotateX: backInterpolate }
    ]
  }
  if(styleCondition==false){
    return (
      <View ref={myRef}>
        <Fade>
        
         <Animated.View
                 style={{
                     alignItems:'center',
                     justifyContent:'center',
                     transform: [{translateX: dragPos.x}],
                     backgroundColor:'transparent',
                        // margin:1,
                    }} 
                 {..._panResponder.panHandlers}
            >
            <TouchableHighlight onPress={flip} underlayColor={'transparent'}>

              {/* <View height={style.height}> */}
              <View height={height}>

                  <Animated.View 
                    style={
                      [styles.flipCard, 
                        frontAnimatedStyle,
                        {
                      
                          width:"100vw"
                        }

                      ]
                    }
                  >
                   

 
                    <View style={{alignItems:'center',justifyContent:'center',flex:1,backgroundColor:'transparent',flexDirection:'row'}}>
                        <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'transparent'}}>
                          <Text selectable={false} style={{           
                            textDecorationLine:'none',
                            color:'white',
                            fontSize: 35,
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
                              {props.word}
                          </Text>
                        </View>
                    </View>
                     
                    
                  </Animated.View>
                  <Animated.View 
                    style={
                      [
                        backAnimatedStyle,styles.flipCard, 
                        styles.flipCardBack,
                        {
                          width:"100vw",
                        //   padding:5,
                          alignItems:'center',
                          justifyContent:'center'
                        }
                      ]
                    }
                  >
                    <View style={{
                        backgroundColor:'transparent',
                        marginBottom:0,
                        alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                   
                        <View style={{flexDirection:'column',justifyContent: 'center',backgroundColor:'transparent',flex:1}} >
                                  
                  
                            <View style={{flexDirection:'row',justifyContent: 'center'}} >
                                <View style={{
                                    // paddingLeft:8,
                                    backgroundColor:"transparent",
                                    justifyContent:'center',
                                    alignItems:'center'}}>
                                    <View style={{backgroundColor:"transparent",justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{           
                                        textDecorationLine:'none',
                                        color:'white',
                                        fontSize: 35,
                                        textShadowColor: 'rgba(0, 0, 0, 1)',
                                        textShadowOffset: {width: 0, height: 0},
                                        textShadowRadius: 8,
                                        margin:0,
                                        }}>
                                            {props.meaning} 
                                        </Text>
                                        
                                    </View>
                                  </View>
                                </View>

                              </View>

                      </View>
                  </Animated.View>
                 
            
        </View>

      </TouchableHighlight>
      </Animated.View>
      
      </Fade>
      </View>
  );
}

else{
  return(
    <View style={{height:0}}>

    </View>
    // null
  )
}
    }
    

const styles = StyleSheet.create({
  container: {
    margin:0,
  },
  flipCard: {
    backgroundColor:'grey',
    // borderWidth:1,
    // borderColor: 'rgba(128,128,128,0)',
    // paddingTop:2,
    // paddingBottom:2,
    // paddingLeft:2,
    // paddingRight:2,
    // marginLeft:5,
    // marginRight:5,
    // marginBottom:5,
    // marginTop:5,
    backfaceVisibility: 'hidden',
    height: Dimensions.get('window').height,
    // shadowColor: '#000000',
    // shadowOffset: {
    //   width: 0,
    //   height: 0
    // },
    // shadowRadius: 3,
    // shadowOpacity: 0.25
  },
  flipCardBack: {
    backgroundColor:'white',
    height: Dimensions.get('window').height,
    position: "absolute",
    top: 0,
    // marginLeft:5,
    // marginRight:5,
    // marginBottom:5,
    // marginTop:5,
    // shadowColor: '#000000',
    // shadowOffset: {
    //   width: 0,
    //   height: 0
    // },
    // shadowRadius: 3,
    // shadowOpacity: 0.25
  }
});
export default WordCardV2;




import React,{Component,useContext} from 'react';
import {Animated,PanResponder,Dimensions,View,Text,Image,TouchableHighlight,StyleSheet} from 'react-native'
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
import AdSense from 'react-adsense'
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
                 style={{alignItems:'center',transform: [{translateX: this.dragPos.x}],backgroundColor:'transparent',margin:1.5,}} 
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
                    </View>
                  </Animated.View>

                  <Animated.View style={[backAnimatedStyle,styles.flipCard, styles.flipCardBack,{width:Dimensions.get('window').width-4,alignItems:'center',justifyContent:'center'}]}>
                          <Text selectable={false} style={{           
                            textDecorationLine:'none',
                            color:'white',
                            fontSize: 15,
                            textShadowColor: 'rgba(0, 0, 0, 1)',
                            textShadowOffset: {width: 0, height: 0},
                            textShadowRadius: 8,
                            margin:0,
                          }}>
                              filler
                              
                          </Text>
                          <AdSense.Google
                            client="ca-pub-5238507918606311"
                            slot=''
                            style={{width:100,height:100,float:'center'}}
                            format=""
                          />

                      {/* </Swipeout> */}
                    
                  </Animated.View>
                  {/* </BackSide> */}
            
        </View>
      {/* </Flippy> */}
      </TouchableHighlight>
      </Animated.View>
      
      </Fade>
      
  );
}

else{
  return(
    <View style={{height:this.dragPos.y}}>

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
export default SwipeableCard;


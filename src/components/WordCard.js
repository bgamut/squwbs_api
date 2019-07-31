import React,{Component,useContext} from 'react';
import {Animated,PanResponder,Dimensions,View,Text,Image,TouchableHighlight,TouchableOpacity,StyleSheet} from 'react-native'
import { Context } from "../context";
import ReactDOM from 'react-dom'
import Fade from 'react-reveal/Fade'
import './css/SwipeableCard.css'
import Flippy, {FrontSide,BackSide} from 'react-flippy'
import Swipeout from 'react-native-swipeout'
import Geolocation from 'react-geolocation'
import CPB from './CPB'
class WordCard extends Component {
  
 
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
    height:Dimensions.get('window').height
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
 
    
    if(this.state.flipLock==false){
      this.flipCard()
 
    }
  
  }
  remove=()=>{
    //console.log(ReactDOM.findDOMNode(this).parentNode)
    //ReactDOM.render(React.createElement(MemorizationCard),ReactDOM.findDOMNode(this).parentNode)
    if(this.state.styleCondition==false){
      this.setState({styleCondition:true})
      //console.log(this.state.styleCondition)
    }
    else{
      this.setState({styleCondition:false})
      //console.log(this.state.styleCondition)
    }
    //ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
    this.props.onRemove();
    this.dragPos.setValue({x:0,y:0})
    //console.log('set this to something else'+this.state.styleCondition)
    this.setState({styleCondition:false})
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

      
      const screenWidth = Dimensions.get("window").width-15;
      if (Math.abs(vx) >= 0.35 || Math.abs(dx) >= 0.35 * screenWidth) {
        if(vx>0){
          this.props.onRightSwipe()
          //console.log('right')
        }
        else if(vx<0){
          this.props.onLeftSwipe()
          //console.log('left')
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
  componentDidUpdate(){
      //console.log('updated card element')
  }
  
    onPress=(e)=>{
          // console.log(this.props)
          //console.log(this.state)
      }
    
    render(){
    //const [state, setState] = useContext(Context);
    //console.log(state)
    // if(this.myRef.current!==null){
    //     console.log(this.myRef.current.parentNode)
    // }
    
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
        <View ref={this.myRef}>
        <Fade>
        
         <Animated.View
                 style={{alignItems:'center',transform: [{translateX: this.dragPos.x}],backgroundColor:'transparent',margin:1,}} 
                 {...this._panResponder.panHandlers}
            >
            <TouchableHighlight onPress={this.flip} underlayColor={'transparent'}>

              <View height={this.style.height}>
            

                  <Animated.View style={[styles.flipCard, frontAnimatedStyle,{width:Dimensions.get('window').width-15}]}>
                   

 
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
                              {this.props.word}
                          </Text>
                         
                        </View>
                    </View>
                     
                    
                  </Animated.View>
                  <Animated.View style={[backAnimatedStyle,styles.flipCard, styles.flipCardBack,{width:Dimensions.get('window').width-15,padding:5,alignItems:'stretch',justifyContent:'center'}]}>
                    <View style={{backgroundColor:'transparent',marginBottom:0,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
                   
                                <View style={{flexDirection:'column',justifyContent: 'center',backgroundColor:'transparent',flex:1}} >
                                  
                  
                                  <View style={{flexDirection:'row',justifyContent: 'center'}} >
                                  <View style={{paddingLeft:8,backgroundColor:"transparent",justifyContent:'center',alignItems:'center'}}>
                                      <View style={{backgroundColor:"transparent",justifyContent:'space-around',alignItems:'stretch'}}>
                                        <Text style={{           
                                        textDecorationLine:'none',
                                        color:'white',
                                        fontSize: 35,
                                        textShadowColor: 'rgba(0, 0, 0, 1)',
                                        textShadowOffset: {width: 0, height: 0},
                                        textShadowRadius: 8,
                                        margin:0,
                                        }}>
                                            {this.props.meaning} 
                                        </Text>
                                        <View style = {{justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{           
                                        textDecorationLine:'none',
                                        color:'white',
                                        fontSize: 15,
                                        textShadowColor: 'rgba(0, 0, 0, 1)',
                                        textShadowOffset: {width: 0, height: 0},
                                        textShadowRadius: 8,
                                        margin:0,
                                        }}>
                                            {this.props.example}
                                        </Text>
                                        </View>
                                    </View>
                                  </View>
                                  {/* <CPB endNumber={100} currentNumber={this.props.percentage} /> */}
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
    
};
const styles = StyleSheet.create({
  container: {
    margin:0,
  },
  flipCard: {
    backgroundColor:'silver',
    borderWidth:1,
    borderColor: 'rgba(128,128,128,0)',
    paddingTop:2,
    paddingBottom:2,
    paddingLeft:2,
    paddingRight:2,
    marginLeft:5,
    margineRight:5,
    marginBottom:5,
    marginTop:5,
    backfaceVisibility: 'hidden',
    height: Dimensions.get('window').height-15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 3,
    shadowOpacity: 0.25
  },
  flipCardBack: {
    backgroundColor:'silver',
    height: Dimensions.get('window').height-15,
    position: "absolute",
    top: 0,
    marginLeft:5,
    margineRight:5,
    marginBottom:5,
    marginTop:5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 3,
    shadowOpacity: 0.25
  }
});
export default WordCard;




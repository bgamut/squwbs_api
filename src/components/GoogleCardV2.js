import React,{Component,useContext} from 'react';
import {Animated,PanResponder,Dimensions,View,Text,Image,TouchableHighlight,TouchableOpacity,StyleSheet,ScrollView} from 'react-native'
import { Context } from "../context";
import ReactDOM from 'react-dom'
import Fade from 'react-reveal/Fade'
import './css/SwipeableCard.css'
import './css/iconHover.css'
//import Flippy, {FrontSide,BackSide} from 'react-flippy'
import Swipeout from 'react-native-swipeout'

class GoogleCardV2 extends Component {
  
 
  constructor(props){
    super(props)
    this.state = {
      styleCondition:false,
      flipLock:false,
      height:0,
      width:0,
      duration:270
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
    console.log(state.filteredData)
    
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

      const screenWidth = this.state.width-15;
      if (Math.abs(vx) >= 0.1 || Math.abs(dx) >= 0.1 * screenWidth) {
        if(vx>0){
          this.props.onRightSwipe()

        }
        else if(vx<0){
          this.props.onLeftSwipe()
    
        }
        Animated.sequence([
          Animated.spring(this.dragPos, {
            toValue: dx > 0 ? {x:screenWidth*1.5,y:this.style.height} : {x:-screenWidth*1.5,y:this.style.height },
            duration: 250
            
        }).start(
          ()=>
          {
            this.remove()
          },
        Animated.spring(this.dragPos,{
          toValue: this.dragPos.x > 0 ?{x:screenWidth*1.5,y:0} : {x:-screenWidth*1.5,y:0},
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
  updateDimensions=()=>{
    this.setState({
        height:(Math.floor(Dimensions.get('window').height)),
        width:(Math.floor(Dimensions.get('window').width))
})
    
}
  componentDidMount(){
    Dimensions.addEventListener('change',(e)=>{
        this.updateDimensions()
      })
      this.updateDimensions()
  }
  updateDimensions(){

  }
  UNSAFE_componentDidUpdate(){

  }
  
    onPress=(e)=>{

      }
  
    createHashList = () =>{
        let parent = []
        this.props.hashs.map((hash)=>{
            parent.push(
            <TouchableOpacity
                
            >
                <Text
                    className='icon'
                    selectable={true} 
                    style ={{
                        fontSize: 12,
                        fontWeight:'700',
                        textDecorationLine:'none',
                        color:'rgb(196,196,196)',
                        textAlign:'center',
                        alignItems:'center',
                        justifyContent:'center',
                        flexDirection:'row',
                        margin:5,
                    }}
                >
                    #{hash}
                </Text>
            </TouchableOpacity>
            )
        })
        return parent;
    }
    render(){

    
      const frontAnimatedStyle = {
        transform: [
          { rotateY: this.frontInterpolate}
        ]
      }
      const backAnimatedStyle = {
        transform: [
          { rotateY: this.backInterpolate }
        ]
      }
      if(this.state.styleCondition==false){
      return (
        <View ref={this.myRef}
            style={{
                backgroundColor:'transparent'
            }}
        >
        <Fade
        duration={this.state.duration}
        timeout={this.state.duration}
        >
        <Fade
          style={{
            backgroundColor:'transparent',
            
            width:this.state.width-30,
          }}
          //when={fade}
          duration={this.state.duration}
          timeout={this.state.duration}
        >
        
         <Animated.View
                 style={{alignItems:'center',transform: [{translateX: this.dragPos.x}],backgroundColor:'transparent',margin:1,}} 
                 {...this._panResponder.panHandlers}
            >
            {/* <TouchableHighlight onPress={this.flip} underlayColor={'white'}> */}

              <View height={this.style.height}>
            

                  <Animated.View 
                    style={
                      [styles.flipCard, 
                        frontAnimatedStyle,
                        {
                          // width:Dimensions.get('window').width-15
                          height:this.state.height-15,
                          width:this.state.width,
                          justifyContent:'center',
                          alignItems:'center'
                        },
                        

                      ]
                    }
                  >
                   

 
                   <View style={{ 
                height:this.state.height-82,
                width:this.state.width-32,
                //backgroundColor:'rgb(175,175,175)',
                backgroundColor:'transparent',
                flexDirection:'column',
                //justifyContent:'center',
                //alignItems:'center',
                // borderRadius:2,
                // borderColor:'lightgrey',
                // borderStyle:'solid',
                overflow:'hidden',
                boxSizing:"border-box",
                // shadowColor:'#000',
                // shadowOpacity:0.85,
                // shadowRadius:2,
                // shadowOffset:{
                // width:0,
                // height:0
                // },
                // elevation:2,
                // paddingTop:5,
                // paddingLeft:5,
                // paddingRight:5,
                // paddingBottom:5
            }} 
                // {...getRootProps({refKey:'innerRef'})}
            >
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center',
                    backgroundColor:'transparent'
                }}
            >
                
            
            {/* <View
                style={{
                    width:120,
                    height:120,
                    backgroundColor:'transparent',
                    //margin:'auto',
                    //borderRadius:4,
                    //borderColor:'rgb(255,255,255)',
                    //borderWidth:1,
                    // shadowColor:'#000',
                    // shadowOpacity:0.85,
                    // shadowRadius:2,
                    // shadowOffset:{
                    //     width:0,
                    //     height:0
                    // },
                    // elevation:2,
                    //padding:10,
                    justifyContent:'center',
                    alignItems:'center',
                    marginLeft:0,
                    marginRight:0,
                    marginTop:0,
                }}
            >
                <View
                    style={{
                        height:90,
                        backgroundColor:'white'
                    }}
                >
                    <Image
                        style={{
                            width: 90, 
                            height: 90,
                            borderRadius:4,
                            top:0,
                            margin:0}}
                        source={{
                            uri: this.props.picture
                        }}
                    />
                </View>
            </View> */}
                <ScrollView
                    style={{
                        height:90,
                        width:this.state.width-180,
                        backgroundColor:'transparent',
                        //backgroundColor:'rgb(175,175,175)',
                        margin:0,
                        //borderRadius:4,
                        // shadowColor:'#000',
                        // shadowOpacity:0.85,
                        // shadowRadius:2,
                        // shadowOffset:{
                        //     width:0,
                        //     height:0
                        // },
                        // elevation:2,
                    }}
                    // style={{backgroundColor:'transparent',height:height-50,zIndex:98}}
                    onScroll={(e)=>{
                        //onScroll(e)
                        //console.log(e)
                        }
                    }
                    scrollEnabled={true}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={true}
                    //snapToInterval={height-50}
                    snapeToAlignment='end'
                    decelerationRate="fast"
                >
                               
                <View
                    style ={[{
                        backgroundColor:'transparent',
                        width:this.state.width-180,
                        // marginTop: 11,
                        // marginLeft:15,
                        // marginBottom:15,
                        alignItems:'center'
                    }]}
                >
                    <View
                        style ={
                        [
                            {
                                backgroundColor:'transparent',
                                width:this.state.width-210,
                                marginTop: 15,
                                // marginLeft:15,
                                // marginBottom:0
                            }
                        ]
                    }
                >
                    <Text
                        selectable={false} 
                        style ={[styles.text]}
                    >
                        {this.props.title}
                    </Text>
                </View>
                    <Text
                        selectable={false} 
                        style ={styles.text}
                    >
                        {this.props.writer}
                    </Text>
                    <br></br>
                    <Text
                        selectable={true} 
                        style ={{
                            fontSize: 12,
                            fontWeight:'700',
                            textDecorationLine:'none',
                            color:'rgb(196,196,196)',
                            textAlign:'center',
                            alignItems:'center',
                            justifyContent:'center',
                            flexDirection:'row',
                            margin:5,
                        }}
                    >
                        {this.props.date}
                    </Text>
                </View>
                </ScrollView>
            </View>            
            <ScrollView
                style={{
                    height:this.state.height-130,
                    width:this.state.width-32,
                    backgroundColor:'transparent',
                    //backgroundColor:'rgb(175,175,175)',
                    padding:15
                }}
                // style={{backgroundColor:'transparent',height:height-50,zIndex:98}}
                onScroll={(e)=>{
                    //onScroll(e)
                    //console.log(e)
                    }
                }
                scrollEnabled={true}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={true}
                //snapToInterval={height-50}
                snapeToAlignment='end'
                decelerationRate="fast"
            > 
                     <View
            style={{
                //position:'absolute',
                width:this.state.width-60,
                height:(this.state.width-30)*315/560,
                justifyContent:'center',
                //alignItems:'center',
                
                backgroundColor:'transparent',
                padding:0,
                //top:0
            }}
        >
    
        <View
        style={{
            width:this.state.width-60,
            height:(this.state.width-30)*315/560,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'transparent'
        }}
        >
        
            <iframe 
                
                style={{
                    //background:'rgb(175,175,175)'
                }}
            
                width={this.state.width-60} 
                height={(this.state.width-30)*315/560}
                src= { "https://www.youtube.com/embed/" + this.props.youtubeID} 
                frameborder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>

            </iframe>
        </View>
        </View>  
        <View
            style={{
                //paddingTop:30,
                //background:'rgb(175,175,175)',
                background:'white',
                paddingBottom:15,
                width:this.state.width-60
            }}
        >
                    <Text
                        selectable={true} 
                        style ={[styles.text]}
                    >
                        {this.props.post}
                    </Text>
        </View>           
                    <br></br>
                    {/* <Text
                        selectable={true} 
                        style ={[styles.text]}
                    >
                        {props.hashs}
                    </Text> */}
                    <View
                        style={{
                            margin:0,
                            padding:0,
                            flexDirection:'column',
                            justifyContent:'center',
                            alignItems:'center'
                        }}
                    >
                        <View
                            style={{
                                margin:0,
                                padding:0,
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'center'
                                
                            }}
                        >
                            {this.createHashList(this.props)}
                        </View>
                    </View>

                
            </ScrollView> 
            <View
                style={{
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'transparent',
                    width:this.state.width-30
                }}
            >
                <View
                    style={{
                        //position:'absolute',
                        flexDirection:'row',
                        width:this.state.width-60,
                        height:45,
                        backgroundColor:'transparent',
                        alignItems:'center',
                        justifyContent:'center',
                        bottom:0,
                        overflow:'hidden'
                    }}
                >
                    <View
                        style={{
                            flexDirection:'row',
                            width:(this.state.width-35)/4,
                            backgroundColor:'transparent',
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                    >
                        <TouchableOpacity
                            onPress={
                                this.flip
                            }
                        >
                        
                        <Text
                            className='icon'
                            style ={styles.icon}
                        >
                            {/* {props.stars} <i class="fas fa-star"></i>  */}
                            {/* Flip */}
                            {/* <i class="fas fa-edit"></i> */}
                            <i class="fas fa-server"></i>
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection:'row',
                            width:(this.state.width-35)/4,
                            backgroundColor:'transparent',
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                    >
                        <TouchableOpacity>
                        <Text
                            className='icon'
                            style ={styles.icon}
                        >   
                        
                            <i class="fab fa-slack-hash"></i>
                        
                            {/* {props.likes} Likes  */}
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection:'row',
                            width:(this.state.width-35)/4,
                            backgroundColor:'transparent',
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                    >
                        <TouchableOpacity>
                        <Text
                            className='icon'
                            style ={[
                                styles.icon,
                                
                            ]
                                
                            }
                        >
                            {/* <i class="fas fa-heart"></i> */}
                            <i class="fas fa-star"></i> 
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection:'row',
                            width:(this.state.width-35)/4,
                            backgroundColor:'transparent',
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                    >
                        <TouchableOpacity>
                        <Text
                            style ={styles.icon}
                            className='icon'
                        >
                            <i class="fas fa-share-alt"></i>
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
        
                </View>
            </View>
                     
                    
                  </Animated.View>
                  <Animated.View 
                    style={
                      [
                        backAnimatedStyle,styles.flipCard, 
                        styles.flipCardBack,
                        {
                          // width:Dimensions.get('window').width-15,
                          width:this.state.width,
                          height:this.state.height-15,
                          padding:5,
                          alignItems:'center',
                          justifyContent:'center'
                        }
                      ]
                    }
                  >
      
      
             
                           
            <ScrollView
                style={{
                    height:this.state.height-130,
                    width:this.state.width-32,
                    backgroundColor:'transparent',
                    //backgroundColor:'rgb(175,175,175)',
                    padding:15
                }}
                // style={{backgroundColor:'transparent',height:height-50,zIndex:98}}
                onScroll={(e)=>{
                    //onScroll(e)
                    //console.log(e)
                    }
                }
                scrollEnabled={true}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={true}
                //snapToInterval={height-50}
                snapeToAlignment='end'
                decelerationRate="fast"
            > 
                     
    
       
                  
                  

                
            </ScrollView> 
                    <View style={{
                            backgroundColor:'transparent',
                            marginBottom:0,
                            alignItems:'center',
                            justifyContent:'center',
                            flexDirection:'row',
                            height:this.state.hegiht-60
                            }}>
    {/*                     */}
            
                        <View
                    style={{
                        //position:'absolute',
                        flexDirection:'row',
                        width:this.state.width-60,
                        height:45,
                        backgroundColor:'transparent',
                        alignItems:'center',
                        justifyContent:'center',
                        bottom:0,
                        overflow:'hidden'
                    }}
                >
                    <View
                        style={{
                            flexDirection:'row',
                            width:(this.state.width-35)/4,
                            backgroundColor:'transparent',
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                    >
                        <TouchableOpacity
                            onPress={
                                this.flip
                            }
                        >
                        
                        <Text
                            className='icon'
                            style ={styles.icon}
                        >
                            {/* {props.stars} <i class="fas fa-star"></i>  */}
                            {/* Flip */}
                            {/* <i class="fas fa-edit"></i> */}
                            <i class="fas fa-server"></i>
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection:'row',
                            width:(this.state.width-35)/4,
                            backgroundColor:'transparent',
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                    >
                        <TouchableOpacity>
                        <Text
                            className='icon'
                            style ={styles.icon}
                        >   
                        
                            <i class="fab fa-slack-hash"></i>
                        
                            {/* {props.likes} Likes  */}
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection:'row',
                            width:(this.state.width-35)/4,
                            backgroundColor:'transparent',
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                    >
                        <TouchableOpacity>
                        <Text
                            className='icon'
                            style ={[
                                styles.icon,
                                
                            ]
                                
                            }
                        >
                            {/* <i class="fas fa-heart"></i> */}
                            <i class="fas fa-star"></i> 
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection:'row',
                            width:(this.state.width-35)/4,
                            backgroundColor:'transparent',
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                    >
                        <TouchableOpacity>
                        <Text
                            style ={styles.icon}
                            className='icon'
                        >
                            <i class="fas fa-share-alt"></i>
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                      </View>
                  </Animated.View>
                 
            
        </View>

      {/* </TouchableHighlight> */}
      </Animated.View>
      
      </Fade>
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
    backgroundColor:'rgb(211,211,211)',
    borderWidth:1,
    borderColor: 'rgba(128,128,128,0)',
    paddingTop:2,
    paddingBottom:2,
    paddingLeft:2,
    paddingRight:2,
    marginLeft:5,
    marginRight:5,
    marginBottom:5,
    marginTop:5,
    backfaceVisibility: 'hidden',
    // height: Dimensions.get('window').height-15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 2,
    shadowOpacity: 0.25
  },
  flipCardBack: {
    backgroundColor:'rgb(211,211,211)',
    //height: Dimensions.get('window').height-15,
    position: "absolute",
    backfaceVisibility: 'hidden',
    top: 0,
    marginLeft:5,
    marginRight:5,
    marginBottom:5,
    marginTop:5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 2,
    shadowOpacity: 0.25
  }
});
export default GoogleCardV2;




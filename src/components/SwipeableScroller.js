
import React,{Component,useContext} from 'react';
import {Animated,PanResponder,Dimensions,View,Text,Image,TouchableOpacity,ScrollView} from 'react-native'
import { Context } from "../context";
import Swiper from './Swiper'
import SwipeableList from './SwipeableList'
import Header from './Header'
const translateY = new Animated.Value(0);



class SwipeableScroller extends Component {
    
    //const [state, setState] = useContext(Context);
    constructor(props) {
        super(props);
        //this.scroller=React.createRef()
        //this.Header=React.createRef()
        this.state = {
            yscroll: new Animated.Value(0),
            dy:new Animated.Value(0),
            lastscroll:0,
            scroll:0,
            headerheight:22,
            change:0
        };
      }
    componentDidMount(){
        translateY.addListener(({value})=>{
            //console.log(value)
            //this.setState({...this.state,scroll:value})
            var limit=this.state.headerheight
              this.setState({scroll:value})
              if(value<=limit){
                this.setState({change:(limit*(value/limit))})
                console.log(limit*(value/limit))
              }
            
            //this.Header.setNativeProps({scrollValue:value})
            // this.scroller.current.scrollTo({
            //     y:-1*value
            // })
            //console.log(this.Header)
            //this.Header.props.yscroll=value
        })
    }
    onScroll=(e)=>{
        //console.log()
        //console.log(e.nativeEvent.contentOffset.y)
        //setState({...state,yscroll:e.nativeEvent.contentOffset.y})
        translateY.setValue(e.nativeEvent.contentOffset.y)
        //console.log()
      }
    // _panResponder = PanResponder.create({
    //     onMoveShouldSetResponderCapture: () => true,
    //     onMoveShouldSetPanResponderCapture: () => true,
    //     onPanResponderMove: (e,gestureState)=>{
    //         translateY.setValue(this.state.lastscroll+gestureState.dy)

    //         // this.scroller.current.scrollTo({
    //         //     y:-1*this.state.lastscroll+translateY._value,
    //         //     animated:true,
    //         //     duration:1
    //         // })
            
    //     },

    //     onPanResponderRelease: (e, {vy, dy}) => {
    //         //translateY.setValue(state.yscroll._value+dy)
    //         //console.log(this.state.yscroll+translateY._value)
    //         this.setState(
    //             (state,props)=>(
    //                 {
    //                     ...this.state,
    //                     lastscroll:state.lastscroll+dy}
    //             ))
    //         //console.log(this.state.yscroll)
    //     }
    // });

    render(){
        return(
            <View>
            <Header ref = {header=>{this.Header=header}} style = {{height:22}} yscroll={this.state.scroll}/>
            <ScrollView 
                //ref={this.scroller}
                style={{backgroundColor:'transparent',height:(Dimensions.get('window').height*13/15-60)}}
                onScroll={this.onScroll}
                //scrollTop={state.yscroll}
                scrollEnabled={false}
                scrollEventThrottle={16}
                // {...this._panResponder.panHandlers}
            >
            
            <View style={{backgroundColor:'transparent',flex:1,flexDirection:'column',margin:5,paddingRight:2,paddingLeft:2}}>
                {/* {props.children} */}
                
                <View style={{backgroundColor:'transparent',flex:1,height:Dimensions.get('window').height*2/3,flexDirection:'column',margin:5,paddingRight:2,paddingLeft:2}}>
                
          <View  style={{height:Dimensions.get('window').height/6,backgroundColor:'transparent'}}>
          
            <Swiper buttonsEnabled={false} loop={true} autoplayTimeout={5}>
  
              <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgb(20,20,20)"
                }}>
                  <Text>Slide 1</Text>
              </View>
              <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgb(110,110,110)"
              }}>
                  <Text>Slide 2</Text>
              </View>
              <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgb(200,200,200)"
              }}>
                  <Text>Slide 3</Text>
              </View>
            </Swiper>
          </View>

          </View>
          <View>
            <SwipeableList/>
          </View>
            </View>
        </ScrollView>
        </View>
        )
     }

}
export default SwipeableScroller

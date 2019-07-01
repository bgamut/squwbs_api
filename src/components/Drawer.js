import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity , Image, Platform, Animated,Dimensions} from 'react-native'
import NavBar from './NavBar'
var {name} =require( '../../package.json')
const SLIDING_DRAWER_WIDTH =300;
class Drawer extends Component{
    // maxheight=22
    constructor(props){
        super(props)
        this.Animation = new Animated.Value(0)
        this.Sliding_Drawer_Toggle = true;
        this.scroller=React.createRef()
        this.maxheight=50
        this.imageLength=50
        this.state = {
            dy:new Animated.Value(0),
            height:this.maxheight,
            lastscroll:0,
            maxheight:this.maxheight,
            opacity:new Animated.Value(1),
            yscroll: new Animated.Value(0),
        };
        this.state.yscroll.addListener(({value})=>{
            //console.log(value)
            // this.scroller.current.scrollTo({
            //     y:-1*value
            // })
            // this.forceUpdate()     
        })
    }
    static defaultProps ={
        footerHeight:2
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        //console.log(nextProps)
        //this.setState({...this.state,height:nextProps.style.height})
        var maxheight = this.state.maxheight
        var limit=maxheight
        
        // console.log(height)
        // console.log(height-nextProps.yscroll)
        // console.log(height-nextProps.yscroll/height)
        
            this.setState({opacity:((limit-nextProps.yscroll)/limit),height:maxheight-(maxheight*(nextProps.yscroll/(limit*5)))})
            //console.log(this.props.scrollValue)
            //this.opacity.setValue((this.height-this.props.scrollValue._value)/this.height)
        
       // console.log(this.state)

    }
    ShowSlidingDrawer = ()=>
    {
       
        if(this.Sliding_Drawer_Toggle==true)
        {
            
            Animated.timing(
                this.Animation,
                {
                    duration:500,
                    toValue:1,
                }
            ).start(()=>
            {
                this.Sliding_Drawer_Toggle=false;
            })
        }
        else
        {
          
            Animated.timing(
                this.Animation,
                {
                    duration:500,
                    toValue:0, 
                }
            ).start(()=>
            {
                this.Sliding_Drawer_Toggle=true;
            })
        }
    }
    render(){
        const ANIMATION_INTERPOLATE =this.Animation.interpolate(
            {
                inputRange:[0,1],
                outputRange:[-SLIDING_DRAWER_WIDTH,0]
            }
        )
        return(
            <View style={{            
                height:Dimensions.get('window').height-this.props.footerHeight,
                width:Dimensions.get('window').width,
                backgroundColor:'transparent'
            }}>
                <View style={
                {
                    // alignItems:'center',
                    backgroundColor:'#ffffff',
                    borderColor:'#cfcfcf',
                    borderRadius:2,
                    borderWidth:1,
                    // flexDirection:'row',
                    height:this.state.height,
                    justifyContent:'center',
                    marginBottom :2,
                    opacity:this.state.opacity      
                }
                }>  
                    <View style={{
                        alignItems:'center',
                        // backgroundColor:'black',
                        padding:0,
                        height:this.maxheight,
                        //right:0,
                        position:'absolute',
                        width:this.maxheight,
                        flex:1,
                        justifyContent:'center',
                        zIndex:'99',
                    }}>
                        <TouchableOpacity 
                            onPress = {this.ShowSlidingDrawer}
                            style={{
                                //backgroundColor:'black',
                            }}>
                            <Image source={require('./icons/96x96.png')} style={{
                                Top:(this.maxheight-this.imageLength)/2,
                                position:'absolue',
                                height:this.imageLength,
                                resizeMode:'contain',
                                width:this.imageLength,
                                //Right:0
                            }}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        alignItems:'center',
                        zIndex:0,
                    }}>
                        <Text style ={styles.textStyle} >
                            {name}
                        </Text>
                    </View> 
                </View> 
                {this.props.children}
                <Animated.View style={[styles.ROOT_SLIDING_DRAWER_CONTAINER, {
                    transform:[{
                        translateX:ANIMATION_INTERPOLATE
                        //translateX:0
                    },{
                        translateY:this.state.height
                    }],
                    height:Dimensions.get('window').height-this.state.height-this.props.footerHeight,
                    
                    }]}>
                    <View style = {styles.MAIN_SLIDING_DRAWER_CONTAINER}>
                        {/* <Text style ={styles.TextStyle}>another put stuff here placeholder </Text> */}
                        <NavBar/>
                    </View>
                </Animated.View>
                
                
                
                
            </View>
            
        )

        
    }
} 
export default Drawer
const styles=StyleSheet.create(
    {
        MAIN_SLIDING_DRAWER_CONTAINER:{
            //alignItems:'center',
            backgroundColor:'#ffffff',
            borderColor:"#cacaca",
            borderRadius:2,
            borderWidth:1,
            flex:1,
            //justifyContent: 'center',
            paddingHorizontal:10,
            zIndex:1,
            padding:5,
        },
        MainContainer:
        {
            top:0
        },
        ROOT_SLIDING_DRAWER_CONTAINER:
        {
            bottom:0,
            flexDirection:'row',
            left:0,
            position:'absolute',
            top:(Platform.OS==='ios')? 20:0,
            width:SLIDING_DRAWER_WIDTH,
            // margin:4,
            // padding:1,
            zIndex:99,
        },
        textStyle:{
            color:'white',
            fontSize: 19,
            textShadowColor: 'rgba(128, 128, 128, 1)',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 8,
            //height:this.maxheight
            //textAlign: 'center',
            // textShadowColor: 'rgba(1, 1, 1, 1)',
            // textShadowOffset: {width: 0, height: 0},
            // textShadowRadius: 20
        },

    }
)
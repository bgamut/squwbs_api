import React,{useContext,Component,PureComponent} from 'react'; 
//import {WholeContext} from "../WholeContext"
import {Text,View,Animated} from 'react-native'
//import MenuDrawer from 'react-native-side-drawer'
import {Context} from '../context'
import Drawer from './Drawer'
var {name} =require( '../../package.json')





class Header extends PureComponent {
    //const [state, setState] = useContext(Context);
    maxheight=22
    constructor(props) {
        super(props);
        this.scroller=React.createRef()
        this.state = {
            yscroll: new Animated.Value(0),
            dy:new Animated.Value(0),
            lastscroll:0,
            opacity:new Animated.Value(1),
            height:this.maxheight,
            maxheight:this.maxheight
        };
        this.state.yscroll.addListener(({value})=>{
            console.log(value)
            // this.scroller.current.scrollTo({
            //     y:-1*value
            // })
            //this.forceUpdate()
            
        })
    }
    
    
    //opacity= new Animated.Value(1)
    // if(state.yscroll>22){
    //     opacity=0
    // }
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
    
    //console.log(opacity)
    render(){
        return(
            <View style={
                // divStyle
                {
                    marginBottom :2,
                    //padding:1,
                    height:this.state.height,
                    backgroundColor:'#ffffff',
                    alignItems:'center',
                    justifyContent:'center',
                    //flexDirection:'row',
                    //flex:1,
                    borderColor:'black',
                    borderRadius:2,
                    color:'black',
                    borderColor:'#cfcfcf',
                    borderWidth:1,
                    opacity:this.state.opacity
                }
            }>        
                <Text style ={pStyle} >
                    {name}
                    {/* {state.yscroll} */}
                </Text>
            </View>
        
        )
    } 
};

const divStyle = {
    margin:0,
    //padding:1,
    height:22,
    backgroundColor:'#ffffff',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    flex:1,
    borderColor:'black',
    borderRadius:2,
    color:'black',
    borderColor:'#cfcfcf',
    borderWidth:1
};
  const pStyle = {
    color:'white',
    fontSize: 12,
    textShadowColor: 'rgba(128, 128, 128, 1)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
    //textAlign: 'center',
    // textShadowColor: 'rgba(1, 1, 1, 1)',
    // textShadowOffset: {width: 0, height: 0},
    // textShadowRadius: 20
  };


export default (Header)
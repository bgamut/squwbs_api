import React from 'react';
import { Link } from 'react-router-dom';
import {View,Dimensions} from 'react-native'
//import PageNotFound from '../../public/images/PageNotFound';
class NotFound extends React.Component{
    constructor(props){
        super(props)
        this.state={
            imgURL:'./images/pageNotFound.png',
            dimensions:{height:0,width:0}
        }
        this.imageHDRef=React.createRef();
        this.height=0
        this.width=0
    }
    componentDidMount(){
        this.imageHDRef.current.style.backgroundImage="url("+process.env.PUBLIC_URL+this.state.imgURL+")"
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({
            imgURL: nextProps.imgURL,
          });
    }
    UNSAFE_componentDidUpdate(){
        const changeDimensions=()=>{
            let height = Dimensions.get('window').height
            let width= Dimensions.get('window').width
           
                this.height=window.innerHeight
                this.width=window.innerWidth
  
            this.setState({dimensions:{height:height, width:width}})
            this.forceUpdate();
        }
        if ('onorientationchange' in window) {
            window.addEventListener("orientationchange", function() {
                changeDimensions()
                
                console.log("onorientationchange");
            }, false);
        } else if ('onresize' in window) {
            window.addEventListener("resize", function() {
                changeDimensions()
                // console.log("resize");
            }, false);
        }
        changeDimensions()
    }
    render(){
        return(
            <View style={{
                height:'100vh',
                width:'100vw',
                
                
                
            }}>
            <div 
                        
                        ref={this.imageHDRef}
                       
                        style={{
                            height:'100%',
                            width:'100%',
                            backgroundSize: '100% 100%',
                            backgroundRepeat: 'no-repeat',
                            
                            
                        }}

                    >
                      
                    <p style={{textAlign:"center"}}>
                        <Link to="/">Go to Home </Link>
                    </p>
            </div>
            </View>
         )   
            
          
    }
}
export default NotFound;
import React, { Component } from 'react';
import './css/SplitScreen.css'
import {View} from 'react-native'
import fs from 'fs'
// import WebImage from 'react-native-web-image'
class SplitScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            imgURL:'./icons/256x256.png',
            baseSixFour:''
        }
        this.imageHDRef=React.createRef();
        this.ironImageHd=null
        this.bg = './icons/16x16.png'
        this.imgStyle={
            // backgroundImage:'url('+this.state.baseSixFour+')',
            filter:'invert(88%)',
            zIndex:1,
            
            // backgroundColor:'red',
            height:100,
            width:100
        }
    }
    convertBlobToBase64 = blob => new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });
    componentDidMount(){
        fetch(this.state.imgURL)
        // .then(res=>res.arrayBuffer())
        .then(res=>res.blob())
        .then(ab=>this.convertBlobToBase64(ab))
        .then(data=>{
            console.log(data)
            this.setState({baseSixFour:data})
        })
        .catch(err=>console.err(err))
        var styleString="backgroundImage:url("+String(this.state.bassSixFour)+")" 
        //this.imageHDRef.current.props.style.width=200
        //this.imageHDRef.current.props.style.backgroundColor='red'
        //console.log((this.imageHDRef.current.props.style))
        // this.imageHDRef.current.style.width=200
        // this.imageHDRef.current.style.backgroundColor='red'
        this.imageHDRef.current.style.width='200px'
        console.log(process.env.PUBLIC_URL+this.props.source)
        this.imageHDRef.current.style.backgroundImage="url("+process.env.PUBLIC_URL+this.props.source+")"
        // console.log((this.imageHDRef.current.style))
        
        // console.log(React.refs)
        // const hdLoaderImg = new Image()
        // hdLoaderImg.src = this.props.srcLoaded
        // hdLoaderImg.onload=()=>{
        //     console.log(this.props.srcLoaded)
        //     React.findDOMNode(this.refs.imageHDRef).setAttribute(
        //         'style',
        //         "background-image:url("+this.props.srcLoaded+")"
        //         //"background-image:url("+String(this.state.baseSixFour)+")"
        //     )
        //     React.findDOMNode(this.refs.imageHDRef).setAttribute(
        //         'className',
        //         "test"
        //         //"background-image:url("+String(this.state.baseSixFour)+")"
        //     )
        //     this.ironImageHd.classList.add('iron-image-fade-in')
        // }
        // React.findDOMNode(this.refs.imageHDRef).setAttribute(
        //     'style',
        //     "background-image:url("+this.props.srcLoaded+")"
        //     //"background-image:url("+String(this.state.baseSixFour)+")"
        // )
    }
    componentDidUpdate(){
        console.log("state changed I think,"+this.state)

    }
    componentWillReceiveProps(newProps){
        // fs.readFile(newProps.source,(err,data)=>{
        //     console.log(data)
        // })
        // console.log(newProps)
        // this.imageHDRef.current.style.backgroundImage=newProps.source
        //fetch('./testorspraycan.js')
        // fetch(newProps.source)
        // // .then(res=>res.arrayBuffer())
        // .then(res=>res.blob())
        // .then(ab=>this.convertBlobToBase64(ab))
        // .then(data=>{
        //     console.log(data)
        //     this.imageHDRef.current.style.backgroundImage="url("+data+")"
        //     this.setState({baseSixFour:data})
        // })
        // .catch(err=>console.err(err))
        console.log(newProps.source)
        // process.env.PUBLIC_URL +newProps.source
    }
    handleKeyPress(e){
        console.log(e.key)
    }
    render() {
      
        return (
            
            // <WebImage style={this.imgStyle} source={{uri:this.state.baseSixFour}}/>
            <div
                style={{height:'100%',width:'100%'}}
            >
                <div 
                 
                ref={this.imageHDRef}
                style={{height:100,width:100,backgroundSize: '100% 100%',backgroundRepeat: 'no-repeat'}}
                // style={{height:100,width:100,backgroundSize: 'contain',backgroundRepeat: 'no-repeat'}}
                // style={{height:100,width:100,backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}}
                >
                    {/* <img src={process.env.PUBLIC_URL + '/icons/256x256.png'} alt="logo"/> */}
                </div>
            </div>    
            
            
            // <Image 
            //     style={this.imgStyle}
            //     source={this.state.baseSixFour}
            //     // source={{uri:this.state.baseSixFour.replace(/(\r\n|\n|\r)/gm, "")}}
            // /> 
            // <Image 
            //     style={[
            //             {width:100,height:100,resizeMode: "stretch"
            //         }]}
            //     source={{uri:this.state.baseSixFour}}
            //     // source={{uri:this.state.baseSixFour.replace(/(\r\n|\n|\r)/gm, "")}}
            // /> 
            // <div>          
            //     <div className = 'container'>
            //         <div className ='row'id='whole-screen'>
            //             <div className ='col-xs-6' id='img-container'>
            //                 {/* <div class='overlay-text' id='left' style ={{zIndex:1}}></div> */}
            //                 {/* <div className ='place-holders' id = 'place-holder1' style={this.imgStyle}> */}
            //                     <Image 
            //                         style={[this.imgStyle,
            //                             {width:100,height:100,resizeMode: "stretch"
            //                     }]}
            //                         source={{uri:this.state.baseSixFour.replace(/(\r\n|\n|\r)/gm, "")}}
            //                     /> 

            //                 {/* </div> */}
            //             </div>
            //             <div className ='col-xs-6' id='type-writer-area'>
            //                 <div className ='place-holders'id = 'place-holder2'></div>
            //                 <textarea id='text-input'type='text' spellCheck="false" onKeyPress={this.handleKeyPress}></textarea>
            //             </div>
            //         </div>
            //     </div>
            //     <input type='file' name='img' id='uploadimage' style={{display:'none'}}/>
            // </div>
        );
    }
}

export default SplitScreen;

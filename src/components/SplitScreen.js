import React, { Component } from 'react';
import './css/SplitScreen.css'
import {View,Dimensions} from 'react-native'
import fs from 'fs'
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import WebImage from 'react-native-web-image'
import { TesseractWorker }  from 'tesseract.js';
const worker = new TesseractWorker();
// import RNTesseractOcr from 'react-native-tesseract-ocr'


class SplitScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            imgURL:'./temp/jpeg/17.jpeg',
            baseSixFour:'',
            orientation:'',
            dimensions:{height:0,width:0},
            value:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.height=Dimensions.get('window').height
        this.width=Dimensions.get('window').width
        this.imageHDRef=React.createRef();
        this.inputRef = React.createRef();
        this.ironImageHd=null
        this.dimensions={height:0,width:0}
        this.bg = './temp/jpeg/17.jpeg'
        this.value=''
        this.imgStyle={
            // backgroundImage:'url('+this.state.baseSixFour+')',
            filter:'invert(88%)',
            zIndex:1,
            
            // backgroundColor:'red',
            height:'100%',
            width:'50%'
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
    changeDimensions(dimensions){
        this.setState({dimensions:dimensions})
    }
    componentDidMount(){
        const changeDimensions=()=>{
            const height = Dimensions.get('window').height
            const width= Dimensions.get('window').width
            // const dimensions = {hieght:height,width:width}
            // this.imageHDRef.current.style.height=height
            // this.imageHDRef.current.style.width=width
            // if(this.height!==height){
                this.height=height
            // }
            // if(this.width!==width){
                this.width=width
            // }
            // this.setState({dimensions:dimensions})
            // console.log(this.state.dimensions)
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
        fetch(this.state.imgURL)
        
        .then(res=>res.blob())
        .then(ab=>this.convertBlobToBase64(ab))
        .then(data=>{
            // console.log(data)
            this.setState({baseSixFour:data})
        })
        .catch(err=>console.err(err))
        var styleString="backgroundImage:url("+String(this.state.bassSixFour)+")" 
        //this.imageHDRef.current.props.style.width=200
        //this.imageHDRef.current.props.style.backgroundColor='red'
        //console.log((this.imageHDRef.current.props.style))
        // this.imageHDRef.current.style.width=200
        // this.imageHDRef.current.style.backgroundColor='red'
        // console.log(this.state.dimensions.height)
        // console.log(this.state.dimensions.width)
        // this.imageHDRef.current.style.height=this.state.dimensions.height
        // this.imageHDRef.current.style.width=this.state.dimensions.width
        console.log(process.env.PUBLIC_URL+this.props.source)
        this.imageHDRef.current.style.backgroundImage="url("+process.env.PUBLIC_URL+this.props.source+")"
        this.setState({
            value:"this is how you change up the default text"
        })
        
        changeDimensions()
        worker.recognize(process.env.PUBLIC_URL+this.props.source,'kor')
        .progress(progress => {
            console.log('progress', progress);
        }).then(result => {
            console.log('result', result.text);
            this.setState({value:result.text})
        });

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
        // console.log(RNTesseractOcr)
        // RNTesseractOcr.recognize(process.env.PUBLIC_URL+this.props.source,'LANG_KOREAN',{whitelist:null,blacklist:null})
        // .then((result) => {
        //     this.setState({ ocrResult: result });
        //     console.log("OCR Result: ", result);
        //   })
        //   .catch((err) => {
        //     console.log("OCR Error: ", err);
        //   })
        //   .done();
    }
    componentDidUpdate(){
        console.log("state changed I think,"+this.state.value)
        // this.forceUpdate()
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
        // console.log(e.key)
        console.log(e.target.value)
        this.setState({value:e.target.value})
        //console.log(this.inputRef.current.value)
    }
    handleChange(e){
        //this.value=e.target.value
        this.setState({value:e.target.value})
    }
    render() {
      
        return (
            
            // <WebImage style={this.imgStyle} source={{uri:this.state.baseSixFour}}/>
            <View
                style={{flexDirection:'row'}}
            >
                    <View >
                        <div 
                        
                            ref={this.imageHDRef}
                            // style={{height:hp('100%'),width:wp('50%'),backgroundSize: '100% 100%',backgroundRepeat: 'no-repeat'}}
                            style={{height:this.height,width:this.width/2,backgroundSize: '100% 100%',backgroundRepeat: 'no-repeat'}}
                        // style={{height:100,width:100,backgroundSize: 'contain',backgroundRepeat: 'no-repeat'}}
                        // style={{height:100,width:100,backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}}
                        >
                            {/* <img src={process.env.PUBLIC_URL + '/icons/256x256.png'} alt="logo"/> */}
                        </div>
                    </View>
                
                     <View id = 'place-holder2' >
                        <textarea id='text-input'type='text' spellCheck="false" 
                            ref={this.inputRef}
                            value={this.state.value}
                            //style={{height:hp('100%'),width:wp('50%'),backgroundSize: '100% 100%',backgroundRepeat: 'no-repeat'}} 
                            style={{height:this.height,width:this.width/2,backgroundSize: '100% 100%',backgroundRepeat: 'no-repeat'}} 
                            // onKeyPress={this.handleKeyPress}
                            onChange={this.handleChange}
                            >
                        </textarea> 
                     </View>
                     
                
            </View>    
            
            
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

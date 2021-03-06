import React, { Component } from 'react';
import './css/SplitScreen.css'
import {View,Dimensions} from 'react-native'
import fs from 'fs'
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import WebImage from 'react-native-web-image'
import { TesseractWorker }  from 'tesseract.js';
import run from './Tensor'
import PFive from './PFive'
import {usePdf} from 'react-pdf-js'
const worker = new TesseractWorker();
// import RNTesseractOcr from 'react-native-tesseract-ocr'


class SplitScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            //imgURL:'./temp/jpeg/17.jpeg',
            pdfURL:'./temp/pdf/doc.pdf',
            imgURL:props.source,
            baseSixFour:'',
            orientation:'',
            dimensions:{height:0,width:0},
            value:'',
            book:[],
            currentPage:17
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.height=Dimensions.get('window').height
        this.width=Dimensions.get('window').width
        this.imageHDRef=React.createRef();
        this.inputRef = React.createRef();
        this.ironImageHd=null
        this.dimensions={height:0,width:0}
        this.minimal=15
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
        // this.height=Dimensions.get('window').height
        // this.width=Dimensions.get('window').width
        this.height=window.innerHeight
        this.width=window.innerWidth
        this.minimal=Math.min(window.innerHeight,window.innerWidth)
    }
    pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
      }
    read(){
        this.setState({
            value:"Optical Character Recognition Module Loading"
        })
    
        //worker.recognize(process.env.PUBLIC_URL+this.props.source,'kor')
        worker.recognize(process.env.PUBLIC_URL+this.state.imgURL,'kor')
        .progress(progress => {
            // console.log('progress', progress);
            this.setState({value:progress.status +" : " + this.pad(parseFloat(Math.round(progress.progress*10000)/100).toFixed(2),5)+"%"})
            
        }).then(result => {
            // console.log('result', result.text);
            var newText =  result.text.replace(/(\r\n\t|\n|\r\t|\t|\f|;|\|\/|<|>|'|'|:|_|]'+'|'*'|ㅠ|ㅎ|ㅋ|\s)/gm,"").replace(/\s\s+/g," ").replace(/[\/|\\]/g,"");
            this.setState({value:newText})
        }); 
    }
    componentDidMount(){
        const changeDimensions=()=>{
            let height = Dimensions.get('window').height
            let width= Dimensions.get('window').width
            // const dimensions = {hieght:height,width:width}
            // this.imageHDRef.current.style.height=height
            // this.imageHDRef.current.style.width=width
            // if(this.height!==height){
                this.height=window.innerHeight
            // }
            // if(this.width!==width){
                this.width=window.innerWidth
            // }
            // this.setState({dimensions:dimensions})
            // console.log(this.state.dimensions)
            this.setState({dimensions:{height:height, width:width}})
            this.forceUpdate();
        }
        
        // document.getElementById('text-input').addEventListener("mousedown",{ function(e){
        //     console.log(e.button)
        //     }
        // })
        this.inputRef.current.addEventListener("mousedown",(e)=>{
            //e.preventDefault()
            if(e.shiftKey){
                if(e.button==2){
                    this.next()
                }
                else if(e.button==0){
                    this.prev()
                }
            }
            console.log(e.button)
        })
       
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
    //     this.inputRef.current.addEventListener("contextchange",(e)=>{
    //         if(e.shiftKey){
    //             e.preventDefault()
    //         }
    //         console.log(e.button)
    //     }
    //    )
       //window.onContextmenu=(e)=>{
        //     e.preventDefault()
        //     console.log(e.button())
        // }
        window.addEventListener("contextmenu",(e)=>{
            if(e.shiftKey){
                e.preventDefault()
                console.log(e.button)
                //this.handleClick()
                //this.log()
            }
        })
        
        // fetch(this.state.imgURL)
        
        // .then(res=>res.blob())
        // .then(ab=>this.convertBlobToBase64(ab))
        // .then(data=>{
        //     // console.log(data)
        //     this.setState({baseSixFour:data})
        // })
        // .catch(err=>console.err(err))
        fetch(this.state.pdfURL)
        
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
        // console.log(this.state.dimensions.height)
        // console.log(this.state.dimensions.width)
        // this.imageHDRef.current.style.height=this.state.dimensions.height
        // this.imageHDRef.current.style.width=this.state.dimensions.width
        //console.log(process.env.PUBLIC_URL+this.props.source)
        // this.imageHDRef.current.style.backgroundImage="url("+process.env.PUBLIC_URL+this.props.source+")"
        console.log(process.env.PUBLIC_URL+this.state.imgURL)
        this.imageHDRef.current.style.backgroundImage="url("+process.env.PUBLIC_URL+this.state.imgURL+")"
        this.setState({
            value:"Optical Character Recognition Module Loading"
        })
    
        changeDimensions()
        //worker.recognize(process.env.PUBLIC_URL+this.props.source,'kor')
        worker.recognize(process.env.PUBLIC_URL+this.state.imgURL,'kor')
        .progress(progress => {
            // console.log('progress', progress);
            this.setState({value:progress.status +" : " + this.pad(parseFloat(Math.round(progress.progress*10000)/100).toFixed(2),5)+"%"})
            
        }).then(result => {
            // console.log('result', result.text);
            var newText =  result.text.replace(/(\r\n\t|\n|\r\t|\t|\f|;|\|\/|<|>|'|'|:|_|]'+'|'*'|ㅠ|ㅎ|ㅋ|\s)/gm,"").replace(/\s\s+/g," ").replace(/[\/|\\]/g,"");
            this.setState({value:newText})
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
    UNSAFE_componentDidUpdate(){
        console.log("state changed: "+this.state.imgURL)
        // this.forceUpdate()
    }
    UNSAFE_componentWillReceiveProps(newProps){
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
    next(){
        console.log(this.inputRef.current)
        const pageNumber = this.state.currentPage+1
        this.setState({
            imgURL:'./temp/jpeg/'+pageNumber+".jpeg",
            currentPage:pageNumber
        })
        this.imageHDRef.current.style.backgroundImage="url("+process.env.PUBLIC_URL+this.state.imgURL+")"
        
        this.forceUpdate()
        this.read()
    }
    prev(){
        console.log(this.inputRef.current)
        const pageNumber = this.state.currentPage-1
        this.setState({
            imgURL:'./temp/jpeg/'+pageNumber+".jpeg",
            currentPage:pageNumber
        })
        this.imageHDRef.current.style.backgroundImage="url("+process.env.PUBLIC_URL+this.state.imgURL+")"
        this.forceUpdate()
        this.read()
    }
    handleKeyPress(e){
        console.log(e.key)
        // console.log(e.target.value)
        if(e.shiftKey){
            //e.preventDefault();
            //e.stopPropagation();
            if(e.keyCode==13){
                e.preventDefault();
                console.log('prev page load function goes here')
            }
            else if(e.keyCode==39){
                e.preventDefault();
                console.log('next page load function goes here')
            }
            else if(e.keyCode==37){
                e.preventDefault();
                console.log('previous page load function goes here')
            }
            console.log(e.key)
            console.log(e.button)
        }
        this.setState({value:e.target.value})
        
        
        console.log(this.inputRef.current.value)
        console.log(e.key)
    }
    handleChange(e){
        //this.value=e.target.value
        console.log(e)
        this.setState({value:e.target.value})
    }
    handleClick(e){
        e.preventDefault()
        e.stopPropagation();
        console.log(e.button)
    }
    render() {
      
        return (
            
            // <WebImage style={this.imgStyle} source={{uri:this.state.baseSixFour}}/>
            <View
                style={{flexDirection:'row',padding:1}}
            >
               
                    <View 
                        style={{
                            height:'100vh',
                            width:'50vw',
                            borderColor:'black',
                            borderWidth:1,
                        }}
                    >
                        <div 
                        
                            ref={this.imageHDRef}
                            // style={{height:hp('100%'),width:wp('50%'),backgroundSize: '100% 100%',backgroundRepeat: 'no-repeat'}}
                            style={{
                                height:'100%',
                                width:'100%',
                                backgroundSize: '100% 100%',
                                backgroundRepeat: 'no-repeat',
                                
                            }}
                        // style={{height:100,width:100,backgroundSize: 'contain',backgroundRepeat: 'no-repeat'}}
                        // style={{height:100,width:100,backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}}
                        >
                            {/* <img src={process.env.PUBLIC_URL + '/icons/256x256.png'} alt="logo"/> */}
                        </div>
                    </View>
                
                     <View 
                        id = 'place-holder2' 
                        // pointerEvents="none"
                        style={{
                            height:"100vh",
                            width:"50vw",
                            paddingTop:1,
                            paddingBottom:1,
                            paddingLeft:1,
                            paddingRight:1,
                            // borderColor:'black',
                            // borderWidth:1,
                            backgroundColor:'black',
                            // zIndex:1
                        }}
                     >
                        <div  
                            style={{
                                height:"100%",
                                width:"100%",
                                // zIndex:2,
                                backgroundColor:'black'
                            }}
                            // pointerEvents="none"
                                >
                        <textarea id='text-input'type='text' spellCheck="false" 
                            ref={this.inputRef}
                            value={this.state.value}
                            //style={{height:hp('100%'),width:wp('50%'),backgroundSize: '100% 100%',backgroundRepeat: 'no-repeat'}} 
                            // onContextMenu={false}
                            style={{
                                height:this.height-70,
                                width:this.width/2-50,
                                fontSize:13,
                                lineHeight:2,
                                // margin:1,
                                paddingTop:35,
                                paddingLeft: 25,
                                paddingRight: 25,
                                paddingBottom:35,
                                border:'none',
                                // zIndex:3,
                            }} 
                            onKeyPress={this.handleKeyPress}
                            onChange={this.handleChange}
                            // onClick={this.handleClick}
                            >
                        </textarea> 
                        </div>
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

import React, { Component,useRef,useState,useEffect,Fragment,useCallback } from 'react';

import './css/SplitScreen.css'
import {TouchableOpacity,Text,View,Dimensions} from 'react-native'
import fs from 'fs'
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import WebImage from 'react-native-web-image'
import { TesseractWorker }  from 'tesseract.js';
import run from './Tensor'
import PFive from './PFive'
import {usePdf} from 'react-pdf-js'
import { updateStatement } from 'typescript';
import ReactDOM from 'react-dom'

const worker = new TesseractWorker();
// import RNTesseractOcr from 'react-native-tesseract-ocr'


const SplitScreenV2=()=> {
   
    const [page,setPage]=useState(1);
    const [pages,setPages]=useState([]);
    const [width,setWidth] =useState(0)
    const [height,setHeight]=useState(0)
    
    const [textValue,setTextValue] = useState('')
    const [lock,setLock]= useState(false)

    const frame = useRef(null)
    const canvasEl=useRef(null)
    const imageHDRef=useRef(null)
    const inputRef = useRef(null)



    const [pageChange,setPageChange]=useState(false)
    

    const [force,forceState] = useState()
    const forceUpdate = useCallback(()=>forceState({}),[force])


    const [loading,numPages]=usePdf({
        file:process.env.PUBLIC_URL+'/temp/pdf/doc.pdf',
        page:page,
        canvasEl:canvasEl
    })
    const convertBlobToBase64 = blob => new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });
    const changeDimension=()=>{
        //this.setState({dimensions:dimensions})
        //this.height=window.innerHeight
        //this.width=window.innerWidth
        //this.minimal=Math.min(window.innerHeight,window.innerWidth)
        // console.log(window.innerWidth)
        // console.log(window.innerHeight)
        var height=window.innerHeight
        var width = window.innerWidth
        setWidth(width)
        setHeight(height)
        console.log(width+" : "+height)
        
        
    }
    useEffect(()=>{
      // if(frame.current!==null){
      //   if(frame.current.childNodes.length<=0){
            ReactDOM.render(
              <canvas style={{display:'none'}} ref={canvasEl} /> ,
              frame.current
            )
            var img = canvasEl.current.toDataURL()
            //console.log(img)
            imageHDRef.current.style.backgroundImage="url("+img+")"
            worker.recognize(img,'eng')
              .progress(progress => {
                  setTextValue(progress.status +" : " + pad(parseFloat(Math.round(progress.progress*10000)/100).toFixed(2),5)+"%")
                  
              }).then(result => {
                  var newText =  result.text.replace(/(\r\n\t|\n|\r\t|\t|\f|;|\|\/|<|>|'|'|:|_|]'+'|'*'|ㅠ|ㅎ|ㅋ|\s)/gm,"").replace(/\s\s+/g," ").replace(/[\/|\\]/g,"");
                  setTextValue(newText)
                  //setPages(...pages,newText)
                  console.log(newText)
                  console.log(page+'/'+numPages)
                  console.log(lock)
                  if(numPages==null){
                    setPage(page+1)
                  }
                  else{
                    if(lock==false){
                      if(page<numPages){
                        setPage(page+1)
                      }
                      else{
                        
                        setLock(true)
                      }
                    }
                  }
                  
                  
              });
        //   }
        // }
      
    },[page])
    useEffect(() => {
      // code to run on component mount
      changeDimension()
      window.addEventListener("orientationchange", function() {
          changeDimension()
          
      }, false);
      window.addEventListener("resize", function() {
          changeDimension()
          
      }, false);
      console.log('first setup fired')
      // var img = canvasEl.current.toDataURL()
      // console.log(img)
      // imageHDRef.current.style.backgroundImage="url("+img+")"
      // worker.recognize(img,'eng')
      //   .progress(progress => {
      //       setTextValue(progress.status +" : " + pad(parseFloat(Math.round(progress.progress*10000)/100).toFixed(2),5)+"%")
            
      //   }).then(result => {
      //       var newText =  result.text.replace(/(\r\n\t|\n|\r\t|\t|\f|;|\|\/|<|>|'|'|:|_|]'+'|'*'|ㅠ|ㅎ|ㅋ|\s)/gm,"").replace(/\s\s+/g," ").replace(/[\/|\\]/g,"");
      //       setTextValue(newText)
      //   });
      setPage(1)
    }, [])
    useEffect(()=>{
      // canvasEl.width(width)
      // canvasEl.hegiht(height)
      //console.log(canvasEl.current.width)
      canvasEl.current.width=width
      canvasEl.current.height=height
    },[height,width])
    
    useEffect(()=>{
      setPages(numPages);
      
    },[numPages])
    useEffect(()=>{
      
      setPageChange(false)
    },[pageChange])
    const pad=(n, width, z) =>{
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
      }
    const pageUp=()=>{
      setPage(page+1)
      console.log(page)
      // var img = canvasEl.current.toDataURL()
      // console.log(img)
      // imageHDRef.current.style.backgroundImage="url("+img+")"
      // worker.recognize(img,'eng')
      //   .progress(progress => {
      //       setTextValue(progress.status +" : " + pad(parseFloat(Math.round(progress.progress*10000)/100).toFixed(2),5)+"%")
            
      //   }).then(result => {
      //       var newText =  result.text.replace(/(\r\n\t|\n|\r\t|\t|\f|;|\|\/|<|>|'|'|:|_|]'+'|'*'|ㅠ|ㅎ|ㅋ|\s)/gm,"").replace(/\s\s+/g," ").replace(/[\/|\\]/g,"");
      //       setTextValue(newText)
      //   });
      // var img = canvasEl.current.toDataURL()
      // console.log(img)
      // imageHDRef.current.style.backgroundImage="url("+img+")"
      setPageChange(true)
      forceUpdate()
    }
    const pageDown=()=>{
      
      setPage(page-1)
      // var img = canvasEl.current.toDataURL()
      // console.log(img)
      // imageHDRef.current.style.backgroundImage="url("+img+")"
      // worker.recognize(img,'eng')
      //   .progress(progress => {
      //       setTextValue(progress.status +" : " + pad(parseFloat(Math.round(progress.progress*10000)/100).toFixed(2),5)+"%")
            
      //   }).then(result => {
      //       var newText =  result.text.replace(/(\r\n\t|\n|\r\t|\t|\f|;|\|\/|<|>|'|'|:|_|]'+'|'*'|ㅠ|ㅎ|ㅋ|\s)/gm,"").replace(/\s\s+/g," ").replace(/[\/|\\]/g,"");
      //       setTextValue(newText)
      //   });
      // var img = canvasEl.current.toDataURL()
      // console.log(img)
      // imageHDRef.current.style.backgroundImage="url("+img+")"
      setPageChange(true)
      forceUpdate()
    }
    const read=()=>{
        this.setState({
            value:"Optical Character Recognition Module Loading"
        })
        worker.recognize(process.env.PUBLIC_URL+this.state.imgURL,'kor')
        .progress(progress => {
            this.setState({value:progress.status +" : " + this.pad(parseFloat(Math.round(progress.progress*10000)/100).toFixed(2),5)+"%"})
            
        }).then(result => {
            var newText =  result.text.replace(/(\r\n\t|\n|\r\t|\t|\f|;|\|\/|<|>|'|'|:|_|]'+'|'*'|ㅠ|ㅎ|ㅋ|\s)/gm,"").replace(/\s\s+/g," ").replace(/[\/|\\]/g,"");
            this.setState({value:newText})
        }); 
    }
    const renderPagination = (page, pages) => {
    
        if (!pages) {
          return(null)
        }
        // //let previousButton = <li className="previous" onClick={() => setPage(page - 1)}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;        
          
        if (page === 1) {
            // console.log("page1")
            return(
            
            <View style = {{flexDirection:'row',height:50,width:'100vw',backgroundColor:"grey",padding:4,justifyContent: 'center'}}>
            <View style={{height:'100%',width:'38%',backgroundColor:'white',padding:4}}/>
            <TouchableOpacity onPress={pageUp}style={{height:'100%',width:'38%',backgroundColor:'white',padding:4,justifyContent: 'center',flexDirection:'row'}}>
              <Text style={{textAlign:"center"}}>
                next
              </Text>
            </TouchableOpacity>
              {/* <Text>testing</Text> */}
            </View>
            
            )
         
        }
        // // let nextButton = <li className="next" onClick={() => setPage(page + 1)}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
        if (page === pages) {
          return (
            <View style = {{flexDirection:'row',height:50,width:'100vw',backgroundColor:"grey",padding:4,justifyContent: 'center'}}>
              <TouchableOpacity onPress={pageDown} style={{height:'100%',width:'38%',backgroundColor:'white',padding:4,justifyContent: 'center',flexDirection:'row'}}>
              <Text style={{textAlign:"center"}}>
                previous
              </Text>
            </TouchableOpacity>
            <View onPress={pageUp}style={{height:'100%',width:'38%',backgroundColor:'white',padding:4}}>
              
            </View>
              {/* <Text>testing</Text> */}
            </View>
          )
        }
        return (
            <View style = {{flexDirection:'row',height:50,width:'100vw',backgroundColor:"grey",padding:4,justifyContent: 'center'}}>
              <TouchableOpacity onPress={pageDown} style={{height:'100%',width:'38%',backgroundColor:'white',padding:4,justifyContent: 'center',flexDirection:'row'}}>
              <Text style={{textAlign:"center"}}>
                previous
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pageUp}style={{height:'100%',width:'38%',backgroundColor:'white',padding:4,justifyContent: 'center',flexDirection:'row'}}>
              <Text style={{textAlign:"center"}}>
                next
              </Text>
          </TouchableOpacity>
              {/* <Text>testing</Text> */}
            </View>
        );
      }
    
    // componentDidMount(){
    //     const changeDimensions=()=>{
    //         let height = Dimensions.get('window').height
    //         let width= Dimensions.get('window').width
    //         this.height=window.innerHeight
    //         this.width=window.innerWidth
    //         this.setState({dimensions:{height:height, width:width}})
    //         this.forceUpdate();
    //     }

    //     this.inputRef.current.addEventListener("mousedown",(e)=>{
    //         if(e.shiftKey){
    //             if(e.button==2){
    //                 this.next()
    //             }
    //             else if(e.button==0){
    //                 this.prev()
    //             }
    //         }
    //         console.log(e.button)
    //     })
       
    //     if ('onorientationchange' in window) {
    //         window.addEventListener("orientationchange", function() {
    //             changeDimensions()
    //             console.log("onorientationchange");
    //         }, false);
    //     } else if ('onresize' in window) {
    //         window.addEventListener("resize", function() {
    //             changeDimensions()
    //         }, false);
    //     }
    //     window.addEventListener("contextmenu",(e)=>{
    //         if(e.shiftKey){
    //             e.preventDefault()
    //             console.log(e.button)
    //         }
    //     })
    //     fetch(this.state.pdfURL)
        
    //     .then(res=>res.blob())
    //     .then(ab=>this.convertBlobToBase64(ab))
    //     .then(data=>{
    //         console.log(data)
    //         this.setState({baseSixFour:data})
    //     })
    //     .catch(err=>console.err(err))
    //     var styleString="backgroundImage:url("+String(this.state.bassSixFour)+")" 
    //     console.log(process.env.PUBLIC_URL+this.state.imgURL)
    //     this.imageHDRef.current.style.backgroundImage="url("+process.env.PUBLIC_URL+this.state.imgURL+")"
    //     this.setState({
    //         value:"Optical Character Recognition Module Loading"
    //     })
    
    //     changeDimensions()
    //     worker.recognize(process.env.PUBLIC_URL+this.state.imgURL,'kor')
    //     .progress(progress => {
    //         this.setState({value:progress.status +" : " + this.pad(parseFloat(Math.round(progress.progress*10000)/100).toFixed(2),5)+"%"})
            
    //     }).then(result => {
    //         var newText =  result.text.replace(/(\r\n\t|\n|\r\t|\t|\f|;|\|\/|<|>|'|'|:|_|]'+'|'*'|ㅠ|ㅎ|ㅋ|\s)/gm,"").replace(/\s\s+/g," ").replace(/[\/|\\]/g,"");
    //         this.setState({value:newText})
    //     });
    // }
    // componentDidUpdate(){
    //     console.log("state changed: "+this.state.imgURL)
    // }
    // componentWillReceiveProps(newProps){
    //     console.log(newProps.source)
    // }
    // next(){
    //     console.log(this.inputRef.current)
    //     const pageNumber = this.state.currentPage+1
    //     this.setState({
    //         imgURL:'./temp/jpeg/'+pageNumber+".jpeg",
    //         currentPage:pageNumber
    //     })
    //     this.imageHDRef.current.style.backgroundImage="url("+process.env.PUBLIC_URL+this.state.imgURL+")"
        
    //     this.forceUpdate()
    //     this.read()
    // }
    // prev(){
    //     console.log(this.inputRef.current)
    //     const pageNumber = this.state.currentPage-1
    //     this.setState({
    //         imgURL:'./temp/jpeg/'+pageNumber+".jpeg",
    //         currentPage:pageNumber
    //     })
    //     this.imageHDRef.current.style.backgroundImage="url("+process.env.PUBLIC_URL+this.state.imgURL+")"
    //     this.forceUpdate()
    //     this.read()
    // }
    
    // handleClick(e){
    //     e.preventDefault()
    //     e.stopPropagation();
    //     console.log(e.button)
    // }
    // render() {
    //     const canvasEl=useRef(null)
    //     const [loading, numPages]=usePdf({
    //         file:'test.pdf',
    //         onDocumentComplete,
    //         page,
    //         canvasEl
    //     })
    //     return (
            
            // <View
            //     style={{flexDirection:'row',padding:1}}
            // >
               
            //         <View 
            //             style={{
            //                 height:'100vh',
            //                 width:'50vw',
            //                 borderColor:'black',
            //                 borderWidth:1,
            //             }}
            //         >
            //             <div 
                        
            //                 ref={this.imageHDRef}
            //                 style={{
            //                     height:'100%',
            //                     width:'100%',
            //                     backgroundSize: '100% 100%',
            //                     backgroundRepeat: 'no-repeat',
                                
            //                 }}
                       
            //             >
            //                 <canvas ref={canvasEl}/> 
            //             </div>
            //         </View>
                
            //          <View 
            //             id = 'place-holder2' 
            //             style={{
            //                 height:"100vh",
            //                 width:"50vw",
            //                 paddingTop:1,
            //                 paddingBottom:1,
            //                 paddingLeft:1,
            //                 paddingRight:1,
            //                 backgroundColor:'black',
            //             }}
            //          >
            //             <div  
            //                 style={{
            //                     height:"100%",
            //                     width:"100%",
            //                     backgroundColor:'black'
            //                 }}
                            
            //                     >
            //             <textarea id='text-input'type='text' spellCheck="false" 
            //                 ref={this.inputRef}
            //                 value={this.state.value}

            //                 style={{
            //                     height:this.height-70,
            //                     width:this.width/2-50,
            //                     fontSize:13,
            //                     lineHeight:2,
            //                     paddingTop:35,
            //                     paddingLeft: 25,
            //                     paddingRight: 25,
            //                     paddingBottom:35,
            //                     border:'none',
     
            //                 }} 
            //                 onKeyPress={this.handleKeyPress}
            //                 onChange={this.handleChange}

            //                 >
            //             </textarea> 
            //             </div>
            //          </View>
                     
                
            // </View>    
            
            
    //     );
    // }
    
    const handleKeyPress=(e)=>{
      console.log(e.key)
      if(e.shiftKey){
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
      //this.setState({value:e.target.value})
      setTextValue(e.target.value)
      
      console.log(inputRef.current.value)
      console.log(e.key)
  }
  const handleChange=(e)=>{
      console.log(e.target.value)
      //this.setState({value:e.target.value})
      setTextValue(e.target.value)
  }
  var text=textValue
    return(
        <View>
          {renderPagination(page,pages)}
            {loading && <span>Loading...</span>}
            {/* <View style={{height:"68%",width:"100%", backgroundColor:'orange',padding:15}}> */}
              
               
              
            {/* </View> */}
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
                        
                            ref={imageHDRef}
                            style={{
                                height:'100%',
                                width:'100%',
                                backgroundSize: '100% 100%',
                                backgroundRepeat: 'no-repeat',
                                
                            }}
                       
                        >
                            <canvas ref={canvasEl}/> 
                        </div>
                    </View>
       
                     <View 
                        id = 'place-holder2' 
                        style={{
                            height:"100vh",
                            width:"50vw",
                            paddingTop:1,
                            paddingBottom:1,
                            paddingLeft:1,
                            paddingRight:1,
                            backgroundColor:'black',
                        }}
                     >
                        <div  
                            style={{
                                height:"100%",
                                width:"100%",
                                backgroundColor:'black'
                            }}
                            
                                >
                        <textarea id='text-input'type='text' spellCheck="false" 
                            ref={inputRef}
                            value={textValue}

                            style={{
                                height:height-70,
                                width:width/2-50,
                                fontSize:13,
                                lineHeight:2,
                                paddingTop:35,
                                paddingLeft: 25,
                                paddingRight: 25,
                                paddingBottom:35,
                                border:'none',
     
                            }} 
                            onKeyPress={handleKeyPress}
                            onChange={handleChange}

                            >
                        </textarea> 
                        </div>
                     </View> 
                    
                
            </View> 
            <div ref={frame}/>   
            {/* <canvas style={{display:'none'}} ref={canvasEl} />   */}
        </View>

    )
}

export default SplitScreenV2;

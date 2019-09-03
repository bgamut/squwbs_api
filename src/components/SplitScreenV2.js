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
import FilePicker from './FilePicker'
var pdf = require('pdf').pdf
const stringifyObject = require('stringify-object')
// const worker = new TesseractWorker();
// import RNTesseractOcr from 'react-native-tesseract-ocr'
const pad=(n, width, z)=>{
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const SplitScreenV2=(props)=> {
    const [fileSelected,setFileSelected]=useState(false);
    const [fileBinaryStr,setFileBinaryStr]=useState(null)
    // var userAgent = navigator.userAgent.toLowerCase();
    // if(userAgent.indexOf(' electron/')>-1){
    //   const {ipcRenderer} = require('electron')
    //   ipcRenderer.send('resize', 100, 168);
    //   ipcRenderer.send('resizable',false)
    // }
    const [page,setPage]=useState(1);
    const [pages,setPages]=useState([]);
    const [images,setImages]=useState([]);
    const [width,setWidth] =useState(0);
    const [height,setHeight]=useState(0);
    
    const [textValue,setTextValue] = useState('')
    const [lock,setLock]= useState(false)

    const frame = useRef(null)
    const canvasEl=useRef(null)
    const imageHDRef=useRef(null)
    const inputRef = useRef(null)
    const textRef = useRef('')


    const [pageChange,setPageChange]=useState(false)
    

    const [force,forceState] = useState()
    const forceUpdate = useCallback(()=>forceState({}),[force])


    const [loading,numPages]=usePdf({
        //file:process.env.PUBLIC_URL+'/temp/pdf/doc.pdf',
        
        //the following takes BinaryString of the File
        file:props.file,
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
    // if(fileSelected==true){ 
      // if(frame.current!==null){
      //   if(frame.current.childNodes.length<=0){
        if(lock==false){
          const worker = new TesseractWorker();
          ReactDOM.render(
            <canvas style={{display:'none'}} ref={canvasEl} /> ,
            frame.current
          )
          var img = canvasEl.current.toDataURL()
          setImages([...images,img])
          var imageKey="image"+String(page-1)
          //window.localStorage.setItem(imageKey,img)
          //console.log(window.localStorage)


          const prettyImages = stringifyObject(images, {
            indent: '  ',
            singleQuotes: false
          });
          console.log(prettyImages)


          //console.log(img)
          //imageHDRef.current.style.backgroundImage="url("+window.localStorage.getItem(imageKey)+")"
          imageHDRef.current.style.backgroundImage="url("+img+")"
          
          //worker.recognize(img,'eng')
          worker.recognize(img,props.language)
            .progress(progress => {
                setTextValue(progress.status +" : " + pad(parseFloat(Math.round(progress.progress*10000)/100).toFixed(2),5)+"%")
                //console.log(textRef.current)
                if(page<=numPages+1){ 
                  textRef.current.innerHTML = "page "+String(page-1)+" : "+progress.status +" " + pad(parseFloat(Math.round(progress.progress*10000)/100).toFixed(2),5)+"%"
                }
                
            }).then(result => {
                var newText=''
                if(props.language=='kor'){
                  newText =  result.text.replace(/(\r\n\t|\n|\r\t|\t|\f|;|\|\/|<|>|'|'|:|_|]'+'|'*'|ㅠ|ㅎ|ㅋ|\s)/gm," ").replace(/\s\s+/g," ").replace(/[\/|\\]/g," ");
                }
                else{
                  newText =  result.text.replace(/(\r\n\t|\n|\r\t|\t|\f|;|\|\/|<|>|'|'|:|_|]'+'|'*'|ㅠ|ㅎ|ㅋ|\s)/gm," ").replace(/\s\s+/g," ")
                }
                
                

                //setPages(...pages,newText)
                //console.log(newText)
                console.log(page+'/'+numPages)
                if(page>1){
                  //const textKey="text"+String(page-1)
                  //window.localStorage.setItem(textKey,newText)
                  setTextValue(newText)
                }
                
                //console.log('memory percentage :'+pad(parseFloat(Math.round(window.performance.memory.usedJSHeapSize/ window.performance.memory.jsHeapSizeLimit*10000)/100).toFixed(2),5))
                //console.log(lock)
                if(numPages==null){
                  setPage(page+1)
                }
                else{
                  //if(lock==false){
                    setPages([...pages,newText])
                    const prettyPages = stringifyObject(pages, {
                      indent: '  ',
                      singleQuotes: false
                    });
                    console.log(prettyPages)
                      // const pretty = stringifyObject(pages, {
                      //   indent: '  ',
                      //   singleQuotes: false
                      // });
                      // console.log('page info updating')
                      // console.log(pretty)
                    if(page<=numPages){
                      
                      setPage(page+1)
                    }
                    else{
                      
                      setLock(true)
                      const pretty = stringifyObject(pages, {
                        indent: '  ',
                        singleQuotes: false
                      });
                      console.log(pretty)
                      console.log('lock activated')
                      console.log("the length of page array is"+pages.length)
                      setPage(1)
                      var userAgent = navigator.userAgent.toLowerCase();
                      if(userAgent.indexOf(' electron/')>-1){
                        const {ipcRenderer} = require('electron')
                        ipcRenderer.send('resize', 800, 600);
                        ipcRenderer.send('resizable',true)
                      }
                    }
                  //}
                }
                  
                  
              });
          }
        else{
          
          //var imageKey="image"+String(page)
          //imageHDRef.current.style.backgroundImage="url("+window.localStorage.getItem(imageKey)+")"
          imageHDRef.current.style.backgroundImage="url("+images[page]+")"
          setTextValue(pages[page-1])
        }
        //   }
        // }
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
      window.localStorage.clear()
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
      // if(fileSelected==true){
        if(lock==false){ 
          canvasEl.current.width=width
          canvasEl.current.height=height
        }
      // }
      
    },[height,width])
    
    // useEffect(()=>{
    //   setPages(numPages);
      
    // },[numPages])
    useEffect(()=>{
      
      setPageChange(false)
    },[pageChange])
    const pad=(n, width, z) =>{
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
      }
    const pageUp=()=>{
      if(page<numPages){
        
        setPage(page+1)
        
      }
      if(page==numPages){
        //check if the app is running in electron
        var userAgent = navigator.userAgent.toLowerCase();
        console.log(userAgent)
        // if(userAgent.indexOf(' electron/')>-1){
        //   // const prompt = require('electron-prompt') 
        //   // prompt({
        //   //   title:'Choose File Name',
        //   //   label: 'Name',
        //   //   value:'output'

        //   // })
        //   // .then((result)=>{
        //   //   if(result===null){
        //   //     var fileName='output.txt'
        //   //   }
        //   //   else{
        //   //     var fileName=result+'.txt'
        //   //   }
        //   // })
        //   var fileName='output.txt'
        // }

        // else{
          var fileName=prompt("please enter the name of the output .txt file")+'.txt'
          // if (fileName==null){
          // fileName='output.txt'
          // }
        // }
        //var fileName='output.txt'
        console.log(fileName)
        var text = ''
        for (var i =0; i<pages.length; i++){
          if(i==0){
            text = text+pages[i]
          }
          else{
            text=text+' '+pages[i] 
          }
        }
        // var doc = new pdf()
        // doc.setFontSize(16)
        // if(userAgent.indexOf(' electron/')>-1){

        //   var fileName='output.txt'
        //   // var fs = require('fs')
        //   // fs.writeFileSync('output.txt',text,'utf-8')
        //   // alert('Read Text Saved As output.txt')
        //   var element = document.createElement('a')
          
        //   element.setAttribute('href','data:text/plain;charset=utf-8,'+encodeURIComponent(text))
        //   element.setAttribute('download',fileName)
        //   element.click()

        // }

        // else{
          //var fileName=prompt("please enter the name of the output .txt file")+'.txt'
          if (fileName==null){
            fileName='output.txt'
          }
          var element = document.createElement('a')
          
          element.setAttribute('href','data:text/plain;charset=utf-8,'+encodeURIComponent(text))
          element.setAttribute('download',fileName)
          element.click()
          //document.body.removeChild(element)
        }

      // }

      
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
      if(page>1){
        setPage(page-1)
      }
      
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
    // const read=()=>{
    //     this.setState({
    //         value:"Optical Character Recognition Module Loading"
    //     })
    //     worker.recognize(process.env.PUBLIC_URL+this.state.imgURL,'kor')
    //     .progress(progress => {
    //         this.setState({value:progress.status +" : " + this.pad(parseFloat(Math.round(progress.progress*10000)/100).toFixed(2),5)+"%"})
            
    //     }).then(result => {
    //         var newText =  result.text.replace(/(\r\n\t|\n|\r\t|\t|\f|;|\|\/|<|>|'|'|:|_|]'+'|'*'|ㅠ|ㅎ|ㅋ|\s)/gm,"").replace(/\s\s+/g," ").replace(/[\/|\\]/g,"");
    //         this.setState({value:newText})
    //     }); 
    // }
    const renderPagination = (page, pages) => {
      // if(fileSelected==false){
      //   // console.log(fileSelected)
      //   return(
      //     // <FilePicker fileBinaryStr={fileBinaryStr} setFileBinaryStr={setFileBinaryStr} setFileSelected={setFileSelected} fileSelected = {fileSelected} fileBinaryStr=''/>
      //     null
      //   )
        
      // }
      // else{
      if(lock==false){
        return(null)
      }
      else{
        if (!pages) {
          return(null)
        }
        // //let previousButton = <li className="previous" onClick={() => setPage(page - 1)}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;        
          
        if (page === 1) {
            // console.log("page1")
            return(
            <View style={{leftPadding:'19%'}}>
              <View style = {{flexDirection:'row',height:'8vh',width:'100vw',backgroundColor:"white",padding:4,justifyContent: 'center',transform:[{translateX:-width*0.05}]}}>
                <View style={{height:'100%',width:'50%',backgroundColor:'white',padding:4}}/>
                  <TouchableOpacity onPress={pageUp}style={{height:'100%',width:'38%',backgroundColor:'white',padding:4,justifyContent: 'center',flexDirection:'row'}}>
                    <Text style={{
                      fontSize: 16,
                    fontWeight:700,
                    textAlign:"left",
                    color:"grey"}}>
                      next
                    </Text>
                  </TouchableOpacity>
                  {/* <Text>testing</Text> */}
              </View>
            </View>
            
            )
         
        }
        // // let nextButton = <li className="next" onClick={() => setPage(page + 1)}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
        
        // if (page === numPages) {
        //   return (
        //     <View style={{leftPadding:'19%'}}>
        //       <View style = {{flexDirection:'row',height:'8vh',width:'100vw',backgroundColor:"white",padding:4,justifyContent: 'center',alignContent:'flex-start',transform:[{translateX:-width*0.05}]}}>
        //         <TouchableOpacity onPress={pageDown} style={{height:'100%',width:'50%',backgroundColor:'white',padding:4,justifyContent: 'center',flexDirection:'row'}}>
        //         <Text style={{textAlign:"left",color:"grey"}}>
        //           prev
        //         </Text>
        //       </TouchableOpacity>
        //       <View onPress={pageUp}style={{height:'100%',width:'50%',backgroundColor:'white',padding:4}}>
                
        //       </View>
        //         {/* <Text>testing</Text> */}
        //       </View>
        //     </View>
        //   )
        // }

        return (
          <View style={{leftPadding:'19%'}}>
            <View style = {{flexDirection:'row',height:'8vh',width:'100vw',backgroundColor:"white",padding:4,justifyContent: 'center',transform:[{translateX:-width*0.05}]}}>
              <TouchableOpacity onPress={pageDown} style={{height:'100%',width:'50%',backgroundColor:'white',padding:4,justifyContent: 'center',flexDirection:'row'}}>
              <Text style={{fontSize: 16,
                    fontWeight:700,textAlign:"left",color:"grey"}}>
                prev
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pageUp}style={{height:'100%',width:'50%',backgroundColor:'white',padding:4,justifyContent: 'center',flexDirection:'row'}}>
              <Text style={{fontSize: 16,
                    fontWeight:700,textAlign:"left",color:"grey"}}>
                next
              </Text>
          </TouchableOpacity>
              {/* <Text>testing</Text> */}
            </View>
          </View>
        );  
      }     
      // }
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
      //console.log(e.target.value)
      //this.setState({value:e.target.value})
      setTextValue(e.target.value)
      var copiedPages=pages.slice()
      copiedPages[page-1]=e.target.value
      console.log(copiedPages[page-1])
      setPages(copiedPages)
  }
  var text=textValue
  if(lock==true){
    return(
        <View>
          
            {loading && <span>Loading...</span>}
            {/* <View style={{height:"68%",width:"100%", backgroundColor:'orange',padding:15}}> */}
            {/* </View> */}
            <View
              style={{
                padding:8,
                height:'100vh',
                width:'100vw'
              }}
            >
            
            <View
                style={{
                  flexDirection:'row',
                  height:'92%',
                  width:'100%',
                  shadowColor:'#000',
                  shadowOpacity:0.25,
                  shadowRadius:3.84,
                  shadowOffset:{
                    width:1,
                    height:1
                  },
                  elevation:5
                }}
            >
                    <View 
                        style={{
                            height:'99%',
                            width:'45%',
                            // borderColor:'black',
                            // borderWidth:1,
                        }}
                    >
                        <div 
                        
                            ref={imageHDRef}
                            style={{
                                height:'100%',
                                width:'100%',
                                backgroundSize: '100% 100%',
                                backgroundRepeat: 'no-repeat',
                                // borderRight:1,
                                // borderColor:'lightgrey'
                            }}
                       
                        >
                            {/* <canvas ref={canvasEl}/>  */}
                        </div>
                    </View>
       
                     <View 
                        id = 'place-holder2' 
                        style={{
                            height:"99%",
                            width:"45%",
                            paddingTop:1,
                            paddingBottom:1,
                            paddingLeft:1,
                            paddingRight:1,
                            // backgroundColor:'black',
                        }}
                     >
                        <div  
                            style={{
                                height:"100%",
                                width:"100%",
                                // borderLeftWidth:1,
                                // borderLeftColor:'lightgrey'
                        
                                // backgroundColor:'black'
                            }}
                            
                        >
                        <textarea id='text-input'type='text' spellCheck="false" 
                            ref={inputRef}
                            value={textValue}

                            style={{
                                // height:height-70,
                                // width:width/2-50,
                                height:"88%",
                                width:"97%",
                                fontSize:13,
                                lineHeight:'2em',
                                paddingTop:35,
                                paddingLeft: 25,
                                paddingRight: 25,
                                paddingBottom:35,
                                borderLeftWidth:1,
                                borderLeftColor:'lightgrey',
                                borderRightColor:'white',
                                borderBottomColor:'white',
                                borderTopColor:'white',
                                backgroundColor:'transparent',
                                resize:'none',
                                outlineColor: 'transparent',
                                outlineStyle: 'none'
                            }} 
                            onKeyPress={handleKeyPress}
                            onChange={handleChange}

                            >
                        </textarea> 
                        </div>
                     </View> 
            </View> 
            {/* <div ref={frame}/>    */}
            {/* <canvas style={{display:'none'}} ref={canvasEl} />   */}
            <View
            style={{
              padding:4,
              height:'8%',
              width:'100%'
            }}
            >
              {renderPagination(page,pages)}
            </View>
        </View>
        </View>

    )
   }
   else{ 
     return(
       <View
        style={{
          height:"100vh",
          width:"100vw",
          paddingTop:8,
          paddingBottom:8,
          paddingLeft:8,
          paddingRight:8,
          backgroundColor:'white',
        }}
       >
        <View
          style={{
            height:"100%",
            width:"100%",
            // padding:8,
            backgroundColor:'white',
            // borderColor:'lightgrey',
            // borderWidth:2,
            // borderRadius:2,
            shadowColor:'#000',
            shadowOpacity:0.25,
            shadowRadius:3.84,
            shadowOffset:{
              width:1,
              height:1
            },
            elevation:5
          }}
        >
        <View
          style={{
            height:"8vh",
            flexDirection:'row',
            // justifyContent:'center',
            alignItems:'center',
            backgroundColor:'white',
            padding:20
          }}
        >
        <a 
          style={{
            //height:"8vh",
            marginTop:'auto',
            marginBottom:'auto',
            marginRight:'auto',
            marginLeft:width*0.05,
            color:'lightgrey',
            fontSize: 16,
            fontWeight:700,
            //backgroundColor:'white',
            textShadowColor: 'rgba(128, 128, 128, 0.99)',
            // textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 8,
            // alignItems:'center',
            // justifyContent:'center',
          }}
        ref={textRef}/>
        </View>
        <View
          style={{
            height:"80vh",
            width:"100%",
            backgroundColor:'white',
          }}
        >
          <div            
            ref={imageHDRef}
            style={{
            height:'100%',
            width:'100%',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundColor:'white'
            }}
          >
            <div style={{
              height:"100%",
              width:"100%",
              backgroundColor:'white',
              display:'none'
            }}
            
            ref={frame}>
              <canvas ref={canvasEl}/> 
            </div>
          </div>
        </View>
        {/* <div ref={frame}/>    */}
        {/* <canvas style={{display:'none'}} ref={canvasEl} />   */}
        </View>
      </View>
     )
   }
}

export default SplitScreenV2;

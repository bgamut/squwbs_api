//import React, {memo} from 'react'
import React,{Component,useContext,useState,useEffect,memo,useRef} from 'react';
import SplitScreenV2 from './SplitScreenV2'
import {TouchableOpacity,Text,View,Dimensions} from 'react-native'
import FilePicker from './FilePicker'


const PDFReader = () => {
    const [fileSelected,setFileSelected]=useState(false);
    const [fileBinaryStr,setFileBinaryStr]=useState(null)
    const [file,setFile]=useState(null)
    const [language,setLanguage]=useState('eng')
    const spanRef = useRef(null)
    const getUserData=async()=>{
    
    }
    const changeLanguage=(e)=>{
        console.log(e.target.value)
        if(e.target.value=='kor'){
            console.log('korean')
            spanRef.current.innerHTML='한글'
        }
        else if(e.target.value=='eng'){
            console.log('english')
            spanRef.current.innerHTML='English'
        }
        setLanguage(e.target.value)
        
        console.log(spanRef.current.innerHTML)
    }
    useEffect(()=>{
        
    },[fileSelected])
  
    if(fileSelected == false){
        return(
        <View
            style={{
                height:'100vh',
                width:'100vw',
                alignItems:'center',
                justifyContent:'center',
            }}
        >
            <View
                style={{
                    alignItems:'center',
                    justifyContent:'center',
                    padding:20,
                }}
            >
            <Text 
                style={{
                    color:'white',
                    fontSize: 11,
                    fontWeight:700,
                    height:33,
                    lineHeight:1.3,
                  
                    textAlign:'center',
        
                
                    flexDirection:'row',
                    borderBottom:2,
                    borderTop:1,
                    borderColor:'#aaa',
                    borderRadius:4,
                    textShadowColor: 'rgba(128, 128, 128, 0.99)',
                    textShadowOffset: {width: 0, height: 0},
                    textShadowRadius: 3,
                    width:200,
                    marginBottom:4,
                    backgroundColor:'transparent',
                    shadowColor:'#000',
                    shadowOpacity:0.25,
                    shadowRadius:3.84,
                    shadowOffset:{
                    width:0,
                    height:2
                    },
                    // elevation:5,
                    overflow:'hidden'
                    //backgroundImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAh0lEQVQ4T93TMQrCUAzG8V9x8QziiYSuXdzFC7h4AcELOPQAdXYovZCHEATlgQV5GFTe1ozJlz/kS1IpjKqw3wQBVyy++JI0y1GTe7DCBbMAckeNIQKk/BanALBB+16LtnDELoMcsM/BESDlz2heDR3WePwKSLo5eoxz3z6NNcFD+vu3ij14Aqz/DxGbKB7CAAAAAElFTkSuQmCC',
                }}
            >
                <label
                    for="foo"
                    className="center-select"
                >
                    <select 
                        className="center-select__input"
                        style={{
                            color:'white',
                            fontSize: 11,
                            fontWeight:700,
                            height:33,
                            lineHeight:1.3,
                            padding:'.6em 1.4em .5em .8em',
                            boxSizing:"border-box",
                            textAlign:'center',
                           
                        
                            textAlignLast:'center',
                            alignItems:'center',
                            justifyContent:'center',
                            flexDirection:'row',
                            borderBottom:2,
                            borderTop:1,
                            borderStyle:'solid',
                            borderColor:"#aaa",
                            width:200,
                            marginBottom:4,
                            backgroundColor:'lightgrey',
                            // shadowColor:'#000',
                            // shadowOpacity:0.25,
                            // shadowRadius:3.84,
                            // shadowOffset:{
                            // width:0,
                            // height:2
                            // },
                            // elevation:5,
                            overflow:'hidden'
                            //backgroundImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAh0lEQVQ4T93TMQrCUAzG8V9x8QziiYSuXdzFC7h4AcELOPQAdXYovZCHEATlgQV5GFTe1ozJlz/kS1IpjKqw3wQBVyy++JI0y1GTe7DCBbMAckeNIQKk/BanALBB+16LtnDELoMcsM/BESDlz2heDR3WePwKSLo5eoxz3z6NNcFD+vu3ij14Aqz/DxGbKB7CAAAAAElFTkSuQmCC',
                        }}
                        value={language} 
                        onChange={changeLanguage}>
                        <option value="eng">English</option>
                        <option value="kor">한글</option>
                    </select>
                    <span ref={spanRef} class="center-select__text">
                        English
                    </span>
                </label>
            </Text>
            <FilePicker 
            setFileBinaryStr={setFileBinaryStr} 
            setFileSelected={setFileSelected} 
            fileSelected={fileSelected}
            setFile={setFile}
            text = 'PDF'
            />
            </View>
        </View>  
        )    
    }
    else{
        console.log('fired fam')
        console.log(file)
        return( 
        <View>
            <SplitScreenV2 language={language} file={fileBinaryStr}/>
        </View>
        )
       
    }
    

  }

export default PDFReader

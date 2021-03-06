//import React, {memo} from 'react'
import React,{Component,useContext,useState,useEffect,memo,useRef} from 'react';
import SplitScreenV2 from './SplitScreenV2'
import {TouchableOpacity,Text,View,Dimensions} from 'react-native'
import FilePicker from './FilePicker'
import Fade from 'react-reveal/Fade'


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
            <Fade>
            <View
                style ={{
                    height:33,
                    width:150,
                    backgroundColor:'transparent',
                    
                    flex:1,
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    // marginRight:8,
                    // marginLeft:8,
                    // marginBottom:2,
                    borderRadius:2,
                    
                    //borderColor:'lightgrey',
                    borderStyle:'solid',
                    overflow:'hidden',
                    boxSizing:"border-box",
                    shadowColor:'#000',
                    shadowOpacity:0.85,
                    shadowRadius:2,
                    shadowOffset:{
                    width:0,
                    height:0
                    },
                    elevation:2,
                    marginBottom:3,
                }}>
                <Text 
                    style={{
                        color:'white',
                        fontSize: 11,
                        fontWeight:'700',
                        height:33,
                        lineHeight:1.3,
                        backgroundColor:'transparent',
                        textAlign:'center',
            
                    
                        flexDirection:'row',
                        // borderBottom:2,
                        // borderTop:1,
                        // borderWidth:1,
                        // borderColor:'lightgrey',
                        // borderRadius:4,
                        textShadowColor: 'rgba(0, 0, 0, 0.85)',
                        textShadowOffset: {width: 0, height: 0},
                        textShadowRadius: 2,
                        width:150,
                        
                        //backgroundColor:'transparent',
                        // shadowColor:'black',
                        // shadowOpacity:0.25,
                        // shadowRadius:2,
                        // shadowOffset:{
                        // width:0,
                        // height:0
                        // },
                        // elevation:5,
                        overflow:'hidden'
                        //backgroundImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAh0lEQVQ4T93TMQrCUAzG8V9x8QziiYSuXdzFC7h4AcELOPQAdXYovZCHEATlgQV5GFTe1ozJlz/kS1IpjKqw3wQBVyy++JI0y1GTe7DCBbMAckeNIQKk/BanALBB+16LtnDELoMcsM/BESDlz2heDR3WePwKSLo5eoxz3z6NNcFD+vu3ij14Aqz/DxGbKB7CAAAAAElFTkSuQmCC',
                    }}
                >
                    <label
                        // for="foo"
                        className="center-select"
                    >
                        <select 
                            className="center-select__input"
                            style={{
                                color:'white',
                                fontSize: 11,
                                fontWeight:'700',
                                height:36,
                                lineHeight:1.3,
                                //padding:'.6em 1.4em .5em .8em',
                                boxSizing:"border-box",
                                textAlign:'center',
                                
                            
                                textAlignLast:'center',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                // borderBottom:2,
                                // borderTop:1,
                                //borderStyle:'solid',
                                //borderColor:"#aaa",
                                //width:90,
                                //marginBottom:4,
                                //backgroundColor:'lightgrey',
                                // shadowColor:'#000',
                                // shadowOpacity:0.25,
                                // shadowRadius:3.84,
                                // shadowOffset:{
                                // width:0,
                                // height:2
                                // },
                                // elevation:5,
                                //overflow:'hidden'
                                //backgroundImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAh0lEQVQ4T93TMQrCUAzG8V9x8QziiYSuXdzFC7h4AcELOPQAdXYovZCHEATlgQV5GFTe1ozJlz/kS1IpjKqw3wQBVyy++JI0y1GTe7DCBbMAckeNIQKk/BanALBB+16LtnDELoMcsM/BESDlz2heDR3WePwKSLo5eoxz3z6NNcFD+vu3ij14Aqz/DxGbKB7CAAAAAElFTkSuQmCC',
                            }}
                            value={language} 
                            onChange={changeLanguage}>
                            <option value="eng">English</option>
                            <option value="kor">한글</option>
                        </select>
                        <span ref={spanRef} className="center-select__text"
                            style={{
                                marginTop:4
                            }}
                        >
                            English
                        </span>
                    </label>
                </Text>
            </View>
            </Fade>
                <View
                    style={{
                        marginTop:3
                    }}
                >
                    <FilePicker 
                    text={'PDF'}
                    setFileBinaryStr={setFileBinaryStr} 
                    setFileSelected={setFileSelected} 
                    fileSelected={fileSelected}
                    setFile={setFile}
                    />
                </View>
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

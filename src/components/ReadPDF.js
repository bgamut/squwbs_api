//import React, {memo} from 'react'
import React,{Component,useContext,useState,useEffect,memo} from 'react';
import SplitScreenV2 from './SplitScreenV2'
import {TouchableOpacity,Text,View,Dimensions} from 'react-native'
import FilePicker from './FilePicker'


const PDFReader = () => {
    const [fileSelected,setFileSelected]=useState(false);
    const [fileBinaryStr,setFileBinaryStr]=useState(null)
    const [file,setFile]=useState(null)
    const getUserData=async()=>{
    
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
                justifyContent:'center'
            }}
        >
            <FilePicker 
            setFileBinaryStr={setFileBinaryStr} 
            setFileSelected={setFileSelected} 
            fileSelected={fileSelected}
            setFile={setFile}
            />
        </View>  
        )    
    }
    else{
        console.log('fired fam')
        console.log(file)
        return( 
        <View>
            <SplitScreenV2 file={fileBinaryStr}/>
        </View>
        )
       
    }
    

  }

export default PDFReader

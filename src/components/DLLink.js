import React, {Component,useCallback,useState} from 'react'
import {Text,View,Dimensions,TouchableOpacity} from 'react-native'
import Dropzone, {useDropzone} from 'react-dropzone'
//import {Context} from '../context'
import Fade from 'react-reveal/Fade'
import XLSX from 'xlsx'
import stringifyObject from 'stringify-object'
const _ = require('lodash')

const withQuery = require('with-query');

const DLLink = (props)=> {

    const download = () =>{
            fetch(withQuery.default('https://squwbs.herokuapp.com/download', 
            {
                mode:'cors'
            }))
            .then(result=>{
                console.log(result)
                return result.json()
            })
            .then((json)=>{
                console.log(json)
            })
            .catch((err)=>{
        
            })
    }

  
      return (
        <Fade>
            <View style={{ 
                // height:100,
                //width:(Dimensions.get('window').width-8),
                width:150,
                backgroundColor:'white',
                
                flex:1,
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                // marginRight:8,
                // marginLeft:8,
                // marginBottom:2,
                borderRadius:2,
                
                borderColor:'lightgrey',
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
                elevation:2
            }} 
                // {...getRootProps({refKey:'innerRef'})}
            >
                <View style={{
                    height:33,
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    {/* <input {...getInputProps()} /> */}
                    <TouchableOpacity onPress={(e)=>{
                        console.log(e)
                        download()
                    }}>
                        <Text selectable={false} style ={{
                            fontSize: 11,
                            fontWeight:'700',
                            textDecorationLine:'none',
                            color:'white',
                            
                            textShadowColor: 'rgba(0, 0, 0, 0.85)',
                            textShadowOffset: {width: 0, height: 0},
                            textShadowRadius: 2,
                            textAlign:'center',
                            alignItems:'center',
                            justifyContent:'center',
                            flexDirection:'row',
                            margin:5,
                        }}>
                            Download
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Fade>
      )
}
export default DLLink

import React, {Component,useCallback,useState} from 'react'
import {Text,View,Dimensions,TouchableOpacity} from 'react-native'
import Dropzone, {useDropzone} from 'react-dropzone'
//import {Context} from '../context'
import Fade from 'react-reveal/Fade'
import XLSX from 'xlsx'
import stringifyObject from 'stringify-object'
const _ = require('lodash')

const withQuery = require('with-query');

function addWord({word,meaning,pronunciation,example}){
    
    var db = global.admin.database()
    var ref = db.ref('words')
    ref.once('value',function(snapshot){
        var words=snapshot.val()
        console.log(words)
        if(words==undefined){
            words={0:{word,meaning,pronunciation,example}}
        }
        else{
            var picked = words.find(singleWord=>singleWord.word==word)
            console.log(picked)
            if(picked==undefined){  

                words.push({word,meaning,pronunciation,example})
            }
            else{
                if(_.isEqual(picked,{word,meaning,pronunciation,example})){

                    console.log('this word already exists')
                }
                else{
                    console.log('this word already exists would you like to update the information')
                }
            }
        }
        ref.set(words)  
    })
}
const convertLetterToNumber=(str) =>{
    var out = 0, len = str.length;
    for (var pos = 0; pos < len; pos++) {
      out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
    }
    return out;
  }
const cloneObject=(obj)=> {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = cloneObject(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = cloneObject(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
const FilePicker = (props)=> {
    var workbook
    var sheet
    var card = []
    global.words=[]
    var labels=[]
    
    const onDrop = useCallback(acceptedFiles => {
        for (var i = 0; i < acceptedFiles.length; i++) {
            (function(file) {
            
              var reader = new FileReader();
              reader.onload = function(e) {
                const binaryStr = reader.result
                global.binaryStr = binaryStr
                
                props.setFileBinaryStr(binaryStr)
                if(props.fileSelected==false){
                    props.setFileSelected(true)
                }
                console.log(props)
                
              };
              //reader.readAsBinaryString(file)
              //console.log(file)
              reader.readAsDataURL(file)
              props.setFile(file)
            })(acceptedFiles[i]);
          }
          
        }, [])
        
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
      return (
        <Fade>
            <View style={{ 
                // height:100,
                //width:(Dimensions.get('window').width-8),
                width:200,
                backgroundColor:'white',
                
                flex:1,
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                // marginRight:8,
                // marginLeft:8,
                // marginBottom:2,
                borderRadius:4,
                borderBottom:2,
                borderTop:1,
                borderColor:'#aaa',
                borderStyle:'solid',
                overflow:'hidden',
                boxSizing:"border-box",
                shadowColor:'#000',
                shadowOpacity:0.25,
                shadowRadius:2,
                shadowOffset:{
                width:0,
                height:0
                },
                elevation:2
            }} 
                {...getRootProps({refKey:'innerRef'})}
            >
                <View style={{
                    height:33,
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <input {...getInputProps()} />
                    <TouchableOpacity>
                        <Text selectable={false} style ={{
                            fontSize: 11,
                            fontWeight:700,
                            textDecorationLine:'none',
                            color:'white',
                            
                            textShadowColor: 'rgba(128, 128, 128, 0.99)',
                            textShadowOffset: {width: 0, height: 0},
                            textShadowRadius: 3,
                            textAlign:'center',
                            alignItems:'center',
                            justifyContent:'center',
                            flexDirection:'row',
                            margin:5,
                        }}>
                            Select File
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Fade>
      )
}
export default FilePicker

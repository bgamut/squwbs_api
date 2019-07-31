import React, {Component,useCallback,useState} from 'react'
import {Text,View,Dimensions,TouchableOpacity} from 'react-native'
import Dropzone, {useDropzone} from 'react-dropzone'
import {Context} from '../context'
import Fade from 'react-reveal/Fade'
import XLSX from 'xlsx'
import stringifyObject from 'stringify-object'

var firebase = require('firebase-admin')
//var firebase = require('firebase')
var serviceAccount = require('../firebase-adminsdk.json') 
//var NODE_ENV = require('../expressServer/keysconfig');
console.log(stringifyObject(serviceAccount, {
    indent: '  ',
    singleQuotes: false
}))

const UploadWords = (props)=> {
    var workbook
    var sheet
    var card = []
    var words=[]
    
    
    const onDrop = useCallback(acceptedFiles => {
        for (var i = 0; i < acceptedFiles.length; i++) {
            (function(file) {
              var reader = new FileReader();
              reader.onload = function(e) {
                const binaryStr = reader.result
                workbook =XLSX.read(binaryStr,{type:'binary'})
                
                sheet = workbook.Sheets.Sheet1
             
                
                for (var i=0; i<Object.keys(sheet).length; i++){
                    
                    card[i%3]=sheet[Object.keys(sheet)[i]]['w']
                    if(i>3){
                        if(i%3==2){
                            // console.log(card)
                            words.push(card.slice())
                        }
                    }
                    
                    
                }
                console.log(words)

                //words need to be uploaded to a database now
               
              };
              reader.readAsBinaryString(file)
            })(acceptedFiles[i]);
          }
          
        }, [])
        
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
      return (
        <Fade>
                <View style={{ 
                    // height:100,
                    width:(Dimensions.get('window').width-8),
                    backgroundColor:'white',
                    flex:1,
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    marginRight:2,
                    marginLeft:2,
                    marginBottom:2,
                    borderRadius:4,
                    borderWidth:1,
                    borderColor:'lightgrey',
                    overflow:'hidden'}} 
                    {...getRootProps({refKey:'innerRef'})}
                >
                    <View style={{
                        // height:100,
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                        <input {...getInputProps()} />
                        <TouchableOpacity>
                            <Text selectable={false} style ={{
                                textDecorationLine:'none',
                                color:'white',
                                fontSize: 15,
                                textShadowColor: 'rgba(0, 0, 0, 1)',
                                textShadowOffset: {width: 0, height: 0},
                                textShadowRadius: 8,
                                flex:1,
                                textAlign:'center',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                margin:5,
                            }}>
                                Click to Select XLSX
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </Fade>
      )
}
export default UploadWords
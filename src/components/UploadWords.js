import React, {Component,useCallback,useState} from 'react'
import {Text,View,Dimensions,TouchableOpacity} from 'react-native'
import Dropzone, {useDropzone} from 'react-dropzone'
//import {Context} from '../context'
import Fade from 'react-reveal/Fade'
import XLSX from 'xlsx'
import stringifyObject from 'stringify-object'
const _ = require('lodash')




const withQuery = require('with-query');

const addWordListToServer = (array)=>{

    console.log(word,meaning,example,pronunciation)
    fetch(withQuery.default('https://squwbs.herokuapp.com/addWordList', {
      word:word,
      meaning:meaning,
      example:example,
      pronunciation:pronunciation,
      mode:'cors'
    }))
    // .then(resulst=>{
    //     return resulst.json()
    //   })
    //   .then((json)=>{
    //     console.log(json)
    //   })
    //   .catch((err)=>{
  
    //   })
    
    
    
}

const addWordToServer = ({word,meaning,example,pronunciation})=>{

    var a = {word,meaning,example,pronunciation}
    for (var i = 0; i<Object.keys(a).length; i++){
        if(a[Object.keys(a)[i]]==undefined){
            a[Object.keys(a)[i]]=""
        }
    }
    word=a.word
    meaning=a.meaning
    example=a.example
    pronunciation=a.pronunciation
    console.log(word,meaning,example,pronunciation)
    fetch(withQuery.default('https://squwbs.herokuapp.com/addWord', {
      word:word,
      meaning:meaning,
      example:example,
      pronunciation:pronunciation,
      mode:'cors'
    }))
    // .then(resulst=>{
    //     return resulst.json()
    //   })
    //   .then((json)=>{
    //     console.log(json)
    //   })
    //   .catch((err)=>{
  
    //   })
    
    
    
}
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
const UploadWords = (props)=> {
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
                workbook =XLSX.read(binaryStr,{type:'binary'})
                
                global.sheet = workbook.Sheets.Sheet1
                console.log(global.sheet)
                var numCol = convertLetterToNumber(Object.keys(global.sheet)[Object.keys(global.sheet).length-2][0])
                for (var i=0; i<Object.keys(global.sheet).length; i++){
                    
                    card[i%numCol]=global.sheet[Object.keys(global.sheet)[i]]['w']
                    if(i<numCol){
                        labels=card.slice()
                    }
                    else{
                        if(i%numCol==numCol-1){
                            // console.log(card)
                            global.words.push(card.slice())
                        }
                    }
                    
                    
                    
                }
                //console.log(labels)
                //console.log(global.words)
                var objList=[]
                for (var i =0; i<global.words.length; i++){
                    var tempObj={}
                    for (var j =0; j<labels.length; j++){
                        tempObj[labels[j]]=global.words[i][j]
                    }
                    objList[i]=cloneObject(tempObj)
                }
                console.log(objList)
                //initFirebase()
                // for (var i =0; i<objList.length; i++){
                //     addWordToServer(objList[i])
                //     //addWord(objList)
                // }
                //words need to be uploaded to a database now
                addWordListToServer(objList)
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
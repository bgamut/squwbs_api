import React, {Component,useCallback,useState} from 'react'
import {Text,View,Dimensions,TouchableOpacity} from 'react-native'
import Dropzone, {useDropzone} from 'react-dropzone'
//import {Context} from '../context'
import Fade from 'react-reveal/Fade'
import XLSX from 'xlsx'
import stringifyObject from 'stringify-object'
const _ = require('lodash')

const withQuery = require('with-query').default;

const DLLink = (props)=> {
    const getUserData=async(itemList)=>{
        const responded= await fetch('https://squwbs-252702.appspot.com/readCookies',{mode:'cors'})
        const userCookie = await responded.json()
        console.log('userCookie : '+stringifyObject(userCookie))
        if(Object.keys(userCookie).length>1){
        console.log('user info sent to server')
        // fetch(withQuery('https://squwbs-252702.appspot.com/user', {
        //     ...userCookie,
        //     mode:'cors'
        // }))
        // .then(result=>{
        //     console.log('got result from user fetch')
        //     return result.json()
        //     })
        //     .then((json)=>{
        //     //setState({...state,userData:{...json}})
            
        //     console.log(stringifyObject(json))
        //     setUser(json)
        //     })
        //     .catch((err)=>{
        //     console.error(err)
        //     })
        
        // }
        fetch(withQuery('https://squwbs-252702.appspot.com/info', {
        //fetch(withQuery('https://squwbs-252702.appspot.com/getpaypalsandboxid', {
            ...userCookie,
            //itemList:[{kind:'beat',itemID:'00'},{kind:'plugin',itemID:'00'}],
            itemList:itemList,
            mode:'cors',
        }))
            .then(result=>{
            console.log('got result from info/')
            return result.json()
            })
            .then((json)=>{
                //setState({...state,userData:{...json}})
            
                console.log(stringifyObject(json))
            //setpaypalID(json)
            //return json
            
            })
            .catch((err)=>{
                console.error(err)
            })
        }
        
    }
    const download = (downloadList) =>{
            // fetch(withQuery('https://squwbs-252702.appspot.com/download', 
            // {
            //     downloadList:downloadList,
            //     mode:'cors'
            // }))
            // //.then(result=>{
            // .then(()=>{
            //     console.log('request sent')
            //     //console.log(result)
            //     //return result.json()
            // })
            // // .then((json)=>{
            // //     console.log(json)
            // // })
            // .catch((err)=>{
        
            // })

            //todo : create a popup that will open https://squwbs-252702.appspot.com with jwt? uuid.v4 confirmation?

            
        // getUserData([{kind:'plugin',id:'00'}])
        // var win = window.open('https://squwbs-252702.appspot.com/download', "Download", "location=no toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=250,height=250,top="+(window.screen.height/2-125)+",left="+(window.screen.width/2-125));
        // win.document.body.innerHTML = "Downloading";
        
        
        var element = document.createElement('a');
        element.setAttribute('href', 'https://squwbs-252702.appspot.com/download');
        // element.setAttribute('download', filename);
        //element.setAttribute('href', 'https://squwbs.herokuapp.com/download');
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
        document.body.removeChild(element);

    }

  
      return (
        <Fade>
            <View style={{ 
                // height:100,
                //width:(Dimensions.get('window').width-8),
                width:150,
                //backgroundColor:'white',
                backgroundColor:'rgb(186,214,227)',
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
                        //console.log(e)
                        download([{kind:'service',id:'00'}])
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

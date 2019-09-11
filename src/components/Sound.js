import React, {useCallback,useState,useEffect,useRef} from 'react'
import {Text,View,Dimensions,TouchableOpacity} from 'react-native'
import Dropzone, {useDropzone} from 'react-dropzone'
import Fade from 'react-reveal/Fade'
//import WaveFile from 'wavefile'
//import fs from 'fs'
import pcm from 'pcm'
import CPB from './CPB'
const fft = require('fft-js').fft
const ifft = require('fft-js').ifft
const fftUtil = require('fft-js').util
const fftInPlace = require('fft-js').fftInPlace
//const windows = require('signal-windows').windows
const windowing=require('fft-windowing')
let wav = require('node-wav')
const WavEncoder = require('wav-encoder')

function decodedDone(decoded){
  
  var left = new Float32Array(decoded.length)
  var right = new Float32Array(decoded.length)

 
  left=decoded.getChannelData(0)
  right=decoded.getChannelData(1)


  console.log('left channel')
  console.log(left)
  console.log('right')
  console.log(right)

  
  // const sound = {
  //   sampleRate:44100,
  //   channelData:[
  //     left,
  //     right
  //   ]
  // }

  // WavEncoder.encode(sound).then((buffer)=>{
    
  //   var a = document.createElement('a')
  //   // var baseSixFour= btoa(new Buffer(buffer))
  //   // console.log(baseSixFour)
  //   var baseSixFour= String.fromCharCode.apply(null, new Uint16Array(buffer))
  //   console.log(baseSixFour)
  //   a.href=baseSixFour
  //   a.setAttribute('download','master.wav')
  //   a.click()
  // })
  
  //WaveFile.fromScratch(2,44100,'32',[left,right])
  
  // var a = document.createElement('a')
  // a.href=WaveFile.toBase64()
  // a.setAttribute('download','master.wav')
  // a.click()
} 
const pad=(n, width, z)=>{
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
const Sound=()=> {
  const [current,setCurrent]=useState(0)
  const textRef = useRef('')
  // useEffect(()=>{
  //   console.log('current is different')
  //   //console.log(current)
  //   //textRef.current.innerHTML = current+" %"
  // },[current])
  const onDrop = useCallback(acceptedFiles => {



    for (var i = 0; i < acceptedFiles.length; i++) {
        
        (function(file) {


          var reader = new FileReader();
          reader.onload = function(e) {

 
            //var array = reader.result
            
            //var audioContext = new AudioContext()
            //audioContext.decodeAudioData(array, decodedDone)

            // a.href=
            // var a = document.createElement('a')
                      
            // a.setAttribute('download','master.wav')
            // a.click()

            var buffer = reader.result
            let int16Factor=Math.pow(2,15)-1
            let result = wav.decode(buffer)
            let left = result.channelData[0].slice()
            let right = result.channelData[1].slice()
            const binSize=1024
            let used = pad(parseFloat(Math.round(window.performance.memory.usedJSHeapSize/ window.performance.memory.jsHeapSizeLimit*10000)/100).toFixed(2),5)
            let leftSlot=new Array(binSize).fill(0)
            let leftFft=new Array(binSize).fill([0,0])
            let rightSlot=new Array(binSize).fill(0)
            let rightFft=new Array(binSize).fill([0,0])
            let masterArray = []
            let max = 1.0
            let amp = 1.0
            // for (let i=0; i<binSize; i++){
            //     masterArray.push(1-i/binSize)
            // }
            // console.log("memory used : "+ used+" MB");
            // for(let i=0; i<left.length; i++){ 
            //     leftSlot=leftSlot.splice(1)
            //     leftSlot.push(left[i])
            //     rightSlot=rightSlot.splice(1)
            //     rightSlot.push(right[i])

            //     leftFft=fft(leftSlot)
            //     rightFft=fft(rightSlot)

            //     for (let j=0; j<binSize; j++){
            //         leftFft[j][0]=leftFft[j][0]*masterArray[j]*amp
            //         rightFft[j][0]=rightFft[j][0]*masterArray[j]*amp
            //     }

            //     let leftIfft=ifft(leftFft)
            //     let rightIfft=ifft(rightFft)
                  
            //       //setCurrent((Math.round(i/left.length*1000000)/10000).toFixed(4))
            //       textRef.current.innerHTML = String((Math.round(i/left.length*1000000)/10000).toFixed(4))+" %"
            //       console.log((Math.round(i/left.length*1000000)/10000).toFixed(4)+"%")

            //     leftFft=null
            //     rightFft=null

            //     left[i]=leftIfft[0][0]
            //     right[i]=rightIfft[0][0]
            //     leftIfft=null
            //     rightIfft=null
            // }

            //below is uint8 array
            var encoded=wav.encode([left,right],{sampleRate:result.sampleRate, float:true, bitDepth:32}).slice()
            //below changes it to 64string
            var blob = new Blob([encoded],{
              type:'audio/wav'
            })
            var url=window.URL.createObjectURL(blob)
            
            console.log(url)
            var a = document.createElement('a')
            a.setAttribute('href',url)     
            a.setAttribute('download','master.wav')
            a.click()
            a.remove()
            setTimeout(function(){
              window.URL.revokeObjectURL(url)
            },1000)
           
            //var a = document.createElement('a')
            // a.setAttribute('href',btoa(encoded))     
            // a.setAttribute('download','master.wav')
            // a.click()
            //console.log(encoded)
          };


       
          reader.readAsArrayBuffer(file)
          //reader.readAsDataURL(file)
        })(acceptedFiles[i]);
      }
    }, [])
    
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <Fade>
      <View
            style={{
                height:'100vh',
                width:'100vw',
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:'transparent'
            }}
        >
        <View
          style={{
            height:'25%',
            width:'100%',
            alignItems:'center',
            justifyContent:'center',
          }}
        >
        
          {/* <View 
            style={{
              alignItems:'center',
              justifyContent:'space-between',
              flexDirection:'row'
            }}
          >
            
            <CPB current = {current} end= {100} />
            <View
              style={{
                alignItems:'center',
                justifyContent:'left',
                padding:20
              }}
            >
              <a 
                ref={textRef}
                style={{
                  fontSize: 11,
                  fontWeight:700,
                  color:'grey',
                  textAlign:'center'
              }}
              >0 %</a>
            </View>
          </View> */}
        <View style={{ 
            // height:100,
            width:200,
            height:33,
            backgroundColor:'white',
            
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            // marginRight:2,
            // marginLeft:2,
            // marginBottom:2,
            
            // padding:4,
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
            elevation:2,
            borderColor:'lightgrey',
            overflow:'hidden'}} 
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
                        fontWeight:'700',
                        textDecorationLine:'none',
                        color:'white',
                        
                        textShadowColor: 'rgba(0, 0, 0, 0.5)',
                        textShadowOffset: {width: 0, height: 0},
                        textShadowRadius: 3,
                        flex:1,
                        textAlign:'center',
                        alignItems:'center',
                        justifyContent:'center',
                        flexDirection:'row',
                        margin:5,
                    }}>
                        WAV
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        </View>
      </View>
    </Fade>
  )
}
export default Sound
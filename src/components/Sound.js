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

function LP(freq,sr){
  this.buf0 = 0
  this.buf1 = 0
  this.buf2 = 0
  this.buf3 = 0
  this.buf4 = 0
  this.buf5 = 0
  this.buf6 = 0
  this.buf7 = 0
  this.mode = 12
  this.cutoff=2*Math.sin(Math.PI*(freq/sr))
}
LP.prototype.setMode=function(mode){
  this.mode=mode
}
  LP.prototype.process=function(sample){
    this.buf0 += this.cutoff * (sample - this.buf0)
    this.buf1 += this.cutoff * (this.buf0 - this.buf1)
    this.buf2 += this.cutoff * (this.buf1 - this.buf2)
    this.buf3 += this.cutoff * (this.buf2 - this.buf3)
    this.buf4 += this.cutoff * (this.buf3 - this.buf4)
    this.buf5 += this.cutoff * (this.buf4 - this.buf5)
    this.buf6 += this.cutoff * (this.buf5 - this.buf6)
    this.buf7 += this.cutoff * (this.buf6 - this.buf7)
    if(this.mode ==6){
      return this.buf0
    }
    else if(this.mode =12){
        return this.buf1
    }
    else if(this.mode =24){
        return this.buf3
    }
    else if(this.mode =48){
        return this.buf7
    }
  }




function HP(freq,sr){
  this.buf0 = 0;
  this.buf1 = 0;
  this.buf2 = 0;
  this.buf3 = 0;
  this.buf4 = 0;
  this.buf5 = 0;
  this.buf6 = 0;
  this.buf7 = 0;
  this.cutoff=2*Math.sin(Math.PI*(freq/sr));
  this.mode =12
}
HP.prototype.setMode=function(mode){
  this.mode=mode
}
HP.prototype.process=function(sample){
  this.buf0 += this.cutoff * (sample - this.buf0)
  this.buf1 += this.cutoff * (this.buf0 - this.buf1)
  this.buf2 += this.cutoff * (this.buf1 - this.buf2)
  this.buf3 += this.cutoff * (this.buf2 - this.buf3)
  this.buf4 += this.cutoff * (this.buf3 - this.buf4)
  this.buf5 += this.cutoff * (this.buf4 - this.buf5)
  this.buf6 += this.cutoff * (this.buf5 - this.buf6)
  this.buf7 += this.cutoff * (this.buf6 - this.buf7)
  if(this.mode ==6){
    return (sample - this.buf0)
  }
  else if(this.mode =12){
      return (sample - this.buf1)
  }
  else if(this.mode =24){
      return (sample - this.buf3)
  }
  else if(this.mode =48){
      return (sample - this.buf7)
  }
}
function BAND(lowFreq,highFreq,sr){
  this.hp=new HP(lowFreq,sr)
  this.lp=new LP(highFreq,sr)
}
BAND.prototype.setMode=function(mode){
  this.lp.setMode(mode)
  this.hp.setMode(mode)
}
BAND.prototype.process=function(sample){
  return (this.lp.process(this.hp.process(sample)))
}
var barkscale = [175,2750,6600]
function FOURBAND(sr){
  var barkscale = [175,2750,6600]
  this.high = new HP(barkscale[barkscale.length-1],sr)
  this.mid = new BAND(barkscale[barkscale.length-2],[barkscale.length-1],sr)
  this.midlow = new BAND(barkscale[barkscale.length-3],[barkscale.length-2],sr)
  this.low = new LP(barkscale[barkscale.length-3],sr)
  this.mode=12
}
FOURBAND.prototype.setMode=function(mode){
  this.high.setMode(mode)
  this.mid.setMode(mode)
  this.midlow.setMode(mode)
  this.low.setMode(mode)
  this.mode=mode
}
FOURBAND.prototype.process=function(sample){
  //return (this.high.process(sample)+this.mid.process(sample)+this.midlow.process(sample)+this.low.process(sample))
  return [this.low.process(sample),this.midlow.process(sample),this.mid.process(sample),this.high.process(sample)]
}


function MATCH(){
  this.userMean=0
  this.userDev=0
  this.refMean=0
  this.refDev=0
  this.buffer=[0,0,0,0]
}
MATCH.prototype.setUserMean=function(userMean){
  this.userMean=userMean
}
MATCH.prototype.setUserDev=function(userDev){
  this.userDev=userDev
}
MATCH.prototype.setRefMean=function(RefMean){
  this.RefMean=RefMean
}
MATCH.prototype.setRefDev=function(RefDev){
  this.RefDev=RefDev
}
MATCH.prototype.process=function(sample){
  this.buffer.slice(0,1)
  if(sample>0){
    this.buffer.push(
      ((sample-this.userMean)*this.refDev/this.userDev)+this.userDev
    )
  }
  else if (sample<0){
    this.buffer.push(
      ((sample+this.userMean)*this.refDev/this.userDev)+this.userDev
    )
  }
  var average = 0;
  for (var i =0; i<this.buffer.length; i++){
    average+=this.buffer[i]/this.buffer.length
  }
  return average
}
function MATCHER(){
  this.high=new MATCH()
  this.mid=new MATCH()
  this.midlow=new MATCH()
  this.low=new MATCH()
}
MATCHER.prototype.setHigh=function(userMean,userDev,refMean,refDev){
  this.high.setUserMean(userMean)
  this.high.setUserDev(userDev)
  this.high.setRefMean(refMean)
  this.high.setRefDev(refDev)
}
MATCHER.prototype.setMid=function(userMean,userDev,refMean,refDev){
  this.mid.setUserMean(userMean)
  this.mid.setUserDev(userDev)
  this.mid.setRefMean(refMean)
  this.mid.setRefDev(refDev)
}
MATCHER.prototype.setMidLow=function(userMean,userDev,refMean,refDev){
  this.midlow.setUserMean(userMean)
  this.midlow.setUserDev(userDev)
  this.midlow.setRefMean(refMean)
  this.midlow.setRefDev(refDev)
}
MATCHER.prototype.setLow=function(userMean,userDev,refMean,refDev){
  this.low.setUserMean(userMean)
  this.low.setUserDev(userDev)
  this.low.setRefMean(refMean)
  this.low.setRefDev(refDev)
}
MATCHER.prototype.setRef=function(refObj){
  this.setLow(this.low.userMean,this.low.userDev,refObj.meanArray[0],refObj.devArray[0])
  this.setMidLow(this.midlow.userMean,this.midlow.userDev,refObj.meanArray[1],refObj.devArray[1])
  this.setMid(this.mid.userMean,this.mid.userDev,refObj.meanArray[2],refObj.devArray[2])
  this.setHigh(this.high.userMean,this.high.userDev,refObj.meanArray[3],refObj.devArray[3])
}
MATCHER.prototype.setUser=function(userObj){
  this.setLow(userObj.meanArray[0],userObj.devArray[0],this.low.refMean,this.low.refDev)
  this.setMidLow(userObj.meanArray[1],userObj.devArray[1],this.midlow.refMean,this.midlow.refDev)
  this.setMid(userObj.meanArray[2],userObj.devArray[2],this.mid.refMean,this.mid.refDev)
  this.setHigh(userObj.meanArray[3],userObj.devArray[3],this.high.refMean,this.high.refDev)
}
MATCHER.prototype.process=function([low,midlow,mid,high]){
  return([this.low.process(low),this.midlow.process(midlow),this.mid.process(mid),this.high.process(high)])
}

function ANALYZER(){
  this.mean=0
  this.dev=0
  this.max=0
}
ANALYZER.prototype.process=function(array){
  for(var i = 0; i< array.length; i++){
    var val = Math.abs(array[i])
    this.mean+=val/array.length
    if(val>this.max){
      this.max=val
    }
  }
  for(var i = 0; i< array.length; i++){
    var val = Math.abs(array[i])
    this.dev+=Math.abs(val-this.mean)/array.length
    console.log('pushing to analyzer buffer : ', i/array.length)
  }
  return({mean:this.mean,dev:this.dev})
}
function STATS(SR){
  this.mfb= new FOURBAND(SR)
  this.sfb= new FOURBAND(SR)
  this.mh= new ANALYZER
  this.mm= new ANALYZER
  this.mml= new ANALYZER
  this.ml= new ANALYZER
  this.sh= new ANALYZER
  this.sm= new ANALYZER
  this.sml= new ANALYZER
  this.sl= new ANALYZER
  
}
STATS.prototype.process=function(mid,side){
  // FOURBAND.prototype.process=function(sample){
  //   return [this.low.process(sample),this.midlow.process(sample),this.mid.process(sample),this.high.process(sample)]
  // }
  var mha=[]
  var mma=[]
  var mmla=[]
  var mla=[]
  var sha=[]
  var sma=[]
  var smla=[]
  var sla=[]
  for (var i =0; i<mid.length; i++){
    console.log('pushing to mid/side buffer : ', i/mid.length)
    var midsample=this.mfb.process(mid[i])
    mla.push(midsample[0])
    mmla.push(midsample[1])
    mma.push(midsample[2])
    mha.push(midsample[3])

    var sidesample=this.sfb.process(side[i])
    sla.push(sidesample[0])
    smla.push(sidesample[1])
    sma.push(sidesample[2])
    sha.push(sidesample[3])
    
  }
  var tempObj={
    mh:this.mh.process(mha),
    mm:this.mm.process(mma),
    mml:this.mml.process(mmla),
    ml:this.ml.process(mla),
    sh:this.sh.process(sha),
    sm:this.sm.process(sma),
    sml:this.sml.process(smla),
    sl:this.sl.process(sla),
  }
  return({
    monoMeanArray:
      [
        tempObj.ml.mean, 
        tempObj.mml.mean, 
        tempObj.mm.mean, 
        tempObj.mh.mean
      ],
    monoDevArray:
      [
        tempObj.ml.dev,
        tempObj.mml.dev,
        tempObj.mm.dev,
        tempObj.mh.dev
      ],
    sideMeanArray:
      [
        tempObj.sl.mean,
        tempObj.sml.mean,
        tempObj.sm.mean,
        tempObj.sh.mean
      ],
    sideDevArray:
      [
        tempObj.sl.dev,
        tempObj.sml.dev,
        tempObj.sm.dev,
        tempObj.sh.dev
      ]
  })
  

}
function SQUWBS(SR){
  var barkscale = [175,2750,6600]
  this.SEQ=new FOURBAND(barkscale,SR)
  this.MEQ=new FOURBAND(barkscale,SR)
  this.MM=new MATCHER()
  this.SM=new MATCHER()
  var refStats={
    monoMeanArray:[0.042045691939235255, 0.30350496273493044, 0.11162788789494214, 0.008448073265478086],
    monoDevArray:[0.05534535221208015, 0.3960832520494717, 0.14692152044358975, 0],
    sideMeanArray:[0.0024129038023947683, 0.029907691106377872, 0.011327437907067852, 0.0008545722599771934],
    sideDevArray:[0.0031832037448466218, 0.039556932569829624, 0.015011548049436968, 0]
  }
  var monoRef = {
    meanArray:refStats.monoMeanArray,
    devArray:refStats.monoDevArray
  }
  var sideRef = {
    meanArray:refStats.sideMeanArray,
    devArray:refStats.sideDevArray
  }
  this.MM.setRef(monoRef)
  this.SM.setRef(sideRef)
}
SQUWBS.prototype.setRef=function(refObj){
  var monoRef = {
    meanArray:refObj.monoMeanArray,
    devArray:refObj.monoDevArray
  }
  var sideRef = {
    meanArray:refObj.sideMeanArray,
    devArray:refObj.sideDevArray
  }
  this.MM.setUser(monoRef)
  this.SM.setUser(sideRef)
}
SQUWBS.prototype.setUser=function(userObj){
  var monoRef = {
    meanArray:userObj.monoMeanArray,
    devArray:userObj.monoDevArray
  }
  var sideRef = {
    meanArray:userObj.sideMeanArray,
    devArray:userObj.sideDevArray
  }
  this.MM.setUser(monoRef)
  this.SM.setUser(sideRef)
}
SQUWBS.prototype.process=function(left,right){
  var mono = (left+right)/2
  var leftOnly = left-mono
  var mid=this.MM.process(this.MEQ.process(mono))
  var side=this.SM.process(this.SEQ.process(leftOnly))
  return(
    {
      left:mid+side,
      right:mid-side
    }
  )
}


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
  //const [current,setCurrent]=useState(0)
  const textRef = useRef('')
  // useEffect(()=>{
  //   console.log('current is different')
  //   //console.log(current)
  //   //textRef.current.innerHTML = current+" %"
  // },[current])
  var current=0
  const onDrop = useCallback(acceptedFiles => {



    for (var i = 0; i < acceptedFiles.length; i++) {
        
        (function(file) {


          var reader = new FileReader();
          reader.onload = function(e) { 

            var buffer = reader.result
            let int16Factor=Math.pow(2,15)-1
            let result = wav.decode(buffer)
            let left = result.channelData[0].slice()
            let right = result.channelData[1].slice()
            //console.log('sound:',left)
            
            // //const binSize=1024
            // const binSize=8
            // let used = pad(parseFloat(Math.round(window.performance.memory.usedJSHeapSize/ window.performance.memory.jsHeapSizeLimit*10000)/100).toFixed(2),5)
            // let leftSlot=new Array(binSize).fill(0)
            // let leftFft=new Array(binSize).fill([0,0])
            // let rightSlot=new Array(binSize).fill(0)
            // let rightFft=new Array(binSize).fill([0,0])
            // let masterArray = []
            // let max = 1.0
            // let amp = 1.0
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
            //     current=((Math.round(i/left.length*1000000)/10000).toFixed(4))
            //       //setCurrent((Math.round(i/left.length*1000000)/10000).toFixed(4))
            //       //textRef.current.innerHTML = String((Math.round(i/left.length*1000000)/10000).toFixed(4))+" %"
            //       //console.log((Math.round(i/left.length*1000000)/10000).toFixed(4)+"%")

            //     leftFft=null
            //     rightFft=null

            //     left[i]=leftIfft[0][0]
            //     right[i]=rightIfft[0][0]
            //     leftIfft=null
            //     rightIfft=null
            // }

            // //below is uint8 array
            // var encoded=wav.encode([left,right],{sampleRate:result.sampleRate, float:true, bitDepth:32}).slice()
            
            
            
            // //below changes it to 64string
            // var blob = new Blob([encoded],{
            //   type:'audio/wav'
            // })
            // var url=window.URL.createObjectURL(blob)
            
            // console.log(url)
            // var a = document.createElement('a')
            // a.setAttribute('href',url)     
            // a.setAttribute('download','master.wav')
            // a.click()
            // a.remove()
            // setTimeout(function(){
            //   window.URL.revokeObjectURL(url)
            // },1000)
            let mono = []
            let leftOnly = []
            for (var i = 0; i<left.length; i++){
              //console.log(i/left.length)
              mono.push((left[i]+right[i]/2))
              leftOnly.push(left[i]-mono[i])
            }
            var analyzer= new STATS(result.sampleRate)
            var stats = analyzer.process(mono,leftOnly)
            console.log(stats)
            var squwbs = new SQUWBS(result.sampleRate)
            squwbs.setUser(stats)
            //squwbs.process(mono,leftOnly)
            for(var i =0; i<left.length; i++){
              var temp=squwbs.process(left[i],right[i])
              left[i]=temp.left
              right[i]=temp.right
            }
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
            height:'100%',
            width:'100%',
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'transparent'
          }}
        >
        
          <View 
            style={{
              alignItems:'center',
              justifyContent:'space-between',
              flexDirection:'column'
            }}
          >
            
            {/* <CPB current = {current} end= {100} /> */}
            {/* <View
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
            </View> */}
          </View>
        <View style={{ 
            // height:100,
            width:150,
            height:33,
           
            //backgroundColor:'white',
            //backgroundImage:'radial-gradient(farthest-corner at 0% 0%,rgb(255,146,166),rgb(180,166,255))',
            backgroundColor:'rgb(180,166,255)',
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
            {...getRootProps({refKey:'innerRef'})}
        >
            <View style={{
                height:33,
                justifyContent:'center',
                alignItems:'center'
            }}>
              <View style={{
                height:50,
                width:50,
                justifyContent:'center',
                alignItems:'center',
            }}>
                <input {...getInputProps()} />
                <TouchableOpacity>
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
                        WAV
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
        </View>
      </View>
    </Fade>
  )
}
export default Sound
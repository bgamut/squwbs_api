import React, {useCallback,useState,useEffect,useRef} from 'react'
import {Text,View,Dimensions,TouchableOpacity} from 'react-native'
import Dropzone, {useDropzone} from 'react-dropzone'
import Fade from 'react-reveal/Fade'
//import WaveFile from 'wavefile'
//import fs from 'fs'
import pcm from 'pcm'
import CPB from './CPB'
//import sketch from './sketch'

//import Sketch from 'react-p5'
import { createParameter } from 'typescript'
import {scaleOrdinal} from 'd3-scale'
import {arc as d3Arc, pie as d3Pie} from 'd3-shape'
import {csvParse} from 'd3-dsv'
var squwbs = require ('../build/Release/squwbs.node')
var P5Wrapper = require('react-p5-wrapper')
const fft = require('fft-js').fft
const ifft = require('fft-js').ifft
const fftUtil = require('fft-js').util
const fftInPlace = require('fft-js').fftInPlace
//const windows = require('signal-windows').windows
const windowing=require('fft-windowing')
let wav = require('node-wav')
const WavEncoder = require('wav-encoder')
//console.log(sketch)



var sketch = 
`

  let rotation = 0;

  p.setup = function () {
    p.createCanvas(600, 400, p.WEBGL);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.rotation){
      rotation = props.rotation * Math.PI / 180;
    }
  };

  p.draw = function () {
    p.background(100);
    p.normalMaterial();
    p.noStroke();
    p.push();
    p.rotateY(rotation);
    p.box(100);
    p.pop();
  };
  

`

  
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
        //console.log(this.buf1)
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
      var returnVal=sample - this.buf1
      //console.log('hp:',sample)

      return (returnVal)
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
  var returnVal=this.lp.process(this.hp.process(sample))
  //console.log('band :',returnVal)
  return (returnVal)
}
var barkscale = [175,2750,6600]
function FOURBAND(sr,barkscale){
  // var barkscale = [175,2750,6600]
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
      if(this.userDev==0){
          this.buffer.push(
              sample-this.userMean+this.refMean
          )
      }
      else{
          this.buffer.push(
              ((sample-this.userMean)*this.refDev/this.userDev)+this.userMean
            )
      }
    
  }
  else if (sample<=0){
      if(this.userDev==0){
          this.buffer.push(
              sample+this.userMean-this.refMean
          )
      }
      else{
          this.buffer.push(
              ((sample+this.userMean)*this.refDev/this.userDev)-this.refMean
          )
      }
  }
  // else if(sample==0){
  //     this.buffer.push(0)
  // }
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
    //console.log('pushing to analyzer buffer : ', pad(i/array.length,6,0))
    //document.getElementById('console').innerHTML='pushing to analyzer buffer : ', pad(i/array.length,6,0)
  }
  return({mean:this.mean,dev:this.dev})
}
function STATS(SR){
  this.mfb= new FOURBAND(SR,[175,2750,6600])
  this.sfb= new FOURBAND(SR,[175,2750,6600])
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
    //console.log('pushing to mid/side buffer : ', pad(i/mid.length,6,0))
    //document.getElementById('console').innerHTML='pushing to mid/side buffer : ', pad(i/mid.length,6,0)
    //console.log(mid[i])
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
    //console.log('mid [low,midlow,mid,high] / side [low,midlow,mid,high]: ',midsample,sidesample)
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
  this.SEQ=new FOURBAND(SR,[175,2750,6600])
  this.MEQ=new FOURBAND(SR,[175,2750,6600])
  console.log(this.SEQ)
  console.log(this.MEQ)
  this.MM=new MATCHER()
  this.SM=new MATCHER()
  var refStats={
    monoMeanArray:[0.042045691939235255, 0.30350496273493044, 0.11162788789494214, 0.008448073265478086],
    monoDevArray:[0.05534535221208015, 0.3960832520494717, 0.14692152044358975, 0],
    sideMeanArray:[0.0024129038023947683, 0.029907691106377872, 0.011327437907067852, 0.0008545722599771934],
    sideDevArray:[0.0031832037448466218, 0.039556932569829624, 0.015011548049436968, 0]
   
    // monoMeanArray:[],
    // monoDevArray:[],
    // sideMeanArray:[],
    // sideDevArray:[]

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
 // console.log(this.MEQ.process(mono))
 //console.log(this.SEQ.process(leftOnly))
 //console.log(this.SM.process(this.SEQ.process(leftOnly)))
  var midArray=this.MM.process(this.MEQ.process(mono))
  var sideArray=this.SM.process(this.SEQ.process(leftOnly))
  var mid=0
  var side=0
  for (var i =0; i<barkscale.length+1; i++){
      mid+= midArray[i]
      side+= sideArray[i]
  }
  //console.log(mid)
  var value = {left:mid+side,right:mid-side}
  //console.log(value)
   return(value)
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
  let binSize=1024
  var initialSoundArray = new Array(binSize).fill([0,0])
  //console.log(initialSoundArray)
  var portrait=false
  var googlecardPortrait=false
  const isMobile=false
  const [count,setCount]=useState(0)
  const [rotation,setRotation]=useState(0)
  const [height,setHeight]=useState(0)
  const [width,setWidth]=useState(0)
  const [iframeHeight,setIframeHeight]=useState(0)
  const [iframeWidth,setIframeWidth]=useState(0)
  const [originalArray,setOriginalArray]=useState([[0,0]])
  const [soundArray,setSoundArray]=useState(initialSoundArray)
  // const previousTimeRef=useRef()
  // const requestRef=useRef()
  const [prevTimeRef,setPrevTimeRef]=useState(0)
  const [fileLoaded,setFileLoaded]=useState(false)
  const [arrayIndex,setArrayIndex]=useState(0)
  const [componentLoaded,setComponentLoaded]=useState(false)
  //const [updateStatus,setUpdateStatus]=useState(false)
  //const [maxArrayLength,setMaxArrayLength]=useState(undefined) 
  var updateStatus = false

  const textRef = useRef('')
  // useEffect(()=>{
  //   console.log('current is different')
  //   //console.log(current)
  //   //textRef.current.innerHTML = current+" %"
  // },[current])
  
  let leftSlot=new Array(binSize).fill(0)
  let leftFft=new Array(binSize).fill([0,0])
  let rightSlot=new Array(binSize).fill(0)
  let rightFft=new Array(binSize).fill([0,0])
  var current=0
  var array = new Array(binSize).fill(0)
  // const animate = (time)=>{
  //   if(previousTimeRef.current !=undefined){
  //     const deltaTime=time-previousTimeRef.current;
  //     setCount(prevCount=>(prevCount+deltaTime*0.01))
  //     //setRotation(prevCount=>(prevCount))
  //   }
  //   previousTimeRef.currrent= time
  //   requestRef.current = requestAnimationFrame(animate)
  // }
  // useEffect(()=>{
  //   requestRef.current = requestAnimationFrame(animate)
  //   return ()=> cancelAnimationFrame(requestRef.current)
  // },[])
  const animate = ()=>{
    
  }
  const updateDimensions=()=>{
        


        setHeight(Math.floor(Dimensions.get('window').height))
        setWidth(Math.floor(Dimensions.get('window').width))
       
}
useEffect(()=>{
    Dimensions.addEventListener('change',(e)=>{
      updateDimensions()
    })
    updateDimensions()
    setComponentLoaded(true)
  },[])


useEffect(()=>{
  if(componentLoaded == true){
    //setArrayIndex(0)
    setFileLoaded(true)
    console.log('original Array chaged')
  }
},[originalArray])
useEffect(()=>{
  if(componentLoaded == true){
    console.log('file loaded = ', fileLoaded)
    setArrayIndex(0)
  }
  
},[fileLoaded])
  useEffect(()=>{
    if(fileLoaded==true){
      console.log('array index changed to ',arrayIndex)
      console.log(originalArray)
      console.log(soundArray)
      var newArray = soundArray
      newArray.splice(0,1)
      newArray.push([originalArray[arrayIndex][0],originalArray[arrayIndex][1]])
      console.log(newArray)
      setSoundArray(newArray)
    }
    
  },[arrayIndex])

  useEffect(()=>{
    // console.log(arrayIndex)
    // console.log(soundArray)
    // console.log('soundArray updated ', soundArray[0])
    // window.requestAnimationFrame(animationFrameRequestCallBack)
    // if(arrayIndex<originalArray[0].length){
    //   setSoundArray(originalArray[arrayIndex+1])
    // }
  },[soundArray])

  useEffect(()=>{
    //setUpdateStatus(false)
    updateStatus=false
  },[current])

  useEffect(()=>{
    var today = new Date()
    var deltaTime = today-prevTimeRef
    //console.log(deltaTime)
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    //console.log(array[0])
    //console.log(dateTime)
    //current+=1
    //console.log(current)
    //console.log(count)
    setTimeout(()=>{
      setCount(count+1)
      setPrevTimeRef(today)
    },1500)
  },[count])

  const setup = (p5, canvasParentRef)=>{
   // p5.createCanvas(500, 500, p5.WEBGL).parent(canvasParentRef)
      //p5.frameRate(15)
      p5.createCanvas(Math.floor(Dimensions.get('screen').width),Math.floor(Dimensions.get('screen').height)).parent(canvasParentRef)
  }
  const animationFrameRequestCallBack =()=>{
    //console.log('animation frame requested!')
  }
  
  
  const draw = (p5)=>{
    
    
    
    p5.translate(Math.floor(Dimensions.get('screen').width/2),Math.floor(Dimensions.get('screen').height/2))
    p5.background('white');
    //p5.background(224,150,202)
    //p5.fill(185,167,244)
    p5.fill(185,167,244)
    p5.rect(-(width-50)/2,-(height-50)/2,width-50,height-50)
   //p5.colorMode('RGB',100)
    
   p5.fill('white')
    var binSize = 1024
    
    for (var i =0; i<binSize; i++){

      var barWidth = Math.ceil((width)/binSize)
      
       //var barHeight= -1*Math.floor(Math.random()*(height-50))
       //var barHeight= -1*Math.floor(leftFft[i][0]*(height-50))
       //var barHeight= -1*Math.floor((leftSlot[i]+0.01)*(height-50))
       
       //var tempSample=soundArray[i]
       //console.log(tempSample)
       // var barHeight= -1*Math.floor((soundArray[i][0]+0.01)*(height-50))
       //console.log((leftSlot[i]+0.01)*(height-50))
       //console.log(leftFft[i][0])
       //console.log(soundArray[i][0])
       //console.log(array[0])
       var barHeight= -1*Math.floor((array[i][0]+0.01)*(height-50))
       
       var barCoordX = Math.floor(-(width)/2+i*barWidth)
       var barCoordY = Math.floor(((height-50)/2))
     
      //console.log(array[0])
      //p5.noStroke()
      p5.rect(barCoordX,barCoordY,barWidth,barHeight)
    }
    p5.noStroke()
    //p5.fill(224,150,202)
    p5.fill('white')
   
    p5.rotate((count* Math.PI / 180));
    p5.rect(-75,-75,150,150)
    p5.rotate((-count* Math.PI / 180));
    
    //p5.textSize(14);
    //p5.textAlign('CENTER', 'CENTER');
    //p5.fill(185,167,244)
    //p5.text(current,0,-7)
    //p5.textFont('');
    

    // NOTE: Do not use setState in draw function or in functions that is executed in draw function... pls use normal variables or class properties for this purposes
    //this.x++
  }
  const onDrop = useCallback(acceptedFiles => {



    for (var i = 0; i < acceptedFiles.length; i++) {
        
        (function(file) {


          var reader = new FileReader();
          reader.onload = function(e) { 
            
            
            var buffer = reader.result
            let int32Factor=Math.pow(2,31)
            let result = wav.decode(buffer)
            
            let left = result.channelData[0].slice()
            let right = result.channelData[1].slice()
            //console.log('sound:',left)
            var max = 0
            for (var i = 0; i<left.length; i++){
              if(max<Math.abs(left[i])){
                max=Math.abs(left[i])
              }
              if(max<Math.abs(right[i])){
                max=Math.abs(right[i])
              }
            }
            for (var i = 0; i<left.length; i++){
              left[i]=((left[i]/max))
              right[i]=((right[i]/max))
              //console.log(left[i])
            }
            
            const binSize=1024
            //const binSize=8
            let used = pad(parseFloat(Math.round(window.performance.memory.usedJSHeapSize/ window.performance.memory.jsHeapSizeLimit*10000)/100).toFixed(2),5)
            // let leftSlot=new Array(binSize).fill(0)
            // let leftFft=new Array(binSize).fill([0,0])
            // let rightSlot=new Array(binSize).fill(0)
            // let rightFft=new Array(binSize).fill([0,0])

            // leftSlot=new Array(binSize).fill(0)
            // leftFft=new Array(binSize).fill([0,0])
            // rightSlot=new Array(binSize).fill(0)
            // rightFft=new Array(binSize).fill([0,0])
            // var tempOriginalArray=[]
            // for (var i = 0; i<left.length; i++){
            //   tempOriginalArray.push([left[i],right[i]])
            //   array.push(Math.abs(left[i]))
            //   array.splice(0,1)
            //   // console.log(array[0])
            //   setTimeout(()=>{
            //     window.requestAnimationFrame(animationFrameRequestCallBack)
            //   },750)
              
              
            // }
            //setOriginalArray(tempOriginalArray)
            
            //console.log(array)
           // global.array=array
            // let masterArray = []
            // let max = 1.0
            // let amp = 1.0
            // for (let i=0; i<binSize; i++){
            //     masterArray.push(1-i/binSize)
            //     //current=i/binSize
            //     var a = Math.random()*100
            //     //console.log(a)
            //     if(updateStatus==false){
            //       //setUpdateStatus(true)
            //       updateStatus=true
            //       current=a
            //       console.log(a)
            //       //setCurrent(a)
            //       updateStatus=false
            //     }
                
            // }
            console.log("memory used : "+ used+" MB");
           // for(let i=0; i<left.length; i++){ 
                //console.log(left[i])
                
                
                //leftSlot.push(left[i])
                //leftSlot=leftSlot.splice(0,1)
                
                //rightSlot.push(right[i])
                //rightSlot=rightSlot.splice(0,1)
                //console.log(leftSlot)
                //leftFft=fft(leftSlot)
                //rightFft=fft(rightSlot)
                // console.log(leftFft)
                // for (let j=0; j<binSize; j++){
                //     leftFft[j][0]=leftFft[j][0]*masterArray[j]*amp
                //     rightFft[j][0]=rightFft[j][0]*masterArray[j]*amp
                // }

                // let leftIfft=ifft(leftFft)
                // let rightIfft=ifft(rightFft)
                
                //current=((Math.round(i/left.length*1000000)/10000).toFixed(4))
                  //setCurrent((Math.round(i/left.length*1000000)/10000).toFixed(4))
                  //textRef.current.innerHTML = String((Math.round(i/left.length*1000000)/10000).toFixed(4))+" %"
                  //console.log((Math.round(i/left.length*1000000)/10000).toFixed(4)+"%")
                //window.requestAnimationFrame(animationFrameRequestCallBack)
                

                // leftFft=null
                // rightFft=null

                // left[i]=leftIfft[0][0]
                // right[i]=rightIfft[0][0]
                // leftIfft=null
                // rightIfft=null
            //}

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
            // let mono = []
            // let leftOnly = []
            // for (var i = 0; i<left.length; i++){
            //   //console.log(i/left.length)
            //   mono.push((left[i]+right[i]/2))
            //   leftOnly.push(left[i]-mono[i])
            // }
            
            
            //var analyzer= new STATS(result.sampleRate)
            //var stats = analyzer.process(mono,leftOnly)
            //console.log(stats)
            //var squwbs = new SQUWBS(result.sampleRate)
            //squwbs.setUser(stats)
            //global.squwbs=squwbs
            //squwbs.reset()
            //squwbs.setSR(result.sampleRate)
            var meanLeft=0
            var meanRight=0
            var maxLeft=0
            var maxRight=0
            var lastLeftSample=0
            var lastRightSample=0
            for(var i =0; i<left.length; i++){
              var temp=squwbs.process(left[i],right[i])
              console.log(temp)
              //left[i]=Math.floor(((temp.left))*max)
              
              //right[i]=Math.floor(((temp.right))*max)
              left[i]=(temp.left)
              //console.log(temp.left-left[i])
              right[i]=(temp.right)
              //mean+=(left[i]+right[i])/(2*left.length)
              //meanLeft+=left[i]/left.length
              //meanRight+=right[i]/left.length
              // if(Math.abs(left[i])>newMax){
              //   newMax=Math.abs(left[i])
              // }
              // if(Math.abs(right[i])>newMax){
              //   newMax=Math.abs(right[i])
              // }
              // if(i==left.length-1){
              //   lastLeftSample=left[i]
              //   lastRightSample=right[i]
              // }
            }
            // console.log(lastLeftSample)
            // console.log(lastRightSample)
            // for(var i =0; i<left.length; i++){
            //   left[i]=left[i]-lastLeftSample
            //   right[i]=right[i]-lastRightSample
            //   if(Math.abs(left[i])>maxLeft){
            //     maxLeft=Math.abs(left[i])
            //   }
            //   if(Math.abs(right[i])>maxRight){
            //     maxRight=Math.abs(right[i])
            //   }
            // }

            // for(var i =0; i<left.length; i++){
            //   left[i]=(left[i]/maxLeft)
            //   right[i]=(right[i]/maxRight)
            // }
            var encoded=wav.encode([left,right],{sampleRate:result.sampleRate, float:true, bitDepth:16}).slice()
            
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
  const download = () =>{
  

var element = document.createElement('a');
//element.setAttribute('href', 'https://squwbs-252702.appspot.com/downloadpro');
element.setAttribute('href','https://drive.google.com/file/d/1dWkE6cBt36IBCMWTkHtRtFdZHb7CvH5g/view?usp=sharing')
//element.setAttribute('href','https://drive.google.com/file/d/1trdN4cKoSRgXzO1QsKx3F2v3ThmYsB9o/view?usp=sharing')
element.style.display = 'none';
document.body.appendChild(element);

element.click();
document.body.removeChild(element);

}
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
            
              <View>

               
              </View>
          

            
          </View>
        <View style={{ 
            // height:100,
            width:150,
            height:33,

            //backgroundColor:'white',
            //backgroundImage:'radial-gradient(farthest-corner at 0% 0%,rgb(255,146,166),rgb(180,166,255))',
            backgroundColor:'rgb(186,214,227)',
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
            elevation:2,
            transform:[{
              translateX:0
            },{
                //translateY:-height/2-(150+33)/2
                translateY:0
            }]
              
            
            
          }} 
           
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
               
                <TouchableOpacity
                  onPress={(e)=>{
                    download()
                  }}
                >
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
                        <i class="fa fa-download" aria-hidden="true"></i> 
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
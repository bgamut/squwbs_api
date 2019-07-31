const fft = require('fft-js').fft
const ifft = require('fft-js').ifft
const fftUtil = require('fft-js').util
const fftInPlace = require('fft-js').fftInPlace

//const windows = require('signal-windows').windows
const windowing=require('fft-windowing')
const fs =require("fs")
const Lame = require("node-lame").Lame;
const WavDecoder=require("wav-decoder")
//const WavEncoder = require('wav-encoder')
const WaveFile = require('wavefile')
function readFile(filepath) {
    return new Promise((resolve,reject)=>{
        fs.readFile(filepath,(err,buffer)=>{
            if(err){
                return reject(err)
            }
            return resolve(buffer)
        })
    })
}

// function nextPow2 (original){
//     return Math.pow(2,Math.ceil(Math.log(original)/Math.log(2)))
// }
// function nan(num){
//     //if (isNaN(num)==true){
//         console.log(num)
//         //console.log('NAN!!!!!!!!!!!!!!!')
//     //}
// }


// var originalLength
// var originalSampleRate
// var binSize=1024
// var lengthDifference=0

// // the following should be different according to reference and target track
// var masterArray = []
// for (var i=0; i<binSize; i++){
//     masterArray.push(1)

// }


// function zeroPad(originalArray){
//     originalLength = originalArray.length
//     var newLength = (Math.ceil(originalLength/binSize)+1)*binSize
//     lengthDifference = newLength-originalLength
//     var newArray=originalArray.slice()
//     for (i=0; i<lengthDifference; i++){
//         if(i<binSize/2){
//             newArray.unshift(0)
//         }
//         else{
//             newArray.push(0)
//         }
//     }
//     return newArray
// }

// const mp3FilePath='./example.mp3'


// const mp3ToWav = new Lame({
//     output:'./example.wav'
// }).setFile(mp3FilePath)
// console.log('mp3 decoding')
// mp3ToWav.decode()
//     .then(()=>{
//         console.log('reading wav file')
//         readFile('example.wav')
//         .then((buffer)=>{
//             return WavDecoder.decode(buffer)
//             console.log('buffer')
//         }).then((audioData)=>{
//             originalSampleRate=audioData.sampleRate
//             //console.log(audioData.sampleRate)
//             //console.log(audioData.channelData[0])
//             //console.log(audioData.channelData[1])
//             var left = Array.prototype.slice.call(audioData.channelData[0])
//             var right = Array.prototype.slice.call(audioData.channelData[1])
//             //the code below returns an array that ramps up and then down
//             //var hamCoef= windows.construct('ham',binSize)
//             // var hamCoef =new Array(binSize-1).fill(0)
//             // for (var i =0; i<binSize; i++){
//             //     if(i<binSize/2){
//             //         hamCoef[i]=i/((binSize/2)-1)
//             //     }
//             //     else{
//             //         hamCoef[i]=hamCoef[binSize-i-1]
//             //     } 
//             // }
//             //console.log(hamCoef)
//             console.log('zero padding arrays')
//             //zeroPad
//             // var newLeft = zeroPad(left)
//             // var newRight= zeroPad(right)
//             var newLeft = left.slice()
//             var newRight = right.slice()
//             //split the left and right into subparts
//             var tempLeft=new Array(binSize).fill(0)
//             var newLeftOne = []
//             var newLeftTwo = []

//             var tempRight=new Array(binSize).fill(0)
//             var newRightOne = []
//             var newRightTwo = []
            

//             //var binSize = nextPow2(sampleRate)
//             console.log('copying to binSized arrays')
//             for(var i = 0; i<left.length; i++){
//                 if(i%binSize==0){
//                     newLeftOne[Math.floor(i/binSize)]=tempLeft.slice()
//                     newRightOne[Math.floor(i/binSize)]=tempRight.slice()
//                 }
//                 //tempLeft[i%binSize]=newLeft[i]*hamCoef[i%binSize]
//                 //tempRight[i%binSize]=newRight[i]*hamCoef[i%binSize]
//                 // nan(newLeft[i]*hamCoef[i%binSize])
//                 // nan(newRight[i]*hamCoef[i%binSize])
//                 tempLeft[i%binSize]=windowing.gaussian(newLeft[i])
//                 tempRight[i%binSize]=windowing.gaussian(newRight[i])
//             }
//             tempLeft.fill(0)
//             tempRight.fill(0)
//             for(var i = binSize/2; i<left.length-binSize/2; i++){
//                 var index = (i-binSize/2)
//                 if(i%binSize==0){
//                     newLeftTwo[Math.floor(index/binSize)]=tempLeft.slice()
//                     newRightTwo[Math.floor(index/binSize)]=tempRight.slice()
//                 }
//                 //tempLeft[index%binSize]=newLeft[i]*hamCoef[index%binSize]
//                 //tempRight[index%binSize]=newRight[i]*hamCoef[index%binSize]
//                 // nan(newLeft[i]*hamCoef[i%binSize])
//                 // nan(newRight[i]*hamCoef[index%binSize])
//                 tempLeft[index%binSize]=windowing.gaussian(newLeft[i])
//                 tempRight[index%binSize]=windowing.gaussian(newRight[i])
//             }
//             //hamCoef=null
//             tempLeft=null
//             tempRight=null
//             newLeftOne=newLeftOne.splice(1)
//             newLeftTwo=newLeftTwo.splice(1)
//             newRightOne=newRightOne.splice(1)
//             newRightTwo=newRightTwo.splice(1)
            
            

//             var newLeftOneFFT = []
//             var newLeftTwoFFT = []


//             var newRightOneFFT = []
//             var newRightTwoFFT = []
            

//             for(var i = 0; i<newLeftOne.length; i++){
//                 // nan(newLeftOne[i])
//                 // nan(newRightOne[i])
//                 newLeftOneFFT.push(fft(newLeftOne[i]))
//                 newRightOneFFT.push(fft(newRightOne[i]))
//                 console.log('fft conversion '+ i+ '/'+(newLeftOne.length+newLeftTwo.length))
//             }
//             for(var i = 0; i<newLeftTwo.length; i++){
//                 // nan(newLeftTwo[i])
//                 // nan(newRightTwo[i])
//                 newLeftTwoFFT.push(fft(newLeftTwo[i]))
//                 newRightTwoFFT.push(fft(newRightTwo[i]))
//                 console.log('fft conversion '+ (newLeftOne.length+i)+ '/'+(newLeftOne.length+newLeftTwo.length))
//             }
//             newLeftOne=null
//             newLeftTwo=null
//             newRightOne=null
//             newRightTwo=null
            
//             console.log("")

//             for(var i = 0; i<newLeftOneFFT.length; i++){
//                 for(var j = 0; j<binSize; j++){
//                     // nan(newLeftOneFFT[i][j][0])
//                     // nan(newRightOneFFT[i][j][0])
//                     newLeftOneFFT[i][j][0]=newLeftOneFFT[i][j][0]*masterArray[j]
//                     newRightOneFFT[i][j][0]=newRightOneFFT[i][j][0]*masterArray[j]
                    
//                 }
//                 console.log('magnitude update '+ i+ '/'+(newLeftOneFFT.length+newLeftTwoFFT.length))
//             }
//             for(var i = 0; i<newLeftTwoFFT.length; i++){
//                 for(var j = 0; j<binSize; j++){
//                     // nan(newLeftTwoFFT[i][j][0])
//                     // nan(newRightTwoFFT[i][j][0])
//                     newLeftTwoFFT[i][j][0]=newLeftTwoFFT[i][j][0]*masterArray[j]
//                     newRightTwoFFT[i][j][0]=newRightTwoFFT[i][j][0]*masterArray[j]
//                 }
//                 console.log('magnitude update '+ (newLeftOneFFT.length+i)+ '/'+(newLeftOneFFT.length+newLeftTwoFFT.length))
//             }
//             var leftOne=[]
//             var leftTwo=[]

//             var rightOne=[]
//             var rightTwo=[]

//             console.log('writing tracks to file')
//             // var file = fs.createWriteStream('leftOneCheck.txt');
//             // file.on('error', function(err) { console.log('error in file creation') });
//             // newLeftOneFFT.forEach(function(v) { file.write(v.join(',')); });
//             // file.end();
//             // var file = fs.createWriteStream('leftTwoCheck.txt');
//             // file.on('error', function(err) { console.log('error in file creation') });
//             // newLeftTwoFFT.forEach(function(v) { file.write(v.join(',')); });
//             // file.end();
            
//             console.log('')

//             for(var i = 0; i<newLeftOneFFT.length; i++){
//                 leftOne[i]=ifft(newLeftOneFFT[i])
//                 rightOne[i]=ifft(newRightOneFFT[i])
//                 console.log('ifft conversion '+ i+ '/'+(newLeftOneFFT.length+newLeftTwoFFT.length))
//             }
//             for(var i = 0; i<newLeftTwoFFT.length; i++){
//                  leftTwo[i]=ifft(newLeftTwoFFT[i])
//                 rightTwo[i]=ifft(newRightTwoFFT[i])
//                 console.log('ifft conversion '+ (newLeftOneFFT.length+i)+ '/'+(newLeftOneFFT.length+newLeftTwoFFT.length))
//             }

//             newLeftOneFFT=null
//             newLeftTwoFFT=null
//             newRightOneFFT=null
//             newRightTwoFFT=null
            
//             var newLeft=[]
//             var newRight=[]

//             for(var i = 0; i<leftOne.length; i++){
//                 for(var j =0; j<binSize; j++){
//                     // console.log('recombine line '+ i+ '/'+(leftOne.length+leftTwo.length)+','+j+'/'+binSize)
//                     // nan(leftOne[i][j][0])
//                     // nan(rightOne[i][j][0])
//                     newLeft.push(leftOne[i][j][0])
//                     newRight.push(rightOne[i][j][0])
//                 }
//                 console.log('recombine 1/2 '+ i+ '/'+(leftOne.length+leftTwo.length))
//             }
//             for(var i = 0; i<leftTwo.length; i++){
//                 for(var j=0; j<binSize; j++){
//                     //console.log('recombine line '+ (i+leftOne.length)+ '/'+(leftOne.length+leftTwo.length)+','+j+'/'+binSize)
//                     var index=(i*binSize)+j+binSize/2
                           
//                     newLeft[index]+=leftTwo[i][j][0]
//                     newRight[index]+=rightTwo[i][j][0]
//                 }
//                 console.log('recombine 2/2 '+ (i+leftOne.length)+ '/'+(leftOne.length+leftTwo.length))
//             }
//             leftOne=null
//             rightOne=null
//             leftTwo=null
//             rightTwo=null
//             // newLeft=newLeft.splice(binSize/2)
//             // newRight=newRight.splice(binSize/2)
//             // newLeft.splice(originalLength)
//             // newRight.splice(originalLength)
//             var max=1.0
//             console.log('normalizing')
//             for (var i =0 ; i<originalLength; i++){
//                 if(Math.abs(newLeft[i])>max){
//                     max=Math.abs(newLeft[i])
//                 }
//                 if(Math.abs(newRight[i])>max){
//                     max=Math.abs(newRight[i])
//                 }
//             }
//             //const finalLeft = new Float32Array(newLeft)
//             //const finalRight= new Float32Array(newRight)
//             //console.log(finalLeft)

//             var finalLeft=[]
//             var finalRight=[]
//             var int16Factor=Math.pow(2,15)-1
//             for (var i =0; i<newLeft.length; i++){ 
//                 finalLeft.push(Math.floor(((newLeft[i]||0)/max)*int16Factor))
//                 finalRight.push(Math.floor(((newRight[i]||0)/max)*int16Factor))
//             }
            
//             newLeft=null
//             newRight=null
//             // left=[]
//             // right=[]
//             // console.log('smoothing')
//             // for (var i =0; i<finalLeft.length; i++){ 
//             //     left[i]=Math.floor((finalLeft[i]))
//             //     right[i]=Math.floor((finalRight[i]))
//             // }
//             console.log('song file writing')
//             // const song = {
//             //     sampleRate:originalSampleRate,
//             //     channelData:[
//             //         finalLeft,
//             //         finalRight
//             //     ]
//             // }
//             // WavEncoder.encode(song).catch((err)=>{
//             //     console.error(err)
//             // }).then((buffer)=>{
//             //     console.log('song writing')
//             //     fs.writeFileSync('master.wav',newBuffer(buffer));
                
//             // })
//             // var file = fs.createWriteStream('leftCheck.txt');
//             // file.on('error', function(err) { console.log('error in file creation') });
//             // finalLeft.forEach(function(v) { file.write(v+'\n'); });
//             // file.end();
//             // var file = fs.createWriteStream('rightCheck.txt');
//             // file.on('error', function(err) { console.log('error in file creation') });
//             // finalRight.forEach(function(v) { file.write(v+'\n'); });
//             // file.end();
//             var wav = new WaveFile();
//             console.log(Number(originalSampleRate))
//             wav.fromScratch(2,44100,'16',[
//                 finalLeft,
//                 finalRight
//                 // left,
//                 // right
//             ])
//             fs.writeFileSync('master.wav',wav.toBuffer())
            


//         }).catch((err)=>{
//             console.error(err)
//         })


        
//     })
//     .catch(error=>{
//         console.error('error in mp3 decoder')
//     })
binSize=64
var leftSlot=new Array(binSize).fill(0)
var rightSlot=new Array(binSize).fill(0)
var midSlot=new Array(binSize).fill(0)

var tempLeft=[]
var tempRight=[]
var left = []
var right = []
var leftFft=new Array(binSize).fill([0,0])
var rightFft=new Array(binSize).fill([0,0])
var leftIfft=new Array(binSize)
var rightIfft=new Array(binSize)
//index=0
var int16Factor=Math.pow(2,15)-1
var masterArray = []
var max=1.0
var amp = 2.0
for (var i=0; i<binSize; i++){
    //masterArray.push(1)
    masterArray.push(1-i/binSize)
}

var pcm=require('pcm') 
pcm.getPcmData('example.mp3',{stereo:true,sampleRate:44100},
    function(sample,channel){
        if(Math.abs(sample)>max){
            max=Math.abs(sample)
        }
        if(channel==0){
            leftSlot=leftSlot.splice(1)
            leftSlot.push(Math.floor(sample*int16Factor))
            //console.log(leftSlot)
            //tempLeft.push(windowing.gaussian(leftSlot.slice()))
            tempLeft.push(leftSlot.slice())
        }
        if(channel==1){
            rightSlot=rightSlot.splice(1)
            rightSlot.push(Math.floor(sample*int16Factor))
            //console.log(rightSlot)
            //tempRight.push(windowing.gaussian(rightSlot.slice()))
            tempRight.push(rightSlot.slice())
        }
    },
    function(err,output){
        for (var i = 0; i<tempLeft.length; i++){
            var leftFft=new Array(binSize).fill([0,0])
            var rightFft=new Array(binSize).fill([0,0])
            //console.log('fft'+i+' / '+tempLeft.length)
            left[i]=0
            right[i]=0
            // tempLeft[i]=Math.floor(tempLeft[i]/max)
            // tempRight[i]=Math.floor(tempRight[i]/max)
            fftInPlace(tempLeft[i])
            fftInPlace(tempRight[i])
            //console.log(tempLeft)
            for (var j=0; j<binSize; j++){
                //console.log(tempLeft[i][j][0])
                leftFft[j][0]=tempLeft[i][j][0]*masterArray[j]*amp
                leftFft[j][1]=tempLeft[i][j][1]

                rightFft[j][0]=tempRight[i][j][0]*masterArray[j]*amp
                rightFft[j][1]=tempRight[i][j][1]
            }
            var leftIfft=ifft(leftFft)
            var rightIfft=ifft(rightFft)
            leftFft=null
            rightFft=null
            console.log('ifft : '+i+' / '+tempLeft.length+' = '+leftIfft[0][0])
            left[i]=leftIfft[0][0]
            right[i]=rightIfft[0][0]
            
            leftIfft=null
            rightIfft=null
        }
        //console.log(output)
        for (var i =0; i<left.length; i++){
            if (left[i] > 32767){
                left[i] = 32767
            }
            if(left[i] < -32768){
                left[i] = -32768
            }
            if (right[i] > 32767){
                right[i] = 32767
            }
            if(right[i] < -32768){
                right[i] = -32768
            }
        }
        var wav = new WaveFile();
            wav.fromScratch(2,44100,'16',[
                left,
                right
        ])
        fs.writeFileSync('newMaster.wav',wav.toBuffer())
        console.log('newMaster.wav created')
        const wavToMp3 = new Lame({
            output:"./master.mp3",
            bitrate:192
        }).setFile('./newMaster.wav')
        wavToMp3.encode()
            .then(()=>{
                console.log('master mp3 produced')
            })
            .catch(error=>{
                console.error(error)
            })
        
    }
    
    
)





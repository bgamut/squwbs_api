import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {View,Text,Dimensions} from 'react-native';
import Fade from 'react-reveal/Fade'
//import helper from './DisqusHelper'
// function waitForGlobal(name, interval = 300) {
//     return new Promise((resolve, reject) => {
//       let waited = 0
//       function wait(interval) {
//         setInterval(() => {
//           waited += interval
//           if (window[name] !== undefined) {
//             return resolve()
//           }
//           if (waited >= interval * 1000) {
//             return reject({ message: 'Timeout' })
//           }
//           wait(interval * 2)
//         }, interval)
//       }
  
//       wait(30)
//     })
//   }
// const waitForGlobal = (name,callback,interval=300)=>{
//     //return new Promise((resolve, reject)=>{
//         var waited = 0
//         console.log('waitForGlobal in disqusComment.js')
//         const waiting = 
//             setTimeout(
//                 function(){
//                     waited+=interval
//                     console.log('waiting in disqusComment.js')
//                     console.log(name+' '+window[name])

//                     if (window[name] !== undefined) {
//                         console.log('window name resolved')
//                         callback()
//                         clearInterval(waiting)
//                         //return resolve()
                        
//                     }
                    
                    
//             }, interval)
        
//         waiting()
        
//     //})  
    
    
  
// }
// const callback = function(){
//     console.log('callback function fired!')
// }

// const test = function(callback,interval=300){
//     var waited = 0   
//     const waiting = function(){
//         setTimeout(
//             function(){
//                 waited+=1
//                 console.log(waited)
//                 if (waited<100) {
                    
//                     //callback()
//                     //clearInterval(waiting)
//                     //return resolve()
//                     waiting()
//                 }
//                 else{
//                     console.log('over, callback needs to fire')
//                     callback()
//                 }
//         }, interval)
//     }
//     waiting()
// }

// const testPromise = function(interval=300){
//     var waited = 0  
//     return new Promise(function(resolve,reject){
//         const waiting = function(){
//             setTimeout(
//                 function(){
//                     waited+=1
//                     console.log(waited)
//                     if (waited<10) {
//                         waiting()
//                     }
//                     else{
//                         console.log('over, callback needs to fire')
//                         Math.random()
//                         console.log(Math.random())
//                         if(Math.random()>0.999){
//                             return resolve()
//                         }
//                         else{
//                             return reject({ message: 'Timeout' })
//                         }
                        
//                     }
//             }, interval)
//         }
//         waiting()
//     })
// }
// testPromise().then(function(){console.log('resolve')}).catch(function(e){console.log(e)})
  
const waitForGlobal = (name,interval=5000)=>{
    var waited = 0  
    return new Promise(function(resolve,reject){
        const waiting = function(){
            setTimeout(
                function(){
                    waited+=1
                    //console.log(waited)
                    if (waited>50) {
                        return reject({message:'Timeout'})
                    }
                    else{
                        if(window[name] !== undefined){
                            console.log(name,' defined from Disqus comment')
                            return resolve()
                        }
                        else{
                            waiting()
                        } 
                    }
            }, interval)
        }
        waiting()
    })
}

class DisqusComment extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state={
            height:Dimensions.get('window').height,
            width:Dimensions.get('window').width,
            loading:true
        }
    }
    codeStringOne = 
    `
    
    var disqus_shortname  = 'gamutcomma',
        disqus_identifier = 'let_me_in',
        disqus_title      = 'rock with you',
        disqus_url = "http://squwbs.com/"+disqus_identifier
        disqus_config     = function(){
            this.language = 'en';
            this.page.title=disqus_title;
            this.page.identifier=disqus_identifier;
            this.page.url=disqus_url
        };


    (function() {
        var dsq = document.createElement('script'); 
        dsq.type = 'text/javascript'; 
        dsq.id = 'disqus'
        dsq.async = true;
        dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();

    `
    codeStringTwo=
    `
    function loadDisqus( identifier, url, title )
    {
        DISQUS.reset({
            reload: true,
            config: function ()
            {
                this.page.identifier = identifier;
                this.page.url        = url;
                this.page.title      = title;
                this.language        = 'en';
            }
        });
    }
    function loadExample(){
        console.log('loadExample fired')
    }
    `
    codeStringThree = `
    var a = document.getElementByID('disqus')
    a.parentNode.removeChild(a)
    `
    onAppend = function(elem,f){
        var observer = new MutationObserver(function(mutations){
            mutations.forEach(function(m){
                if(m.addedNodes.length){
                    f(m.addedNodes)
                }
            })
        })
        observer.observe(elem,{childList:true})
    }
    appendCDN(src){
        return new Promise(function(resolve,reject){
            var script = document.createElement('script')
            script.src = src

            script.addEventListener('load',function(){
                
                resolve()
            },false)
            script.addEventListener('error',function(e){
                reject(e)
            },false)
            document.head.appendChild(script)
        })
    }
    appendScript(codeString){
        var onAppend = function(elem,f){
            var observer = new MutationObserver(function(mutations){
                mutations.forEach(function(m){
                    if(m.addedNodes.length){
                        f(m.addedNodes)
                    }
                })
            })
            observer.observe(elem,{childList:true})
        }
        return new Promise(function(resolve,reject){
            var script = document.createElement('script')
            script.text = codeString
            script.addEventListener('load',function(e){
                console.log('loaded')
                resolve()
            })
            script.addEventListener('error',function(e){
                console.log('rejected')
                reject(e)
            })
            onAppend(document.head,function(added){
                if(added[0].innerHTML==codeString){
                    console.log('appendScript resolved')
                    resolve()
                }
                //console.log('added:',added[0].innerHTML)
            })
            document.head.appendChild(script)

        })
    }
    componentWillMount() {

    }
    updateDimensions(){
        //console.log("disquscomment resize")
        this.setState({
            height:Math.floor(Dimensions.get('window').height),
            width:Math.floor(Dimensions.get('window').width),
            //loading:false
        })      
        this.forceUpdate()
        // waitForGlobal('loadDisqus')
        //     .then(()=>{
        //         console.log('loadDisqus() Loaded')
        //         var disqus_shortname  = 'gamutcomma'
        //         var disqus_identifier = 'default'
        //         var disqus_title      = 'I Heart Chocolate'
        //         var disqus_url = "http://squwbs.com/"+disqus_identifier
        //         var disqus_config = function(){
        //             this.language = 'en';
        //             this.page.title=disqus_title;
        //             this.page.identifier=disqus_identifier;
        //             this.page.url=disqus_url
        //         };
        //         console.log('loadDisqus firing')
        //         window.loadDisqus(disqus_config,disqus_url,disqus_title)
        //         console.log('loadDisqus fired')
        //     })
        //     .catch((e)=>{
        //         console.log(e)
        //     })
        
        // var a = document.getElementById('disqus_thread')
        // a.parentNode.removeChild(a)
       

    }
    componentDidMount() {
        //const node = ReactDOM.findDOMNode(this)
        Dimensions.addEventListener('change',(e)=>{
            this.updateDimensions()
          })
        this.updateDimensions()
        // ReactDOM.render(
        // <div id="disqus_thread"
        //     style={{
        //         // height:this.props.height,
        //         // width:this.props.width,
        //         height:this.state.height-50,
        //         width:this.state.width-30,
        //         backgroundColor:'transparent'
        //     }}
        // ></div>,document.getElementById('disqusComment'))
        //console.log('helper string',helper.toString())
        // this.appendScript(this.codeStringOne)
        // .then(()=>{
        //     waitForGlobal('DISQUS',)
        //     .then(()=>{
        //         console.log("DISQUS LOADED")
        //         //this.appendScript(this.codeStringTwo)
        //         waitForGlobal('loadDisqus')
        //         .then(()=>{
        //             var disqus_shortname  = 'gamutcomma'
        //             var disqus_identifier = 'default'
        //             var disqus_title      = 'I Heart Chocolate'
        //             var disqus_url = "http://squwbs.com/"+disqus_identifier
        //             var disqus_config = function(){
        //                 this.language = 'en';
        //                 this.page.title=disqus_title;
        //                 this.page.identifier=disqus_identifier;
        //                 this.page.url=disqus_url
        //             };
        //             console.log('loadDisqus firing')
        //             //setTimeout(()=>{})
        //             window.loadDisqus(disqus_config,disqus_url,disqus_title)
        //             //window.loadExample()
        //             // var a = document.getElementById('disqus')
        //             // a.parentNode.removeChild(a)
        //             // var dsq = document.createElement('script'); 
        //             // dsq.type = 'text/javascript'; 
        //             // dsq.id = 'disqus'
        //             // dsq.async = false;
        //             // dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
        //             // (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        
        //             console.log('loadDisqus fired')
        //         })
        //         .catch((e)=>{
        //             console.log(e)
        //         })
        //     // })
        //     // .catch((e)=>{
        //     //     console.log(e)
        //     // })
       
        // })
        
        // .catch((e)=>{
        //     console.log('disquscomment error ',e)
        // })

        // waitForGlobal('DISQUS',()=>{
        //     console.log("DISQUS LOADED")
        waitForGlobal('loadDisqus')
            .then(()=>{
                
                console.log('loadDisqus() Loaded')
                //var spinner =document.getElementById('spinner')
                //spinner.parentNode.removeChild(spinner)
                this.setState({loading:false})
                //this.myRef.current.props.style.display='none'
                //this.myRef.current.props.style.visibility='hidden'
                //console.log(this.myRef.current.props.style.display)
                //console.log(this.myRef.current.props.style.visibility)
                var disqus_shortname  = 'gamutcomma'
                var disqus_identifier = 'default'
                var disqus_title      = 'I Heart Chocolate'
                var disqus_url = "http://squwbs.com/"+disqus_identifier
                var disqus_config = function(){
                    this.language = 'en';
                    this.page.title=disqus_title;
                    this.page.identifier=disqus_identifier;
                    this.page.url=disqus_url
                };
                console.log('loadDisqus firing')
                window.loadDisqus(disqus_config,disqus_url,disqus_title)
                console.log('loadDisqus fired')
            })
            .catch((e)=>{
                console.log(e)
            })
        // })

                
       
        
        
       
        // var disqus_shortname  = 'gamutcomma'
        //     var disqus_identifier = 'default'
        //     var disqus_title      = 'I Heart Chocolate'
        //     var disqus_url = "http://squwbs.com/"+disqus_identifier
        //     var disqus_config = function(){
        //         this.language = 'en';
        //         this.page.title=disqus_title;
        //         this.page.identifier=disqus_identifier;
        //         this.page.url=disqus_url
        //     };

        //     //window.loadDisqus(disqus_config,disqus_url,disqus_title)
        //     var a = document.getElementById('disqus')
        //     a.parentNode.removeChild(a)
        //     var dsq = document.createElement('script'); 
        //     dsq.type = 'text/javascript'; 
        //     dsq.id = 'disqus'
        //     dsq.async = false;
        //     dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
        //     (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    }

    componentWillReceiveProps(nextProps) {
        this.updateDimensions()
    }

    

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        if(this.state.loading==true){
        return (
            <View
                style={{
                    // height:'100%',
                    // width:'100%',
                    height:this.props.height,
                    width:this.props.width,
                    backgroundColor:'transparent'
                }}
            >
                <div 
                    id="disqusComment"
                    style={{
                        //height:'100%',
                        //width:'100%',
                        height:this.props.height,
                        width:this.props.width,
                        backgroundColor:'transparent'
                    }}
                >
                    <div id="disqus_thread"
                        style={{
                            // height:this.props.height,
                            // width:this.props.width,
                            height:this.props.height,
                            width:this.props.width,
                            backgroundColor:'transparent'
                        }}
                    >
                       
                        <View
                            //id='spinner'
                            ref={this.myRef}
                            style={{
                                height:'100%',
                                width:'100%',
                                backgroundColor:'transparent',
                                alignItems:'center',
                                //justifyContent:'center'
                            }}
                        >
                            <View
                                style={{
                                    height:120,
                                    width:120,
                                    backgroundColor:'transparent',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    flexDirection:'column',
                                    transform:[{
                                        translateX:0,
                                      },
                                      {
                                       // translateY:-55,
                                        //translateY:-30
                                        translateY:-3
                                      }
                                    ]
                                }}
                            >
                            <Fade>
                                <Text
                                    style ={{
                                        textDecorationLine:'none',
                                        color:'rgb(196,196,196)',
                                        fontSize: 55,
                                        fontWeight:'700',
                                        textAlign:'center',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        flexDirection:'row',
                                    }}
                                >
                                    <i class="fas fa-spinner fa-pulse"></i>
                                </Text>
                            </Fade>
                                {/* <Text
                                    style ={{
                                        textDecorationLine:'none',
                                        color:'rgb(196,196,196)',
                                        fontSize: 12,
                                        fontWeight:'700',
                                        textAlign:'center',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        flexDirection:'row',
                                    }}
                                >
                                    Loading ...
                                </Text> */}
                            </View>
                        </View>
                        
                    </div>
                </div>
            </View>
        )
    }
    else if (this.state.loading==false){
        return(
            <View
            style={{
                // height:'100%',
                // width:'100%',
                height:this.props.height,
                width:this.props.width,
                backgroundColor:'transparent',
                padding:0,
            }}
        >
            <div 
                id="disqusComment"
                style={{
                    //height:'100%',
                    //width:'100%',
                    height:this.props.height,
                    width:this.props.width,
                    backgroundColor:'transparent',
                    padding:0,
                }}
            >
                <div id="disqus_thread"
                    style={{
                        // height:this.props.height,
                        // width:this.props.width,
                        height:this.props.height,
                        width:this.props.width,
                        backgroundColor:'transparent',
                        padding:0
                    }}
                >
                   
                    
                </div>
            </div>
        </View>
        )
    }
    else{
        return(
            <View
            style={{
                // height:'100%',
                // width:'100%',
                height:this.props.height,
                width:this.props.width,
                backgroundColor:'transparent',
                padding:0,
            }}
        >
            <div 
                id="disqusComment"
                style={{
                    //height:'100%',
                    //width:'100%',
                    height:this.props.height,
                    width:this.props.width,
                    backgroundColor:'transparent',
                    padding:0
                }}
            >
                <div id="disqus_thread"
                    style={{
                        // height:this.props.height,
                        // width:this.props.width,
                        height:this.props.height,
                        width:this.props.width,
                        backgroundColor:'transparent',
                        padding:0
                    }}
                >
                   
                    
                </div>
            </div>
        </View>
        )
    }
    }
}

DisqusComment.propTypes = {

};

export default DisqusComment;
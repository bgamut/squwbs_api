//import React, {memo} from 'react'
import React,{Component,useContext,useState,useEffect,memo,useRef} from 'react';
import {Animated,TouchableOpacity,TouchableHighlight,PanResponder,Text,View,KeyboardAvoidingView,ScrollView,Dimensions,StyleSheet,Image} from 'react-native'
import HorizontalSwipeElements from './HorizontalSwipeElements'
import SwipeableList from './SwipeableList'
import SwipeableScroller from './SwipeableScroller'
import WordDeckWrapper from './WordDeckWrapper'
import Swiper from './Swiper'
import AddPost from './AddPost'
import Header from './Header'
import Drawer from './Drawer'
import FileDrop from './FileDrop'
import {Context} from '../context'
//import xIcon from './icons/X.png'
import Fade from 'react-reveal/Fade'
import FirebaseLoginGoogle from './FirebaseLoginGoogle'
import FirebaseLoginFacebook from './FirebaseLoginFacebook'
import './css/x.css'
import './css/Fade.css'
import './css/terms.css'
//import AdSense from 'react-adsense';
// import UploadWords from './UploadWords'
// import SplitScreenV2 from './SplitScreenV2'
// import ReadPDF from './ReadPDF'

import {Rnd} from 'react-rnd'
import { InboxStream, CommentStream, SubmissionStream } from "snoostorm";
import Snoowrap from "snoowrap";
import Disqus from 'disqus-react'
import DisqusComment from './DisqusComment'

// import FadeInOut from 'react-native-fade-in-out';

const withQuery = require('with-query').default


var diff = require('object-diff')
const _ = require('lodash')
const stringifyObject= require('stringify-object')

const uuidv4= require('uuid/v4')

const client = new Snoowrap({
  userAgent:'reddit-bot',
  clientId:'CiO2G81f6z7yWw',
  clientSecret:'MhzcwrwmIKbol9B882rf6j8Zlww',
  username:'squwbs',
  password:'90-=op[]'
})

// var disqusConfig={
//   url:'https://squwbs.com',
//   title:'temporary title',
//   identifier:uuidv4()
// }

// //const comments= client.CommentStream(streamOpts)
// const comments = new CommentStream(client, { subreddit: "tipofmytongue", limit: 1, pollTime: 20000 });
// comments.on('item',(comment)=>console.log('this is the comment from reddit : ',comment))
// comments.on('item',(comment)=>console.log('this is the link from reddit : ',comment.link_permalink))

// const submissions = new SubmissionStream(client, { subreddit: "tipofmytongue", limit: 1, pollTime: 20000 });
// submissions.on('item',(comment)=>console.log('this is the submission link from reddit : ',comment.link_permalink))

client.getSubreddit('tipofmytongue').getControversial({time:'all'}).then(stuff=>{
  console.log("this is from reddit.js main title" ,stuff[0].title);
  console.log("this is from reddit.js main text" ,stuff[0].selftext); 
  stuff[0].comments.fetchAll().then(commentsObject=>{
    for(var i =0; i<commentsObject.length; i++){
      console.log('This is comment #'+i+" : "+commentsObject[i].body+" written by "+commentsObject[i].author.name)
    }
  })
})

// var Disqus = require ('disqus')
// var disqus=null
// //fetch('https://disqus.com/api/oauth/2.0/access_token')
// fetch('https://squwbs-252702.appspot.com/disqus')
//   .then(result=>{
//       //console.log('disqus fetch')
//       return result.json()
//     })
//     .then((json)=>{
     
//       console.log('disqus fetch',stringifyObject(json))
//       return json
//       disqus = new Disqus({
//         api_secret:'THJJ2cdl2UTy4D6IvXuUKoaTw5wooaXie0ADcaQkxmlozTiWBywOOdotYshKfzqr',
//         api_key:'SNc2gCWRSwgpqhl2n0usNBCfRl6mwCye0tfC1aFNkR539djIUEgsUgYrXfXeLqLF',
//         access_token:json
//       })
//     })
//     .catch((err)=>{
//       console.error(err)
//     })




// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// const firebase = require('firebase')
// firebase.initializeApp(
//   {
//     messagingSenderId:'404719977912'
//     ,apiKey:'AIzaSyA9VVBgegATYGan6PGuvCjsuG0JL2OIX14'
//     ,authDomain:'assistant-569a2.firebaseapp.com'
//     ,databaseURL:'https://assistant-569a2.firebaseio.com'
//     ,projectId:'assistant-569a2'
//     ,storageBucket:'assistant-569a2.appspot.com'
//     ,appId:'1:404719977912:web:04d0a42a3242d6c2'
//   }
// )

const addUserToServer = (obj)=>{
  
  console.log('user add function entered')
  fetch(withQuery('https://squwbs-252702.appspot.com/user', {
    ...obj,
    mode:'cors'
  }))
  .then(result=>{
      console.log('got result from user fetch')
      return result.json()
    })
    .then((json)=>{
      //setState({...state,userData:{...json}})
      
      console.log(stringifyObject(json))
      return json
    })
    .catch((err)=>{
      console.error(err)
    })
}

const Home = () => {
  //run()
  const [state,setState]=useContext(Context)
  const [user,setUser]=useState({})
  const [loginOverlaySwitch,setLoginOverlaySwitch]=useState(false)
  const [termsOverlaySwitch,setTermsOverlaySwitch]=useState(false)
  const [slackHashOverlaySwitch,setSlackHashOverlaySwitch]=useState(false)
  const [commentOverlaySwitch,setCommentOverlaySwitch]=useState(false)
  const [shareOverlaySwitch,setShareOverlaySwitch]=useState(false)
  const [starOverlaySwitch,setStarOverlaySwitch]=useState(false)
  const [disqusConfigTitle,setDisqusConfigTitle]=useState('othertitle')
  const [disqusConfigIdentifier,setDisqusConfigIdentifier]=useState('')
  const [fade, setFade] =useState('true')
  const [height,setHeight]=useState(0)
  const [width,setWidth]=useState(0)
  const [headerOpenState,setHeaderOpenState]=useState(true)
  const [starRating, setStarRating]=useState(0)
  const [shineOne, setShineOne]=useState(0.3)
  const [shineTwo, setShineTwo]=useState(0.3)
  const [shineThree, setShineThree]=useState(0.3)
  const [shineFour, setShineFour]=useState(0.3)
  const [shineFive, setShineFive]=useState(0.3)
  const [slackHashTextValue,setSlackHashTextValue]=useState('')
  const [disqusComments,setDisqusComments]=useState([])
  const loginOverlay=useRef('')
  const termsOverlay=useRef('')
  const starOne = useRef('')
  const starTwo = useRef('')
  const starThree = useRef('')
  const starFour = useRef('')
  const starFive = useRef('')
  const slackHashInputRef = useRef(null)
  const slackHashTextRef = useRef('')
  
  const duration=270


  var animatedOpacity = new Animated.Value(0)
  var animatedHeader = new Animated.Value(0)
  var interpolatedHeader = animatedHeader.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50],
  })
  const loginOverlayToggle=()=>{
    //console.log('popLogin from HOME')
    //console.log(overlay.current.props.style.zIndex)
    // if(overlay.current.props.style.zIndex==100){
    //     overlay.current.props.style.zIndex=1
    //     overlay.current.props.style.display='none'
    //     setOverlaySwitch(false)
    //     console.log('block to none')
    // }
    // else{
    //     overlay.current.props.style.zIndex=100
    //     overlay.current.props.style.display='block'
    //     setOverlaySwitch(true)
    //     console.log('none to block')
    // }
    if(loginOverlaySwitch==false){
      setLoginOverlaySwitch(true)
      //setOverlayClassName('fadein')
      
      setFade(true)
      // if(overlay.current!=null){
      //   if(overlay.current.props!=undefined){
      //     //overlay.current.props.style.opacity=value
          
      //     overlay.current.props.className='fadein'
      //     console.log(overlay.current.props.className)
      //     //console.log(overlay.current.props.style.opacity)
      //   }
        
      // }
    }
    else{
      //setOverlayClassName('fadeout')
      setFade(false)
      //console.log('waiting')
      setTimeout(function() {
        //console.log('waited '+ duration+' milliseconds');
        setLoginOverlaySwitch(false)
      }, duration);
      
      
      // if(overlay.current!=null){
      //   if(overlay.current.props!=undefined){
      //     //overlay.current.props.style.opacity=value
          
      //     overlay.current.props.className='fadeout'
      //     console.log(overlay.current.props.className)
      //     //console.log(overlay.current.props.style.opacity)
      //   }
        
      // }
    }
    
  }
  const termsOverlayToggle=()=>{
    if(loginOverlaySwitch==false){
      setTermsOverlaySwitch(true)
      setFade(true)
    }
    else{
      setFade(false)
      setTimeout(function() {
        setTermsOverlaySwitch(false)
      }, duration);
    }  
  }

  const createDisqusComments = () =>{
   
    let parent = []
    
    //var random_title=['kanye','beats','new']
    // var title=random_title[Math.floor(Math.random() * 3)]
    // var identifier=uuidv4()
    // const disqusConfig={
    //   url:'https://squwbs.com',
    //   title:title,
    //   identifier:identifier
    // }
    const disqusConfig={
      url:'https://squwbs.com',
      title:'squwbs',
      identifer:uuidv4()
    }
    parent.push(
      <Disqus.DiscussionEmbed shortname={'squwbs'} config={disqusConfig} />
      //<Disqus.DiscussionEmbed shortname={'squwbs'} url={'https://squwbs.com'} title={disqusConfigTitle} identifier={disqusConfigIdentifier}/>
    )
      
    
    return parent;
}

  const commentOverlayToggle=()=>{
    console.log('home.js : disqus toggled!')
    if(commentOverlaySwitch==false){

      setCommentOverlaySwitch(true)
      setFade(true)

    }
    else{
      setFade(false)
      setTimeout(function() {
        setCommentOverlaySwitch(false)
      }, duration);
    }  
  }

  const slackHashOverlayToggle=()=>{
    console.log('home.js : slackHash toggled!')
    if(slackHashOverlaySwitch==false){
      setSlackHashOverlaySwitch(true)
      setFade(true)
      
    }
    else{
      setFade(false)
      setTimeout(function() {
        setSlackHashOverlaySwitch(false)
      }, duration);
    }  
  }

  const handleSlackHashKeyPress=(e)=>{
    console.log(e.key)
    if(e.shiftKey){
        if(e.keyCode==13){
            e.preventDefault();
            console.log('prev page load function goes here')
        }
        else if(e.keyCode==39){
            e.preventDefault();
            console.log('next page load function goes here')
        }
        else if(e.keyCode==37){
            e.preventDefault();
            console.log('previous page load function goes here')
        }
        console.log(e.key)
        console.log(e.button)
    }
    //this.setState({value:e.target.value})
    setSlackHashTextValue(e.target.value)
    
    console.log(slackHashInputRef.current.value)
    console.log(slackHashInputRef.current)
    console.log(e.key)
}
  const handleSlackHashChange=(e)=>{

      setSlackHashTextValue(e.target.value)
     
  }

  const shareOverlayToggle=()=>{
    console.log('home.js : share toggled!')
    if(shareOverlaySwitch==false){
      setShareOverlaySwitch(true)
      setFade(true)
    }
    else{
      setFade(false)
      setTimeout(function() {
        setShareOverlaySwitch(false)
      }, duration);
    }  
  }
  const starOverlayToggle=()=>{
    console.log('home.js : star toggled!')
    if(starOverlaySwitch==false){
      setStarOverlaySwitch(true)
      setFade(true)
    }
    else{
      setFade(false)
      setTimeout(function() {
        setStarOverlaySwitch(false)
      }, duration);
    }  
  }
  const overlayOff=()=>{


      setLoginOverlaySwitch(false)
      setTermsOverlaySwitch(false)
    
  }
  const getUserData=async()=>{
    const responded= await fetch('https://squwbs-252702.appspot.com/readCookies',{mode:'cors'})
    const userCookie = await responded.json()
    console.log('userCookie : '+stringifyObject(userCookie))
    if(Object.keys(userCookie).length>1){
      console.log('user info sent to server')
      fetch(withQuery('https://squwbs-252702.appspot.com/user', {
        ...userCookie,
        mode:'cors'
      }))
      .then(result=>{
          console.log('got result from user fetch')
          return result.json()
        })
        .then((json)=>{
          setState({...state,userData:json.message})
          
          console.log(stringifyObject(json))
          setUser(json)
        })
        .catch((err)=>{
          console.error(err)
        })
      
    }
    
  }
  const updateDimensions=()=>{
    setHeight(Math.floor(Dimensions.get('window').height))
    setWidth(Math.floor(Dimensions.get('window').width))
    //style.height=Math.floor(Dimensions.get('window').height)
    //console.log('dimensions update')
    
  }
  useEffect(()=>{

    
    // const messaging = firebase.messaging()
    // const firebaseTokenReceived =(message)=> {
    //   console.log('firebasetoken event fired')
    //   // fetch('https://squwbs-252702.appspot.com/register',{
    //   //     method:'post',
    //   //     headers:{
    //   //       'Content-type': 'application/json'
    //   //     },
    //   //     body: JSON.stringify({
    //   //       token:message
    //   //     })
    //   //     // body:{
    //   //     //   token:message
    //   //     // }
    //   //   })
    //   //   .then((result)=>{
    //   //     console.log('register result initFirebase 38 : ',result)
    //   //       return result.json()
    //   //   })
    //   //   .then((json)=>{
    //   //       console.log('initFirebase.js 32 register list : ',stringifyObject(json))
    //   //       var url ="https://squwbs-252702.appspot.com/sendfcmall"
    //   //   })
    //   //   .catch((err)=>{
    //   //       console.log('initFirebase.js 41 register error : ',err)
            
    //   //   })
    //   //   var url ="https://squwbs-252702.appspot.com/sendfcmall"
    //   //   var headers = {
    //   //       "Content-Type": "application/json",
            
    //   //   }
    //   //   var body ={
    //   //       //"to": String(token),
    //   //       "collapse_key":"do_not_collapse",
    //   //       "notification": {
    //   //           "title":"Welcome",
    //   //           "body":"this is fired via sendfcmall",
    //   //           // "click_action": "http://localhost:3000/",
    //   //           // "icon":"https://squwbs.com/favicon.ico"
    //   //       },
            
    //   //   }
    //   //   fetch(url,{
    //   //       method:"POST",
    //   //       headers:headers,
    //   //       body:JSON.stringify(body)
    //   //     }).then((res)=>{
    //   //       console.log(res)
    //   //     }).catch((err)=>{
    //   //         console.log(err)
    //   //     })
    //   window.firebaseToken=message
    //   return(
    //     new CustomEvent(
    //       "firebaseTokenReceived", 
    //       {
    //         detail: {
    //           message: message,
    //           time: new Date(),
    //         },
    //         bubbles: true,
    //         cancelable: true
    //       }
    //     )
    //   )
    // }
    
    //getUserData()
    Dimensions.addEventListener('change',(e)=>{
      updateDimensions()
    })
    updateDimensions()
    var a = navigator.userAgent.toLowerCase()
    var isDesktop = !(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substring(0,4)));
    if(isDesktop=true){
      //document.location.href="https://bgamut.github.io/desktop/"
      //document.location.href="https://squwbs-252702.appspot.com/"
      console.log('this is a desktop environment')
    }
    // window.addEventListener('firebaseTokenReceived',function(e){
    //   alert('token:'+e.detail.message)
    // })
    // const askForPermissioToReceiveNotifications = async () => {
    //   console.log('asking for permission')
    //   try {
    //       //const messaging = firebase.messaging();
    //       //await messaging.requestPermission();
    //       // const token = await messaging.getToken();
          
    //       // firebaseTokenReceived(token)
          
    //       // console.log('token do usuário:', token);
        
    //       // return token;
    //       messaging.requestPermission()
    //       .then((token)=>{
    //         console.log('token do usuário:', token);
    //       })
    //       .catch((err)=>{
    //         console.log('error in getting permission' , err)
    //       })
    //     }
    //     catch (error) {
    //       console.log('permission error',error);
    //       setTimeout(askForPermissioToReceiveNotifications(),3000)
    //     }
    // }
    // askForPermissioToReceiveNotifications()
  },[])
  useEffect(()=>{
    if(slackHashInputRef.current!=null){
      slackHashInputRef.current.focus()
    }
    
  },[slackHashOverlaySwitch])
  useEffect(()=>{
    //console.log(stringifyObject(user)=='{}')
    //console.log(user)
    //console.log('fade changed')
  },[fade])
  // useEffect(()=>{
  //   console.log('context changed! headerOpen = ',state.headerOpen)
  //   if(state.headerOpen==false){
  //     //"close" (translate) the header
      
  //   }
  //   else{
  //     //"open"  the header
  //   }

  // },[...Object.values(state)])
  
  useEffect(()=>{
    if(starRating==1){
      setShineOne(1)
      setShineTwo(0.3)
      setShineThree(0.3)
      setShineFour(0.3)
      setShineFive(0.3)
    }
    else if(starRating==2){
      setShineOne(1)
      setShineTwo(1)
      setShineThree(0.3)
      setShineFour(0.3)
      setShineFive(0.3)
    }
    else if(starRating==3){
      setShineOne(1)
      setShineTwo(1)
      setShineThree(1)
      setShineFour(0.3)
      setShineFive(0.3)
    }
    else if(starRating==4){
      setShineOne(1)
      setShineTwo(1)
      setShineThree(1)
      setShineFour(1)
      setShineFive(0.3)
    }
    else if(starRating==5){
      setShineOne(1)
      setShineTwo(1)
      setShineThree(1)
      setShineFour(1)
      setShineFive(1)
    }
  },[starRating])
  const headerOpen=(booleanValue)=>{
    
    setHeaderOpenState(booleanValue)
    

  }
  useEffect(()=>{
    //console.log("header Open has been toggled to ", headerOpenState)
    // if(headerOpenState==true)
    //     {
          
    //         Animated.timing(
    //             //this.Animation,
    //             animatedHeader,
    //             {
    //                 duration:7,
    //                 toValue:0,
    //             }
    //         ).start(()=>
    //         {
    //             setState({...state,headerOpen:true})
                
    //         })
    //     }
    //     else
    //     {
    //         Animated.timing(
    //             animatedHeader,
    //             {
    //                 duration:7,
    //                 toValue:-50, 
    //             }
    //         ).start(()=>
    //         {
    //             setState({...state,headerOpen:false})
    //         })
    //     }
  },[headerOpenState])
  // useEffect(()=>{
  //   if(state.userData!==undefined){
  //     overlayOff()
  //   }
  // },[...Object.values(state)])

  // animatedHeader.addListener(({value})=>{
  //   console.log(
  //   'animated header value is ', value
  //   )
  // })
  animatedOpacity.addListener(({value})=>{
    //console.log(value)
    // if(overlay.current!=null){
    //   if(overlay.current.props!=undefined){
    //     //overlay.current.props.style.opacity=value
        
    //     overlay.current.props.style.backgroundColor='rgba(0,0,0,'+value+')'
    //     console.log(overlay.current.props.style.backgroundColor)
    //     //console.log(overlay.current.props.style.opacity)
    //   }
      
    // }
    
    //overlay.current.props.style.opacity=value
    //console.log(state.yscroll)
    //global.headerHeight=value
    //console.log(value)
})
  // useEffect(()=>{
  //   //getUserData()
  //   //console.log('what')
  //   console.log(overlay.current)
  // },[overlayClassName])
  const onMouseEnterStarOne = ()=>{
    console.log('start one')
    
    // starOne.current.props.style.opacity=1
    // starTwo.current.props.style.opacity=0.8
    // starThree.current.props.style.opacity=0.8
    // starFour.current.props.style.opacity=0.8
    // starFive.current.props.style.opacity=0.8

    setStarRating(1)
  }
  const onMouseEnterStarTwo = ()=>{
    console.log('start two')
    setStarRating(2)
    // starOne.current.props.style.opacity=1
    // starTwo.current.props.style.opacity=1
    // starThree.current.props.style.opacity=0.8
    // starFour.current.props.style.opacity=0.8
    // starFive.current.props.style.opacity=0.8
  }
  const onMouseEnterStarThree = ()=>{
    console.log('start three')
    setStarRating(3)
    // starOne.current.props.style.opacity=1
    // starTwo.current.props.style.opacity=1
    // starThree.current.props.style.opacity=1
    // starFour.current.props.style.opacity=0.8
    // starFive.current.props.style.opacity=0.8
  }
  const onMouseEnterStarFour = ()=>{
    console.log('start four')
    setStarRating(4)
    // starOne.current.props.style.opacity=1
    // starTwo.current.props.style.opacity=1
    // starThree.current.props.style.opacity=1
    // starFour.current.props.style.opacity=1
    // starFive.current.props.style.opacity=0.8
  }
  const onMouseEnterStarFive = ()=>{
    console.log('start five')
    setStarRating(5)
    // starOne.current.props.style.opacity=1
    // starTwo.current.props.style.opacity=1
    // starThree.current.props.style.opacity=1
    // starFour.current.props.style.opacity=1
    // starFive.current.props.style.opacity=1
  }
  const onPressStar=()=>{
    console.log('pressed star')
    starOverlayToggle()
  }
    const longpress=()=>{
      alert('longpress')
    }
    return(

 
      <View style={{height:height}}>
        {/* <div
          ref={overlay}
          className=
          'invisible'
        > */}
        {commentOverlaySwitch && 
         
            <View
            
            // className={overlayClassName}
            style={{
                position:'fixed',
                height:height,
                width:'100%',
                top:0,
                left:0,
                //backgroundColor:'rgba(0,0,0,0.4)',
                //
                justifyContent:'center',
                alignItems:'center',
                zIndex:100,
                //opacity:0,
                //display:'block',
            }}
          > 
          <Fade
          duration={duration}
          timeout={duration}
          >
          <Fade
            style={{
              //backgroundColor:'orange',
              height:height,
              width:'100vw',
            }}
            when={fade}
            duration={duration}
            timeout={duration}
          >
            <View
            style={{
                
                height:height,
                width:'100vw',
                //opacity:0.4,
                //backgroundColor:'orange',
                backgroundColor:'rgba(0,0,0,0.8)',
                //backgroundImage:'',
                //justifyContent:'center',
                //alignItems:'center',
                //textAlign:'center'
            }}>
              <View
                style={{
                  height:50
                }}
              >
                <TouchableOpacity
                  style={{
                      position:'fixed',
                      height:16,
                      width:16,
                      top:26,
                      right:21,
                      //backgroundColor:'white',
                      zIndex:101
                  }}
                  onPress={
                      commentOverlayToggle
                      //overlayOff
                  }
                  activeOpacity={1}
              >
                <div
                  className='x'
                >
          
                </div>
                
              </TouchableOpacity>
              <View
                style={{
                  position:'fixed',
                  height:height-50,
                  width:width-30,
                  top:50,
                  right:15,
                  //backgroundColor:'white',
                  zIndex:100,
                  padding:0
              }}
              >
                {/* <Disqus.CommentCount shortname={'squwbs'} config={disqusConfig}>
                    Comments
                </Disqus.CommentCount> */}
                {/* <Disqus.CommentEmbed 
                    commentId={this.props.article.featuredComment}
                    showMedia={true}
                    height={160}
                /> */}
                <View>
                <ScrollView
                    // ref={ref=>this.myRef=ref}
                    style={{
                        // display:'absolute',f
                        // left:0,
                        position:'fixed',
                        top:50,
                        left:0,
                        height:height-50,
                        width:width,
                        //backgroundColor:'black',
                        backgroundColor:'rgb(0,0,0,0.99)',
                        margin:0,
                        flexDirection:'row',
                        paddingLeft:15,
                        paddingRight:15,
                        zIndex:100,
                        // paddingBottom:15,
                        // paddingRight:15,
                    }}
          
                    horizontal={false}
                
                    showsHorizontalScrollIndicator={true}
                    snapeToAlignment='end'
                    decelerationRate="fast"
                >
                  {/* <Disqus.DiscussionEmbed shortname={'squwbs'} config={disqusConfig} /> */}
                  {/* <Disqus.DiscussionEmbed shortname={'squwbs'} config={{
                    url:'https://squwbs.com',
                    title:'another title'
                  }} /> */}
                  {/* {createDisqusComments()} */}
                  {/* {disqusComments} */}
                  <DisqusComment 
                    height={height-50} 
                    width={width-30}
                  />
                </ScrollView>
                </View>
              </View>
            </View>
          </View>
        </Fade> 
        </Fade>
        </View>
        
        
        }  
        {slackHashOverlaySwitch && 
          
          <View
          
            // className={overlayClassName}
            style={{
                position:'fixed',
                height:height,
                width:'100%',
                top:0,
                left:0,
                //backgroundColor:'rgba(0,0,0,0.4)',
                //
                justifyContent:'center',
                alignItems:'center',
                zIndex:100,
                //opacity:0,
                //display:'block',
            }}
          >
          <Fade
          duration={duration}
          timeout={duration}
          >
          <Fade
            style={{
              //backgroundColor:'orange',
              height:height,
              width:'100vw',
            }}
            when={fade}
            duration={duration}
            timeout={duration}
          >
            <View
            style={{
                
                height:height,
                width:'100vw',
                //opacity:0.4,
                //backgroundColor:'orange',
                backgroundColor:'rgba(0,0,0,0.8)',
                //backgroundImage:'',
                justifyContent:'center',
                alignItems:'center',
                //textAlign:'center'
            }}>

              <View
                style={{
                  height:"100%",
                  width:"100%"
                }}
              >
              
                <TouchableOpacity
                style={{
                    position:'fixed',
                    height:16,
                    width:16,
                    top:26,
                    right:21,
                    //backgroundColor:'white',
                    zIndex:101
                }}
                onPress={
                    slackHashOverlayToggle
                    //overlayOff
                }
                activeOpacity={1}
            >
                <div
                  className='x'
                >
          
                </div>
                
            </TouchableOpacity>
            <View 
                        //id = 'place-holder2' 
                        style={{
                            height:'100%',
                            width:'100%',
                            // paddingTop:2,
                            // paddingBottom:2,
                            // paddingLeft:2,
                            // paddingRight:2,
                            //backgroundColor:'yellow'
                        }}
                     >
                    <View
                      style={{
                        
                        height:52,
                        width:'100%',
                        //backgroundColor:'purple'
                        alignItems:'center',
                        justifyContent:'center'
                      }}
                    >
                    <View
                    style={{
                      
                      height:52,
                      width:width-100,
                      //backgroundColor:'purple'
                      alignItems:'center',
                      justifyContent:'center'
                    }}
                    >
                      <Text
                      style={{
                        fontSize: 12,
                        fontWeight:'700',
                        textDecorationLine:'none',
                        color:'rgb(196,196,196)',
                        boxSizing:'borderBox',
                        textAlign:'center',
                        alignItems:'center',
                        justifyContent:'center',
                        flexDirection:'row',
                        margin:5,
                      }}
                      >
                        WRITE ANYTHING THAT DESCRIBES THE POST
                      </Text>
                    </View>
                  </View>
                        <textarea type='text' spellCheck="false" 
                            ref={slackHashInputRef}
                            value={slackHashTextValue}
                            autoFocus={true}
                            style={{
                                
                                height:height-52,
                                width:width-30,
                                //height:height-20,
                                //width:width-20,
                                //fontSize:13,
                                lineHeight:'2em',
                                // paddingTop:55,
                                // paddingLeft: 55,
                                paddingRight: 45,
                                // paddingBottom:55,
                                marginLeft:15,
                                marginRight:0,
                                //marginTop:50,
                                marginTop:15,
                                marginBottom:15,
                                // borderLeftWidth:1,
                                borderLeftColor:'transparent',
                                borderRightColor:'transparent',
                                borderBottomColor:'transparent',
                                borderTopColor:'transparent',
                                backgroundColor:'transparent',
                                resize:'none',
                                outlineColor: 'transparent',
                                outlineStyle: 'none',
                                caretColor:'white',
                                fontSize: 12,
                                fontWeight:'700',
                                textDecorationLine:'none',
                                color:'rgb(196,196,196)',
                                boxSizing:'borderBox',
                                // textAlign:'center',
                                // alignItems:'center',
                                // justifyContent:'center',
                                // flexDirection:'row',
                                // margin:5,
                            }} 
                            onKeyPress={handleSlackHashKeyPress}
                            onChange={handleSlackHashChange}

                            >
                        </textarea> 
                       
                     </View> 
            </View>
          </View>
        </Fade> 
        </Fade>
        </View>
        
        } 
        {shareOverlaySwitch && 
          
          <View
          
            // className={overlayClassName}
            style={{
                position:'fixed',
                height:height,
                width:'100%',
                top:0,
                left:0,
                //backgroundColor:'rgba(0,0,0,0.4)',
                //
                justifyContent:'center',
                alignItems:'center',
                zIndex:100,
                //opacity:0,
                //display:'block',
            }}
          >
          <Fade
          duration={duration}
          timeout={duration}
          >
          <Fade
            style={{
              //backgroundColor:'orange',
              height:height,
              width:'100vw',
            }}
            when={fade}
            duration={duration}
            timeout={duration}
          >
            <View
            style={{
                
                height:height,
                width:'100vw',
                //opacity:0.4,
                //backgroundColor:'orange',
                backgroundColor:'rgba(0,0,0,0.8)',
                //backgroundImage:'',
                justifyContent:'center',
                alignItems:'center',
                //textAlign:'center'
            }}>
              <View
                style={{
                  height:50
                }}
              >
                <TouchableOpacity
                style={{
                    position:'fixed',
                    height:16,
                    width:16,
                    top:26,
                    right:21,
                    //backgroundColor:'white',
                    zIndex:101
                }}
                onPress={
                    shareOverlayToggle
                    //overlayOff
                }
                activeOpacity={1}
            >
                <div
                  className='x'
                >
          
                </div>
                
            </TouchableOpacity>
          </View>
          </View>
        </Fade> 
        </Fade>
        </View>
        
        } 
        {starOverlaySwitch && 
          
          <View
          
            // className={overlayClassName}
            style={{
                position:'fixed',
                height:height,
                width:'100%',
                top:0,
                left:0,
                //backgroundColor:'rgba(0,0,0,0.4)',
                //
                justifyContent:'center',
                alignItems:'center',
                zIndex:100,
                //opacity:0,
                //display:'block',
            }}
          >
          <Fade
          duration={duration}
          timeout={duration}
          >
          <Fade
            style={{
              //backgroundColor:'orange',
              height:height,
              width:'100vw',
            }}
            when={fade}
            duration={duration}
            timeout={duration}
          >
            <View
            style={{
                
                height:height,
                width:'100vw',
                //opacity:0.4,
                //backgroundColor:'orange',
                backgroundColor:'rgba(0,0,0,0.8)',
                //backgroundImage:'',
                justifyContent:'center',
                alignItems:'center',
                //textAlign:'center'
            }}>
              <View
                style={{
                  height:50,
                  width:'100vw',
                  backgroundColor:'transparent',
                  justifyContent:'center',
                  alignItems:'center'
                }}
              >
                <TouchableOpacity
                style={{
                    position:'fixed',
                    height:16,
                    width:16,
                    top:26,
                    right:21,
                    //backgroundColor:'white',
                    zIndex:101
                }}
                onPress={
                    starOverlayToggle
                    //overlayOff
                }
                activeOpacity={1}
            >
                <div
                  className='x'
                >
          
                </div>
                
            </TouchableOpacity>
            <View
              style={{
                backgroundColor:'transparent',
                height:'100%',
                weight:'100%',
                justifyContent:'center',
              }}
            >
              <Text
                style={{
                  fontSize:25,
                  color:'white',
                }}
              >
              <View
                
              >
                <Text
                  ref={starOne}
                  style={{
                    margin:5,
                    opacity:shineOne
                  }}
                  onMouseEnter={onMouseEnterStarOne}
                  onPress={onPressStar}
                >
                  <i class="fas fa-star"
                    
                  ></i>
                </Text>
              </View> 
              <View
                
              >
                <Text
                  ref={starTwo}
                  style={{
                    margin:5,
                    opacity:shineTwo
                  }}
                  onMouseEnter={onMouseEnterStarTwo}
                  onPress={onPressStar}
                >
                  <i class="fas fa-star"></i>
                </Text>
              </View>
              <View
                
              >
                <Text
                  ref={starThree}
                  style={{
                    margin:5,
                    opacity:shineThree
                  }}
                  onMouseEnter={onMouseEnterStarThree}
                  onPress={onPressStar}
                >
                  <i class="fas fa-star"></i>
                </Text>
              </View>
              <View
              >
                <Text
                  ref={starFour}
                  style={{
                    margin:5,
                    opacity:shineFour
                  }}
                  onMouseEnter={onMouseEnterStarFour}
                  onPress={onPressStar}
                >
                  <i class="fas fa-star"></i>
                </Text> 
              </View>
              <View

              >
                <Text
                  ref={starFive}
                  style={{
                    margin:5,
                    opacity:shineFive
                  }}                 
                  onMouseEnter={onMouseEnterStarFive}
                  onPress={onPressStar}
                >
                  <i class="fas fa-star"></i>
                </Text>
              </View>
              </Text>
            </View>
          </View>
            
          </View>
        </Fade> 
        </Fade>
        </View>
        
        } 
        {loginOverlaySwitch && 
        
          <View
          
          // className={overlayClassName}
          style={{
              position:'fixed',
              height:height,
              width:'100%',
              top:0,
              left:0,
              //backgroundColor:'rgba(0,0,0,0.4)',
              //
              justifyContent:'center',
              alignItems:'center',
              zIndex:100,
              //opacity:0,
              //display:'block',
          }}
        >
        <Fade
        duration={duration}
        timeout={duration}
        >
        <Fade
          style={{
            //backgroundColor:'orange',
            height:height,
            width:'100vw',
          }}
          when={fade}
          duration={duration}
          timeout={duration}
        >
          <View
          style={{
              
              height:height,
              width:'100vw',
              //opacity:0.4,
              //backgroundColor:'orange',
              backgroundColor:'rgba(0,0,0,0.8)',
              //backgroundImage:'',
              justifyContent:'center',
              alignItems:'center',
              //textAlign:'center'
          }}>

              <TouchableOpacity
              style={{
                  position:'fixed',
                  height:16,
                  width:16,
                  top:26,
                  right:21,
                  //backgroundColor:'white',
                  zIndex:101
              }}
              onPress={
                  loginOverlayToggle
                  //overlayOff
              }
              activeOpacity={1}
          >
              <div
                className='x'
              >
        
              </div>
              {/* <Text
                  style={{
                      fontSize:16,
                      fontWeight:'700',
                      color:'white',
                      
                  }}
              >
                  <i class="fas fa-times"></i>
                  

                
              </Text> */}
          </TouchableOpacity>
          {/* <View style={styles.box}>
        <a style={
          {
            // flex:1,
            textDecorationLine:'none',
            //borderColor:'black',
            //borderWidth:2,
            backgroundColor:'transparent',
            fontSize: 17,
            fontWeight:700,
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 2,
            // flex:1,
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
            textAlign:'center'
          }
        } href="https://squwbs-252702.appspot.com/login/google">
          <TouchableOpacity style={styles.touch}>
          
          <Text id="linkLoginGoogle" 
          style={{
            // color:'black', 
            textDecorationLine:'none',
            color:'white',
            fontSize: 30,
            fontWeight:'700',
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 2,
            // flex:1,
            textAlign:'center',
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
          }}
          ><i class="fab fa-google"></i>
          </Text>
          <Text
            selectable={false} 
            style ={{
                fontSize: 25,
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
                margin:11,
                pointerEvents:'none'
            }}
          >
            Google
          </Text>
          </TouchableOpacity>
        </a><br/>
        </View> */}
        <FirebaseLoginGoogle/>
        {/* <View style={styles.box}>
        <a style={
          {
            // flex:1,
            textDecorationLine:'none',
            //borderColor:'black',
            //borderWidth:2,
            backgroundColor:'transparent',
            fontSize: 35,
            fontWeight:'700',
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 2,
            // flex:1,
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
            textAlign:'center'
          }
        } href="https://squwbs-252702.appspot.com/login/facebook">
          <TouchableOpacity style={styles.touch}>
    
          <Text id="linkLoginFacebook" 
          style={{
            // color:'black', 
            textDecorationLine:'none',
            color:'white',
            fontSize: 30,
            fontWeight:'700',
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 2,
            // flex:1,
            textAlign:'center',
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
          }}
          ><i class="fab fa-facebook"></i></Text>
          <Text
            selectable={false} 
            style ={{
                fontSize: 25,
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
                margin:11,
                pointerEvents:'none'
            }}
          >
            Facebook
          </Text>
          </TouchableOpacity>
        </a><br/>
        </View> */}
        <FirebaseLoginFacebook/>

      <View style={styles.box}>
      <a style={
        {
          // flex:1,
          textDecorationLine:'none',
          //borderColor:'black',
          //borderWidth:2,
          backgroundColor:'transparent',
          fontSize: 35,
          fontWeight:'700',
          textShadowColor: 'rgba(0, 0, 0, 0.5)',
          textShadowOffset: {width: 0, height: 0},
          textShadowRadius: 2,
          // flex:1,
          alignItems:'center',
          justifyContent:'center',
          flexDirection:'row',
          textAlign:'center'
        }
      } href="https://app.termly.io/document/privacy-policy/2c6fc9b1-4ce8-4c04-b2df-e9c49d33e6c1">
        <TouchableOpacity style={styles.touch}>

        
        <Text
          selectable={false} 
          style ={{
              fontSize: 13,
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
              margin:11,
              pointerEvents:'none'
          }}
        >
          Privacy Policy
        </Text>
        </TouchableOpacity>
      </a><br/>
      </View>
        </View>
      </Fade> 
      </Fade>
      </View>
      
      }  
      {termsOverlaySwitch && 
       <View
          
       // className={overlayClassName}
       style={{
           position:'fixed',
           height:height,
           width:'100%',
           top:0,
           left:0,
           //backgroundColor:'rgba(0,0,0,0.4)',
           //
           
           justifyContent:'center',
           alignItems:'center',
           zIndex:100,
           //opacity:0,
           //display:'block',
          backgroundColor:'rgba(0,0,0,0.8)',
       }}
     >
     <Fade
     duration={duration}
     timeout={duration}
     >
     <Fade
       style={{
         //backgroundColor:'orange',
         height:height,
         width:'100vw',
       }}
       when={fade}
       duration={duration}
       timeout={duration}
     >
       <View
        style={{
          height:50
        }}
       >
        <TouchableOpacity
              style={{
                  position:'fixed',
                  height:16,
                  width:16,
                  top:26,
                  right:21,
                  //backgroundColor:'white',
                  zIndex:101
              }}
              onPress={
                  //loginOverlayToggle
                  overlayOff
              }
              activeOpacity={1}
          >
              <div
                className='x'
              >
        
              </div>
              {/* <Text
                  style={{
                      fontSize:16,
                      fontWeight:'700',
                      color:'white',
                      
                  }}
              >
                  <i class="fas fa-times"></i>
                  

                
              </Text> */}
          </TouchableOpacity>
         </View>
         <ScrollView
         // ref={ref=>this.myRef=ref}
         style={{
             // display:'absolute',f
             // left:0,
             height:height-50,
             width:width,
             //backgroundColor:'black',
             backgroundColor:'rgb(0,0,0,0.99)',
             margin:0,
             flexDirection:'row',
             padding:15
             // paddingBottom:15,
             // paddingRight:15,
         }}

         horizontal={false}
     
         showsHorizontalScrollIndicator={true}
         snapeToAlignment='end'
         decelerationRate="fast"
     >
       <View
        style={{
          height:'100%',
          width:width-30,
          backgroundColor:'transparent',
          //backgroundColor:'rgb(175,175,175)',
          margin:0,
          flexDirection:'column',
          padding:15
        }}
       >
         <h1 >Terms and Conditions for squwbs</h1>

         <h2>Introduction</h2> 
         
         <p>These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, squwbs.com accessible at squwbs.com.</p>

         <p>These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions. These Terms and Conditions have been generated with the help of the <a href="https://www.termsandcondiitionssample.com">Terms And Conditions Template</a>.</p>

         <p>Minors or people below 18 years old are not allowed to use this Website.</p>

         <h2>Intellectual Property Rights</h2>

         <p>Other than the content you own, under these Terms, squwbs and/or its licensors own all the intellectual property rights and materials contained in this Website.</p>

         <p>You are granted limited license only for purposes of viewing the material contained on this Website.</p>

         <h2>Restrictions</h2>

         <p>You are specifically restricted from all of the following:</p>

         <ul>
             <li>publishing any Website material in any other media;</li>
             <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
             <li>publicly performing and/or showing any Website material;</li>
             <li>using this Website in any way that is or may be damaging to this Website;</li>
             <li>using this Website in any way that impacts user access to this Website;</li>
             <li>using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
             <li>engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</li>
             <li>using this Website to engage in any advertising or marketing.</li>
         </ul>

         <p>Certain areas of this Website are restricted from being access by you and squwbs may further restrict access by you to any areas of this Website, at any time, in absolute discretion. Any user ID and password you may have for this Website are confidential and you must maintain confidentiality as well.</p>

         <h2>Your Content</h2>

         <p>In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant squwbs a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p>

         <p>Your Content must be your own and must not be invading any third-party’s rights. squwbs reserves the right to remove any of Your Content from this Website at any time without notice.</p>

         <h2>Your Privacy</h2>

         <p>Please read Privacy Policy.</p>

         <h2>No warranties</h2>

         <p>This Website is provided "as is," with all faults, and squwbs express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.</p>

         <h2>Limitation of liability</h2>

         <p>In no event shall squwbs, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.  squwbs, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>

         <h2>Indemnification</h2>

         <p>You hereby indemnify to the fullest extent squwbs from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.</p>

         <h2>Severability</h2>

         <p>If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.</p>

         <h2>Variation of Terms</h2>

         <p>squwbs is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.</p>

         <h2>Assignment</h2>

         <p>The squwbs is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.</p>

         <h2>Entire Agreement</h2>
             
         <p>These Terms constitute the entire agreement between squwbs and you in relation to your use of this Website, and supersede all prior agreements and understandings.</p>

         <h2>Governing Law & Jurisdiction</h2>

         <p>These Terms will be governed by and interpreted in accordance with the laws of the State of kr, and you submit to the non-exclusive jurisdiction of the state and federal courts located in kr for the resolution of any disputes.</p>
        </View>  
     </ScrollView>  
     </Fade> 
        </Fade>
      </View> 
      } 
      {/* </div>    */}
        {/* <AdSense.Google 
          client='NeM-xU1bQwBXyU8dz_MsINZX'
          slot='7806394673'
          style={{height:50,width:200,display:'block'}}
          layout='in-article'
          format='fluid'
        />   */}
        <Animated.View
          style={
            {
              transform:[{
                  translateX:0
              },{
                  translateY:animatedHeader
              }]
              }
          }
        >
          <Drawer 
            popLogin={loginOverlayToggle}
            popTerms={termsOverlayToggle}
            // headerOpen={headerOpen}
            headerOpen={true}
          >
            <SwipeableScroller 
              // headerOpen={headerOpen}
              headerOpen={true}
              shareOverlayToggle={shareOverlayToggle}
              slackHashOverlayToggle={slackHashOverlayToggle}
              starOverlayToggle={starOverlayToggle}
              commentOverlayToggle={commentOverlayToggle}
              overlayOff={overlayOff}
            />
          </Drawer>
          </Animated.View>
          {/* <KeyboardAvoidingView style={{display:'absolute',bottom:0,flex:1,position:'absolute',height:hp('16%')-30,backgroundColor:'transparent',flexDirection:'column',margin:0,width:wp('100%'),padding:0}} behavior="padding" enabled > */}
          {/* <KeyboardAvoidingView style={{display:'absolute',bottom:0,position:'absolute',height:Dimensions.get('window').height*5/30-30,backgroundColor:'transparent',flexDirection:'column',margin:0,width:Dimensions.get('window').width,padding:0}} behavior="padding" enabled >
          
          
              <View style={{backgroundColor:'white',height:30,felxDirection:'column',alignItems:'center',justifyContent:'center',marginRight:0,marginLeft:0,}}>
                <AddPost style={{marginTop:0,witdh:Dimensions.get('window').width}}/>
              </View>
    
              <ScrollView 
                horizontal = {true} 
                style={{height:Dimensions.get('window').height/15,backgroundColor:'transparent',flexDirection:'row',marginLeft:0,marginRight:0}} 
                showsHorizontalScrollIndicator={false}
              >
                <TouchableHighlight underlayColor = 'white' onLongPress={longpress}>
                <View style={{
                  height:Dimensions.get('window').height/15,
                  width:(Dimensions.get('window').height)/12,
                  backgroundColor:'darkgrey',
                  flex:1,
                  flexDirection:'column',
                  marginRight:2,
                  marginLeft:3,
                  borderRadius:4,
                  borderColor:'white',
                  overflow:'hidden'
                  }}>
                 
                </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor = 'white' onLongPress={longpress}>
                <View style={{
                  height:Dimensions.get('window').height/15,
                  width:(Dimensions.get('window').height)/12,
                  backgroundColor:'darkgrey',
                  flex:1,
                  flexDirection:'column',
                  marginRight:2,
                  marginLeft:2,
                  borderRadius:4,
                  borderColor:'white',
                  overflow:'hidden'
                  }}>
                
                </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor = 'white' onLongPress={longpress}>
                <View style={{
                  height:Dimensions.get('window').height/15,
                  width:(Dimensions.get('window').height)/12,
                  backgroundColor:'darkgrey',
                  flex:1,
                  flexDirection:'column',
                  marginRight:2,
                  marginLeft:2,
                  borderRadius:4,
                  borderColor:'white',
                  overflow:'hidden'
                  }}>
                
                </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor = 'white' onLongPress={longpress}>
                <View style={{
                  height:Dimensions.get('window').height/15,
                  width:(Dimensions.get('window').height)/12,
                  backgroundColor:'darkgrey',
                  flex:1,
                  flexDirection:'column',
                  marginRight:2,
                  marginLeft:2,
                  borderRadius:4,
                  borderColor:'white',
                  overflow:'hidden'
                }}>
               
                </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor = 'white' onLongPress={longpress}>
                <View style={{
                  height:Dimensions.get('window').height/15,
                  width:(Dimensions.get('window').height)/12,
                  backgroundColor:'darkgrey',
                  flex:1,
                  flexDirection:'column',
                  marginRight:2,
                  marginLeft:2,
                  borderRadius:4,
                  borderColor:'white',
                  overflow:'hidden'
                }}>
            
                </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor = 'white' onLongPress={longpress}>
                <View style={{
                  height:Dimensions.get('window').height/15,
                  width:(Dimensions.get('window').height)/12,
                  backgroundColor:'darkgrey',
                  flex:1,
                  flexDirection:'column',
                  marginRight:2,
                  marginLeft:2,
                  borderRadius:4,
                  borderColor:'white',
                  overflow:'hidden'
                }}>
     
                </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor = 'white' onLongPress={longpress}>
                <View style={{
                  height:Dimensions.get('window').height/15,
                  width:(Dimensions.get('window').height)/12,
                  backgroundColor:'darkgrey',
                  flex:1,
                  flexDirection:'column',
                  marginRight:2,
                  marginLeft:2,
                  borderRadius:4,
                  borderColor:'white',
                  overflow:'hidden'
                }}>
      
                </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor = 'white' onLongPress={longpress}>
                <View style={{
                  height:Dimensions.get('window').height/15,
                  width:(Dimensions.get('window').height)/12,
                  backgroundColor:'darkgrey',
                  flex:1,
                  flexDirection:'column',
                  marginRight:2,
                  marginLeft:2,
                  borderRadius:4,
                  borderColor:'white',
                  overflow:'hidden'
                }}>

                </View>
                </TouchableHighlight>
              </ScrollView>
            </KeyboardAvoidingView>  */}
        </View> 
        
    )
  // }
  }
  const styles = StyleSheet.create({
    textH1:{
      color:'white',
      fontSize:25
    },
    box:{
      margin:0,
      //padding:1,
      height:50,
      backgroundColor:'transparent',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row',
      // flex:1,
      //fontSize:12,
      //borderColor:'black',
      //borderRadius:2,
      //fontWeight:'700',
      //color:'black',
      // textShadowColor: 'rgba(1, 1, 1, 1)',
      // textShadowOffset: {width: 0, height: 0},
      // textShadowRadius: 20,
      //borderColor:'#cfcfcf',
      //borderWidth:1,
    },
    touch:{
      margin:0,
      //padding:1,
      //fontWeight:700,
      height:22,
      backgroundColor:'transparent',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row',
      // flex:1
    },
    link:{
      fontWeight:'700',
      color:'black', 
      textDecorationLine:'none',
      //borderColor:'black',
      //borderWidth:1 
    }
        
})
export default Home

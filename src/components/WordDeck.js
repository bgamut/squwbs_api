import React,{Component,useContext} from 'react';
import {Animated,PanResponder,Dimensions,View,Text,Image,TouchableHighlight,TouchableOpacity,StyleSheet} from 'react-native'
import { Context } from "../context";
import ReactDOM from 'react-dom'
import WordCard from './WordCard'
//import WordCardV2 from './WordCardV2'
import stringifyObject from 'stringify-object'
//const MongoClient = require('mongodb').MongoClient;

class WordDeck extends Component {
  constructor(props){
  
    super(props)
    this.state = {
      styleCondition:false,
      flipLock:false,
      bagOfWords:[{
        word:'touch',
        meaning:'swipe',
        example:'example',
        pronunciation:'pronunciation'
      }],
      currentIndex:0,
      endIndex:1,
      next:true
    };
    this.myRef=React.createRef();
  
    

  }
  shuffle=(a)=>{
    //fisher-yates shuffle algorithm via https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    console.log('cards are shuffled')
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }
  addCard=()=>{
    //console.log('card was removed!')
    //console.log(this.myRef.current.childNodes.length)
    var currentIndex=this.state.currentIndex
    const endIndex = this.state.endIndex
    var next = this.state.next
    //console.log(next)
    if(currentIndex>=endIndex){
      currentIndex=0
      this.setState({
        bagOfWords:[...this.shuffle(this.state.bagOfWords)],
        currentIndex:currentIndex
      })
    }
    else if(currentIndex<0){
      currentIndex=endIndex-1
      this.setState({
        currentIndex:currentIndex
      })
    }

    // if(next==true){
      if(currentIndex+1<endIndex){
        currentIndex=currentIndex+1
        this.setState({
            currentIndex:currentIndex
        })
      }
      else{
          currentIndex=0
          this.setState({
              bagOfWords:[...this.shuffle(this.state.bagOfWords)],
              currentIndex:currentIndex
          })
      }
   

    console.log("currentIndex :"+currentIndex)
    
    ReactDOM.render(
      <WordCard 
        onLeftSwipe={this.handleLeftSwipe} 
        onRightSwipe={this.handleRightSwipe} 
        onRemove={this.handleCardRemove } 
        word={this.state.bagOfWords[this.state.currentIndex].word} 
        meaning={this.state.bagOfWords[this.state.currentIndex].meaning} 
        example={this.state.bagOfWords[this.state.currentIndex].example} 
        percentage={this.props.percentage}
        style={{
          height:"100%",
          width:"100%"
        }}
      />,
      this.myRef.current
    )

  }
  abortController= new AbortController()
  UNSAFE_componentWillUnmount(){
    this.abortController.abort()
  }
  handleCardRemove=()=>{
      
      this.addCard()
    
  }
  handleLeftSwipe=()=>{
    console.log('swiped left')
    var currentIndex = this.state.currentIndex
    var bagOfWords = this.state.bagOfWords
    
    bagOfWords[currentIndex].lefted=bagOfWords[currentIndex].lefted+1
    this.setState({
      bagOfWords:[...bagOfWords],
      next:true,
    })
  }
  handleRightSwipe=()=>{
    console.log('swiped right')
    var currentIndex = this.state.currentIndex
    var bagOfWords = this.state.bagOfWords
    bagOfWords[currentIndex].righted=bagOfWords[currentIndex].righted+1
    this.setState({
      bagOfWords:[...bagOfWords],
      next:false,
    })

  }
  requestWords=()=>{
    fetch('https://squwbs.herokuapp.com/getwordlist',[{mode:'cors'},{signal:this.abortController.signal}])
    .then((res)=>{
      console.log(stringifyObject(res))
      return(res.json())
    })
    .then((json)=>{

      var words = json.words.slice()
      console.log(words)
      this.setState({

        bagOfWords:this.shuffle(words),
        endIndex:words.length
      })
      console.log(this.state.bagOfWords)

    })
    .catch((err) => {
      console.error(err);
    });
    // const mongoURLGetWordList='https://squwbs.herokuapp.com/getwordlistfrommongo'
    // const getWordListFromMongoViaServer = ()=>{
    //   fetch(mongoURLGetWordList, {
    //     mode:'cors'
    //   })
    //   .then(result=>{
    //     return result.json()
    //   })
    //   .then((json)=>{
    //     console.log(json)
    //     var words = json.data.slice()
        
    //     console.log(words)
    //     this.setState({
    //       bagOfWords:this.shuffle(words),
    //       endIndex:words.length
    //     })
    //   })
    //   .catch((err)=>{
    //     console.log(err)
    //   })
    // }
    // getWordListFromMongoViaServer()

  }
  UNSAFE_componentDidMount(){

    
    this.requestWords()
    console.log(this.state)

  }
  UNSAFE_componentDidUpdate(){
    
    
    if(this.myRef.current!==null){

      if(this.myRef.current.childNodes.length<=0){

          console.log(this.state.bagOfWords[this.state.currentIndex].pronunciation)
          ReactDOM.render(
            // <WordCard 
            //   onLeftSwipe={this.handleLeftSwipe} 
            //   onRightSwipe={this.handleRightSwipe} 
            //   onRemove={this.handleCardRemove}
            //   word={this.state.bagOfWords[this.state.currentIndex].word} 
            //   meaning={this.state.bagOfWords[this.state.currentIndex].meaning} 
            //   example={this.state.bagOfWords[this.state.currentIndex].example} 
            //   pronunciation={this.state.bagOfWords[this.state.currentIndex].pronunciation} 
            //   percentage={this.props.percentage}
            // />
            <WordCard
            onLeftSwipe={this.handleLeftSwipe} 
            onRightSwipe={this.handleRightSwipe} 
            onRemove={this.handleCardRemove}
             //word={this.state.bagOfWords[this.state.currentIndex].word} 
            word={<i style={{           
              height:33,
              color:'white',
              display:'block',
              margin:3,
              textShadowColor: 'rgba(0, 0, 0, 1)',
              textShadowOffset: {width: 0, height: 0},
              textShadowRadius: 3,
              shadowColor:'#000',
              shadowOpacity:0.25,
              shadowRadius:2,
              
              shadowOffset:{
              width:0,
              height:0
              },
              elevation:2
          }}className="far fa-hand-pointer"></i>}
            //meaning={this.state.bagOfWords[this.state.currentIndex].meaning} 
            meaning={<i style={{           
              height:33,
              color:'white',
              display:'block',
              margin:3,
              textShadowColor: 'rgba(0, 0, 0, 1)',
              textShadowOffset: {width: 0, height: 0},
              textShadowRadius: 3,
              shadowColor:'#000',
              shadowOpacity:0.25,
              shadowRadius:2,
              shadowOffset:{
              width:0,
              height:0
              },
              elevation:2
          }}className="fas fa-arrows-alt-h"></i>}
            example={this.state.bagOfWords[this.state.currentIndex].example} 
            pronunciation={this.state.bagOfWords[this.state.currentIndex].pronunciation} 
            percentage={this.props.percentage}
            style={{
              height:"100%",
              width:"100%"
            }}
          />
            ,
            this.myRef.current
          )
        }
      }
    }
  // }


 
 
  render(){
      
      
        return (
            
              <div id='MemorizationDeck' ref={this.myRef}>
              </div>
              
      );
  }


}

// const styles = StyleSheet.create({
//   container: {
//     // margin:0,
//   },
//   flipCard: {
//     backgroundColor:'transparent',
//     // borderWidth:1,
//     borderColor: 'rgba(128,128,128,0)',
//     // paddingTop:2,
//     // paddingBottom:2,
//     // paddingLeft:2,
//     // paddingRight:2,
//     // margin:0,
//     backfaceVisibility: 'hidden',
//     height: 100,
//     shadowColor: '#000000',
//     shadowOffset: {
//       width: 0,
//       height: 0
//     },
//     shadowRadius: 3,
//     shadowOpacity: 0.25
//   },
//   flipCardBack: {
//     backgroundColor:'transparent',
//     height: 100,
//     position: "absolute",
//     top: 0,
//     // margin:0,
//     shadowColor: '#000000',
//     shadowOffset: {
//       width: 0,
//       height: 0
//     },
//     shadowRadius: 3,
//     shadowOpacity: 0.25
//   }
// });
export default WordDeck;




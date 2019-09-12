import React,{Component,useContext} from 'react';
import {Animated,PanResponder,Dimensions,View,Text,Image,TouchableHighlight,TouchableOpacity,StyleSheet} from 'react-native'
import { Context } from "../context";
import ReactDOM from 'react-dom'
//import WordCard from './WordCard'
import WordCardV2 from './WordCardV2'
import stringifyObject from 'stringify-object'
const MongoClient = require('mongodb').MongoClient;

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
  componentWillUnmount(){
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
    // fetch('https://squwbs.herokuapp.com/getwordlist',[{mode:'cors'},{signal:this.abortController.signal}])
    // .then((res)=>{
    //   console.log(stringifyObject(res))
    //   return(res.json())
    // })
    // .then((json)=>{

    //   var words = json.words.slice()

    //   this.setState({

    //     bagOfWords:this.shuffle(words),
    //     endIndex:words.length
    //   })
    //   console.log(this.state.bagOfWords)

    // })
    // .catch((err) => {
    //   console.error(err);
    // });
    const addWordListToServer = (list)=>{
    
      //console.log(word,meaning,example,pronunciation)
      // fetch(withQuery.default('https://squwbs.herokuapp.com/addWordList', {
      //   list:list,
      //   mode:'cors'
      // }))
      // .then(result=>{
      //     return result.json()
      //   })
      //   .then((json)=>{
      //     console.log(json)
      //   })
      //   .catch((err)=>{
    
      //   })
      
        var mongouri=''
        fetch('https://squwbs.herokuapp.com/mongouri'
        ,{mode:'cors'}
        )
        .then(function(result){
          return result.json()
        })
        .then(function(json){
          
          mongouri=json.mongouri
          console.log(mongouri)
          const client = new MongoClient(mongouri, { useNewUrlParser: true });
          client.connect(function(err){
          const collection = client.db("SAT").collection("words");
          
          // collection.insertMany([
          //   ...list
          // ],function(err,result){
          //     console.log(err)
          // })
        
          //this returns the array
          collection.find({}).toArray(function(err,docs){
              client.close();
              console.log(docs)
              return(docs)
          })
        
      //     // this searches parameters and returns array
      //     collection.find({a:1}).toArray(function(err,docs){
      //       console.log(docs)
      //   })
          // close connection
          
        });
        })
        .catch((err)=>{
          console.log(err)
        })
      
  }
  }
  componentDidMount(){

    
    this.requestWords()
    //console.log(this.state)

  }
  componentDidUpdate(){
    
    
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
            <WordCardV2
            onLeftSwipe={this.handleLeftSwipe} 
            onRightSwipe={this.handleRightSwipe} 
            onRemove={this.handleCardRemove}
             //word={this.state.bagOfWords[this.state.currentIndex].word} 
            word={<i style={{           
              height:33,
              color:'white',
              display:'block',
              margin:3,
              shadowColor:'#000',
              shadowOpacity:0.25,
              shadowRadius:2,
              shadowOffset:{
              width:0,
              height:0
              },
              elevation:2
          }}class="far fa-hand-pointer"></i>}
            //meaning={this.state.bagOfWords[this.state.currentIndex].meaning} 
            meaning={<i style={{           
              height:33,
              color:'grey',
              display:'block',
              margin:3,
              shadowColor:'#000',
              shadowOpacity:0.25,
              shadowRadius:2,
              shadowOffset:{
              width:0,
              height:0
              },
              elevation:2
          }}class="fas fa-arrows-alt-h"></i>}
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




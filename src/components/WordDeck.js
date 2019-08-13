import React,{Component,useContext} from 'react';
import {Animated,PanResponder,Dimensions,View,Text,Image,TouchableHighlight,TouchableOpacity,StyleSheet} from 'react-native'
import { Context } from "../context";
import ReactDOM from 'react-dom'
import WordCard from './WordCard'
import stringifyObject from 'stringify-object'

class WordDeck extends Component {
  constructor(props){
    // admin.initializeApp({
    //   credential:admin.credential.cert(firebaseServiceKey),
    //   databaseURL:firebaseConfig.databaseURL
    // })
    super(props)
    this.state = {
      styleCondition:false,
      flipLock:false,
      bagOfWords:[{
        word:'word',
        meaning:'meaning',
        example:'example',
        pronunciation:'pronunciation'
      }],
      currentIndex:0,
      endIndex:1,
    };
    this.myRef=React.createRef();
    // var db = admin.database()
    // var ref = db.ref('words')
    // ref.once('value',function(snapshot){
    //     var words=snapshot.val()
    //     console.log(words)
    //     if(words==undefined){
    //       this.setState({bagOfWords:[]})
    //     }
    //     else{
    //       this.setState({bagOfWords:words})
    //     }
    // })
    

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
    console.log('card was removed!')
    //console.log(this.myRef.current.childNodes.length)
    const currentIndex=this.state.currentIndex
    const endIndex = this.state.endIndex
    if(currentIndex+1<endIndex){
        this.setState({
            currentIndex:currentIndex+1
        })
    }
    else{
        
        this.setState({
            bagOfWords:[...this.shuffle(this.state.bagOfWords)],
            currentIndex:0
        })
    }
    
    // ReactDOM.render(<MemorizationCard onRemove={this.handleCardRemove}word={this.props.word} meaning={this.props.meaning} example={this.props.example} percentage={this.props.percentage}/>,this.myRef.current)
    ReactDOM.render(<WordCard onLeftSwipe={this.handleLeftSwipe} onRightSwipe={this.handleRightSwipe} onRemove={this.handleCardRemove } word={this.state.bagOfWords[this.state.currentIndex].word} meaning={this.state.bagOfWords[this.state.currentIndex].meaning} example={this.state.bagOfWords[this.state.currentIndex].example} percentage={this.props.percentage}/>,this.myRef.current)

  }
  handleCardRemove=()=>{
      
      this.addCard()
    
  }
  handleLeftSwipe=()=>{
    var currentIndex = this.state.currentIndex
    var bagOfWords = this.state.bagOfWords
    
    bagOfWords[currentIndex].lefted=bagOfWords[currentIndex].lefted+1
    this.setState({
      bagOfWords:[...bagOfWords],
    })
    console.log(bagOfWords[currentIndex])
  }
  handleRightSwipe=()=>{
    var currentIndex = this.state.currentIndex
    var bagOfWords = this.state.bagOfWords
    bagOfWords[currentIndex].righted=bagOfWords[currentIndex].righted+1
    this.setState({
      bagOfWords:[...bagOfWords],
    })
    console.log(bagOfWords[currentIndex])
  }
  requestWords=()=>{
    fetch('https://squwbs.herokuapp.com/getwordlist')
    .then((res)=>{
      console.log(stringifyObject(res))
      return(res.json())
    })
    .then((json)=>{
      //console.log(json)
      //console.log(stringifyObject(json))
      var words = json.words.slice()
      //console.log(stringifyObject(words))
      this.setState({

        bagOfWords:words,
        endIndex:words.length
      })
      console.log(this.state.bagOfWords)
      //return json.words
    })
    .catch((err) => {
      console.error(err);
    });
  }
  componentDidMount(){
    // const bagOfWords =[
    //     {word:'word1' 
    //     ,meaning:'meaning1'
    //     ,example:'example1'
    //     ,lefted:0
    //     ,righted:0
    //     },
    //     {word:'word2' 
    //     ,meaning:'meaning2'
    //     ,example:'example2'
    //     ,lefted:0
    //     ,righted:0
    //     },
    //     {word:'word3' 
    //     ,meaning:'meaning3'
    //     ,example:'example3'
    //     ,lefted:0
    //     ,righted:0
    //     }
    // ]
    
    this.requestWords()
    console.log(this.state)
    // var bagOfWords=requestWords()
    //console.log(stringifyObject(bagOfWords))
    // this.setState({
    //   bagOfWords:bagOfWords,
    //   endIndex:bagOfWords.length
    // })
    
    //var bagOfWords =requestWords()
    //this.shuffle(bagOfWords)
    // this.setState({
    //     bagOfWords:bagOfWords,
    //     endIndex:bagOfWords.length
    // })
    //console.log(bagOfWords)
    //console.log(bagOfWords.length)
    
    // if(this.myRef.current!==null){
    //     console.log(this.myRef.current.childNodes.length)
    //     if(this.myRef.current.childNodes.length<=0){
    //         ReactDOM.render(<MemorizationCard onRemove={this.handleCardRemove}word={this.state.bagOfWords[this.state.currentIndex].word} meaning={this.state.bagOfWords[this.state.currentIndex].meaning} example={this.state.bagOfWords[this.state.currentIndex].example} percentage={this.props.percentage}/>,this.myRef.current)
    //     }
    // }
  }
  componentDidUpdate(){
    
    console.log(this.state.bagOfWords[this.state.currentIndex].pronunciation)
    if(this.myRef.current!==null){
      //console.log(this.myRef.current.childNodes.length)
      if(this.myRef.current.childNodes.length<=0){
        // if(this.state.bagOfWords==null){
        //   console.log('entered null condition')
        //   ReactDOM.render(
        //     <WordCard 
        //       onLeftSwipe={this.handleLeftSwipe} 
        //       onRightSwipe={this.handleRightSwipe} 
        //       onRemove={this.handleCardRemove}
        //       word={'word'} 
        //       meaning={'meaning'} 
        //       example={'example'} 
        //       pronunciation={'pronunciation'} 
        //       percentage={this.props.percentage}
        //     />,
        //     this.myRef.current
        //   )
        // }
        // else{
         
          ReactDOM.render(
            <WordCard 
              onLeftSwipe={this.handleLeftSwipe} 
              onRightSwipe={this.handleRightSwipe} 
              onRemove={this.handleCardRemove}
              word={this.state.bagOfWords[this.state.currentIndex].word} 
              meaning={this.state.bagOfWords[this.state.currentIndex].meaning} 
              example={this.state.bagOfWords[this.state.currentIndex].example} 
              pronunciation={this.state.bagOfWords[this.state.currentIndex].pronunciation} 
              percentage={this.props.percentage}
            />,
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

const styles = StyleSheet.create({
  container: {
    margin:0,
  },
  flipCard: {
    backgroundColor:'transparent',
    borderWidth:1,
    borderColor: 'rgba(128,128,128,0)',
    paddingTop:2,
    paddingBottom:2,
    paddingLeft:2,
    paddingRight:2,
    margin:0,
    backfaceVisibility: 'hidden',
    height: 100,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 3,
    shadowOpacity: 0.25
  },
  flipCardBack: {
    backgroundColor:'transparent',
    height: 100,
    position: "absolute",
    top: 0,
    margin:0,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 3,
    shadowOpacity: 0.25
  }
});
export default WordDeck;




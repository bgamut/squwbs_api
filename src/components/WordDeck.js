import React,{Component,useContext} from 'react';
import {Animated,PanResponder,Dimensions,View,Text,Image,TouchableHighlight,TouchableOpacity,StyleSheet} from 'react-native'
import { Context } from "../context";
import ReactDOM from 'react-dom'
import WordCard from './WordCard'
const bagOfWords =[
    {word:'word1' 
    ,meaning:'meaning1'
    ,example:'example1'
    ,lefted:0
    ,righted:0
    },
    {word:'word2' 
    ,meaning:'meaning2'
    ,example:'example2'
    ,lefted:0
    ,righted:0
    },
    {word:'word3' 
    ,meaning:'meaning3'
    ,example:'example3'
    ,lefted:0
    ,righted:0
    },
    {word:'word4' 
    ,meaning:'meaning4'
    ,example:'example4'
    ,lefted:0
    ,righted:0
    },
    {word:'word5' 
    ,meaning:'meaning5'
    ,example:'example5'
    ,lefted:0
    ,righted:0
    },
    {word:'word6' 
    ,meaning:'meaning6'
    ,example:'example6'
    ,lefted:0
    ,righted:0
    },
    {word:'word7' 
    ,meaning:'meaning7'
    ,example:'example7'
    ,lefted:0
    ,righted:0
    },
    {word:'word8' 
    ,meaning:'meaning8'
    ,example:'example8'
    ,lefted:0
    ,righted:0
    },
    {word:'word9' 
    ,meaning:'meaning9'
    ,example:'example9'
    ,lefted:0
    ,righted:0
    },
]
class WordDeck extends Component {
  constructor(props){
    super(props)
    this.state = {
      styleCondition:false,
      flipLock:false,
      bagOfWords:[],
      currentIndex:0,
      endIndex:1,
    };
    this.myRef=React.createRef();
 

  }
  shuffle=(a)=>{
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
        this.shuffle(bagOfWords)
        this.setState({
            bagOfWords:[...bagOfWords],
            currentIndex:0
        })
    }
    
    // ReactDOM.render(<MemorizationCard onRemove={this.handleCardRemove}word={this.props.word} meaning={this.props.meaning} example={this.props.example} percentage={this.props.percentage}/>,this.myRef.current)
    ReactDOM.render(<WordCard onRemove={this.handleCardRemove } word={this.state.bagOfWords[this.state.currentIndex].word} meaning={this.state.bagOfWords[this.state.currentIndex].meaning} example={this.state.bagOfWords[this.state.currentIndex].example} percentage={this.props.percentage}/>,this.myRef.current)

  }
  handleCardRemove=()=>{
      
      this.addCard()
    
  }
  componentDidMount(){
    this.shuffle(bagOfWords)
    this.setState({
        bagOfWords:[...bagOfWords],
        endIndex:bagOfWords.length
    })
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
      //console.log('updated')
     // console.log(this.state.bagOfWords)
        if(this.myRef.current!==null){
            //console.log(this.myRef.current.childNodes.length)
            if(this.myRef.current.childNodes.length<=0){
                ReactDOM.render(<WordCard onRemove={this.handleCardRemove}word={this.state.bagOfWords[this.state.currentIndex].word} meaning={this.state.bagOfWords[this.state.currentIndex].meaning} example={this.state.bagOfWords[this.state.currentIndex].example} percentage={this.props.percentage}/>,this.myRef.current)
            }
        }
  }


 
 
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




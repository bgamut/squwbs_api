import React,{Component,useContext} from 'react';
import {Animated,PanResponder,Dimensions,View,Text,Image,TouchableHighlight,TouchableOpacity,StyleSheet} from 'react-native'
import { Context } from "../context";
import ReactDOM from 'react-dom'
import MemorizationCard from './MemorizationCard'
class MemorizationDeck extends Component {
  constructor(props){
    super(props)
    this.state = {
      styleCondition:false,
      flipLock:false
    };
    // this.state.yscroll.addListener(({value})=>{
    
    // })
    this.myRef=React.createRef();
 

  }
  addCard=()=>{
    console.log('card was removed!')
    console.log(this.myRef.current.childNodes.length)
    
    // ReactDOM.render(<MemorizationCard onRemove={this.handleCardRemove}word={this.props.word} meaning={this.props.meaning} example={this.props.example} percentage={this.props.percentage}/>,this.myRef.current)
    ReactDOM.render(<MemorizationCard onRemove={this.handleCardRemove} word={'shooter'} meaning={'the mand that makes the call'} example={"he's a shooter he makes things happen"}/>,this.myRef.current)

  }
  handleCardRemove=()=>{
      
      this.addCard()
    
  }
  componentDidMount(){
    //console.log(this.myRef.current)
    //const domContainer = document.getElementById('MemorizationDeck')
    //const domContainer = this.myRef.current
    //ReactDOM.render(React.createElement(MemorizationCard),domContainer)
    if(this.myRef.current!==null){
        console.log(this.myRef.current.childNodes.length)
        if(this.myRef.current.childNodes.length<=0){
            ReactDOM.render(<MemorizationCard onRemove={this.handleCardRemove}word={this.props.word} meaning={this.props.meaning} example={this.props.example} percentage={this.props.percentage}/>,this.myRef.current)
        }
    }
  }
  componentDidUpdate(){
      console.log('updated')
  }
  style={
    // height:Dimensions.get('window').height/11,
    height:Dimensions.get('window').height
  }
  refsCollection={}

 
  
  remove=()=>{
    //ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).childNode);
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
export default MemorizationDeck;




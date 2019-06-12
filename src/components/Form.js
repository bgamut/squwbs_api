import React, {Component,useState,memo} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addPost} from '../actions/postActions'
import {TextInput,View,TouchableOpacity,Text} from 'react-native'
// import {WholeContext} from "../WholeContext"
// export default function Form(props){
//     const [value, setValue]=useState('');

//     function handleAdd(e){
//         e.preventDefault();
//         props.onAdd(value);
//     }
//     function handleChange(e){
//         setValue(e.target.value)
//     }
//     return(
//         <form>
//             <input
//                 type = 'text'
//                 placeholder='Add Todo'
//                 value={value}
//                 onChange={handleChange}
//             />
//             <button onClick={handleAdd}>Add</button>
//         </form>
//     )
// }

class Form extends Component {
    // static contextType = WholeContext;
  
    // state = {
    //   text: ""
    // };
  
    constructor (props){
      super(props)
      this.state={
          text:''
      }
      
      this.onChange= this.onChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e){
      this.setState({text:e.target.value})
    }
    onSubmit(e){
      e.preventDefault();
      const text= {
        text: this.state.text
      }
      this.props.addPost(text)
      this.setState({text:""})
    }
    render() {
      // const { text } = this.state;
      // const { todo,dispatch } = this.context;
  
      return (
        // <form
        //   onSubmit={this.onSubmit}
        // >
        //   <input
        //     value={this.state.text}
        //     onChange={this.onChange}
        //   />
        //   <input type="submit" value="Add" />
        // </form>
        <View style={{
          backgroundColor: this.state.text,
          //borderBottomColor: '#ffffff',
          //borderBottomWidth: 1 ,
          flexDirection:"column",
          //flex:2
        }}
        >
          <TextInput 
            editable = {true}
            maxLength = {40}
            multiline = {true}
            numberOfLines = {4}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            onChange={this.onChange}
          />
          <TouchableOpacity
            onPress={this.onSubmit}
            style={{
              height:22,
              backgroundColor:'#333333',
              alignItems:'center',
              justifyContent:'center'
            }}
          >
            <Text style={{
              color:'white',
              fontSize:12,
              paddingBottom:2
            ,}}>add</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  Form.propTypes={
    addPost:PropTypes.func.isRequired
  }
  export default connect(null,{addPost})(Form)
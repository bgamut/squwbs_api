import React, {useState,memo} from 'react'
import {WholeContext} from "../WholeContext"
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
class Form extends React.PureComponent {
    static contextType = WholeContext;
  
    state = {
      text: ""
    };
  
    render() {
      const { text } = this.state;
      const { dispatch } = this.context;
  
      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            dispatch({ text, type: "ADD_TODO" });
            this.setState({ text: "" });
          }}
        >
          <input
            value={text}
            onChange={e => this.setState({ text: e.target.value })}
          />
          <input type="submit" value="Add" />
        </form>
      );
    }
  }
  export default React.memo(Form)
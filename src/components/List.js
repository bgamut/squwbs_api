//import React,{useState, useEffect} from 'react'
import React, { useContext,memo,Component } from "react";
import {WholeContext} from "../WholeContext"
import {ScrollView,ListView,FlatList} from 'react-native'

var id =0
// export default memo(() => {
//     const { obj, dispatch } = useContext(WholeContext);
    
//     return (
//       <ScrollView style={{flex:1}}>
          
//         {obj.obj.map(({ text, complete }, i) => (
          
//           <div
//             key={i}
//             onClick={() => {
//               dispatch({ type: "TOGGLE_COMPLETE", i })
//               console.log(WholeContext)
//           }}
//             style={{
//               textDecoration: complete ? "line-through" : ""
//             }}
//           >
//             {text}
//           </div>
          
//         ))}
        
//         </ScrollView>
//     );
//   });
  class List extends Component {
    static contextType = WholeContext;
  
    state = {
      items: []
    };
  
    render() {
      const { items } = this.state;
      const { todo,dispatch } = this.context;
  
      return (
        <ScrollView style={{flex:1}}>
          
        {items.map(({ todo, complete }, i) => (
          
          <div
            key={i}
            onClick={() => {
              dispatch({ type: "TOGGLE_COMPLETE", i })
          }}
            style={{
              textDecoration: complete ? "line-through" : ""
            }}
          >
            {items}
          </div>
          
        ))}
        
        </ScrollView>
      );
    }
  }
  export default React.memo(List)
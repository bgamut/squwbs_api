//import React,{useState, useEffect} from 'react'
import React, { useContext } from "react";
import {WholeContext} from "../WholeContext"
import {ScrollView} from 'react-native'
// function ListItem(props){
//     const[checked, setChecked]=useState(false);
//     useEffect(()=>{
//         if(checked){
//             const timeoutHandle = setTimeout(props.onDelete,3000)
//             return ()=>{
//                 clearTimeout(timeoutHandle);
//             }
//         }
//     },[checked])
//     function handleCheckChange(e){
//         //console.log(e)
//         setChecked(e.target.checked)
//     }
//     const style = checked ? {
//         textDecoration: 'line-through'
//     }:{};
//     return(
//         <div className='list__item'>
//             <input type='checkbox' onChange={handleCheckChange}/>
//             <span style={style}>{props.text}</span>
//         </div>
//     )
// }
// export default function List(props){
//     return(
//         <div className='list'>
//             {props.items.map(item=>(
//                 <ListItem key={item.id}
//                 onDelete={props.onDelete.bind(null,item.id)}
//                 text={item.text}
//                 />
//             ))}
//         </div>    
//     )
// }
var id =0
export default () => {
    const { obj, dispatch } = useContext(WholeContext);
    
    return (
      <ScrollView style={{flex:1}}>
          
        {obj.map(({ text, complete }, i) => (
            
          <div
            key={id}
            onClick={() => {
              dispatch({ type: "TOGGLE_COMPLETE", i })
              id++
          }}
            style={{
              textDecoration: complete ? "line-through" : ""
            }}
          >
            {text}
          </div>
          
        ))}
        
        </ScrollView>
    );
  };
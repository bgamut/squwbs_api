import React, {useReducer,useState,useEffect,memo} from 'react'
import Form from './Form'
import List from './List'
import Header from './Header'
import Posts from './Posts'
import Postform from './Postform'
//import ListView from 'react'
// var i=1
//  export default function Todo(props){

//   console.log(props.items)
//   const [items, setItems]=useState(props.items);

  
//   useEffect(()=>{
//     props.itemsChanged(items);

//   },[items])
//   function handleOnAdd(value){
//     setItems([...items,
//         {
//           id:i++,
//           text:value
//         } 
//       ])
      
    
//   }
//   function handleOnDelete(id){
   
//     const index=items.findIndex((item)=>item.id===id);
//       if(index !== -1){
//         items.splice(index, 1)
//         setItems(
//           [
//             ...items
//           ]
//         )
//       }
//   }
  
//    return(
//     <div className='todo'>
//       <Form onAdd = {handleOnAdd}/>
//       <List items = {items} onDelete={handleOnDelete}/>
//     </div>
//    )
   
//   /*
//   return(
//     <div className='todo'>
//       <Header/>
//     </div>
//    )
//    */
//  }
export default memo(() => {
  return (
    <div>
      
      <Posts/>
      <Form />
   
        {/* <List /> */}
        {/* <Posts/> */}
    </div>
  );
});
// export default ()=>{
//   return (
//     <div>
//       <Postform />
//       <hr />
//       <Posts />
//     </div>
//   )
// }
import React, {useReducer,useState,useEffect} from 'react'
//import Form from './Form'
//import List from './List'
//import React,{useState, useEffect} from 'react'
export function Form(props){
  const [value, setValue]=useState('');

  function handleAdd(e){
      e.preventDefault();
      props.onAdd(value);
  }
  function handleChange(e){
      setValue(e.target.value)
  }
  return(
      <form>
          <input
              type = 'text'
              placeholder='Add Todo'
              value={value}
              onChange={handleChange}
          />
          <button onClick={handleAdd}>Add</button>
      </form>
  )
}
function ListItem(props){
    const[checked, setChecked]=useState(false);
    useEffect(()=>{
        if(checked){
            const timeoutHandle = setTimeout(props.onDelete,3000)
            return ()=>{
                clearTimeout(timeoutHandle);
            }
        }
    },[checked])
    function handleCheckChange(e){
        //console.log(e)
        setChecked(e.target.checked)
    }
    const style = checked ? {
        textDecoration: 'line-through'
    }:{};
    return(
        <div className='list__item'>
            <input type='checkbox' onChange={handleCheckChange}/>
            <span style={style}>{props.text}</span>
        </div>
    )
}
export function List(props){
    return(
        <div className='list'>
            {props.items.map(item=>(
                <ListItem key={item.id}
                onDelete={props.onDelete.bind(null,item.id)}
                text={item.text}
                />
            ))}
        </div>    
    )
}
//import Header from './Header'
var i=1
export default function Todo(props){

  console.log(props.items)
  const [items, setItems]=useState(props.items);

  
  useEffect(()=>{
    props.itemsChanged(items);

  },[items])
  function handleOnAdd(value){
    setItems([...items,
        {
          id:i++,
          text:value
        } 
      ])
      
    
  }
  function handleOnDelete(id){
   
    const index=items.findIndex((item)=>item.id===id);
      if(index !== -1){
        items.splice(index, 1)
        setItems(
          [
            ...items
          ]
        )
      }
  }
  
   return(
    <div className='todo'>
      <Form onAdd = {handleOnAdd}/>
      <List items = {items} onDelete={handleOnDelete}/>
    </div>
   )
   
  /*
  return(
    <div className='todo'>
      <Header/>
    </div>
   )
   */
 }
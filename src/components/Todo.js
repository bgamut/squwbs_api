import React, { Component,Context } from 'react';

const Post=(props)=>{
    return (
        <div key={props.id}>
            <p >{props.material}</p>
        </div>
    )
}

class Posts extends Component{

    render(){
        return(
            this.props.posts.map((post, i)=>
                <div>
                    <Post id={i} meterial={post}/>
                </div>
            )
        )
    }
} 
    


    


  


    


 
    


export default () => {
  return (
    <div>     
      <Posts/>
      <Form />
    </div>
  );
};

import {Dimensions} from 'react-native'
export const fetchPosts = () => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: 'FETCH_POSTS',
        payload: posts
      })
    );
};
export const setTitleOnload = (title) => {
  
   return({
     type: 'SET_TITLE',
     payload: title
   })
  }

export const getYscrolled=(e)=>{
    var payload=String(e.target)
    return({
      type:'GET_Y_SCROLLED',
      payload:payload
    })
}

export const updateDimensions =(event) =>{
  //var width= Math.floor(Dimensions.get('window').width)
        //console.log('width received is'+event.target.innerWidth)
        return({
          type:'SET_WIDTH',
          payload:event.target.innerWidth
        })
}
export const createPost = (postData) => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
    .then(res => res.json())
    .then(post =>
      dispatch({
        type: 'NEW_POST',
        payload: post
      })
    );
};
export const addPost = (text) => dispatch => {
  //console.log(text)
    dispatch({
      type: 'ADD_POST',
      payload: text
    }) 
};
export const setTitle = (title) => dispatch => {
  //console.log(title)
  dispatch({
    type: 'SET_TITLE',
    payload: title
  })

};
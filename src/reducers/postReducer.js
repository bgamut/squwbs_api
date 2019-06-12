const initialState = {
  items: [],
  item: {},
  title:'',
  width:0,
  text:[],
  yscrolled:0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_POSTS':
      return {
        ...state,
        items: action.payload
      };
    case 'NEW_POST':
      return {
        ...state,
        item: action.payload
      };
    case 'ADD_POST':
      //console.log(...state.text)
      return {
        ... state,
        items:[...state.items,action.payload.text]
      };
    case 'SET_TITLE':
      
      console.log('set title from reducer'+action.payload)
      return {
        ...state,
        title: action.payload
      };
    case 'GET_Y_SCROLLED':
      
        console.log('get_y_scrolled from reducer'+action.payload)
        return {
          ...state,
          yscrolled: action.payload
        };
    case 'SET_WIDTH':
      
      console.log('width received is'+action.payload)
      return {
        ...state,
        width: action.payload
      };
    default:
      return state;
  }
}
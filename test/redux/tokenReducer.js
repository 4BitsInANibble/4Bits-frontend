// tokenReducer.js
const initialState = {
    access: "",
    refresh: ""
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKENS':
      return action.payload
    case 'SET_REFRESH_TOKEN':
      return {...state, refresh: action.payload}
    case 'SET_ACCESS_TOKEN':
      return {...state, access: action.payload}
    // handle other user-related actions
    default:
      return state;
  }
};

export default tokenReducer;

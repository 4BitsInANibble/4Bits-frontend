// userReducer.js
const initialState = {
    
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return action.payload
      case 'SET_UNITS':
        return { ...state, units: action.payload}
      // handle other user-related actions
      default:
        return state;
    }
  };
  
  export default userReducer;
  
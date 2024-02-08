// userReducer.js
const initialState = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    units: "Imperial",
    // other user-related state properties
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return { ...state, ...action.payload}
      case 'SET_UNITS':
        return { ...state, units: action.payload}
      // handle other user-related actions
      default:
        return state;
    }
  };
  
  export default userReducer;
  
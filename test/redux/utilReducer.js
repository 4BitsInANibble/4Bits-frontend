// serverReducer.js
const initialState = {
    themeType: 'light',
    // other post-related state properties
  };
  
const utilReducer = (state = initialState, action) => {
switch (action.type) {
    case 'SET_THEME':
      return { ...state, themeType: action.payload };
    // handle other post-related actions
    default:
    return state;
}
};

export default utilReducer;
  
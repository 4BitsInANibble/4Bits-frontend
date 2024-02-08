// serverReducer.js
const initialState = {
    serverId: '',
    // other post-related state properties
  };
  
const serverReducer = (state = initialState, action) => {
switch (action.type) {
    case 'SET_SERVER':
    return { ...state, serverId: action.payload };
    // handle other post-related actions
    default:
    return state;
}
};

export default serverReducer;
  
// rootReducer.js
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import serverReducer from './serverReducer';
import utilReducer from './utilReducer';

const rootReducer = combineReducers({
  user: userReducer,
  server: serverReducer,
  utils: utilReducer,
  // you can add more reducers here if needed
});

export default rootReducer;

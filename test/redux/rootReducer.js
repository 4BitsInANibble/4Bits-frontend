// rootReducer.js
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import serverReducer from './serverReducer';
import utilReducer from './utilReducer';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({
  user: userReducer,
  server: serverReducer,
  utils: utilReducer,
  tokens: tokenReducer,
  // you can add more reducers here if needed
});

export default rootReducer;

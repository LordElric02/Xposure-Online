import { combineReducers } from 'redux';
import authReducer from './authReducer';
import videoReducer from './videoPlayerReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  video: videoReducer,
  // other reducers can be added here
});

export default rootReducer;

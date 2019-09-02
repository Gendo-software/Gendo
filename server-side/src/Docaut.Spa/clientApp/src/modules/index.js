import { combineReducers } from 'redux';
import counter from './counter';
import {reducer as reduxFormReducer} from 'redux-form';

export default combineReducers({
  counter,
  form: reduxFormReducer,
});

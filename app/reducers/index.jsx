import { combineReducers } from 'redux';
import carousel from './carousel';
import currentProuct from './currentProuct';

const rootReducer = combineReducers({
	carousel,
	currentProuct
});


export default rootReducer

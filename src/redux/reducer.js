import { combineReducers } from 'redux';
// import { MEMBER, HISTORY, YOUTUBE } from './action';
import * as types from './action';

const memberReducer = (state = [], action) => {
	switch (action.type) {
		case types.MEMBER.success:
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

const historyReducer = (state = [], action) => {
	//3
	// console.log(action.payload);
	switch (action.type) {
		case types.HISTORY.success:
			return { ...state, history: action.payload };
		default:
			return state;
	}
};
//5
// console.log(historyReducer);

const youtubeReducer = (state = [], action) => {
	switch (action.type) {
		case types.YOUTUBE.success:
			return { ...state, youtube: action.payload };
		case types.YOUTUBE.fail:
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ memberReducer, historyReducer, youtubeReducer });

export default reducers;

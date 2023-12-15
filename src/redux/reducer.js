import { combineReducers } from 'redux';

const memberReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

const historyReducer = (state = [], action) => {
	//3
	// console.log(action.payload);
	switch (action.type) {
		case 'SET_HISTORY':
			return { ...state, history: action.payload };
		default:
			return state;
	}
};
//5
// console.log(historyReducer);

const youtubeReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_YOUTUBE':
			return { ...state, yutube: action.payload };
		default:
			return state;
	}
};
const reducers = combineReducers({ memberReducer, historyReducer, youtubeReducer });

export default reducers;

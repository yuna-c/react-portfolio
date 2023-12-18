import { combineReducers } from 'redux';
// import { MEMBER, HISTORY, YOUTUBE } from './action';
import * as types from './action';

const memberReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case types.MEMBER.success:
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

const historyReducer = (state = { history: [] }, action) => {
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

const youtubeReducer = (state = { youtube: [] }, action) => {
	// 객체 안에 00라는 프로포티 안에 배열로 빈받아야함
	switch (action.type) {
		case types.YOUTUBE.success:
			return { ...state, youtube: action.payload };
		// 유튜브 키값 안에 배열로되어있는걸 배열로바꿔야됨
		case types.YOUTUBE.fail:
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const modalReducer = (state = { modal: false }, action) => {
	// { modal: false } 이고 왜 객체에 받아?
	switch (action.type) {
		case types.MODAL.start:
			return { ...state, modal: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ memberReducer, historyReducer, youtubeReducer, modalReducer });

export default reducers;

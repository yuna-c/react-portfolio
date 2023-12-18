import './globalStyles/Reset.scss';
import './globalStyles/Variables.scss';
import { Route } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMedia } from './hooks/useMedia';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import Contact from './components/sub/contact/Contact';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Youtube from './components/sub/youtube/Youtube';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Department from './components/sub/department/Department';
import Welcome from './components/sub/members/Welcome';
import Menu from './components/common/menu/Menu';
import Detail from './components/sub/youtube/Detail';
import Num from './components/sub/num/Num';
import * as types from './redux/action';
// npm i redux@4 react-redux@8

export default function App() {
	const dispatch = useDispatch();
	//6
	// useSelector(store => console.log(store)); 리덕스는 문제없어
	const path = useRef(process.env.PUBLIC_URL);
	const [Dark, setDark] = useState(false);

	const fetchDepartment = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/department.json`);
		const json = await data.json();
		dispatch({ type: types.MEMBER.success, payload: json.members });
	}, [dispatch]);

	const fetchHistory = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/history.json`);
		const json = await data.json();
		// console.log(json);
		dispatch({ type: types.HISTORY.success, payload: json.history });
	}, [dispatch]);

	const fetchYoutube = useCallback(async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const pid = process.env.REACT_APP_YOUTUBE_LIST;
		const num = 10;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			dispatch({ type: types.YOUTUBE.success, payload: json.items });
		} catch (err) {
			dispatch({ type: types.YOUTUBE.fail, payload: err });
		}
	}, [dispatch]);

	useEffect(() => {
		fetchDepartment();
		fetchHistory();
		fetchYoutube();
	}, [fetchDepartment, fetchHistory, fetchYoutube]);

	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header Dark={Dark} setDark={setDark} />
			<Route exact path='/' component={MainWrap} />
			<Route path='/department' component={Department} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/detail/:id' component={Detail} />
			<Route path='/num' component={Num} />
			<Route path='/welcome/:id' component={Welcome} />
			<Footer />
			<Menu />
		</div>
	);
}

/*
1. reducer, store, app으로의 전달 흐름 이해
2. reducer가 하는 역할
3. action객체가 필요한 이유
4. 컴포넌트에서 데이터 호출 및 데이터 변경 요청을 위한 useSelector, useDispatch
5. app에서 fetching후 action객체를 통해 dispatch로 reducer에 데이터 변경 요청 흐름
6. action type을 따로 객체 형태로 관리하는 이유 : 파일 하나로만 관리하려고
 */

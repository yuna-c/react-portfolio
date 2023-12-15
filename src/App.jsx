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

export default function App() {
	const dispatch = useDispatch();
	//6
	// useSelector(store => console.log(store)); 리덕스는 문제없어
	const path = useRef(process.env.PUBLIC_URL);
	const [Dark, setDark] = useState(false);
	const [Toggle, setToggle] = useState(false);

	//App fetcing 함수 추가
	//reducer 함수로 action 객체 받아서 처리
	const fetchDepartment = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/department.json`);
		const json = await data.json();
		dispatch({ type: 'SET_MEMBERS', payload: json.members });
	}, [dispatch]);

	// const fetchHistory = useCallback(async () => {
	// 	const data = await fetch(`${path.current}/DB/history.json`);
	// 	const json = await data.json();
	// 	//2오류 잡을때 히스토리 패칭 문제 없어
	// 	// console.log(json);
	// 	dispatch({ type: 'SET_HISTORT', payload: json.history });
	// }, [dispatch]);

	const fetchHistory = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/history.json`);
		const json = await data.json();
		//2오류 잡을때 히스토리 패칭 문제 없어
		// console.log(json);
		dispatch({ type: 'SET_HISTORY', payload: json.history });
	}, [dispatch]);

	useEffect(() => {
		fetchDepartment();
		fetchHistory();
	}, [fetchDepartment, fetchHistory]);

	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header Dark={Dark} setDark={setDark} Toggle={Toggle} setToggle={setToggle} />
			<Route exact path='/' component={MainWrap} />
			<Route path='/department' component={Department} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/detail/:id' component={Detail} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/num' component={Num} />
			<Route path='/welcome/:id' component={Welcome} />
			<Footer />
			{Toggle && <Menu setToggle={setToggle} />}
		</div>
	);
}

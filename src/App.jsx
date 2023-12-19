import { useState, useEffect } from 'react';
import './globalStyles/Reset.scss';
import './globalStyles/Variables.scss';
import { Route } from 'react-router-dom';
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
import { useDispatch } from 'react-redux';
//7
import * as types from './redux/actionType';

export default function App() {
	const dispatch = useDispatch();
	// useSelector(store => console.log(store));

	useEffect(() => {
		dispatch({ type: types.MEMBERS.start });
		dispatch({ type: types.HISTORY.start });
		dispatch({ type: types.YOUTUBE.start });
		dispatch({ type: types.FLICKR.start, opt: { type: 'user', id: '199645532@N06' } });
	}, [dispatch]);

	const [Dark, setDark] = useState(false);

	// 4개 멤버스데이터 콘솔 뜨는 이유 스테이트 3개 1.store, 2.dark 3,toggle
	// 스테이트 여러개여도 오토배칭(그룹화 해서) 한번 마운트되면 스테이트 해서 재랜딩해해서 스테이트 한번에 처리
	// ...?

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
			<Route path='/youtube' component={Youtube} />
			<Route path='/num' component={Num} />
			<Route path='/welcome/:id' component={Welcome} />
			<Footer />
			<Menu />
		</div>
	);
}

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
import { useDispatch, useSelector } from 'react-redux';
import { fetchYoutube } from './redux/youtubeSlice';
import { fetchMember } from './redux/memberSlice';
import { fetchHistory } from './redux/historySlice';

export default function App() {
	const dispatch = useDispatch();
	useSelector(store => console.log(store));

	const [Dark, setDark] = useState(false);
	const [Toggle, setToggle] = useState(false);

	useEffect(() => {
		dispatch(fetchYoutube());
		dispatch(fetchMember());
		dispatch(fetchHistory());
	}, [dispatch]);

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

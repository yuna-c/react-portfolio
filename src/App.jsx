import { useState } from 'react';
import './globalStyles/Reset.scss';
import './globalStyles/Variables.scss';
import { Route } from 'react-router-dom';
import { useMedia } from './hooks/useMidia';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import Contant from './components/sub/contant/Contant';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Youtube from './components/sub/youtube/Youtube';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Department from './components/sub/department/Department';
import Menu from './components/common/menu/Menu';

export default function App() {
	const [Dark, setDark] = useState(false); //toggle 은 boolean
	const [Toggle, setToggle] = useState(false);

	return (
		/* 리액트가 제어할 수 있는 범위 */
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header Dark={Dark} setDark={setDark} Toggle={Toggle} setToggle={setToggle} />
			<Route exact path='/' component={MainWrap} />
			<Route path='/department' component={Department} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/members' component={Members} />
			<Route path='/contant' component={Contant} />
			<Footer />
			{Toggle && <Menu setToggle={setToggle} />}
			{/* 데스크탑 버전에서도 생김 방지 */}
		</div>
	);
}

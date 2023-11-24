import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Contant from './components/sub/contant/Contant';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Youtube from './components/sub/youtube/Youtube';
import { Route } from 'react-router-dom';

export default function App() {
	return (
		<>
			<Header />
			{/* 
			라우터 : 해당 컴포넌트만 보이게
			<Route path='/'><MainWrap /></Route> 밑에꺼랑 같은고얌!
			*/}
			<Route exact path='/' component={MainWrap} />
			{/* exact : 슬러시 하나일 때만 보이게 하게따  */}
			<Route path='/department' component={Department} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/members' component={Members} />
			<Route path='/contant' component={Contant} />
			<Footer />
		</>
	);
}

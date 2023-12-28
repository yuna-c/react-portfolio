import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';

import Menu from './components/common/menu/Menu';
import Detail from './components/sub/youtube/Detail';
import Welcome from './components/sub/members/Welcome';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import Members from './components/sub/members/Members';
import Contact from './components/sub/contact/Contact';
import Gallery from './components/sub/gallery/Gallery';
import Youtube from './components/sub/youtube/Youtube';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Department from './components/sub/department/Department';
import CookieModal from './components/common/cookieModal/CookieModal';

import { Route } from 'react-router-dom';
import { useMedia } from './hooks/useMedia';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGlobalData } from './hooks/useGlobalData';
// import { useCookie } from './hooks/useCookie';

//비동기 데이터 : 디파트먼트, 히스토리, 유튜브, 플리커
export default function App() {
	const { Dark } = useGlobalData();
	const queryClient = new QueryClient();
	// useCookie('today', 'done', 20);
	// console.log(document.cookie);

	return (
		<QueryClientProvider client={queryClient}>
			<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
				<Header />
				<Route exact path='/' component={MainWrap} />
				<Route path='/department' component={Department} />
				<Route path='/gallery' component={Gallery} />
				<Route path='/community' component={Community} />
				<Route path='/members' component={Members} />
				<Route path='/contact' component={Contact} />
				<Route path='/youtube' component={Youtube} />
				<Route path='/detail/:id' component={Detail} />
				<Route path='/welcome/:id' component={Welcome} />
				<Footer />
				<Menu />
				<CookieModal wid={300} ht={200}>
					<h1>쿠키팝업</h1>
				</CookieModal>
			</div>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

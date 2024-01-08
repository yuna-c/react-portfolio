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
import { useState } from 'react';
// import { useCookie } from './hooks/useCookie';

//비동기 데이터 : 디파트먼트, 히스토리, 유튜브, 플리커
export default function App() {
	console.log('re-rander');
	const { Mode } = useGlobalData();
	const queryClient = new QueryClient();
	// useCookie('today', 'done', 20);
	// console.log(document.cookie);
	const [Count1, setCount1] = useState(1);
	const [Count2, setCount2] = useState(2);
	const [Count3, setCount3] = useState(3);

	const returnPromise = () => {
		return new Promise(res => setTimeout(res, 500));
	};

	const changeState = () => {
		//promise가 반환되는 핸들러안쪽에서 복수개의 state가 변경된다면
		//Batching기능이 풀리면서
		//state의 갯수만큼 재랜더링 발생 --> 해당 기능을 개선한것이 react18에서의 auto Batching
		returnPromise().then(() => {
			setCount1(Count1 + 1);
			setCount2(Count2 + 1);
			setCount3(Count3 + 1);
		});
	};

	return (
		<QueryClientProvider client={queryClient}>
			<div className={`wrap ${Mode === 'light' ? 'light' : 'dark'} ${useMedia()}`}>
				<button onClick={changeState}>변경</button>
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

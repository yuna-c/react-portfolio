import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';

import Menu from './components/common/memu/Menu';
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

import { useState } from 'react';
import { Route } from 'react-router-dom';
import { useMedia } from './hooks/useMedia';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGlobalData } from './hooks/useGlobalData';

//비동기 데이터 : 디파트먼트, 히스토리, 유튜브, 플리커
export default function App() {
	const { Dark } = useGlobalData();
	const queryClient = new QueryClient();

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
			</div>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

/*
react-query 개념정리
: server-side-data를 static한 상테로 전역객체(global context)에 물리적으로 저장하는 것이 아닌 
: 섭족 데이터가 필요할 때마다 호출해서 항상 최신상태의 서버데이터 사용을 위한 라이브러리
: 쿼리키를 통해서 특정 fetching된 promise 리턴 값을 매핑해서 서버 요청시 동일한 쿼리키에 이미 매핑된 데이터가 있으면 refetching 하지 않음
: 쿼리키로 초기 데이터 매핑시 cacheTime(gc Time), staleTime 을 지정해서 서버 데이터의 캐시저장 및 refetching 금지 시간 지정

react-query 작업순서
1. index 혹은 App 컴포넌트에서 쿼리 클라이언트 인스턴스 생성후 provider을 통해서 전역 전달 (모든 컴포넌트에서 등록된쿼리키 공유 가능)
2. fetching func, 쿼리키를 등록하는 커스텀 훅 생성 (cacheTime, staleTime 및 서버쿼리 관련 옵션 지정)
3. 비동기 데이터가 필요한 컴포넌트에서 커스텀 훅 호출 및 반환하는 객체의 property값을 사용 (data, isSuccess풀필드 완, isError, isLoading펜딩)

raact-query 사용시 이점
1. 서버 데이터를 위한 useState, useEffect, useCallback등의 훅 사용 불필요
2. 한번 fetching한 내역이 있는 데이터는쿼리키가 동일하다는 전제하에서 cache에 등록된 값 재활용 및 불필요한 서버 요청 하지 않음
3. 쿼리 오션에 따라서 항상 최신의 서버 데이터를 핸들링 가능

context api를 활용한 전역 데이터 관리 커스텀 훅 (client=side-data 관리)
: 복잡한 서버 데이터는 이미 react-query가 관리하고 있으므로 간단한 client-side-data를 굳이 redux같은 외부 라이브러리 관리 불필요
: react에 기본 내장 되어있는 context api 기반의 createContext, useContext를 이용한 커스텀 훅 사용

context api기반 커스텀 훅 작업순서
1. createContext로 전역 context생성(store개념)
2. 전역 context에 내장되어 있는 Provider로 App을 감싸로 전역으로 관리할 State전달
3. 자식 컴포넌트에서는 useContext를 활용해서 자유롭게 전역 context값 접근 가능
*/

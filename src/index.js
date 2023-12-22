import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);
/*
	Redux버전에서 숙지할 내용
	1.flickr빼고 비동기 데이터 사용 컴포넌트에서 store로 데이터 공유 (Member, History, Youtube)
	2.client side data가 store로 공유 (Modal, Memu, Dark)
	3.Layout에서 0.3초있다 on붙게 되는데 라우터이동이 0.3초보다 빨리 이동될때 optionial chaing으로 에러핸들링
	4.Contact컴포넌트에서 throttle이 적용된 throttledSetCenter resize이벤트 연결문을 따로 useEffect로 분리
*/

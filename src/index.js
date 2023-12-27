import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
//4
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			{/* useSelector, Dispatch */}
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

/*
Redux-saga버전에서의 자가진단 항목
	1.비동기데이터의 fetching함수가 api.js에 등록되어 있고 각 컴포넌트 마운트시 fetching호출이 있는 지 확인(member, history, youtube, flickr)
	2. client-side-data가 saga없이 reducer만으로 전역관리되는지 확인 (modal, menu, dark)
	3. Layout.jsx에서 setTimoet안쪽에 참조객체 optionial chaining되어 있는 지 확인
	4. 특정 컴포넌트에서 store로부터 복수개의 reducer를 가져올때 store를 통채로 가져온다음 비구조화할당 금지 (특정 컴포넌트에 모든 리듀서객체를 다 가져올필요가 없기 때문)
	5.초기 App에서 api.js로 부터 fetching함수 호출시 인수전달되는 값이 있다면 그냥 api.js단에서 내부 default option처리가 효율적 (App에서 모든 dispatch문을 반복문 처리 가능)
*/

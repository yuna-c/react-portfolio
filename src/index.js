import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; //# 빼기

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);

/*
npm i redux@4 react-redux@8
-- redux --
store : 어떤 컴포넌트에서든 자유롭게 데이터를 공유할 수 있게 컴포넌트 외부에 있는 독립적인 전역 데이터 공간
reducer : store에 변경될 데이터를 전달해주는 변형자함수 (action 객체를 받아야지만 store에 변경 요청 가능)
action : 컴포넌트가 리듀서에 변경요청을 의뢰할 떄 필요한 특별한 형태의 객체 {type : '타입', payload : '데이터'}

-- react-redux --
dispatch : 컴포넌트에서 action 객체 전달할 때는 무조건 dispatch를 통해서만 전달 가능
selector : 컴포넌트에서 전역 store의 데이터를 요청할 떄는 무조건 selector룰 통해서만 호출 가능


리덕스 비동기 데이터의 효율적 처리를 위한 대표적인 미들웨어 2가지

npm i redux@4 react-redux@8 redux-saga

-- redux-saga --
--action객체의 변화를 감시하면서 적절한 상태 변화 시점에 액션객체를 생성해서 리듀서를 전달하는 미들웨어 (generator)

-- redux-thunk --
--함수자체를 리듀서에 전달하게 해주는 미들웨어 해당함수가 자동으로 액션객체를 반환하도록 처리

npm i @reduxjs/toolkit@1 react-redux

-- redux-toolkit --
redux-toolkit이라는 thunk기반의 통합 전역관리 패키지가 나오게된 개념
- 초반에는 액션객체를 중앙집중적으로 관리하면서 리듀서에 전달하는 방식이 thunk방식에 비해서 기존 리덕스를 사용하던 개발자에게 더 친숙해서 saga를 많이 쓰게됨
- saga방식으로 하다보니 관리할 파일의 갯수가 많아지고 코드의 관리가 어려워짐
- 데이터 카테코리 별로 전역관리할 비동기 데이터를 분리할 필요생성
- 이 시점의 불편했던 thunk방식의 코드를 개선한 redux-toolkit이라는 통합 라이브러리 등작


redux-toolkit의 장점
- 데이터별로 전역상태관리 파일을 불리할 수 있고
- 사용자가 직접 데이터 상태별로 actionType을 만들필요가 없도록 자동생성됨
- 하나의 slice파일 안에 api함수와 reducer 함수를 간결한 문법으로 관리가능

*/

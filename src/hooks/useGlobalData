//https://cafe.naver.com/2310next/249
import { createContext, useContext, useState } from 'react';

// 빈 전역 데이터 객체 생성
export const GlobalContext = createContext();

// 전역객체 생성후 특정 state 값들을 내부로 전달해 주는 wrapping 컴포넌트 생성
export function GlobalProvider({ children }) {
	const [MenuOpen, setMenuOpen] = useState(false);
	const [ModalOpen, setModalOpen] = useState(false);
	const [Dark, setDark] = useState(false);

	return <GlobalContext.Provider value={{ MenuOpen, setMenuOpen, ModalOpen, setModalOpen, Dark, setDark }}>{children}</GlobalContext.Provider>;
	// {객체}
}

// GlobalContext의 값을 호출할 수 있는 커스텀 훅
// useContext로 반환한 전체 전역데이터를 내보내는 커스텀 훅 생성후 export
export function useGlobalData() {
	const globalData = useContext(GlobalContext); //value 객체 반환(props값 비구조화 할당으로 추출 가능)
	return globalData;
}

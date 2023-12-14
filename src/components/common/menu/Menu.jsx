import { useCallback, useEffect, useRef } from 'react';
import './Menu.scss';

export default function Menu({ setToggle }) {
	/* useCallback */
	// 메모이제이션 하고싶은 함수를 안에 넣기 , []의존성 배열(정적인 상태로) useCallback안에 setToggle이라는 함수가 들어가면 메모이제이션 풀기 and useEffect에 의존성배열로 closeMenu 넣기
	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && setToggle(false);
	}, [setToggle]);

	/* 
	useRef: 리랜더링 될때 언마운트 될때까지 값을 담아놓음
	const closeMenu = useRef(() => {
		window.innerWidth >= 1000 && setToggle(false);
		// 이로케 할라면 동작은 되긴혀
		// removeEventListener('resize', closeMenu.current), 의존성 배열은 없애야대
	});
	*/
	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => window.removeEventListener('resize', closeMenu);
	}, [closeMenu]);

	return (
		<aside className='menu'>
			<h1>mobileMenu</h1>
		</aside>
	);
}

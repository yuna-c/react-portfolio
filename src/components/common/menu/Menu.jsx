import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../redux/action';
import './Menu.scss';

export default function Menu() {
	const dispatch = useDispatch();
	const Toggle = useSelector(store => store.menuReducer.menu);

	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && dispatch({ type: types.MENU.start, payload: false }); //전역 스테이트 값 불러오기
	}, [dispatch]);

	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => window.removeEventListener('resize', closeMenu);
	}, [closeMenu]);

	return (
		<>
			{Toggle && (
				<aside className='Menu' onClick={() => dispatch({ type: types.MENU.start, payload: false })}>
					<h1>Mobile Menu</h1>
				</aside>
			)}
		</>
	);
}

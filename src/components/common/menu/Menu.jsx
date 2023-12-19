import { useCallback, useEffect } from 'react';
import * as types from '../../../redux/actionType';
import { useSelector, useDispatch } from 'react-redux';

import './Menu.scss';

export default function Menu() {
	const dispatch = useDispatch();
	const Open = useSelector(store => store.menuReducer.menu);

	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && dispatch({ type: types.MENU.start, payload: false });
	}, [dispatch]);

	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => window.removeEventListener('resize', closeMenu);
	}, [closeMenu]);

	return (
		<>
			{Open && (
				<aside className='menu' onClick={() => dispatch({ type: types.MENU.start, payload: false })}>
					<h1>mobileMenu</h1>
				</aside>
			)}
		</>
	);
}

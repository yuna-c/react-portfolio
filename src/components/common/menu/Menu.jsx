import { useEffect, useCallback } from 'react';
import './Menu.scss';
import { useGlobalData } from '../../../hooks/useGlobalData';

export default function Menu() {
	const { MenuOpen, setMenuOpen } = useGlobalData();
	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && setMenuOpen(false);
	}, [setMenuOpen]);

	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => window.removeEventListener('resize', closeMenu);
	}, [closeMenu]);

	return (
		<>
			{MenuOpen && (
				<aside className='Menu'>
					<h1
						onClick={() => {
							setMenuOpen(false);
						}}>
						Mobile Menu
					</h1>
				</aside>
			)}
		</>
	);
}

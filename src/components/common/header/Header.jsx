import './Header.scss';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; //useSelector 값 반전 시켜야 되니까

import * as types from '../../../redux/action'; //액션 타입 가져오기

export default function Header({ Dark, setDark }) {
	const dispatch = useDispatch();
	const Toggle = useSelector(store => store.menuReducer.menu);

	return (
		<header className='header'>
			<h1>
				<Link to='/'>퍼펙트</Link>
			</h1>

			<ul>
				<li>
					<NavLink to='/department' activeClassName={'on'}>
						Department
					</NavLink>
				</li>
				<li>
					<NavLink to='/youtube' activeClassName={'on'}>
						Youtube
					</NavLink>
				</li>
				<li>
					<NavLink to='/gallery' activeClassName={'on'}>
						Gallay
					</NavLink>
				</li>
				<li>
					<NavLink to='/community' activeClassName={'on'}>
						Community
					</NavLink>
				</li>
				<li>
					<NavLink to='/num' activeClassName={'on'}>
						num
					</NavLink>
				</li>
				<li>
					<NavLink to='/members' activeClassName={'on'}>
						Members
					</NavLink>
				</li>
				<li>
					<NavLink to='/contact' activeClassName={'on'}>
						Contant
					</NavLink>
				</li>
			</ul>

			{/* <button onClick={() => setDark(!Dark)}>Theme</button> */}
			<div className={`themeBox ${Dark && 'dark'}`} onClick={() => setDark(!Dark)}>
				<div className='ball'></div>
			</div>

			<button
				className='menuToggle'
				onClick={() => {
					dispatch({ type: types.MENU.start, payload: !Toggle });
				}}>
				menu
			</button>
		</header>
	);
}

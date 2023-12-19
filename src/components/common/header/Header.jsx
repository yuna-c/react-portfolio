import './Header.scss';
import { NavLink, Link } from 'react-router-dom';
import * as types from '../../../redux/actionType';
import { useSelector, useDispatch } from 'react-redux';

export default function Header({ Dark, setDark }) {
	const dispatch = useDispatch();
	const Open = useSelector(store => store.menuReducer.menu);

	return (
		<header className='header'>
			<h1>
				<Link to='/'>리덕스 사가</Link>
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

			<button className='menuToggle' onClick={() => dispatch({ type: types.MENU.start, payload: true })}>
				menu
			</button>
		</header>
	);
}

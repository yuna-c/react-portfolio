import { useGlobalData } from '../../../hooks/useGlobalData';
import './Header.scss';
import { NavLink, Link } from 'react-router-dom';

export default function Header() {
	const { MenuOpen, setMenuOpen, Dark, setDark } = useGlobalData();

	return (
		<header className='Header'>
			<h1>
				<Link to='/'>리액트쿼리</Link>
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
						Gallery
					</NavLink>
				</li>
				<li>
					<NavLink to='/community' activeClassName={'on'}>
						Community
					</NavLink>
				</li>
				<li>
					<NavLink to='/members' activeClassName={'on'}>
						Members
					</NavLink>
				</li>
				<li>
					<NavLink to='/contact' activeClassName={'on'}>
						Contact
					</NavLink>
				</li>
			</ul>

			<div className={`themeBox ${Dark && 'dark'}`} onClick={() => setDark(!Dark)}>
				<div className='ball'></div>
			</div>

			<button className='menuToggle' onClick={() => setMenuOpen(!MenuOpen)}>
				menu
			</button>
		</header>
	);
}

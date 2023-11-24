import './Header.scss';
import { NavLink, Link } from 'react-router-dom';
// Link  : 링크 기능만
// NavLink : 누르면 활성화 되게
export default function Header() {
	return (
		<header className='header'>
			<h1>
				<Link to='/'>LOGO</Link>
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
					<NavLink to='/members' activeClassName={'on'}>
						Members
					</NavLink>
				</li>
				<li>
					<NavLink to='/members' activeClassName={'on'}>
						Contant
					</NavLink>
				</li>
			</ul>
		</header>
	);
}

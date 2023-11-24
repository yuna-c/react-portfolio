import './Header.scss';
import { NavLink, Link } from 'react-router-dom';
// Link  : 링크 기능만( Link 컴포넌트를 사용하면 브라우저의 주소만 바꿀뿐, 페이지를 새로 불러오지는 않는다.)
// NavLink : 누르면 활성화 되게(리액트 웹의 현재 URL과 to가 가리키는 링크가 일치할 때, activeStyle과 activeClassName이 활성화 되고 일치하지 않으면 비활성화)
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

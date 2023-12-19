import './Footer.scss';
import { FaFacebookF, FaTwitter, FaYoutube, FaGrinStars } from 'react-icons/fa';
import { NavLink, Link } from 'react-router-dom';

//npm i react-icons 아이콘 설치
//https://react-icons.github.io/react-icons/

export default function Footer() {
	return (
		<footer className='footer'>
			<h1>LOGO</h1>
			<p>2023 Dcodelab &copy; All Rights Reserved.</p>

			<ul>
				<li>
					<Link to={{ pathname: 'https://www.naver.com' }} target='_blank'>
						<FaFacebookF
						/*color={'hotpink'} size={'30'}*/
						/>
					</Link>
				</li>

				<li>
					<FaTwitter />
				</li>
				<li>
					<FaYoutube />
				</li>
				<li>
					<FaGrinStars />
				</li>
			</ul>
		</footer>
	);
}

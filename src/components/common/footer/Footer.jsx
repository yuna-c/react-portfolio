import './Footer.scss';
import { FaFacebookF, FaTwitter, FaYoutube, FaGrinStars } from 'react-icons/fa';
import { useSelector } from 'react-redux';
//npm i react-icons 아이콘 설치
//https://react-icons.github.io/react-icons/

export default function Footer() {
	const { name, position } = useSelector(store => store.memberReducer.members[0]);
	return (
		<footer className='footer'>
			<h1>LOGO</h1>
			<p>2023 Dcodelab &copy; All Rights Reserved.</p>
			<p>
				{position}:{name}
			</p>
			<ul>
				<li>
					<FaFacebookF
					/*color={'hotpink'} size={'30'}*/
					/>
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

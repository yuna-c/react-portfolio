import './Footer.scss';
import { FaFacebookF, FaTwitter, FaYoutube, FaGrinStars } from 'react-icons/fa';
import { useSelector } from 'react-redux';
//npm i react-icons 아이콘 설치
//https://react-icons.github.io/react-icons/

export default function Footer() {
	const MemberData = useSelector(store => store.memberReducer.members);
	console.log(MemberData);

	return (
		<footer className='footer'>
			<h1>LOGO</h1>
			<p>2023 Dcodelab &copy; All Rights Reserved.</p>
			<p>{MemberData && `${MemberData[0].position}:${MemberData[0].name}`}</p>
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

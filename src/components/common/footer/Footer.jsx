import './Footer.scss';
import { FaFacebookF, FaTwitter, FaYoutube, FaGrinStars } from 'react-icons/fa';

//npm i react-icons 아이콘 설치
//https://react-icons.github.io/react-icons/

export default function Footer() {
	return (
		<footer className='footer'>
			<h1>LOGO</h1>
			<p>2023 Dcodelab &copy; All Rights Reserved.</p>

			<ul>
				<li>
					{/* 외부 링크 연결시 일반 a태그 처리 rel=noopener noreferrer 속성 추가해서 window객체에 이전 리액트 컴포넌트의 정보를 참조못하게 처리 */}
					<a href='https://www.naver.com' target='_blank' rel='noopener noreferrer'>
						<FaFacebookF />
					</a>
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

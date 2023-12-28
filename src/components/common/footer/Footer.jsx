import './Footer.scss';
import { FaFacebookF, FaTwitter, FaYoutube, FaGrinStars } from 'react-icons/fa';
// import { useCookie } from '../../../hooks/useCookie';

export default function Footer() {
	// const { setCookie, isCookie, viewCookie } = useCookie();
	return (
		<footer className='footer'>
			<h1>LOGO</h1>
			<p>2023 Dcodelab &copy; All Rights Reserved.</p>

			<ul>
				<li>
					<FaFacebookF color={'hotpink'} size={'16'} />
				</li>
				<li>
					<FaTwitter color={'orange'} size={'16'} />
				</li>
				<li>
					<FaYoutube color={'green'} size={'16'} />
				</li>
				<li>
					<FaGrinStars color={'red'} size={'16'} />
				</li>
			</ul>

			{/* 
			<button onClick={() => setCookie('today', 'done', 60 * 60)}>쿠키생성</button>
			<button onClick={() => setCookie('today', 'done', 0)}>쿠키삭제</button>
			<button onClick={() => console.log(isCookie('today=done'))}>쿠키확인</button>
			<button onClick={() => viewCookie()}>모든 쿠키 보기</button> 
			*/}
		</footer>
	);
}

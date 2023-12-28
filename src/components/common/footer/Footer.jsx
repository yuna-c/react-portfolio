import './Footer.scss';
import { FaFacebookF, FaTwitter, FaYoutube, FaGrinStars } from 'react-icons/fa';
import { useCookie } from './hooks/useCookie';

export default function Footer() {
	const setCookie = useCookie();
	const createCookie = () => {
		setCookie('today', 'done', 20);
	};
	console.log(document.cookie);

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
		</footer>
	);
}

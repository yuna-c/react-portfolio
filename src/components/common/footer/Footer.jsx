import './Footer.scss';
import { FaFacebookF, FaTwitter, FaYoutube, FaGrinStars } from 'react-icons/fa';
import { useSelector } from 'react-redux';
//npm i react-icons 아이콘 설치
//https://react-icons.github.io/react-icons/

export default function Footer() {
	//순서5 - 전역 store값을 useSelector바로 호출 가능
	const MemberData = useSelector(store => store.memberReducer.members);
	// console.log(MemberData);

	return (
		<footer className='footer'>
			<h1>LOGO</h1>
			<p>2023 Dcodelab &copy; All Rights Reserved.</p>
			{/* 아래 코드에서 조건문을 쓴 이유 */}
			{/* 첫번째 렌더링시에는 store부터 빈 배열이 전달되므로 두번째 렌더링부터 해당 구문이 실행되도록 조건문 처리 */}
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

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
			<p>
				{MemberData[0]?.position}:{MemberData[0]?.name}
				{/* 빈 배열이 아닐때 동작하게 하는건데 , 값 없는건데 동작은되니까, 그래서 굳이 쓸 필요가 없다. {객체} : {객체}
				 MemberData && 멤버 데이터가 만약 객체면 동작이 되고 없으면 언디파인드 
				*/}
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

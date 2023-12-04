import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
// https://www.flickr.com/photos/199645532@N06/ 사진 업로드하기
// https://www.flickr.com/services/api/ 개발자 사이트
// URL로 데이터 호출 : Qurey string : url에 문자열로 옵션 요청을 전달하는 형태
// 기존요청 URL?옵션이름=옵션값
// http://www.abc.com/?name=${김또깡}&
// 이거 어카지
// 출력 되는 클릭 핸들러 함수가 만약 갤러리 타입이 user.type일때는 이벤트 호출 안되게 해야됌 이건 어카지?

export default function Gallery() {
	console.log('re-render');
	const myID = useRef('199645532@N06');
	// isUser의 초기 값을 내 아이디 문자값으로 등록
	const isUser = useRef(myID.current);

	const refNav = useRef(null);

	const [Pics, setPics] = useState([]);

	// 버튼 재클릭 방지
	const activateBtn = (e) => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e && e.target.classList.add('on'); //e 객체 있을 때만 처리 되게
	};

	// 이벤트 빼기
	const handleInterest = (e) => {
		if (e.target.classList.contains('on')) return;
		// interest 함수 호출시 is User값을 빈 문자열로 초기화 (false로 인식되는 값)
		isUser.current = ''; //false 강제로
		activateBtn(e);
		fetchFlickr({ type: 'interest' });
	};

	const handleMine = (e) => {
		// 콕 찍어서 isUser의 값과 myId 값이 동일할 때만 함수 중지
		//마이갤러리 함수 호출시에는 isUser의 문자값이 담겨있다고 하더라도 내아이디와 똑같지 않으면 핸들러함수를 실행하게 처리
		//다른 사용자 갤러리를 갔다가 다시 myGallery호출시 이미 다른 사용자 유저id가 담겨있기 때문에 내 갤러리가 호출되지 않는 문제를 해결하기 위함
		if (e.target.classList.contains('on') || isUser.current === myID.current) return; //해당 값이랑 내 아이디 값이 똑같이하면
		isUser.current = myID.current;
		activateBtn(e);
		fetchFlickr({ type: 'user', id: myID.current });
	};

	// user타입 갤러리는 fetching 호출 안되게(리턴 끊기) 전제조건? 뭐로 구할껀데?(불린값으로 참조객체로)
	const handleUser = (e) => {
		//isUSer값이 비어있기만 하면 중지
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn();
		fetchFlickr({ type: 'user', id: e.target.innerText });
	};

	const fetchFlickr = async (opt) => {
		const num = 50;

		const flickr_api = process.env.REACT_APP_FLICKR_API;
		const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const interestURL = `${baseURL}${method_interest}`;
		const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;

		let url = '';
		opt.type === 'user' && (url = userURL);
		opt.type === 'interest' && (url = interestURL);
		const data = await fetch(url);
		const json = await data.json();
		setPics(json.photos.photo);
	};

	useEffect(() => {
		fetchFlickr({ type: 'user', id: myID.current });
	}, []);

	return (
		<Layout title={'Gallery'}>
			<article className='controls'>
				<nav className='btnSet' ref={refNav}>
					<button onClick={handleInterest}>Interest Gallery</button>
					<button className='on' onClick={handleMine}>
						My Gallery
					</button>
				</nav>
			</article>

			<section>
				<Masonry className={'frame'} options={{ transitionDuration: '0.5s', gutter: 20 }}>
					{Pics.map((pic, idx) => {
						return (
							<article key={pic.id}>
								<div className='pic'>
									<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`} />
								</div>
								<h2>{pic.title}</h2>

								<div className='profile'>
									<img src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`} alt='사용자 프로필 이미지' onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')} />
									<span onClick={handleUser}>{pic.owner}</span>
								</div>
							</article>
						);
					})}
				</Masonry>
			</section>
		</Layout>
	);
}

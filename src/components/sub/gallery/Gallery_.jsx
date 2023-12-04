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

export default function Gallery() {
	console.log('relander');
	const myID = useRef('199645532@N06');
	// 1 참조객체에 내 아이디값 등록
	// const myID = '199645532@N06';
	const refNav = useRef(null);
	const [Pics, setPics] = useState([]);

	const activateBtn = (e) => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e.target.classList.add('on');
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
					<button
						onClick={(e) => {
							activateBtn(e);
							fetchFlickr({ type: 'interest' });
						}}
					>
						Interest Gallery
					</button>
					<button
						className='on'
						onClick={(e) => {
							activateBtn(e);
							fetchFlickr({ type: 'user', id: myID.current });
						}}
					>
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
									<span onClick={() => fetchFlickr({ type: 'user', id: pic.owner })}>{pic.owner}</span>
								</div>
							</article>
						);
					})}
				</Masonry>
			</section>
		</Layout>
	);
}

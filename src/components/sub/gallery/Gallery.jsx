import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
// https://www.flickr.com/photos/199645532@N06/ 사진 업로드하기
// https://www.flickr.com/services/api/ 개발자 사이트
// URL로 데이터 호출 : Qurey string : url에 문자열로 옵션 요청을 전달하는 형태
// 기존요청 URL?옵션이름=옵션값
// http://www.abc.com/?name=${김또깡}&

export default function Gallery() {
	console.log('relander');
	const myID = useRef('199645532@N06');
	// 1 참조객체에 내 아이디값 등록
	// const myID = '199645532@N06';
	const [Pics, setPics] = useState([]);

	const fetchFlickr = async (opt) => {
		// 3 전달받은 typedl user이면 opt객체의 id 값을
		const num = 50;
		// const myID = '199645532@N06'; //fleckr은 메서드에 따라 ??이 다르다
		const flickr_api = process.env.REACT_APP_FLICKR_API;
		// const resultURL = `${baseURL}${method_interest}&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1`;
		// 메서드 방식이랑 옵션값이 같은데.. 이거 어케 효율화해?
		const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const interestURL = `${baseURL}${method_interest}`;
		// 3 userURL에는 user_id를 상수 값이 아닌 호출시점에 전달된 otp객체의 id로 등록해서 URL 생성
		const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
		// 만들어진 URL로 데이터 전달
		let url = '';
		opt.type === 'user' && (url = userURL);
		opt.type === 'interest' && (url = interestURL);
		// const data = await fetch(interestURL);
		const data = await fetch(url);
		const json = await data.json();
		setPics(json.photos.photo);
	};

	useEffect(() => {
		//2-처음 컴포넌트 마운트시 타입을 user로 지정하고 id값으로 내 아이디등록
		fetchFlickr({ type: 'user', id: myID.current });
	}, []);

	return (
		<Layout title={'Gallery'}>
			<article className='controls'>
				<nav className='btnSet'>
					<button onClick={() => fetchFlickr({ type: 'interest' })}>Interest Gallery</button>
					<button onClick={() => fetchFlickr({ type: 'user', id: myID.current })}>My Gallery</button>
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

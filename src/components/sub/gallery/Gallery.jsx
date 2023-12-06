import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { LuSearch } from 'react-icons/lu';
import Modal from '../../common/modal/Modal';

/* flickr
	https://www.flickr.com/photos/199645532@N06/ 사진 업로드하기
	https://www.flickr.com/services/api/ 개발자 사이트
	URL로 데이터 호출 : Qurey string : url에 문자열로 옵션 요청을 전달하는 형태
	기존요청 URL?옵션이름=옵션값
	http://www.abc.com/?name=${김또깡}&
	이거 어카지
	출력 되는 클릭 핸들러 함수가 만약 갤러리 타입이 user.type일때는 이벤트 호출 안되게 해야됌 이건 어카지?

*/

export default function Gallery() {
	// console.log('re-render');
	const myID = useRef('199645532@N06');
	// isUser의 초기 값을 내 아이디 문자값으로 등록
	const isUser = useRef(myID.current);
	const refNav = useRef(null);
	const refFrameWrap = useRef(null);

	const [Pics, setPics] = useState([]);
	// const path = useRef(process.env.PUBLIC_URL);
	const [Index, setIndex] = useState(0); //순서 구해야할때 이거써
	// gutter값 변수화
	const gap = useRef(30); //값은 여기서 변경해
	// 모달
	const [Open, setOpen] = useState(false);

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
	}; // 마이갤러리눌렀을 때 재 호출 방지고 이벤트를 끊어주게

	// user타입 갤러리는 fetching 호출 안되게(리턴 끊기) 전제조건? 뭐로 구할껀데?(불린값으로 참조객체로)
	const handleUser = (e) => {
		//isUSer값이 비어있기만 하면 중지
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn(); // 사용자 아이디 클릭해서 활성화 되면 안됌
		fetchFlickr({ type: 'user', id: e.target.innerText });
	};

	//btn search input.value
	const handleSearch = (e) => {
		//이벤트 객체 전달하는 이유가모야?
		// fetchFlickr({ type: 'search', keyword: 'landscpe' });
		// fetchFlickr({ type: 'search', keyword: refKey.current });
		// 기본 submit 이벤트는 전송기능이기 때문에 무조건 화면이 새로고침 됌
		// 전송을 할 것이 아니라 리액트로 추가 로직구현을 할 것 이므로 기본 전송기능 막음
		e.preventDefault();
		isUser.current = '';
		activateBtn(); // 비활성화
		console.log(e);
		const keyword = e.target.children[0].value; //가공화 할 일 있으면 지역변수화
		if (!keyword.trim()) return; //문자값 기준 양옆 빈 문자 값(스페이스바) 있으면 .trim() 이거로 다듬어
		console.log(keyword);
		e.target.children[0].value = ''; //일일이 키워드 지워야되는데 어케?
		fetchFlickr({ type: 'search', keyword: keyword });
		//검색어 없으면 어떠케? 패칭함수로가서 처리해! 값있는지 없는지 확인부터
	};

	const fetchFlickr = async (opt) => {
		console.log('fetching again');
		//opt 객체 타입이 바뀌면 await 방식으로 동기화해서
		const num = 50;
		const flickr_api = process.env.REACT_APP_FLICKR_API;
		const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search'; //search method 추가
		const interestURL = `${baseURL}${method_interest}`;
		const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
		const searchURL = `${baseURL}${method_search}&tags=${opt.keyword}`; //search url 추가
		let url = '';
		opt.type === 'user' && (url = userURL);
		opt.type === 'interest' && (url = interestURL);
		opt.type === 'search' && (url = searchURL);
		const data = await fetch(url);
		const json = await data.json();
		/*
		//검색어 없으면 어떠케? 패칭함수로가서 처리해! 값있는지 없는지 확인부터
		if (json.photos.photo.length === 0) {
			return alert('해당 검색어의 결과값이 없습니다');
		}
		*/
		setPics(json.photos.photo); //photo 배열
	};

	// https://www.flickr.com/services/api/flickr.photos.search.html
	// tags(optional)
	// promise 에러는 패칭 문제야

	// 모달 이미지 전달하는 핸들러 함수
	// 그럼 이건 안쓰나?
	/* 아니 모션 없이 간단한 처리할 대는 써도대
	{Open && (
				<Modal setOpen={setOpen}>
					<img src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`} alt={Pics[Index].title} />
				</Modal>
			)}
	*/
	const openModal = (e) => {
		setOpen(true);
	};

	useEffect(() => {
		//마운트 되면
		refFrameWrap.current.style.setProperty('--gap', gap.current + 'px');
		fetchFlickr({ type: 'user', id: myID.current });
		// fetchFlickr({ type: 'search', keyword: 'landscpe' }); // landscpe키워드로 검색타입 갤러리 호출
	}, []);

	return (
		<>
			<Layout title={'Gallery'}>
				<article className='controls'>
					<nav className='btnSet' ref={refNav}>
						<button onClick={handleInterest}>Interest Gallery</button>
						<button className='on' onClick={handleMine}>
							My Gallery
						</button>
					</nav>

					<form onSubmit={handleSearch}>
						{/* 엔터 버튼클릭 이벤트 다돼 onSubmit={} */}
						<input type='text' placeholder='search' />
						<button className='btnSearch'>
							{/*fontSize={20} 무조건 버튼으로 감싸야 동작이 돼 */}
							<LuSearch />
						</button>
						{/* https://react-icons.github.io/react-icons/ */}
					</form>
				</article>

				<section className='frameWrap' ref={refFrameWrap}>
					<Masonry className={'frame'} options={{ transitionDuration: '0.5s', gutter: gap.current }}>
						{/*
						삼항 연산자로 배열에 받아지는 값이 없으면 경고문구 출력 
						주의점 : 삼항연산자 JSX분기 처리시 괄호로 묶어줌bla === value ? () : ()
						 */}
						{Pics.length === 0 ? (
							<h2>해당 키워드에 대한 검색결과가 없습니다.</h2>
						) : (
							Pics.map((pic, idx) => {
								return (
									<article key={pic.id}>
										<div
											className='pic'
											onClick={() => {
												setOpen(true);
												setIndex(idx);
											}}
										>
											<img
												src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
												alt={Pics.title}
											/>
											{/* alt={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}  */}
										</div>
										<h2>{pic.title}</h2>

										<div className='profile'>
											<img
												src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
												alt='사용자 프로필 이미지'
												onError={(e) =>
													e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')
												}
											/>
											{/* && `${path}/img/buddyicon.gif` */}
											<span onClick={handleUser}>{pic.owner}</span>
										</div>
									</article>
								);
							})
						)}
					</Masonry>
				</section>
			</Layout>

			<Modal Open={Open} setOpen={setOpen}>
				{Pics.length !== 0 && (
					<img
						src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`}
						alt={Pics[Index].title}
					/>
				)}
			</Modal>

			{/* 
				이미지 출력 방법 두가지 (범용적으로 쓸수 있는거는 어떤걸까?) 
				1. prop
				2. children
			 */}
		</>
	);
}

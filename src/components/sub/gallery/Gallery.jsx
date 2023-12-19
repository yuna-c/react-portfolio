import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { LuSearch } from 'react-icons/lu';
import Modal from '../../common/modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../../redux/actionType';

export default function Gallery() {
	const dispatch = useDispatch();
	const Pics = useSelector(store => store.flickrReducer.flickr);

	const myID = useRef('199645532@N06');
	const isUser = useRef(myID.current);
	const refNav = useRef(null);
	const refFrameWrap = useRef(null);
	const searched = useRef(false);

	const gap = useRef(30);

	const [Open, setOpen] = useState(false);
	const [Index, setIndex] = useState(0);

	const activateBtn = e => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach(btn => btn.classList.remove('on'));
		e && e.target.classList.add('on');
	};

	const handleInterest = e => {
		if (e.target.classList.contains('on')) return;

		isUser.current = '';
		activateBtn(e);
		dispatch({ type: types.FLICKR.start, opt: { type: 'interest' } });
	};

	const handleMine = e => {
		if (e.target.classList.contains('on') || isUser.current === myID.current) return;
		isUser.current = myID.current;
		activateBtn(e);
		dispatch({ type: types.FLICKR.start, opt: { type: 'user', id: myID.current } });
	};

	const handleUser = e => {
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn();
		dispatch({ type: types.FLICKR.start, opt: { type: 'user', id: e.target.innerText } });
	};

	const handleSearch = e => {
		e.preventDefault();
		isUser.current = '';
		activateBtn();
		console.log(e);
		const keyword = e.target.children[0].value;
		if (!keyword.trim()) return;
		console.log(keyword);
		e.target.children[0].value = '';
		dispatch({ type: types.FLICKR.start, opt: { type: 'search', keyword: keyword } });

		searched.current = true;
	};

	const openModal = e => {
		setOpen(true);
	};

	useEffect(() => {
		refFrameWrap.current.style.setProperty('--gap', gap.current + 'px');
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
						<input type='text' placeholder='search' />
						<button className='btnSearch'>
							<LuSearch />
						</button>
					</form>
				</article>

				<section className='frameWrap' ref={refFrameWrap}>
					<Masonry className={'frame'} options={{ transitionDuration: '0.5s', gutter: gap.current }}>
						{searched.current && Pics.length === 0 ? (
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
											}}>
											<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={Pics.title} />
										</div>
										<h2>{pic.title}</h2>

										<div className='profile'>
											<img
												src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
												alt='사용자 프로필 이미지'
												onError={e => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
											/>
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
					<img src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`} alt={Pics[Index].title} />
				)}
			</Modal>
		</>
	);
}

/*
1. 일반 동적 데이터를 제외한 정적인 JSX(컨텐츠) 랜더링 됨(참조객체에 20 상수값을 미리 담아놓음 )
2. 정적인 JSX가 요소가 일단 브라우저에 랜더링 완료되었기 때문에 useEffect 실행 가능해짐
3. useEffect 안쪽에서 미리 참조객체에 연결해 놓은 refFrameWrap에 접근 가능 (이때 refFrameWrap에 --gap변수에 20이라는 값을 강제 적용, 이때부터는 sass파일에 --gap이란 변수가 없더라도 리액트에서 동적으로 gap이라는 변수값을 넣었기 때문에 활용 가능)
4. 리액트에서 동적으로 변수값을 적용해서 돔을 생성하고 나면 그후에 scss가 해당 변수값을 읽어서 화면 스타일링

순서 1 - gap 이라는 참조 객체 값을 해석
순서 2 - 두번째 랜더링 타임에 userEffcet가 실행되면서 참조 객체에 담겨있는 section 요소에 강제로 gap 변수값을 적용
순서 3 - 세번째 랜더링 타임에 fectching data에 의한 동적 요소가 출력 되면서 그 떄 비로서 변수값이 적용된 sass styling 적용(paint)
*/

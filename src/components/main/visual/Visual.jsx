import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import './Visual.scss';
import 'swiper/css';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

export default function Visual() {
	const num = useRef(5);
	const swipeRef = useRef(null);
	const { isSuccess, data } = useYoutubeQuery();

	//loop값이 true시 초기 Index값을 0,1을 주면 안됨
	//onSwipe 이벤트 발생시 자동적으로 realIndex값이 기존 Index값에 1을 뺀값으로 적용되므로
	//useEffect에 의해서 prevIndex값이 0혹은 마지막 순번으로 변경되므로 기존 realIndex값과 중첩되서 버그발생
	const [PrevIndex, setPrevIndex] = useState(1);
	const [Index, setIndex] = useState(2);
	const [NextIndex, setNextIndex] = useState(3);

	const swiperOpt = useRef({
		modules: [Autoplay],
		loop: true,
		slidesPerView: 1,
		spaceBetween: 50,
		centeredSlides: true,
		onSwiper: swiper => (swipeRef.current = swiper),
		onSlideChange: swiper => setIndex(swiper.realIndex),
		//autoplay: { delay: 2000, disableOnInteraction: true },
		breakpoints: {
			1000: { slidesPerView: 2 },
			1400: { slidesPerView: 3 }
		}
	});

	const trimTitle = title => {
		let resultTit = '';
		if (title.includes('(')) resultTit = title.split('(')[0];
		else if (title.includes('[')) resultTit = title.split('[')[0];
		else resultTit = title;
		return resultTit;
	};

	useEffect(() => {
		Index === 0 ? setPrevIndex(num.current - 1) : setPrevIndex(Index - 1);
		Index === num.current - 1 ? setNextIndex(0) : setNextIndex(Index + 1);
	}, [Index]);

	return (
		<figure className='Visual'>
			<div className='txtBox'>
				<ul>
					{isSuccess &&
						data.map((el, idx) => {
							if (idx >= 5) return null;

							return (
								<li key={el.id} className={idx === Index ? 'on' : ''}>
									<h3>{trimTitle(el.snippet.title)}</h3>
								</li>
							);
						})}
				</ul>
			</div>

			<Swiper {...swiperOpt.current}>
				{isSuccess &&
					data.map((el, idx) => {
						if (idx >= num.current) return null;
						return (
							<SwiperSlide key={el.id}>
								<div className='pic'>
									<strong
										style={{ position: 'absolute', top: '-20px', left: '-20px', fontSize: '3rem', fontWeight: 900, zIndex: 3, color: 'hotpink' }}>
										{idx + 1}.
									</strong>
									<p>
										<Link to={`/detail/${el.id}`}>
											<img src={el.snippet.thumbnails.standard.url} alt={el.snippet.title} />
										</Link>
									</p>
									<p>
										<Link to={`/detail/${el.id}`}>
											<img src={el.snippet.thumbnails.standard.url} alt={el.snippet.title} />
										</Link>
									</p>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>

			<nav className='preview'>
				{isSuccess && (
					<>
						<p className='prevBox' onClick={() => swipeRef.current.slidePrev(400)}>
							<img src={data[PrevIndex].snippet.thumbnails.default.url} alt={data[PrevIndex].snippet.title} />
						</p>
						<p className='nextBox' onClick={() => swipeRef.current.slideNext(400)}>
							<img src={data[NextIndex].snippet.thumbnails.default.url} alt={data[NextIndex].snippet.title} />
						</p>
					</>
				)}
			</nav>
		</figure>
	);
}

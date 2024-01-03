import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import './Visual.scss';
import 'swiper/css';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css/navigation';
// https://v8.swiperjs.com/swiper-api#methods-and-properties

export default function Visual() {
	const num = useRef(5);
	const { isSuccess, data } = useYoutubeQuery();
	// console.log(data);
	const [Index, setIndex] = useState(0);
	// console.log(Index);
	// 이거 안대
	// let prevIndex = useRef(4);
	// let nextIndex = useRef(1);
	const [PrevIndex, setPrevIndex] = useState(4);
	const [NextIndex, setNextIndex] = useState(1);

	const swiperOpt = useRef({
		modules: [Autoplay, Navigation],
		autoplay: { delay: 4000, disableOnInteraction: true },
		loop: true,
		// loop: true, (swiper.realIndex)
		// loop: false, (swiper.activeIndex)
		slidesPerView: 1,
		spaceBetween: 50,
		centeredSlides: true,
		onSwiper: swiper => {
			swiper.slideNext(300);
		},
		breakpoints: {
			1000: { slidesPerView: 2 },
			1400: { slidesPerView: 3 }
		},
		onSlideChange: swiper => {
			console.log(swiper.realIndex, 'loop true');
			setIndex(swiper.realIndex);
			// console.log(swiper.activeIndex, 'non loop');
		},
		navigation: true

		// init: swiper => {
		// 	console.log('swiper 초기화 될때 실행');
		// 	// swiper.slideNext(-1);
		// }
	});

	useEffect(() => {
		// Index === 0 ? (prevIndex.current = 4) : (prevIndex.current = Index - 1);
		// Index === 4 ? (nextIndex.current = 0) : (nextIndex.current = Index + 1);
		// console.log('prev', prevIndex.current);
		// console.log('next', nextIndex.current);

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
									<Link to={`/detail/${el.id}`}>
										<h3>{el.snippet.title}</h3>
									</Link>
								</li>
							);
						})}
				</ul>
			</div>

			<Swiper {...swiperOpt.current}>
				{isSuccess &&
					data.map((el, idx) => {
						if (idx >= num.current - 1) return null;
						return (
							<SwiperSlide key={el.id}>
								<div className='pic'>
									<p>{idx + 1}.</p>
									<p>
										<img src={el.snippet.thumbnails.standard.url} alt={el.snippet.title} />
									</p>
									<p>
										<img src={el.snippet.thumbnails.standard.url} alt={el.snippet.title} />
									</p>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>

			<nav className='preivew'>
				{isSuccess && (
					<>
						<p className='prevBox'>
							<img src={data[PrevIndex].snippet.thumbnails.default.url} alt={data[PrevIndex].snippet.title} />
						</p>
						<p className='nextBox'>
							<img src={data[NextIndex].snippet.thumbnails.default.url} alt={data[NextIndex].snippet.title} />
						</p>
					</>
				)}
			</nav>
		</figure>
	);
}

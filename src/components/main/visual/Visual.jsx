import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import './Visual.scss';
import 'swiper/css';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// https://v8.swiperjs.com/swiper-api#methods-and-properties

export default function Visual() {
	const { isSuccess, data } = useYoutubeQuery();
	// console.log(data);
	const [Index, setIndex] = useState(0);
	// console.log(Index);

	const swiperOpt = useRef({
		modules: [Autoplay],
		autoplay: { delay: 2000, disableOnInteraction: true },
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
		}
	});
	return (
		<figure className='Visual'>
			<div className='txtBox'></div>
			<Swiper {...swiperOpt.current}>
				{isSuccess &&
					data.map((el, idx) => {
						if (idx >= 5) return null;
						return (
							<SwiperSlide key={el.id}>
								<div className='pic'>
									<p>
										<img src={el.snippet.thumbnails.standard.url} alt={el.snippet.title} />
									</p>
									<p>
										<img src={el.snippet.thumbnails.standard.url} alt={el.snippet.title} />
									</p>
								</div>
								<div className='txt'>
									<Link to={`/detail/${data.id}`}>{el.snippet.title}</Link>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>
		</figure>
	);
}

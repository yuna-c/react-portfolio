import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import './Visual.scss';
import 'swiper/css';
import { useRef, useState } from 'react';
// import { Link } from 'react-router-dom';

export default function Visual() {
	const { isSuccess, data } = useYoutubeQuery();
	console.log(data);
	const swiperOpt = useRef({
		modules: [Autoplay],
		autoplay: { delay: 2000, disableOnInteraction: true },
		loop: true,
		slidesPerView: 1,
		spaceBetween: 0,
		centeredSlides: true,
		breakpoints: {
			1000: { slidesPerView: 2, spaceBetween: 50 },
			1400: { slidesPerView: 3, spaceBetween: 50 }
		}
	});

	return (
		<figure className='Visual'>
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
								{/* <Link to={`/detail/${data.id}`}></Link> */}
							</SwiperSlide>
						);
					})}
			</Swiper>
		</figure>
	);
}

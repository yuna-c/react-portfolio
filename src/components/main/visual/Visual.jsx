import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Visual.scss';
import { useSelector } from 'react-redux';
//$ npm i swiper@8

export default function Visual() {
	const { youtube } = useSelector(store => store.youtubeReducer);
	console.log(youtube);

	return (
		<figure className='Visual'>
			<Swiper>
				{youtube.map((vid, idx) => {
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={vid.id}>
							<div className='inner'>
								<h3>{vid.snippet.title}</h3>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</figure>
	);
}

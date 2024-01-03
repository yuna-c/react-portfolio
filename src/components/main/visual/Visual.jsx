import './Visual.scss';
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Visual() {
	const Vids = useSelector(store => store.youtube.data);
	useSelector(store => console.log(store.youtube.data));
	console.log('❤❤❤❤❤');

	return (
		<figure className='Visual'>
			<Swiper>
				{Vids.length !== 0 &&
					Vids.map((data, idx) => {
						if (idx >= 5) return null;
						return (
							<SwiperSlide key={data.id}>
								<div className='inner'>
									<div className='picBox'>
										{/* <Link to={`/detail/${data.id}`}> */}
										<img
											src={data.snippet.thumbnails.standard ? data.snippet.thumbnails.standard.url : '/img/member1.jpg'}
											alt={data.snippet.title}
										/>
										{/* </Link> */}
									</div>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>
		</figure>
	);
}

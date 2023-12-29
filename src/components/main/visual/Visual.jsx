import 'swiper/css';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper';
import './Visual.scss';
import { useSelector } from 'react-redux';
// npm i swiper@8
// https://v8.swiperjs.com/get-started

export default function Visual() {
	const { youtube } = useSelector(store => store.youtubeReducer);
	console.log(youtube);

	return (
		<figure className='Visual'>
			<Swiper
				modules={[Pagination, Autoplay]}
				loop={true}
				pagination={{
					clickable: true,
					renderBullet: (index, className) => {
						return `<span class=${className}>${index + 1}</span>`;
						// <span className={className}>${index +1}</span>
						// '<span class="' + className + '">' + (index + 1) + '</span>'
					}
				}}
				autoplay={{
					delay: 3000,
					disableOnInteraction: true
				}}>
				{youtube.map((vid, idx) => {
					if (idx >= 5) return null;

					return (
						<SwiperSlide key={vid.id}>
							<div className='inner'>
								<h3>
									{idx}.{vid.snippet.title}
								</h3>
							</div>
						</SwiperSlide>
					);
				})}
				<Btns />
			</Swiper>
		</figure>
	);
}

function Btns() {
	// Swiper컴포넌트 안쪽에 있는 또 다른 자식 컴포넌트 안쪽에서만 useSwiper hook 사용 가능
	// hook으로부터 생성된 객체 (인스턴스)에는 다양한 prototype메서드와 property값 활용 가능
	const swiper = useSwiper();
	return (
		<nav className='swiperContriller'>
			<button onClick={() => swiper.autoplay.stop()}>stop</button>
			<button onClick={() => swiper.autoplay.start()}>start</button>
		</nav>
	);
}

/*
React에서 Swiper의 코어기능을 적용하기 위해서는 useSwiper라는 hook호출
Swiper안쪽에서 또다른 컴포넌트를 연결해주고 그 안쪽에서 useSwiper로 부터 객체생성
해당 자식 자식 컴포넌트 안쪽에서 생성된 객체로부터 swiper core에 등록되어 있는 모든 메서드, 프로퍼티를 리액트에서도 사용가능
*/

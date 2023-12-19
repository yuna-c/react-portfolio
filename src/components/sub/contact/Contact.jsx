import './Contact.scss';
import Layout from '../../common/layout/Layout';
import { useCallback, useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
	const form = useRef();

	const resetForm = () => {
		const elArr = form.current.children;

		Array.from(elArr).forEach(el => {
			console.log(el);
			if (el.name === 'user_name' || el.name === 'user_email' || el.name === 'message') el.value = '';
		});
	};

	const sendEmail = e => {
		e.preventDefault();

		const [user, email] = form.current.querySelectorAll('input');
		const txtArea = form.current.querySelector('textarea');

		if (!user.value || !email.value || !txtArea.value) return alert('이름, 답장받을 이메일주소 문의내용을 모두 입력하세요.');

		emailjs.sendForm('service_nytqr3g', 'template_50r2xta', form.current, 'EkR0AJGqHyR3vJV0U').then(
			result => {
				alert('문의 내용이 성공적으로 전송되었습니다.');
				resetForm();
			},
			error => {
				alert('일시적인 장애로 문의 전송에 실패했습니다. 다음의 메일주소로 보내주세요.');
				resetForm();
			}
		);
	};
	const kakao = useRef(window.kakao);
	const [Index, setIndex] = useState(0);
	const [Traffic, setTraffic] = useState(false);
	const [View, setView] = useState(false);

	const mapFrame = useRef(null);
	const viewFrame = useRef(null);
	const marker = useRef(null);
	const mapInstance = useRef(null);

	// 지점마다 출력할 정보를 개별적인 객체로 묶어서 배열로 그룹화
	const mapInfo = useRef([
		{
			title: '삼성역 코엑스',
			latlng: new kakao.current.maps.LatLng(37.51100661425726, 127.06162026853143),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		},
		{
			title: '넥슨 본사',
			latlng: new kakao.current.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		},
		{
			title: '서울 시청',
			latlng: new kakao.current.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		}
	]);

	// 마커 인스턴스 생성
	marker.current = new kakao.current.maps.Marker({
		position: mapInfo.current[Index].latlng,
		image: new kakao.current.maps.MarkerImage(mapInfo.current[Index].imgSrc, mapInfo.current[Index].imgSize, mapInfo.current[Index].imgOpt)
	});

	// 로드뷰
	//useRef 간단(기억한다음에 안바꿈)
	//useCallback 의존성함수 바뀔때마다 풀고 메모이제이션 변경
	const roadview = useCallback(() => {
		new kakao.current.maps.RoadviewClient().getNearestPanoId(mapInfo.current[Index].latlng, 50, panoId => {
			new kakao.current.maps.Roadview(viewFrame.current).setPanoId(panoId, mapInfo.current[Index].latlng);
		});
	}, [Index]);

	// 지도 중심 좌표 (지도 이동시키기)
	const setCenter = useCallback(() => {
		mapInstance.current.setCenter(mapInfo.current[Index].latlng);
		// 로드뷰 함수 느림
		// roadview.current();
	}, [Index]);

	useEffect(() => {
		mapFrame.current.innerHTML = '';
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 3
		});
		marker.current.setMap(mapInstance.current);
		setTraffic(false);
		setView(false);

		// roadview.current();
		// 지도 타입 컨트롤러 추가
		mapInstance.current.addControl(new kakao.current.maps.MapTypeControl(), kakao.current.maps.ControlPosition.TOPRIGHT);

		// 지도 줌 컨트롤러 추가
		mapInstance.current.addControl(new kakao.current.maps.ZoomControl(), kakao.current.maps.ControlPosition.RIGHT);

		// 휠의 맴 줌 기능 비활성화
		mapInstance.current.setZoomable(false);

		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	}, [Index, setCenter]);

	// 느릴때 data fetching(사진) => network tab and addEventListener(window객체 : 1초에 60번 이벤트 발생) : 로드뷰
	// 1. 리솔트
	// 2. 로드뷰 출력 안되게하다가 버튼 클릭할때 로드뷰 출력되게(now)

	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC) //true
			: mapInstance.current.removeOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC); //false
	}, [Traffic]);

	useEffect(() => {
		// 중첩 없앰 뷰값이 바뀔때만 viewFrame 값 비움
		viewFrame.current.innerHTML = '';
		// view ture일 때만 동작
		View && roadview();
	}, [View, roadview]);

	return (
		<Layout title={'Contact'}>
			<div id='mailSection'>
				<form ref={form} onSubmit={sendEmail}>
					<label>Name</label>
					<input type='text' name='user_name' />
					<label>Email</label>
					<input type='email' name='user_email' />
					<label>Message</label>
					<textarea name='message' />
					<input type='submit' value='Send' />
				</form>
			</div>

			<div id='mapSection'>
				<div className='controlBox'>
					<nav className='branch'>
						{mapInfo.current.map((el, idx) =>
							//prettier-ignore
							<button key={idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>{el.title}</button>
						)}
					</nav>

					<nav className='info'>
						<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic OFF' : 'Traffic ON'}</button>
						<button onClick={() => setView(!View)}>{View ? 'map' : 'road view'}</button>
						<button onClick={setCenter}>위치 초기화</button>
					</nav>
				</div>
				<section className='tab'>
					<article className={`mapBox ${View ? '' : 'on'}`} ref={mapFrame}></article>
					<article className={`viewBox ${View ? 'on' : ''}`} ref={viewFrame}></article>
				</section>
			</div>
		</Layout>
	);
}

/*
1. cdn으로 불러온 window를 외부 객체 값으로 가져와서 인스턴스 생성
2. 인스턴스 값을 참조 객체에 담는 이유 (의존성 배열에 불필요하게 등록하지 않기 위해서)
3. 화면 변경점이 발생해야 할 때 state값에 따라서 변경되게 로직화, 이벤트 발생시 state를 변경하여 화면 재랜더링 유도 (간접적)

데이터 기반으로 짜야 유지보수 하기 쉬워졍~
*/

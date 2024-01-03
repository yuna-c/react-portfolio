import { useEffect, useRef, useState, useCallback } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';
import emailjs from '@emailjs/browser';

// https://apis.map.kakao.com/web/sample/addMapClickEventWithMarker/
// 위치값 정밀하게 보정 하는 법
// 기존 구글지도 위치값 복사한 뒤, 카카오 예제의 클릭한 위치 마커표시 직접해보기에서 해당 코드 붙여넣고, 원하는 지점찍으면 소숫점 12자리뜨는데 그거 붙여넣으면 됨
// 1초 동안 60번 이벤트 발생해(리사이즈, 스크롤, 휠) => 이런 것 들 때문에 용량이 커지는걸 막기 위해서 의존성 배열을 통해 데이터를 간소화 시켜야 해
// https://apis.map.kakao.com/web/sample/addTrafficOverlay/ 교통정보
// npm install @emailjs/browser --save
// add new 서빗 3개까지 https://www.emailjs.com/docs/sdk/send-form/

// useMemo 는 특정 결과값을 재사용 할 때 사용하는 반면, useCallback 은 특정 함수를 새로 만들지 않고 재사용하고 싶을때 사용
// 패칭 함수 한번 컴포넌트 랜더링 되는데 자식이 짜잘하게 디바운싱 안되면 재랜덜링시 문제 생김(패칭함수 다시 호출되니까) 프롭서 전달 안되면 재호출이 되긴하는데 메모리에 등록된 값을 가져와서 갠차나 or 함수에 유즈메모를 통해 받아오는 반환값을 메모라이징해옴 (useCallback or useMemo or memo)
// 등가교환 : 메모리 늘려서 강제로 가비지 컬렉터에 제외시키니까 좀 용량 커질 수 이께찌?

export default function Contact() {
	const form = useRef();

	//그룹형식의 DOM을 탐색할때 반환되는 두가지형태의 유사배열
	//parentDOM.children : HTMLCollection (유사배열: forEach, map 모두 반복불가, Live DOM:상태변경이 실시간)
	//parentDOM.querySelectorAll : NodeList (유사배열: forEach로는 반복 가능. Static DOM:탐색된 시점의 정적 DOM)

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

	//화면에 출력될 지도정보 배열의 순번이 담길 state
	const [Index, setIndex] = useState(0);
	const [Traffic, setTraffic] = useState(false);
	const [View, setView] = useState(false);

	const mapFrame = useRef(null);
	const viewFrame = useRef(null);

	const marker = useRef(null);
	const mapInstance = useRef(null);

	//지점마다 출력할 정보를 개별적인 객체로 묶어서 배열로 그룹화
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

	//마커 인스턴스 생성
	marker.current = new kakao.current.maps.Marker({
		position: mapInfo.current[Index].latlng,
		image: new kakao.current.maps.MarkerImage(mapInfo.current[Index].imgSrc, mapInfo.current[Index].imgSize, mapInfo.current[Index].imgOpt)
	});

	const roadview = useRef(() => {
		new kakao.current.maps.RoadviewClient().getNearestPanoId(mapInfo.current[Index].latlng, 50, panoId => {
			new kakao.current.maps.Roadview(viewFrame.current).setPanoId(panoId, mapInfo.current[Index].latlng);
		});
	});

	const setCenter = useCallback(() => {
		mapInstance.current.setCenter(mapInfo.current[Index].latlng);
		roadview.current();
	}, [Index]);

	//컴포넌트 마운트시 참조객체에 담아놓은 돔 프레임에 지도 인스턴스 출력 및 마커 세팅
	useEffect(() => {
		mapFrame.current.innerHTML = '';
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 3
		});
		marker.current.setMap(mapInstance.current);
		setTraffic(false);
		setView(false);

		roadview.current();
		mapInstance.current.addControl(new kakao.current.maps.MapTypeControl(), kakao.current.maps.ControlPosition.TOPRIGHT);
		mapInstance.current.addControl(new kakao.current.maps.ZoomControl(), kakao.current.maps.ControlPosition.RIGHT);
		mapInstance.current.setZoomable(false);

		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	}, [Index, setCenter]);

	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

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
	1.cdn불러온 window에 불러온 외부 객체값을 가져와서 인스턴스 생성
	2.인스턴스값을 참조객체 담는 이유 (의존성배열에 불필요하게 등록하지 않기 위해서)
	3.화면변경점이 발생해야 될떄 state값에 따라서 변경되게 로직화한 다음 이벤트 발생시 state를 변경해서 화면 재랜더링 유도
*/

import './Contact.scss';
import Layout from '../../common/layout/Layout';
import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

// https://apis.map.kakao.com/web/sample/addMapClickEventWithMarker/
// 위치값 정밀하게 보정 하는 법
// 기존 구굴지도 위치값 복사한 뒤, 카카오 예제의 클릭한 위치 마커표시 직접해보기에서 해당 코드 붙여넣고, 원하는 지점찍으면 소숫점 12자리뜨는데 그거 붙여넣으면 됨
// 1초 동안 60번 이벤트 발생해(리사이즈, 스크롤, 휠) => 이런 것 들 때문에 용량이 커지는걸 막기 위해서 의존성 배열을 통해 데이터를 간소화 시켜야 해
// https://apis.map.kakao.com/web/sample/addTrafficOverlay/ 교통정보
// npm install @emailjs/browser --save
// add new 서빗 3개까지 https://www.emailjs.com/docs/sdk/send-form/

export default function Contact() {
	const form = useRef();

	// 그룹 형식의 돔을 탐색할때 반환되는 두가지 형태의 유사배열
	// parentDom.children : HTMLCollection(유사배열 : forEach, map 모두 반복불가, Live DOM : 상태 변경이 실시간)
	// parentDom.querySelectorAll : NodeList(유사배열 : forEach로 반복 가능. Static DOM : 탐색된 시점의 정적 DOM)

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
		const txtArea = form.current.querySelectorAll('textarea');

		if (!user.value || !email.value || !txtArea.value) return alert('이름, 답장을 ㅏㄷ을 이메일 주소 문의 내용을 모두 입력하세요');

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
	// const { kakao } = window;
	const kakao = useRef(window.kakao);

	//화면에 출력될 지도정보 배열의 순번이 담길 state
	const [Index, setIndex] = useState(0);
	// 트래픽 토글, toggle useEffect(state 값만 바뀌게)
	const [Traffic, setTraffic] = useState(false);
	// 지도 로드뷰 / 그림 토글 기능
	const [View, setView] = useState(false);

	// 변하지 않는 값은 의존성 배열에 두지 않는 것이 좋다
	const mapFrame = useRef(null);
	// 로드뷰
	const viewFrame = useRef(null);

	// 마커 ???
	const marker = useRef(null);
	// 지도 중간에 두기 위해 참조
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

	const roadview = () => {
		new kakao.current.maps.RoadviewClient().getNearestPanoId(mapInfo.current[Index].latlng, 50, panoId => {
			new kakao.current.maps.Roadview(viewFrame.current).setPanoId(panoId, mapInfo.current[Index].latlng);
		});
	};

	// 지도 중심 좌표 (지도 이동시키기)
	const setCenter = () => {
		mapInstance.current.setCenter(mapInfo.current[Index].latlng);
		roadview();
	};

	useEffect(() => {
		// 지도 복제 기능 막아사 효율 올리기
		mapFrame.current.innerHTML = '';
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 3
		});
		marker.current.setMap(mapInstance.current);
		// 다른 버튼 누르면 교통정보 자동으로 안보이고 교통정보 보이기로 버튼 바꾸기
		setTraffic(false);

		roadview();
		//로드뷰 인스턴스
		new kakao.current.maps.RoadviewClient().getNearestPanoId(mapInfo.current[Index].latlng, 50, panoId => {
			// 50 : radius 마커를 찍은 위치에서 건물을 보여주는 최소 범위
			new kakao.current.maps.Roadview(viewFrame.current).setPanoId(panoId, mapInfo.current[Index].latlng); //panoId와 중심좌표를 통해 로드뷰 실행
		});

		// 지도 타입 컨트롤러 추가
		mapInstance.current.addControl(
			new kakao.current.maps.MapTypeControl(),
			kakao.current.maps.ControlPosition.TOPRIGHT //TOPLEFT
			/*
				// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
				var mapTypeControl = new kakao.maps.MapTypeControl();

				// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
				// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
				map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
			*/
		);

		// 지도 줌 컨트롤러 추가
		mapInstance.current.addControl(new kakao.current.maps.ZoomControl(), kakao.current.maps.ControlPosition.RIGHT);

		// 휠의 맴 줌 기능 비활성화
		mapInstance.current.setZoomable(false);

		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	}, [Index]);

	useEffect(() => {
		// 지도에 교통정보를 표시하도록 지도타입을 추가합니다
		// map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC) //true
			: mapInstance.current.removeOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC); //false
	}, [Traffic]);

	return (
		<Layout title={'Contact'}>
			<div id='mailSection'>
				<form ref={form} onSubmit={sendEmail}>
					<label>Name</label>
					{/* from_name :템플릿에서 전송하는 사람이름 변수명 */}
					<input type='text' name='user_name' />
					<label>Email</label>
					{/* reply_to :템플릿에서 답장할 메일주소 변수명 */}
					<input type='email' name='user_email' />
					<label>Message</label>
					{/* message :템플릿에서 문의메세지 변수명 */}
					<textarea name='message' />
					<input type='submit' value='Send' />
				</form>
			</div>

			<div className='controlBox'>
				<nav className='branch'>
					{/* <li onClick={() => setIndex(0)}>삼성동 코엑스</li>
				<li onClick={() => setIndex(1)}>넥슨 본사</li>
				<li onClick={() => setIndex(2)}>서울 시청</li> */}

					{mapInfo.current.map((el, idx) => (
						//prettier-ignore 프리티어 규칙에서 해당 코드만 제외시킴
						<button key={idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>
							{el.title}
						</button>
					))}
				</nav>

				<nav className='info'>
					<button onClick={() => setTraffic(!Traffic)}>{Traffic ? '교통정보 안보이기' : '교통정보 보이기'}</button>
					<button onClick={() => setView(!View)}>{View ? 'map' : 'road view'}</button>
					<button onClick={setCenter}>위치 초기화</button>
				</nav>
			</div>
			<section className='tab'>
				<article className={`mapBox ${View ? '' : 'on'}`} ref={mapFrame}></article>
				<article className={`viewBox ${View ? 'on' : ''}`} ref={viewFrame}></article>
			</section>
		</Layout>
	);
}

/*
1. cdn으로 불러온 window를 외부 객체 값으로 가져와서 인스턴스 생성
2. 인스턴스 값을 참조 객체에 담는 이유 (의존성 배열에 불필요하게 등록하지 않기 위해서)
3. 화면 변경점이 발생해야 할 때 state값에 따라서 변경되게 로직화, 이벤트 발생시 state를 변경하여 화면 재랜더링 유도 (간접적)

데이터 기반으로 짜야 유지보수 하기 쉬워졍~
*/
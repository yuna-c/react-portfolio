import './Contant.scss';
import Layout from '../../common/layout/Layout';
import { useEffect, useRef, useState } from 'react';

// https://apis.map.kakao.com/web/sample/addMapClickEventWithMarker/
// 위치값 정밀하게 보정 하는 법
// 기존 구굴지도 위치값 복사한 뒤, 카카오 예제의 클릭한 위치 마커표시 직접해보기에서 해당 코드 붙여넣고, 원하는 지점찍으면 소숫점 12자리뜨는데 그거 붙여넣으면 됨
// 1초 동안 60번 이벤트 발생해(리사이즈, 스크롤, 휠)
// https://apis.map.kakao.com/web/sample/addTrafficOverlay/ 교통정보
// toggle useEffect(state 값만 바뀌게 )

export default function Contant() {
	// const { kakao } = window;
	const kakao = useRef(window.kakao);

	//화면에 출력될 지도정보 배열의 순번이 담길 state
	const [Index, setIndex] = useState(0);
	// 트래픽 토글
	const [Traffic, setTraffic] = useState(false);

	// 변하지 않는 값은 의존성 배열에 두지 않는 것이 좋다
	const mapFrame = useRef(null);
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
			imgPos: { offset: new kakao.current.maps.Point(116, 99) },
		},
		{
			title: '넥슨 본사',
			latlng: new kakao.current.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) },
		},
		{
			title: '서울 시청',
			latlng: new kakao.current.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) },
		},
	]);

	//마커 인스턴스 생성
	marker.current = new kakao.current.maps.Marker({
		position: mapInfo.current[Index].latlng,
		image: new kakao.current.maps.MarkerImage(
			mapInfo.current[Index].imgSrc,
			mapInfo.current[Index].imgSize,
			mapInfo.current[Index].imgOpt
		),
	});

	// 지도 중심 좌표 (지도 이동시키기)
	const setCenter = () => mapInstance.current.setCenter(mapInfo.current[Index].latlng);

	useEffect(() => {
		// 지도 복제 기능 막아사 효율 올리기
		mapFrame.current.innerHTML = '';
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 3,
		});
		marker.current.setMap(mapInstance.current);
		// 다른 버튼 누르면 교통정보 자동으로 안보이고 교통정보 보이기로 버튼 바꾸기
		setTraffic(false);

		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	}, [Index]);

	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout title={'Contant'}>
			<div className='controlBox'>
				<nav className='branch'>
					{/* <li onClick={() => setIndex(0)}>삼성동 코엑스</li>
				<li onClick={() => setIndex(1)}>넥슨 본사</li>
				<li onClick={() => setIndex(2)}>서울 시청</li> */}
					{mapInfo.current.map((el, idx) => (
						<button key={idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>
							{el.title}
						</button>
					))}
				</nav>

				<div className='info'>
					<button
						onClick={() => {
							setTraffic(!Traffic); //반전처리
						}}
					>
						{Traffic ? '교통정보 안보이기' : '교통정보 보이기'}
					</button>
				</div>
			</div>
			<article className='mapBox' ref={mapFrame}></article>
		</Layout>
	);
}

/*
1. cdn으로 불러온 window를 외부 객체 값으로 가져와서 인스턴스 생성
2. 인스턴스 값을 참조 객체에 담는 이유 (의존성 배열에 불필요하게 등록하지 않기 위해서)
3. 화면 변경점이 발생해야 할 때 state값에 따라서 변경되게 로직화, 이벤트 발생시 state를 변경하여 화면 재랜더링 유도 (간접적)

데이터 기반으로 짜야 유지보수 하기 쉬워졍~
*/

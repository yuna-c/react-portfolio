import './Contant.scss';
import Layout from '../../common/layout/Layout';
import { useEffect, useRef, useState } from 'react';

// https://apis.map.kakao.com/web/sample/addMapClickEventWithMarker/
// 위치값 정밀하게 보정 하는 법
// 기존 구굴지도 위치값 복사한 뒤, 카카오 예제의 클릭한 위치 마커표시 직접해보기에서 해당 코드 붙여넣고, 원하는 지점찍으면 소숫점 12자리뜨는데 그거 붙여넣으면 됨
export default function Contant() {
	// const { kakao } = window;
	const kakao = useRef(window.kakao);

	//화면에 출력될 지도정보 배열의 순번이 담길 state
	const [Index, setIndex] = useState(0);
	const mapFrame = useRef(null);
	const marker = useRef(null);

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

	useEffect(() => {
		const mapInstance = new kakao.current.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 3,
		});
		marker.current.setMap(mapInstance);
	}, [Index]);

	return (
		<Layout title={'Contant'}>
			<ul className='branch'>
				{/* <li onClick={() => setIndex(0)}>삼성동 코엑스</li>
				<li onClick={() => setIndex(1)}>넥슨 본사</li>
				<li onClick={() => setIndex(2)}>서울 시청</li> */}
				{mapInfo.current.map((el, idx) => (
					<li key={idx}>
						<button onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>
							{el.title}
						</button>
					</li>
				))}
			</ul>
			<article className='mapBox' ref={mapFrame}></article>
		</Layout>
	);
}

import './Contant.scss';
import Layout from '../../common/layout/Layout';
import { useEffect, useRef } from 'react';

// https://apis.map.kakao.com/web/sample/addMapClickEventWithMarker/
// 위치값 정밀하게 보정 하는 법
// 기존 구굴지도 위치값 복사한 뒤, 카카오 예제의 클릭한 위치 마커표시 직접해보기에서 해당 코드 붙여넣고, 원하는 지점찍으면 소숫점 12자리뜨는데 그거 붙여넣으면 됨
export default function Contant() {
	const mapFrame = useRef(null);
	const { kakao } = window;
	console.log(kakao);

	const mapOption = useRef({
		center: new kakao.maps.LatLng(37.526724138870556, 126.87504233742969),
		level: 3,
	});

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(mapFrame.current, mapOption.current);
		// const posInstance = new kakao.maps.LatLng(33.450701, 126.570667);
		const markerInstance = new kakao.maps.Marker({
			position: mapOption.current.center,
		});

		markerInstance.setMap(mapInstance);
	}, []);

	return (
		<Layout title={'Contant'}>
			<article className='mapBox' ref={mapFrame}></article>
		</Layout>
	);
}

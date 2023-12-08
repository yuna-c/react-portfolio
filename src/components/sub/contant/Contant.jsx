import './Contant.scss';
import Layout from '../../common/layout/Layout';
import { useEffect, useRef } from 'react';

// https://developers.kakao.com/console/app
// https://apis.map.kakao.com/
/*
사이트 도메인 연결(플랫폼-> web)
http://localhost:3000
https://react-portfolio-wheat-eight.vercel.app

new() 인스턴스 생성자 객체 함수를 통해 복사본 객체를 만든다(여러가지 메서드를 호출 가능)
*/

export default function Contant() {
	const mapFrame = useRef(null);
	const { kakao } = window;
	console.log(kakao);

	const mapOption = useRef({
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 3,
	});

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(mapFrame.current, mapOption.current);
		const posInstance = new kakao.maps.LatLng(33.450701, 126.570667);
		const markerInstance = new kakao.maps.Marker({
			position: posInstance,
		});

		markerInstance.setMap(mapInstance);
	}, []);

	return (
		<Layout title={'Contact'}>
			<article className='mapBox' ref={mapFrame}></article>
		</Layout>
	);
}

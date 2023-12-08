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
	//5028992d611e7153922e7a04d3d292cb
	const { kakao } = window;
	const mapFrame = useRef(null);
	const mapOption = useRef({
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 3,
	});

	useEffect(() => {
		new kakao.maps.Map(mapFrame.current, mapOption.current);
	}, []);

	return (
		<Layout title={'Contant'}>
			<article id='map' ref={mapFrame}></article>
		</Layout>
	);
}

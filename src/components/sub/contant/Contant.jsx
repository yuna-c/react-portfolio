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
cdn 코드 쓰면 껐다 켜보기
*/

export default function Contant() {
	const { kakao } = window;
	//5028992d611e7153922e7a04d3d292cb

	const mapFrame = useRef(null);
	// kakao window 객체 안에 있을꺼야

	// const { html } = window;
	const mapOption = useRef({
		center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
		level: 3, //지도의 레벨(확대, 축소 정도)
	});

	useEffect(() => {
		// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
		// new kakao.maps.Map(mapFrame.current, mapOption.current);
		new kakao.maps.Map(mapFrame.current, mapOption.current);
	}, []);

	return (
		<Layout title={'Contant'}>
			<article id='map' ref={mapFrame}></article>
		</Layout>
	);
}

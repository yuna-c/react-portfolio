import './Contant.scss';
import Layout from '../../common/layout/Layout';
import { useEffect, useRef } from 'react';

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
		<Layout title={'Contant'}>
			<article className='mapBox' ref={mapFrame}></article>
		</Layout>
	);
}

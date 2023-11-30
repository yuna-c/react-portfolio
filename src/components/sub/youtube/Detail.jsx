import { useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Detail.scss';
import { useParams } from 'react-router-dom';

export default function Detail() {
	// const data = useParams();
	// console.log(data);

	// 1. 유튭 페이지에서 썸네일 선택했을 때 버튼처리
	// 2. state로 객체 함수 만들기 effect로 한번만 받기
	console.log('re-render');
	console.log('--------------------------------');

	const { id } = useParams();
	// console.log(id);
	const [youtubeData, setYoutubeData] = useState(null);
	console.log(youtubeData);

	const fetchSingleData = async () => {
		const api_key = 'AIzaSyBgRldfomRBMNoipsSTKYAmfOarH1iIu8o';
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${id}`;
		const data = await fetch(baseURL);
		const json = await data.json();
		setYoutubeData(json.items[0].snippet);
	};

	useEffect(() => {
		fetchSingleData();
		console.log(useEffect);
		//useEffect가 언제 실행되는지
	}, []);

	return (
		<Layout title={'Detail'}>
			<div className='videoBox'>
				<iframe src={`https://www.youtube.com/embed/${youtubeData?.resourceId.videoId}`} title={youtubeData?.title}></iframe>
			</div>
			{/* es7: Optional chaing : 객체명?.property 해당 객체에 값이 없을 땐 무시하고 값이 있을 때만 property 선택적 접근... 객체만 옵셔널 체이닝 가능 */}
			<h3>{youtubeData?.title}</h3>
			<p>{youtubeData?.description}</p>
			{/* <h3>{youtubeData.title}</h3> 이거는 에러나.. 이유 : 데이터 자체가 3번째 랜더링 타임에 담기니까 그 전까지 없는 값인데 당연히 동작 안되지(객체(null)는 중괄호 있으니까 에러야) 유튜브 데이터 자체가 없는데 찾아오라 하니까 */}
			{/* 
      타이틀의 프로퍼티가 없다고 뜨는데.. 
      :일부 객체 지향 프로그래밍 언어에서 필드(데이터 멤버)와 메소드 간 기능의 중간인 클래스 멤버의 특수한 유형
      */}
		</Layout>
	);
}

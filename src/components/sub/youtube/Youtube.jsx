import { useSelector } from 'react-redux';
import { useCustomText } from '../../../hooks/useText';
import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Youtube() {
	// 커스텀 훅은 윗단에
	const customText = useCustomText('combined');
	const shortenText = useCustomText('shorten');

	const YoutubeData = useSelector(store => store.yutubeReducer);
	// const [Vids, setVids] = useState([]);
	// console.log(Vids);

	// promise then 구문을 async await 변경하기 위한 조건 2가지
	// 조건 1 - promise반환 함수를 감싸주는 wrapping 함수 필요(async), 데이터 묶어야 되니까
	// 조건 2 - await문은 promise then반환 함수(fetch)에만 지정 가능
	// const fetchYoutube = async () => {
	// 	const api_key = process.env.REACT_APP_YOUTUBE_API;
	// 	const pid = process.env.REACT_APP_YOUTUBE_LIST;
	// 	const num = 10;
	// 	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
	// 	/* 중괄호 리턴을 빼거나 리턴을 넣을려면 중괄호까지 넣거나
	// 	fetch(baseURL)
	// 		.then((data) => {
	// 			return data.json();
	// 		})
	// 		.then((json) => {
	// 			setVids(json.items);
	// 			console.log(Vids);
	// 		});
	// 	*/
	// 	try {
	// 		const data = await fetch(baseURL); //동기화(데이터라는 값을 받아야 하나끼 먼저 실행하지 않게 변수처리)
	// 		const json = await data.json(); // await로 동기화해서 배열을 담아옴
	// 		setVids(json.items);
	// 		console.log(Vids);
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	// useEffect(() => {
	// 	fetchYoutube();
	// }, []);

	console.log(YoutubeData);
	return (
		<Layout title={'Youtube'}>
			{YoutubeData?.map((data, idx) => {
				const [date, time] = data.snippet.publishedAt.split('T'); //
				return (
					<article key={data.id}>
						<h2>{shortenText(data.snippet.title, 50)}</h2>

						<div className='txt'>
							<p>{shortenText(data.snippet.description, 250)}</p>
							<div className='infoBox'>
								<span>{customText(date, '.')}</span>
								{/* 하이픈 대신 .으로 바꾼다 */}
								<em>{time.split('Z')[0]}</em>
								{/* Z 기준으로 맨 앞에 값 가져온다 */}
							</div>
						</div>

						<div className='pic'>
							<Link to={`/detail/${data.id}`}>
								<img src={data.snippet.thumbnails.standard ? data.snippet.thumbnails.standard.url : '/img/member1.jpg'} alt={data.snippet.title} />
							</Link>
						</div>
					</article>
				);
			})}
		</Layout>
	);
}

import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useState, useEffect } from 'react';

export default function Youtube() {
	const [Vids, setVids] = useState([]);
	console.log(Vids);

	// promise then 구문을 async await 변경하기 위한 조건 2가지
	// 조건 1 - promise반환 함수를 감싸주는 wrapping 함수 필요(async), 데이터 묶어야 되니까
	// 조건 2 - await문은 promise then반환 함수(fetch)에만 지정 가능
	const fetchYoutube = async () => {
		const api_key = 'AIzaSyBgRldfomRBMNoipsSTKYAmfOarH1iIu8o';
		const pid = 'PL_gXk6OSOQ5LVWytUDP2MgKhA1-A5h1TJ';
		const num = 10;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
		/* 중괄호 리턴을 빼거나 리턴을 넣을려면 중괄호까지 넣거나
		fetch(baseURL)
			.then((data) => {
				return data.json();
			})
			.then((json) => {
				setVids(json.items);
				console.log(Vids);
			});
		*/
		try {
			const data = await fetch(baseURL); //동기화(데이터라는 값을 받아야 하나끼 먼저 실행하지 않게 변수처리)
			const json = await data.json(); // await로 동기화해서 배열을 담아옴
			setVids(json.items);
			console.log(Vids);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return <Layout title={'Youtube'}>Youtube</Layout>;
}

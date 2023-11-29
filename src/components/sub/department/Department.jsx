import Layout from '../../common/layout/Layout';
import { useEffect, useRef, useState } from 'react';
import './Department.scss';
import { useCustomText } from '../../../hooks/useText';

export default function Department() {
	const [memberTit, setmemberTit] = useState('');
	const [memberData, setmemberData] = useState([]);
	const [HistoryTit, setHistoryTit] = useState('');
	const [HistoryData, setHistoryData] = useState([]);
	const [HistoryLetter, setHistoryLetter] = useState('');

	const path = useRef(process.env.PUBLIC_URL);

	const shortenText = useCustomText('shorten');
	const combinedTitle = useCustomText('combined');

	// const txt1 = 'our-members-score';
	// console.log(combinedTitle(txt1, '-'));

	const fetchDepartment = () => {
		fetch(`${path.current}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				setmemberTit(Object.keys(json)[0]);
				setmemberData(Object.values(json)[0]);
			});
	};

	//데이터 뽑아내기
	const fetchHistory = () => {
		fetch(`${path.current}/DB/history.json`)
			.then((data) => data.json())
			.then((json) => {
				setHistoryTit(Object.keys(json)[0]);
				setHistoryData(Object.values(json)[0]);
				setHistoryLetter(Object.values(json)[0]);
			});
	};
	console.log(HistoryTit, HistoryData, HistoryLetter);

	useEffect(() => {
		fetchDepartment();
		fetchHistory();
	}, []);

	return (
		<Layout title={'Department'}>
			<section className='historyBox'>
				<h2>{combinedTitle(HistoryTit)}</h2>

				<div className='con'>
					{/* History가 반복도는 각각의 데이터 {년도 : 배열} 객체 */}
					{HistoryData.map((history, idx) => {
						return (
							<article key={history + idx}>
								{/* 현재 반복돌고 있는 객체의 key값을 뽑아서 h3로 출력 :2016 */}
								<h3>{Object.keys(history)[0]}</h3>
								<ul>
									{/* 현재 반복돌고 있는 객체의 value 값을 뽑아서 li로 반복출력 [문자열,문자열] */}
									{Object.values(history)[0].map((list, idx) => {
										return <li key={list + idx}>{list}</li>;
									})}
								</ul>
							</article>
						);
					})}

					{/* <article>
						<h3>2016</h3>
						<ul>
							<li>데이터 반복</li>
						</ul>
					</article> */}
				</div>
			</section>

			<section className='memberBox'>
				<h2>{combinedTitle(memberTit)}</h2>

				<div className='con'>
					{memberData.map((member, idx) => {
						return (
							<article key={member + idx}>
								<div className='pic'>
									<img src={`${path.current}/img/${member.pic}`} alt={member.name} />
								</div>
								<h3>{member.name}</h3>
								<p>{member.position}</p>
							</article>
						);
					})}
				</div>
			</section>
		</Layout>
	);
}

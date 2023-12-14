import Layout from '../../common/layout/Layout';
import { useEffect, useRef, useState } from 'react';
import './Department.scss';
import { useCustomText } from '../../../hooks/useText';
import { useSelector } from 'react-redux';

export default function Department() {
	const MemberData = useSelector(store => store.memberReducer.members);
	//console.log(store)

	// const [memberTit, setmemberTit] = useState('');
	// const [memberData, setmemberData] = useState([]);
	const [HistoryTit, setHistoryTit] = useState('');
	const [HistoryData, setHistoryData] = useState([]);

	const path = useRef(process.env.PUBLIC_URL);

	const shortenText = useCustomText('shorten');
	const combinedTitle = useCustomText('combined');

	// const fetchDepartment = () => {
	// 	fetch(`${path.current}/DB/department.json`)
	// 		.then(data => data.json())
	// 		.then(json => {
	// 			setmemberTit(Object.keys(json)[0]);
	// 			setmemberData(Object.values(json)[0]);
	// 		});
	// };

	const fetchHistory = () => {
		fetch(`${path.current}/DB/history.json`)
			.then(data => data.json())
			.then(json => {
				setHistoryTit(Object.keys(json)[0]);
				setHistoryData(Object.values(json)[0]);
			});
	};

	useEffect(() => {
		// fetchDepartment();
		fetchHistory();
	}, []);

	return (
		<Layout title={'Department'}>
			<section className='historyBox'>
				<h2>{combinedTitle(HistoryTit)}</h2>

				<div className='con'>
					{HistoryData.map((history, idx) => {
						return (
							<article key={history + idx}>
								<h3>{Object.keys(history)[0]}</h3>
								<ul>
									{Object.values(history)[0].map((list, idx) => {
										return <li key={list + idx}>{list}</li>;
									})}
								</ul>
							</article>
						);
					})}
				</div>
			</section>

			<section className='memberBox'>
				<h2>{combinedTitle('Members')}</h2>

				<div className='con'>
					{MemberData.map((member, idx) => {
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

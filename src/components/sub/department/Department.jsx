import Layout from '../../common/layout/Layout';
import { useRef } from 'react';
import './Department.scss';
import { useCustomText } from '../../../hooks/useText';
import { useSelector } from 'react-redux';

export default function Department() {
	const combinedTitle = useCustomText('combined');
	const path = useRef(process.env.PUBLIC_URL);

	// const members = useSelector(store => store.membersReducer);
	// const history = useSelector(store => store.historyReducer);

	const { historyReducer, membersReducer } = useSelector(store => store);
	console.log(historyReducer, membersReducer); //객체

	// const [MemberTit, setMemberTit] = useState('');
	// const [MemberData, setMemberData] = useState([]);
	// const [HistoryTit, setHistoryTit] = useState('');
	// const [HistoryData, setHistoryData] = useState([]);

	const HistoryTit = Object.keys(historyReducer)[0];
	const HistoryData = Object.values(historyReducer)[0];
	const MemberTit = Object.keys(membersReducer)[0];
	const MemberData = Object.values(membersReducer)[0];

	return (
		<Layout title={'Department'}>
			<section className='historyBox'>
				<h2>{combinedTitle(HistoryTit)}</h2>
				{/* 배열만 비어있고 객체 프로포티느 있어서 에러는 아님 : 빈배열에 접근 ? null로 선언되어있음 */}

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
				<h2>{combinedTitle(MemberTit)}</h2>

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

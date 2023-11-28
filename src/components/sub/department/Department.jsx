import './Department.scss';
import Layout from '../../common/layout/Layout';
import { useEffect, useRef, useState } from 'react';
import { useCustomText } from '../../../hooks/useText';

export default function Department() {
	const [memberTit, setmemberTit] = useState('');
	const [memberData, setmemberData] = useState([]);
	const path = useRef(process.env.PUBLIC_URL);

	const shortenText = useCustomText('shorten');
	const combinedTitle = useCustomText('combined');

	const txt1 = 'our-members-score';
	console.log(combinedTitle(txt1, '-'));

	const fetchDepartment = () => {
		fetch(`${path.current}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				setmemberTit(Object.keys(json)[0]);
				setmemberData(Object.values(json)[0]);
			});
	};

	useEffect(() => {
		fetchDepartment();
	}, []);

	return (
		<Layout title={'Deparment'}>
			<h2>{combinedTitle(memberTit)}</h2>
			<section className='memberBox'>
				{memberData.map((member, idx) => {
					return (
						<article key={member + idx}>
							<div className='pic'>
								<img src={`${path.current}/img/${member.pic}`} alt={member.name} />
							</div>
							<h2>{member.name}</h2>
							<p>{member.position}</p>
						</article>
					);
				})}
			</section>
		</Layout>
	);
}

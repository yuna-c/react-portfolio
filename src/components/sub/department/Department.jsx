import './Department.scss';
import Layout from '../../common/layout/Layout';
import { useEffect, useState } from 'react';

export default function Department() {
	const [memberTit, setmemberTit] = useState('');
	const [memberData, setmemberData] = useState([]); //1
	const path = process.env.PUBLIC_URL;

	const fetchDepartment = () => {
		//2 마운트 전임
		fetch(`${path}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				// console.log(json);
				// console.log('key', Object.keys(json)[0]); //객체를 반복돌며 key값만 배열로 반환
				// console.log('value', Object.values(json)[0]); //객체를 반복돌며 value값만 배열로 반환
				setmemberTit(Object.keys(json)[0]);
				setmemberData(Object.values(json)[0]);
			});
	};

	//3
	useEffect(() => {
		fetchDepartment();
	}, []);
	//state 담거나 - 멤버데이터
	//useref담거나

	return (
		<Layout title={'Deparment'}>
			<h2>{memberTit}</h2>
			<section className='memberBox'>
				{/* 4 */}
				{memberData.map((member, idx) => {
					return (
						<article key={member + idx}>
							<div className='pic'>
								<img src={`${path}/img/${member.pic}`} alt={member.name} />
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

/*
React에서 외부 데이터를 가져와서 화면에 동적으로 출력하는 순서
1. 외부 데이터를 가져와 담을 빈 state 추가 (보통 빈 배열로 초기화)
2. fetch문을 이용해서 특정 url의 데이터를 가져온 뒤 동기적으로 배월을 뽑은 후 state에 담아주는 함수 정의
3. 위에서 만든 함수를 의존성 배열이 비어있는 useEffect문 안쪽에서 호출
4. state에 담겨있는 data 배열 값을 map으로 반복돌면서 jsx구문 생성

객체의 property에서 key, value값 반복 도는 방법
const student = {name : 'David', age : 20 }
//key 반복 돌면서 배열 반환
Object.keys(student); ['name', 'age'];
Object.values(student); ['David', 20];

*/

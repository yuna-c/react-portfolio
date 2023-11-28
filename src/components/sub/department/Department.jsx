import './Department.scss';
import Layout from '../../common/layout/Layout';
import { useEffect, useRef, useState } from 'react';
import { useCustomText } from '../../../hooks/useText';

export default function Department() {
	const [memberTit, setmemberTit] = useState('');
	const [memberData, setmemberData] = useState([]);
	const path = useRef(process.env.PUBLIC_URL); //useEffect 의존성 배열 처리위해
	const changeTitle = useCustomText('title'); //useText의 함수를 반환
	const shortenText = useCustomText('shorten');
	const combinedTitle = useCustomText('combined');

	const txt1 = 'our-members-score';
	console.log(combinedTitle(txt1, '-'));
	// console.log(shortenText(txt1, 4));
	/*
	// split : 구분자를 기준점으로 나눠서 배열로 반환(인수 두개 받앙!)
	const [forward, backward] = txt1.split('-').map((txt) => changeTitle(txt)); // 중괄호 리턴 생략하면 바로 반환
	// console.log(txt1.split('-'));
	// console.log(forward);
	// console.log(backward);
	// console.log(forward + ' ' + backward);
  */
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
			<h2>{changeTitle(memberTit)}</h2>
			{/* 
      <h2>{shortenText(memberTit, '3')}</h2>
			<h2>{combinedTitle(memberTit, '-')}</h2> 
      */}
			{/* {}=> 연산 필요할 때 */}
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

// 문자열 관련 내장 메서드
전체문자열.charAt(순서) : 전체 문자열에서 해당 순서의 문자값만 반환 
전체문자열.slice(순서1, 순서2) : 전체 문자열에서 해당 순서1부터 순서2위치까지 문자를 잘라 반환
전체문자열.toUpperCase() : 전체 문자열을 대문자로 반환
전체문자열.toLowerCase() : 전체 문자열을 소문자로 반환
전체문자열.split(구분자) : 전체 문자열을 구분자를 기준으로 나눠서 배열 반환
전체문자열.join(구분자) : 각 배열값을 구분자로 이어 붙이면서 하나의 문자열로 반환
*/

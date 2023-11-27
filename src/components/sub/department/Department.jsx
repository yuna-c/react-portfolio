import './Department.scss';
import Layout from '../../common/layout/Layout';
import { useEffect, useState } from 'react';

export default function Department() {
	const [memberData, setmemberData] = useState([]); //1
	const path = process.env.PUBLIC_URL; //public폴더까지의 경로를 구하는 구문(절대경로로)

	const fetchDepartment = () => {
		//2 마운트 전임
		fetch(`${path}/DB/department.json`) //외부 데이터 가지고 옴 web api로
			.then((data) => data.json())
			.then((json) => {
				console.log(json.members);
				setmemberData(json.members);
			});
	};

	//3
	useEffect(() => {
		fetchDepartment();
	}, []);

	return (
		<Layout title={'Deparment'}>
			{memberData.map((mem, idx) => {
				return (
					<div key={mem + idx}>
						<h2>{mem.name}</h2>
					</div>
				);
			})}
		</Layout>
	);
}

/*
React에서 외부 데이터를 가져와서 화면에 동적으로 출력하는 순서
1. 외부 데이터를 가져와 담을 빈 state 추가 (보통 빈 배열로 초기화)
2. fetch문을 이용해서 특정 url의 데이터를 가져온 뒤 동기적으로 배월을 뽑은 후 state에 담아주는 함수 정의
3. 위에서 만든 함수를 의존성 배열이 비어있는 useEffect문 안쪽에서 호출
4. state에 담겨있는 data 배열 값을 map으로 반복돌면서 jsx구문 생성
*/

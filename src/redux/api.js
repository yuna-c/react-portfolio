//5 순수함수
const path = process.env.PUBLIC_URL;

// const fetchDepartment = () => {
// 	fetch(`${path.current}/DB/department.json`)
// 		.then(data => data.json())
// 		.then(json => {
// 			// 리액트 기능 제거
// 			// setmemberTit(Object.keys(json)[0]);
// 			// setmemberData(Object.values(json)[0]);
// 		});
// };

const fetchDepartment = async () => {
	// fetch() 스크립트 문법
	const data = await fetch(`${path}/DB/department.json`);
	const json = data.json();
	return json;
};

//5 순수함수
const path = process.env.PUBLIC_URL;

export const fetchDepartment = async () => {
	const data = await fetch(`${path}/DB/department.json`);
	const json = data.json();
	return json;
};
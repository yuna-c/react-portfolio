import './Layout.scss';

export default function Layout({ children, title }) {
	console.log(title);
	//비구조화 할당으로 props값을 가져와서
	return (
		<main className={`layout ${title}`}>
			<h1>{title}</h1>
			<div className='bar'></div>
			{/* Layout컴포넌트로 감싼 컨텐츠 내용이 아래 children위치에 출력됨 */}
			{children}
		</main>
	);
}

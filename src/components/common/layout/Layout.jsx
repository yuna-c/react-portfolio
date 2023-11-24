import { useState } from 'react';
import './Layout.scss';

export default function Layout({ children }) {
	//비구조화 할당으로 props값을 가져와서
	const [Title, setTitle] = useState();

	return (
		<main className='layout'>
			<h1 setTitle={setTitle}>Title</h1>
			<div className='bar'></div>
			{/* layout 컴포넌트로 감싼 컨텐츠 내용이 아래 children 객체에 출력됨 */}
			{children}
		</main>
	);
}

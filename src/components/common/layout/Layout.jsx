import { useEffect, useRef } from 'react';
import './Layout.scss';

export default function Layout({ children, title }) {
	console.log(title);
	//메인 참조
	const refFrame = useRef(null);
	// 컴포넌트 마운트 되자마자 on 붙이기
	useEffect(() => {
		refFrame.current.classList.add('on');
	}, []);

	return (
		<main ref={refFrame} className={`layout ${title}`}>
			<h1>{title}</h1>
			<div className='bar'></div>
			{/* Layout컴포넌트로 감싼 컨텐츠 내용이 아래 children위치에 출력됨 */}
			{children}
		</main>
	);
}

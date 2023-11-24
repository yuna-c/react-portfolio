import { useEffect, useRef } from 'react';
import { useSplitText } from '../../../hooks/useSplitText';

export default function Layout({ children, title }) {
	console.log(title);

	const refFrame = useRef(null); //메인 참조

	/*
	useEffect 안쪽에서 자주 쓰일만한 특정 함수를 호출해야 함
	use로 시작하는 커스텀 훅은 특정 함수 안 쪽에서 호출 불가
	해당 hook이 함수를 반환하도록 처리
	*/
	const splitText = useSplitText();
	console.log(splitText);

	useEffect(() => {
		/* 아래처럼 custom hook이 반환된 함수를 hook이나 핸들러 함수 내부에서 사용 가능 */
		splitText('hello');
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

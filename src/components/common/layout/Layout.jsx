import { useEffect, useRef } from 'react';
import './Layout.scss';
import { useSplitText } from '../../../hooks/useText';

export default function Layout({ children, title }) {
	const refFrame = useRef(null);
	const refTitle = useRef(null); //h1
	const splitText = useSplitText();

	useEffect(() => {
		splitText(refTitle.current, title, 0.7, 0.15);
		setTimeout(() => {
			// 지연시간을 통해 scss가 적용될 시간을 줌
			refFrame.current.classList.add('on');
		}, 300);
	}, [splitText, title]);
	//프롭스가 이제 바뀌지 않는 값이라고 하더라도 한번만 실행하게 해야되는데 그걸 이에스린트가 몰?루?

	return (
		<main ref={refFrame} className={`Layout ${title}`}>
			<h1 ref={refTitle}>{title}</h1>
			<div className='bar'></div>
			{children}
		</main>
	);
}

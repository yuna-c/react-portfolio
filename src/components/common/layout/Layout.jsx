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
	}, []);

	return (
		<main ref={refFrame} className={`layout ${title}`}>
			<h1 ref={refTitle}>{title}</h1>
			<div className='bar'></div>
			{children}
		</main>
	);
}

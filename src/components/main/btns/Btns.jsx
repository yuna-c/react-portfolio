import { useEffect, useRef, useState } from 'react';
import './Btns.scss';

export default function Btns() {
	const num = useRef(4);
	const [Index, setIndex] = useState(0);

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		num.current = document.body.querySelectorAll('.myScroll').length;
	// 	}, 500);
	// }, []);

	return (
		<ul className='Btns'>
			{Array(num.current)
				.fill()
				.map((_, idx) => {
					return <li key={idx} className={idx === Index ? 'on' : ''}></li>;
				})}
		</ul>
	);
}

import { useEffect, useRef, useState } from 'react';
import './Btns.scss';

// window.scrollY : 브라우저를 스크롤할 때마다 스크롤되고 있는 거리값(정적)
// DOM.scrollTop : DOM요소 안쪽에서 스크롤할 때마다 스크롤되고 있는 거리값(정적)
// Dom.offsetTop : 문서에서 해당 돔 요소의 세로 위치값(정적)

export default function Btns() {
	const num = useRef(0);
	const secs = useRef(null);
	const btns = useRef(null);
	const wrap = useRef(null);
	const [Index, setIndex] = useState(0);

	useEffect(() => {
		// setTimeout(() => {
		// num.current = document.body.querySelectorAll('.myScroll').length;
		// }, 500);

		// querySelectorAll 현재 랜더링 된 최신 Dom을 찾는게 아니고 과거 있었던 Dom을 찾음
		// useRef를 권장
		wrap.current = document.querySelector('.wrap');
		secs.current = document.querySelectorAll('.myScroll');
		// console.log(secs.current);
		// num.current = secs.current.lenght;

		wrap.current.addEventListener('scroll', e => {
			console.log('scroll', e.target.scrollTop);
			console.log('offset', secs.current[1].offsetTop);
		});
	}, []);

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

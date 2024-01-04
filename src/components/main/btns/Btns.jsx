import { useEffect, useRef, useState } from 'react';
import './Btns.scss';
import Anime from '../../../asset/anime';

// window.scrollY : 브라우저를 스크롤할 때마다 스크롤되고 있는 거리값(정적)
// DOM.scrollTop : DOM요소 안쪽에서 스크롤할 때마다 스크롤되고 있는 거리값(정적)
// Dom.offsetTop : 문서에서 해당 돔 요소의 세로 위치값(정적)

export default function Btns() {
	const [Num, setNum] = useState(0);
	const [Index, setIndex] = useState(0);

	const secs = useRef(null);
	const btns = useRef(null);
	const wrap = useRef(null);
	// console.log(btns, '❤');

	const activation = () => {
		const scroll = wrap.current.scrollTop;
		// console.log(scroll);

		secs.current.forEach((sec, idx) => {
			if (scroll >= /*secs.current[idx]*/ sec.offsetTop) {
				Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
				btns.current.children[idx].classList.add('on');
			}
		});

		// if (scroll >= secs.current[0].offsetTop) {
		// 	Array.from(btns.current.chlidren).forEach(btn => btn.classList.remove('on'));
		// 	btns.current[0].classList.add('on');
		// }
		// if (scroll >= secs.current[1].offsetTop) {
		// 	btns.current[1].classList.add('on');
		// }
		// if (scroll >= secs.current[2].offsetTop) {
		// 	btns.current[2].classList.add('on');
		// }
		// if (scroll >= secs.current[3].offsetTop) {
		// 	btns.current[3].classList.add('on');
		// }
	};

	useEffect(() => {
		// setTimeout(() => {
		// num.current = document.body.querySelectorAll('.myScroll').length;
		// }, 500);

		// querySelectorAll 현재 랜더링 된 최신 Dom을 찾는게 아니고 과거 있었던 Dom을 찾음
		// useRef를 권장

		// num.current = secs.current.lenght;

		// wrap.current.addEventListener('scroll', e => {
		// 	// console.log('scroll', e.target.scrollTop);
		// 	// console.log('offset', secs.current[1].offsetTop);
		// });
		wrap.current = document.querySelector('.wrap');
		secs.current = document.querySelectorAll('.myScroll');
		// console.log(secs.current.length);
		setNum(secs.current.length);

		wrap.current.addEventListener('scroll', activation);
		return () => wrap.current.removeEventListener('scroll', activation);
	}, []);

	return (
		<ul className='Btns' ref={btns}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					return (
						<li
							key={idx}
							className={idx === Index ? 'on' : ''}
							onClick={() => {
								// setIndex(idx);
								// new Anime(선택자, {속성명1: 속성값1, 속성명2: 속성값2}, {duration:속도, saseType:가속도, callback:컴플릿함수});
								new Anime(
									wrap.current,
									{ scroll: secs.current[idx].offsetTop },
									{
										duration: 1000,
										ease: [0.12, 1.61, 1, -0.06],
										//easeType: 'ease1',
										callback: () => {
											console.log('motion complite ❤');
											// new Anime(wrap.current, { scroll: 2 });
										}
									}
								);
							}}>
							{/* onClick={() => { setIndex(idx); }}> 이렇게 하면 안되는 이유 (활성화가 안됨)*/}
						</li>
					);
				})}
		</ul>
	);
}

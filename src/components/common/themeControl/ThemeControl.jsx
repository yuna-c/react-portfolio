import { useRef } from 'react';
import { useCookie } from '../../../hooks/useCookie';
import './ThemeControl.scss';

export default function ThemeControl() {
	const { setCookie } = useCookie();
	const inputEl = useRef(null);

	const changeThemeColor = () => {
		const color = inputEl.current.value;
		console.log(color);
		setCookie('theme', color, 20);
		console.log(getComputedStyle(document.body).getPropertyValue('--pointColor'));
		document.body.style.setProperty('--pointColor', color);
	};

	return (
		<nav className='ThemeControl'>
			<input type='color' ref={inputEl} />
			<button onClick={changeThemeColor}>Theme Color</button>
		</nav>
	);
}

/*
1. 클릭 이벤트 발생시 컬러 팔레트에서 선택한 색상 코드값을 쿠키로 저장
2. App 마운트시 --pointColor에 등록된 value 값을 쿠키에 있는 값으로 변경 처리
*/

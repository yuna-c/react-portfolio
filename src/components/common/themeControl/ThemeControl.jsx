import { useRef } from 'react';
import { useCookie } from '../../../hooks/useCookie';
import './ThemeControl.scss';

export default function ThemeControl() {
	const { isCookie, setCookie } = useCookie();
	const inputEl = useRef(null);

	// 컴포넌트 마운트시 theme라는 이름의 쿠키값이 있으면
	if (isCookie('theme')) {
		// 현재 쿠키값에서 'theme=' 다음 문자값을 가져와서 ; 기준으로 배열을 분리 한 뒤 제일 첫번째 값이 theme 컬러값
		// 해당 쿠키 컬러값으로 자동 세팅
		document.body.style.setProperty('--pointColor', document.cookie.split('theme=')[1].split(';')[0]);
	}
	// 만약 쿠키가 없으면 그냥 css에 등록되어 있는 기본 --pointColor값 활용

	const changeThemeColor = () => {
		const color = inputEl.current.value;
		console.log(color);
		setCookie('theme', color, 40);
		console.log(getComputedStyle(document.body).getPropertyValue('--pointColor'));
		document.body.style.setProperty('--pointColor', color);
	};

	console.log('Cookie', isCookie);

	return (
		<nav className='ThemeControl'>
			<input type='color' ref={inputEl} onChange={changeThemeColor} />
			{/* <button onClick={changeThemeColor}>Theme Color</button> 접근성은 버튼 필수*/}
		</nav>
	);
}

/*
1. 클릭 이벤트 발생시 컬러 팔레트에서 선택한 색상 코드값을 쿠키로 저장
2. App 마운트시 --pointColor에 등록된 value 값을 쿠키에 있는 값으로 변경 처리
*/

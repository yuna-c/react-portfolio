import { useRef } from 'react';
import { useCookie } from '../../../hooks/useCookie';
import './ThemeControl.scss';

// 미션1 - 테마 초기화 버튼 생성한 뒤 해당 벼튼 클릭시 Css 변수에 등록되어 있는 색상 값으로 초기화
// 미션2 - Dark모드의 값도 쿠키에 등록 해서 한번 설정된 값으로 유지되도록 처리

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
			<button>reset</button>
		</nav>
	);
}

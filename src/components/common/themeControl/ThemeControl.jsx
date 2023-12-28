import './ThemeControl.scss';

export default function ThemeControl() {
	return (
		<nav className='ThemeControl'>
			<input type='color' />
			<button>Theme Color</button>
		</nav>
	);
}

/*
1. 클릭 이벤트 발생시 컬러 팔레트에서 선택한 색상 코드값을 쿠키로 저장
2. App 마운트시 --pointColor에 등록된 value 값을 쿠키에 있는 값으로 변경 처리
*/

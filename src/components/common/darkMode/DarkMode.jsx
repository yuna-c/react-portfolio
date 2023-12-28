import { useCookie } from '../../../hooks/useCookie';
import { useGlobalData } from '../../../hooks/useGlobalData';
import './DarkMode.scss';

export default function DarkMode() {
	const { setCookie } = useCookie();
	const { Dark, setDark } = useGlobalData();

	const changeMode = () => {
		setDark(!Dark);
		//토글 이벤트함수가 호출될때 반전되는 Dark state값을 쿠키에 저장
		setCookie('dark', !Dark, 20);
	};

	return (
		<div className={`DarkMode ${Dark ? 'dark' : ''}`} onClick={changeMode}>
			<div className='ball'></div>
		</div>
	);
}

// 이벤트 횟수 60 -> 2번으로 줄이기
// Debounce vs Throttle
// Debounce : 이벤트 발생하는 간격 시간을 비교해서 일정 시간 간격 안에 이벤트가 발생 중이면 함수 호출을 무기한 연기
// Throttle : 물리적으로 이벤트 반복 횟수를 줄임
// Debounce 적용 대표 사례 : 특정 input 요소 입력을 끝날 때 까지 fetching함수 호출 자체를 계속 미룰 때
// Throttle 적용 대표 사례 : window event(scroll, resize) 발생시마다 불필요하게 ㅁ낳이 호출되는 함수의 호출 횟수를 줄일 때
import { useRef } from 'react';

export const useThrottle = (func, gap = 500) => {
	//함수를인수로 받아서 내보내는 고차함수
	const evetBlocker = useRef(null); // false일 떄 실행이 한번 호출됨
	// 바로 리턴으로 받고나서 유즈레프에 값을 담음
	// 값을 받은다음 딜레이값이 끝날 때까지 셋타임아웃을 다시 실행시키지 않으면서 유지시킴

	return () => {
		if (evetBlocker.current) return; // false = 무시
		evetBlocker.current = setTimeout(() => {
			func();
			evetBlocker.current = null; //전역에 있는 값을 유지시킴
		}, gap /*500*/); // 0.5초 =>1초에 2번 이후에만 한꺼번에 이벤트 처리하는 숫자를 gap이라는 인수로 줘서 값을 내보낼 때, 해당 컴포넌트에서 gap 값을 조정할 수 있게
		// 화면 주사율이 1초에 60hz
	};
};

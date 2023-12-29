// 이벤트 횟수 60 -> 2번으로 줄이기
// Debounce vs Throttle
// Debounce : 이벤트 발생하는 간격 시간을 비교해서 일정 시간 간격 안에 이벤트가 발생 중이면 함수 호출을 무기한 연기
// Throttle : 물리적으로 이벤트 반복 횟수를 줄임
// Debounce 적용 대표 사례 : 특정 input 요소 입력을 끝날 때 까지 fetching함수 호출 자체를 계속 미룰 때
// Throttle 적용 대표 사례 : window event(scroll, resize) 발생시마다 불필요하게 많이 호출되는 함수의 호출 횟수를 줄일 때
import { useRef } from 'react';

// setTimeout이 호출되면 delay뒤에 리턴 값이 반환이 아니라 호출 즉시 return 반환
// setTimeout의 delay값이 끝나기 전에 중복 호출 되면 기준 함수 무시하고 다시 초기화해서 setTimeout이 또 호출

export const useThrottle = (func, gap = 500) => {
	// 이를 막기 위해, 초기값을 null값을 eventBlocker에 담아서 초기 한번은 온전히 setTimeout이 호출되게 처리
	const eventBlocker = useRef(null); // false일 떄 실행이 한번 호출됨

	return () => {
		// eventBlocker이 담겨있으면 리턴으로 강제 중지함으로써 setTimeout을 중복 호출하지 않음
		if (eventBlocker.current) return;

		// setTimeout이 실행됨과 동시에 리턴값을 eventBlocker에 담아서 중복호출을 막으면서 gap 시간 이후에 호출되는 특정 로직을 보장
		eventBlocker.current = setTimeout(() => {
			// gap시간 이후에 인수로 전달된 함수를 호출하고
			func();
			// eventBlocker을 다시 비움
			eventBlocker.current = null;
			// gap시간 이후에 다시 setTimeout을 호출할 수 있게 됨
		}, gap /*500*/);
	};
};

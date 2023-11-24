/*
use로 시작되는 custom hook 함수는 컴포넌트 단에서 호출 가능
컴포넌트 안쪽의 또 다른 hook이나 일반 핸들러 함수 안쪽에서는 호출 불가능
해결방법 : 커스텀 훅이 특정 기능을 수행해주는 또 다른 함수를 내부적으로 생성한 다음에 해당 함수 리턴
다른 컴포넌트에서 or 일반 핸들러 함수 안쪽에서 커스텀 훅 자체는 호출 불가하지만 커스텀훅이 리턴한 자식함수는 호출 가능
*/

export function useSplitText() {
	//해당 useSplitText훅은 호출시 아래 함수를 리턴
	return (txt) => {
		console.log(txt);
	};
}

// const result = useSplitText();

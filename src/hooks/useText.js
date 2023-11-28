// 글자 애니메이션
export function useSplitText() {
	return (ref, txt, speed = 0, interval = 0) => {
		//txt = title
		//interval 간격
		let tags = '';
		let count = 0; //초

		for (let letter of txt) {
			tags += `
        <span style='transition-duration:${speed}s; transition-delay:${interval * count}s; display:inline-block;'>${letter}</span>
      `;
			// span에 모션 처리 숫자값
			count++;
		}
		// console.log(tags);
		ref.innerHTML = tags;
	};
}

// 첫글자 잘라서 대문자
export function useCustomText(type) {
	if (type === 'title') {
		//title 걍 구분자임
		return (txt) => {
			return txt.charAt(0).toUpperCase() + txt.slice(1);
		};
	}
	// 글자 자르기 함수 추가
	if (type === 'shorten') {
		return (txt, len = 100) => {
			if (txt.length > len) {
				return txt.slice(0, len) + '...';
				// console.log(txt.slice(0, len) + '...');
			} else {
				return txt;
			}
		};
	}
}
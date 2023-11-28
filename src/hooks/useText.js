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
			} else {
				return txt;
			}
		};
	}
	// 글자 빈칸 추가해서 이어 붙이기
	if (type === 'combined') {
		return (txt, spc) => {
			//txt를 spc 기준으로 나눔
			// let resultText = '';
			const resultText = txt // 원본 텍스트를 가져옴
				.split(spc) // split으로 두번재 인수로 받은 구분자로 분리해서 배열로 반환
				//.map((data) => (data += data.charAt(0).toUpperCase() + data.slice(1)))
				.map((data) => data.charAt(0).toUpperCase() + data.slice(1)) // 배열값을 map으로 반복돌며 첫 글자만 대문자로 변환해서 새로운 배열로 반환
				.join(' '); //새롭게 반환된 배열을 다시 빈칸을 구분자로 해서 하나의 문자열로 이어 붙여줌
			return resultText; // 위에서 만들어진 문자값을 최종적으로 반환
		};
	}
	//글차 빈칸 없이 이어 붙이기
	if (type === 'combined2') {
		return (txt, spc) => {
			//txt를 spc 기준으로 나눔
			// console.log(txt, spc);
			let resultText = '';
			txt.split(spc).map((data) => {
				// console.log(data);
				resultText += data.charAt(0).toUpperCase() + data.slice(1);
			});
			return resultText;
		};
	}
}

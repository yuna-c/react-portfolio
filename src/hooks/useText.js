// 글자 애니메이션
export function useSplitText() {
	return (ref, txt, speed = 0, interval = 0) => {
		//txt = title
		//interval 간격
		let tags = '';
		let count = 0; //초

		for (let letter of txt) {
			tags += `
			<span style='transition-duration:${speed}s;transition-delay:${interval * count}s; display:inline-block;'>${letter}</span>
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
	const toUpperText = (txt) => {
		return txt.charAt(0).toUpperCase() + txt.slice(1);
	};

	// ...
	if (type === 'shorten') {
		return (txt, len = 100) => {
			if (txt.length > len) {
				return txt.slice(0, len) + '...';
			} else {
				return txt;
			}
		};
	}

	// 구분(-없이) 첫글자 대문자 처리
	if (type === 'combined') {
		// regEx(regular expression : 정규 표현식) 문자열의 패턴별 특정 기능 수행식
		// /정규표현식/
		return (txt, spc = ' ') => {
			//두번째 인수 안주면 빈 칸 처리고, 아니면 .이나 특수문자 처리
			const resultText = txt
				.split(/-|_|\+/) // if 인수로 들어가는 특수문자가 -,_,+일 때 해당 구분자로 문자를 분리(예약어 문자열은 앞에 \(역슬러시))
				.map((data) => toUpperText(data))
				.join(spc);
			return resultText;
		};
	}

	// 글자 빈칸 없이 이어 붙이기
	if (type === 'combined2') {
		return (txt, spc) => {
			//txt를 spc 기준으로 나눔
			// console.log(txt, spc);
			let resultText = '';
			txt.split(spc).map((data) => {
				// console.log(data);
				resultText += toUpperText(data);
			});
			return resultText;
		};
	}
}

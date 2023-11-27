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

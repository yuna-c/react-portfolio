export function useSplitText() {
	return (ref, txt, speed = 0, interval = 0) => {
		//txt = title
		let tags = '';
		let count = 0;

		for (let letter of txt) {
			tags += `
        <span style='transition-duration:${speed}s; transition-delay:${interval * count}s;'>${letter}</span>
      `;
			// span에 모션 처리 숫자값
			count++;
		}
		console.log(tags);
		ref.innerHTML = tags;
	};
}

export function useSplitText() {
	return (ref, txt) => {
		let tags = '';

		for (let letter of txt) {
			tags += `
        <span>${letter}</span>
      `;
		}
		console.log(tags);
		ref.innerHTML = tags;
	};
}

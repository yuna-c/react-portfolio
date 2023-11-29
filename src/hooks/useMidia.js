import { useEffect, useState } from 'react';

export const useMedia = (opt) => {
	const defOpt = { mobile: 640, tablet: 1000, laptop: 1400 };
	const result = { ...defOpt, ...opt }; // opt : 디폴트 객체 덮어쓰게 하기
	const [Type, setType] = useState(''); // 문자열

	const getClientWid = () => {
		let wid = window.innerWidth;
		if (wid >= result.laptop) setType(''); //width가 laptop보다 커지면
		if (wid >= result.tablet && wid < result.laptop) setType('laptop'); //클래스 명으로 활용
		if (wid >= result.mobile && wid < result.tablet) setType('tablet');
		if (wid >= 0 && wid < result.mobile) setType('mobile');
	};

	useEffect(() => {
		getClientWid();
		window.addEventListener('resize', getClientWid);
		return () => window.removeEventListener('resize', getClientWid);
	}, []);

	console.log(Type);
	return Type;
	// jsx 안쪽 명령어 함수 실행 X (가능 : 삼항연산자,변수치환,map,`${함수}`)
};

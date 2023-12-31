import Anime from '../asset/anime';
import { useState, useEffect, useRef, useCallback } from 'react';

export function useScroll(customHandler, baseLine = -window.innerHeight / 2) {
	const refEl = useRef(null);
	const [Frame, setFrame] = useState(null);

	const scrollTo = targetPos => {
		Frame && new Anime(Frame, { scroll: targetPos });
	};

	const getCurrentScroll = useCallback(() => {
		const scroll = Frame.scrollTop - baseLine;
		const modifiedScroll = scroll - refEl.current?.offsetTop;
		return modifiedScroll;
	}, [Frame, baseLine]);

	const handleScroll = useCallback(() => {
		const scroll = getCurrentScroll();
		customHandler(scroll);
	}, [getCurrentScroll, customHandler]);

	useEffect(() => {
		setFrame(document.querySelector('.wrap'));
	}, []);

	useEffect(() => {
		Frame?.addEventListener('scroll', handleScroll);
		return () => Frame?.removeEventListener('scroll', handleScroll);
	}, [Frame, handleScroll]);

	return { scrollTo, getCurrentScroll, Frame, refEl };
}

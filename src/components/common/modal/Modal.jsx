import './Modal.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../redux/action';

export default function Modal({ children }) {
	// 부모로부터 프롭을 받을 필요 없이, 전역에 있는 값을 가져와서 값만 바꾸면 된다
	const dispatch = useDispatch();
	const Open = useSelector(store => store.modalReducer.modal);

	return (
		<>
			<AnimatePresence>
				{Open && (
					<motion.aside
						className='Modal'
						initial={{ opacity: 0, x: '-100%', scale: 0, rotate: -45 }}
						animate={{ opacity: 1, x: '0%', scale: 1, rotate: 0 }}
						exit={{ opacity: 0, y: '100%', scale: 2, rotate: 45, transition: { delay: 0.5 } }}
						transition={{ duration: 2 }}>
						<motion.div
							className='con'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0, transition: { delay: 0 } }}
							transition={{ duration: 0.5, delay: 1 }}>
							{children}
						</motion.div>
						<span onClick={() => dispatch({ type: types.MODAL.start, payload: false })}>close</span>
					</motion.aside>
				)}
			</AnimatePresence>
		</>
	);
}

import './Modal.scss';
import * as types from '../../../redux/actionType';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

export default function Modal({ children }) {
	const dispatch = useDispatch();
	const Open = useSelector(store => store.modalReducer.modal);
	// modalReducer 안의 모달을 가져와서 불린 처리

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

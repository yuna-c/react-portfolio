import { useGlobalData } from '../../../hooks/useGlobalData';
import './Modal.scss';
import { AnimatePresence, motion } from 'framer-motion';

export default function Modal({ children }) {
	const { ModalOpen, setModalOpen } = useGlobalData();
	// console.log(result);

	return (
		<AnimatePresence>
			{ModalOpen && (
				<motion.aside
					className='Modal'
					initial={{ opacity: 0, x: '-100%', scale: 0, rotate: -45 }}
					animate={{ opacity: 1, x: '0%', scale: 1, rotate: 0 }}
					exit={{ opacity: 0, y: '100%', scale: 2, rotate: 45, transition: { delay: 0.5 } }}
					transition={{ duration: 1 }}>
					<motion.div
						className='con'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { delay: 0 } }}
						transition={{ duration: 0.5, delay: 1 }}>
						{children}
					</motion.div>
					<span onClick={() => setModalOpen(false)}>close</span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}

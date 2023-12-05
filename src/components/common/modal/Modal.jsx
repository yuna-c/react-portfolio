import './Modal.scss';
import { AnimatePresence, motion } from 'framer-motion';

// 모달 컴포넌트 자체적으로 특정 state값에 따라서 자기 자신의 컨텐츠를 보여줄 지 말지 결정
// 기존이랑 다른점
// : 부모 컴퍼넌트 기준에서 Modal 컴포넌트는 계속 마운트되어 있는 상태이지만 state값에 따라서 Dom 출력 유무만 변경

/* framer : 간단한 모션만 가능ㅎ..
	framer react : https://www.framer.com/motion/
	https://www.npmjs.com/package/framer-motion
	npm i framer-motion@4

	AnimatePresence : 모션을 적용할 컴포넌트의 wrapping 컴포넌트 지정
	- 자식요소의 모션이 끝날 때 까지 언마운트 되는 시점을 holding 처리
	- motion : 모션을 걸고싶은 JSX컴포넌트에 연결해서 inital, animate, exit 라는 속성으로 모션 수치값을 조절 가능

  -inital : 모션이 일어나기 전 상태값
  -animate : 모션이 일어날 때의 상태값
  -exit : 사라질 때의 값
*/

export default function Modal({ Open, setOpen, children }) {
	// 모달은 자주 쓰니까! 숙지하자!
	return (
		<>
			<AnimatePresence>
				{/* 자식에서 오픈 스테이트 받아서 자기가 트루일때 보이게 */}
				{Open && (
					<motion.aside
						className='Modal'
						initial={{ opacity: 0, x: '-100%', scale: 0, rotate: -45 }}
						animate={{ opacity: 1, x: '0%', scale: 1, rotate: 0 }}
						exit={{ opacity: 0, y: '100%', scale: 2, rotate: 45 }}
						transition={{ duration: 2 }}
					>
						<div className='con'>{children}</div>
						<span onClick={() => setOpen(false)}>close</span>
					</motion.aside>
				)}
			</AnimatePresence>
		</>
	);
}

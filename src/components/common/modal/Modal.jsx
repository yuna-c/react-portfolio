import './Modal.scss';

export default function Modal({ setOpen }) {
	// 모달은 자주 쓰니까! 숙지하자!
	return (
		<aside className='Modal'>
			<div className='con'></div>
			<span onClick={() => setOpen(false)}>close</span>
		</aside>
	);
}

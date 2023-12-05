import './Modal.scss';
/*
모달 컴포넌트 자체적으로 특정 state값에 따라서 자기 자신의 컨텐츠를 보여줄 지 말지 결정
기존이랑 다른점 
: 부모 컴퍼넌트 기준에서 Modal 컴포넌트는 계속 마운트되어 있는 상태이지만 state값에 따라서 Dom 출력 유무만 변경
*/
export default function Modal({ Open, setOpen, children }) {
	// 모달은 자주 쓰니까! 숙지하자!
	return (
		<>
			{/* 자식에서 오픈 스테이트 받아서 자기가 트루일때 보이게 */}
			{Open && (
				<aside className='Modal'>
					<div className='con'>{children}</div>
					<span onClick={() => setOpen(false)}>close</span>
				</aside>
			)}
		</>
	);
}

import './CookieModal.scss';

export default function CookieModal({ wid, ht, children }) {
	return (
		<aside className='CookieModal' style={{ width: wid, height: ht, marginLeft: -wid / 2, marginTop: -ht / 2 }}>
			<div className='content'>{children}</div>

			<div className='controls'>
				<nav>
					<span>
						<input type='checkbox' />
						오늘 하루 팝업 보지 않기
					</span>
				</nav>
				<nav>
					<span>팝업 닫기</span>
				</nav>
			</div>
		</aside>
	);
}

/*
  작업흐름
  1.해당 컴포넌트에 특정 state값에 따라 보이고 안보이고 처리
  2.닫기 이벤트 발생시 팝업 안보이도록 state값 변경처리
  3.체크박스 체크한뒤 닫기 버튼 클릭시 특정 쿠키 생성
  4.해당 컴포넌트 마운트시 특정 쿠키값 있으면 무조건 안보이게
*/

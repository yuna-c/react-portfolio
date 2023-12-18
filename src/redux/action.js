// 각 데이터 카테고리별 사용될 액선 타입명을 변수처럼 모아놓은 객체
export const MEMBER = {
	start: 'MEMBER_START', //SAGA에서만
	success: 'MEMBER_SUCCESS',
	fail: 'MEMBER_FAIL'
};

export const HISTORY = {
	start: 'HISTORY_START',
	success: 'HISTORY_SUCCESS',
	fail: 'HISTORY_FAIL'
};

export const YOUTUBE = {
	start: 'YOUTUBE_START',
	success: 'YOUTUBE_SUCCESS',
	fail: 'YOUTUBE_FAIL'
};
// 비동기데이터는 요청 보내고 응답 받을 때까지 pandding 상태여야 상태값이 세갠데
// 클라이언트 데이터는 액션타입이 하나만 있어도 된다

export const MODAL = {
	start: 'MODAL_START'
};

/*
  Cookie
  : 서버에서 https통신으로 client(Browser)에 데이터를 전달할때 header객체에 전달하는 경량의 문자데이터(4kb:개별 쿠기값당)
  : 사용자의 브라우저에 물리적인 파일형태로 저장이 되기 때문에 사용자를 브라우저를 닫더라도 유지시킬수 있는 값
  : 만료일이 존재해하고 사용자가 설정가능, 만약 만료일을 지정하지 않으면 브라우저를 닫는 순간 쿠키값 삭제됨
  Cookie vs Session
  : Cookie정보는 client쪽에 저장되는 반면 Session을 서버쪽에 저장됨
  : 덜 중요한 값을 유지시킬때 주로 Cookie사용 (장바구니 목록, 오늘하루 팝업안보이기, etc..)
  : 사용자 개인정보같이 중요한 정보값을 Session사용 (사용자 로그인 정보, etc...)
  Cookie ve Local Storage
  : Cookie데이터가 Local Storage에 비해서 경량의 문자값만 등록 가능 (cookie:4kb, local storage:5mb)
  : Cookie는 만료일 지정가능가능하기 때문에 자동적으로 값이 제거됨
  : Local Storage는 사용자가 직접 삭제하기 전까지는 계속 유지됨
*/

export function useCookie() {
	// 특정 이벤트 핸들러 안에 써야 하기 때문에 커스텀 훅 호출 후 특정 함수를 반환하게 해서 이벤트핸들러 안쪽에 함수를 반환하게 함
	// return () => {};
	/* return function setCookie(name, value, time) { */
	return (name, value, time) => {
		let now = new Date();
		let duedate = now.getTime() + 1000 * time;
		now.setTime(duedate);
		document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`;
	};
}

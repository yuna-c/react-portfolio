import './Community.scss';
import Layout from '../../common/layout/Layout';
import { ImCancelCircle } from 'react-icons/im';
import { TfiWrite } from 'react-icons/tfi';
import { useEffect, useRef, useState } from 'react';
import { useCustomText } from '../../../hooks/useText';

// moment.js로 포맷.. 해서 쓸수도 있긴해
// https://momentjs.com/

export default function Community() {
	const changeText = useCustomText('combined');

	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return [];
	};

	const [Post, setPost] = useState(getLocalData()); //함수를 호출해야 하니까 ()
	const refTit = useRef(null);
	const refCon = useRef(null);
	const refEditTit = useRef(null);
	const refEditCon = useRef(null);
	const editMode = useRef(false);

	// 인풋 초기화
	const resetPost = () => {
		refTit.current.value = '';
		refCon.current.value = '';
	};

	// 글 저장 함수
	const createPost = () => {
		if (!refTit.current.value.trim() || !refCon.current.value.trim()) {
			resetPost();
			return alert('제목과 본문을 모두 입력해 보세요');
		}
		console.log(new Date());
		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;
		setPost([
			{ title: refTit.current.value, content: refCon.current.value, date: new Date(korTime) },
			...Post,
		]);
		resetPost();
	};

	// 글 수정 함수
	const updatePost = (updateIndex) => {
		if (!refEditTit.current.value.trim() || !refEditCon.current.value.trim()) {
			return alert('수정할 글의 제목과  본문을 모두 입력하세요.');
		}

		editMode.current = false;

		setPost(
			Post.map((el, idx) => {
				if (updateIndex === idx) {
					el.title = refEditTit.current.value;
					el.content = refEditCon.current.value;
					el.enableUpdate = false;
				}
				return el;
			})
		);
	};

	// 글 삭제 함수
	const deletePost = (delIndex) => {
		console.log(delIndex);
		// 기존의 map과 마찬가지로 기존 배열값을 deep copy해서 새오운 배열 반환
		// 이때 안쪽의 조건문을 처리해서 특정 조건에 부합되는 값만 필터링해서 리턴
		// 1
		// const result = Post.filter((el, idx) => {
		// 	return delIndex !== idx;
		// });
		// console.log(result);
		// 2
		// const result = Post.filter((el, idx) => delIndex !== idx);
		// ! false = return 실행
		if (!window.confirm('정말 해당 게시글 삭제?')) return;
		setPost(Post.filter((_, idx) => delIndex !== idx));
	};

	// 수정모드 변경함수
	const enableUpdate = (editIndex) => {
		if (editMode.current) return;
		editMode.current = true;
		//1번 작업
		/* 
		const result = Post.map((el, idx) => {
			if (editIndex === idx) el.enableUpdate = true;
			return el;
		});
		console.log(result);
		enableUpdate: true
		setPost(result);
		*/

		/*
		기존의 Post 배열을 반복돌면서 파라미터로 전달된 editIndex순번의 포스트에만 enableUpdate=true라는 구분자를 추가해서 다시 state 변경 처리
		다음번 랜더링때 해당 구분자가 있는 포스트 객체만 수정모드로 분기처리 하기 위함
		*/
		setPost(
			Post.map((el, idx) => {
				if (editIndex === idx) el.enableUpdate = true;
				return el;
			})
		);
	};

	// 출력모드 변경함수
	const disableUpdate = (editIndex) => {
		setPost(
			Post.map((el, idx) => {
				if (editIndex === idx) el.enableUpdate = false;
				return el;
			})
		);
	};

	// 필터링 함수
	const filtering = (txt) => {
		//txt 인수로 받을꺼야
		const abc = Post.filter((el) => el.title.indexOf(txt) >= 0 || el.content.indexOf(txt) >= 0);
		console.log(abc);
		alert(abc);
	};

	useEffect(() => {
		// Post 데이터 변경시 수정모드 강제 닫기(false) 하면서 로컬 저장소에 저장하고 컴포넌트 재실행
		Post.map((el) => (el.enableUpdate = false));
		localStorage.setItem('post', JSON.stringify(Post));
	}, [Post]);

	return (
		<Layout title={'Community'}>
			<div className='comunityWrap'>
				<div className='inputBox'>
					<input type='text' placeholder='Title' ref={refTit} />
					<textarea cols='30' rows='3' placeholder='Content' name='con' ref={refCon}></textarea>

					<nav>
						<button onClick={resetPost}>
							<ImCancelCircle />
						</button>
						<button onClick={createPost}>
							<TfiWrite />
						</button>
					</nav>
				</div>

				<div className='showBox'>
					{Post.map((el, idx) => {
						const date = JSON.stringify(el.date);
						const strDate = changeText(date.split('T')[0].slice(1), '.');
						console.log(strDate);
						console.log(date);

						if (el.enableUpdate) {
							// enableUpdate true
							// 수정모드
							return (
								<article key={el + idx}>
									<div className='txt'>
										<input type='text' defaultValue={el.title} ref={refEditTit} />
										<textarea
											name=''
											id=''
											cols='30'
											rows='10'
											defaultValue={el.content}
											ref={refEditCon}
										></textarea>
										<span>{strDate}</span>
									</div>

									<nav>
										{/* 수정모드일 대 해당버튼 클릭 시 다시 출력모드 변경 */}
										<button onClick={() => disableUpdate(idx)}>Cancle</button>
										<button onClick={() => updatePost(idx)}>Update</button>
									</nav>
								</article>
							);
						} else {
							// enableUpdate 없을때
							// 출력모드
							return (
								<article key={el + idx}>
									<div className='txt'>
										<h2>{el.title}</h2>
										<p>{el.content}</p>
										<span>{strDate}</span>
									</div>

									<nav>
										<button
											className='gubun'
											onClick={() => {
												enableUpdate(idx);
												// filtering('가나다');
											}}
										>
											{/* idx 어떤거 할껀지 순서값 */}
											Edit
										</button>
										{/* <button className='gubun' onClick={() => filtering('777777777777')}>
										Edit
									</button> */}
										<button onClick={() => deletePost(idx)}>Delete</button>
									</nav>
								</article>
							);
						}
						// // 출력모드
						// return (
						// 	<article key={el + idx}>
						// 		<div className='txt'>
						// 			<h2>{el.title}</h2>
						// 			<p>{el.content}</p>
						// 			<span>{strDate}</span>
						// 		</div>

						// 		<nav>
						// 			<button className='gubun' onClick={() => enableUpdate(idx)}>
						// 				{/* idx 어떤거 할껀지 순서값 */}
						// 				Edit
						// 			</button>
						// 			{/* <button className='gubun' onClick={() => filtering('777777777777')}>
						// 				Edit
						// 			</button> */}
						// 			<button onClick={() => deletePost(idx)}>Delete</button>
						// 		</nav>
						// 	</article>
						// );
					})}
				</div>
			</div>
		</Layout>
	);
}

/*
1. input요소로 글입력/출력 박스 생성
2. 전체글을 관리할 배열 state를 생성 [{글정보1},{글정보2},{글정보3}]
3. 글입력후 저장버튼 클릭시 글 정보를 객체형태로 state에 계속 추가(create)
4. state 배열에 추가된 값들을 반복 돌면서 글리스트 출력(Read)
5. 글 출력시 삭제/수정버튼 추가해서 출력
6. 글리스트에서 삭제버튼 클릭시 해당 배열 state에서 이벤트 발생한 순번에 객체 제거해서 글 삭제(delete)

C create(데이터 저장) : 글작성
R	read(데이터 호출) : 글목록 보기
U update(데이터 변경) : 글 수정
D delete(데이터 삭제) : 글 삭제
console.log(window);

Localstorage : 모든 브라우저가 내장하고있는 경량의 저장소
-- 문자값만 저장가능 (5MB)
-- 로컬저장소에 문자열 이외의 값을 저장할 때에는 강제로 문자화 시켜서 저장
-- 로컬저장소의 값을 JS로 가져올 때는 문자값을 반대로 객체화 시켜서 호출 (parcing)	
-- application => Localstorage

Localstorage객체에 활용 가능한 메서드
- setItem('키' , '문자화된 데이터') : 해당 키값의 데이터를 담아 저장
- getItem('키') : 해당 키값에 매칭이 되는 데이터를 가져옴

filter() 기능의 원래 쓰임?
게시글 검색기능

글 수정 로직 단계
1. 각 포스트에서 수정 버튼 클릭시 해당 객체에 enableUpdate=true라는 프로퍼티를 동적으로 추가 후 state 저장
2. 다음번 랜더링 사이클에서 포스트를 반복 돌며 객체에 enableUpdate값이 true면 제목 본문만 input요소에 담아서 출럭하도록 분기처리(출력시 수정모드로 분기처리해서 출력)
3. 수정모드일 때는 수정취소/수정완료 버튼 생성
4. 수정모드에서 수정 취소버튼 클릭시 해당 포스트 객체에 enableUpdate=false로 변경해서 출력 모드 변경
5. 수정모드에서 수정 완료 버튼 클릭시 해당 폼요소에 수정된 value값을 가져와서 저장한 뒤 다시 출력 모드 변경

*/

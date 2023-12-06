import './Community.scss';
import Layout from '../../common/layout/Layout';
import { ImCancelCircle } from 'react-icons/im';
import { TfiWrite } from 'react-icons/tfi';
import { useEffect, useRef, useState } from 'react';

export default function Community() {
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		// 로컬저장소 post 키값에 값이 있으면 parsing해서 리턴
		if (data) return JSON.parse(data);
		// 없으면 빈 배열 리턴(해당 컴포넌트 제일 처음 호출될 때 한 번)
		else return [];
	};
	//1 여기다가 호출
	const [Post, setPost] = useState(getLocalData()); //함수를 호출해야 하니까 ()
	//2
	const refTit = useRef(null);
	const refCon = useRef(null);
	console.log(Post);
	//4
	const resetPost = () => {
		refTit.current.value = '';
		refCon.current.value = '';
	};

	//3
	const createPost = () => {
		// 해당 값 없거나 || 해당 값 없거나
		if (!refTit.current.value.trim() || !refCon.current.value.trim()) {
			resetPost();
			return alert('제목과 본문을 모두 일벽해 보세요');
		}
		// 기존 배열을 통채로 복사할꺼얌(스프레드연산자)
		// 쓴 순서대로 하려면 객체가 스프레드 연산자보다 먼저와야 해
		setPost([{ title: refTit.current.value, content: refCon.current.value }, ...Post]);
		resetPost();
	};

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Post));
		// JSON.stringify(Post) 강제로 값을 문자화 시키는 구문(빈배열이 문자화 하여)
		// state변경되기전에 빈 배열값을 저장하기 때문에 초기화되어 값이 사라짐
	}, [Post]);

	return (
		<Layout title={'Community'}>
			<div className='wrap'>
				<div className='inputBox'>
					<input type='text' placeholder='Title' name='tit' ref={refTit} />
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
						return (
							<article key={el + idx}>
								<div className='txt'>
									<h2>{el.title}</h2>
									<p>{el.content}</p>
								</div>

								<nav>
									<button>Edit</button>
									<button>Delete</button>
								</nav>
							</article>
						);
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
*/

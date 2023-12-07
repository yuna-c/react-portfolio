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
			{ title: refTit.current.value, content: refCon.current.value, date: new Date(korTime).toDateString() },
			...Post,
		]);
		resetPost();
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

	const filtering = (txt) => {
		//txt 인수로 받을꺼야
		const abc = Post.filter((el) => el.title.indexOf(txt) >= 0 || el.content.indexOf(txt) >= 0);
		console.log(abc);
		alert(abc);
	};

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Post));
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
						const date = JSON.stringify(el.date);
						const strDate = changeText(date.split('T')[0].slice(1), '.');
						console.log(strDate);
						return (
							<article key={el + idx}>
								<div className='txt'>
									<h2>{el.title}</h2>
									<p>{el.content}</p>
									<span>{strDate}</span>
								</div>

								<nav>
									<button className='gubun' onClick={() => filtering('777777777777')}>
										Edit
									</button>
									<button onClick={() => deletePost(idx)}>Delete</button>
								</nav>
							</article>
						);
					})}
				</div>
			</div>
		</Layout>
	);
}

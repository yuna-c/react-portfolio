import './Community.scss';
import Layout from '../../common/layout/Layout';
import { ImCancelCircle } from 'react-icons/im';
import { TfiWrite } from 'react-icons/tfi';

export default function Community() {
	return (
		<Layout title={'Community'}>
			<div className='wrap'>
				<div className='inputBox'>
					<form action='/' method='get'>
						<input type='text' placeholder='Title' name='tit' />
						<textarea cols='30' rows='3' placeholder='Content' name='con'></textarea>

						<nav>
							<button>
								<ImCancelCircle />
							</button>
							<button>
								<TfiWrite />
							</button>
						</nav>
					</form>
				</div>

				<div className='showBox'></div>
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
*/

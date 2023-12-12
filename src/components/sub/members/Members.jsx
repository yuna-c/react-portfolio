import { useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Members.scss';

export default function Members() {
	// id값 참조객체에 담음
	const initVal = useRef({
		userid: ''
	});
	//초기 state 값
	const [Val, setVal] = useState(initVal.current);

	const handleChange = e => {
		console.log('name', e.target.name);
		console.log('value', e.target.value);
		const key = e.target.name; // userid
		const value = e.target.value; //현재 입력하고 있는 인풋값
		setVal({ ...Val, [key]: value });
		// 동작 안되는 이유 .. ? key는 문자가 아니어야 하는데 문자로 할당되니까 변수치환 못하니까.. 대괄호[]로 감싸면 돼
		// 이거는 많이 쓰일 것 같아
	};

	return (
		<Layout title={'Members'}>
			<div className='wrap'>
				<div className='infoBox'>
					<h2>Join Members</h2>
				</div>
				<div className='formBox'>
					<form>
						<fieldset>
							{/* 접근성을 위해서 꼭 있어야 한다 */}
							<legend className='h'>회원가입 폼</legend>
							<table>
								<tbody>
									{/* 리액트는 tbody 없으면 에러처리 */}
									{/* userid, email */}
									<tr>
										<td>
											<input type='text' name='userid' placeholder='User ID' value={Val.userid} onChange={handleChange} />
											{/* name : 서버 전송하는 값, 리액트는 실시간으로 state의 돔의 프로퍼티로 활용할 값 */}
											{/* 값 안찍히는 이유 : 이벤트 발생할 때 스테이트 값이 변경이 안되기 때문에 value에 state 값이 출력되게 해놔서 안나옴 */}
										</td>
										<td>
											<input type='text' name='email' placeholder='Email' />
										</td>
									</tr>

									{/* pwd1, pwd2 */}
									<tr>
										<td>
											<input type='password' name='pwd1' placeholder='Password' />
										</td>
										<td>
											<input type='password' name='pwd2' placeholder='Re-Password' />
										</td>
									</tr>

									{/* edu */}
									<tr>
										<td colSpan='2'>
											<select name='edu'>
												<option value=''>Education</option>
												{/* value 값이 넘어감 */}
												<option value='elementary-school'>초등학교 졸업</option>
												<option value='middle-school'>중학교 졸업</option>
												<option value='high-school'>고등학교 졸업</option>
												<option value='college'>대학교 졸업</option>
											</select>
										</td>
									</tr>

									{/* gender */}
									<tr>
										<td colSpan='2'>
											<input type='radio' defaultValue='female' id='female' name='gender' />
											<label htmlFor='female'>Female</label>
											{/* 스크린 리더기는 label을 읽음 */}

											<input type='radio' defaultValue='male' id='male' name='gender' />
											<label htmlFor='male'>Male</label>
										</td>
									</tr>

									{/* interests */}
									<tr>
										<td colSpan='2'>
											<input type='checkbox' name='interest' id='sports' defaultValue='sports' />
											<label htmlFor='sports'>Sports</label>

											<input type='checkbox' name='interest' id='reading' defaultValue='reading' />
											<label htmlFor='reading'>Reading</label>

											<input type='checkbox' name='interest' id='music' defaultValue='music' />
											<label htmlFor='music'>Music</label>

											<input type='checkbox' name='interest' id='game' defaultValue='game' />
											<label htmlFor='game'>Game</label>
										</td>
									</tr>

									{/* comments  */}
									<tr>
										<td colSpan='2'>
											<textarea name='comments' cols='30' rows='5' placeholder='Leave a comment'></textarea>
										</td>
									</tr>

									{/* button set */}
									<tr>
										<td colSpan='2'>
											<input type='reset' value='Cancel' />
											<input type='submit' value='Submit' />
										</td>
									</tr>
								</tbody>
							</table>
						</fieldset>
					</form>
				</div>
			</div>
		</Layout>
	);
}

/*
	throttle vs debounce
	throttle : 물리적으로 핸들러함수 호출자체를 일정횟수로 줄임
	debounce : 특정 이벤트가 단시간에 반복으로 계속 발생하고 있으면 핸들러함수 호출 자체를 계속 뒤로 밀면서 호출 막음

	리액트에서 폼 인증 구현 로직 순서
	1. 폼 요소에 입력하는 값을 이벤트 핸들러 함수를 통해 실시간으로 state에 저장
	2. state 값이 변경될 때마다 check 함수를 통해 항복별로 인증 실페이 에러 객체로 묶어서 반환
	3. 폼에 submitHandler 함수를 연결
	4. 전송 이벤트가 발생시 submitHandler 함수 안쪽에서 check함수를 호출해서 err객체가 있으면 인증 실패
	5. check 함수가 내보내는 err 객체가 없으면 인증 성공 처리
*/

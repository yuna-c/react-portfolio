import { useDebounce } from '../../../hooks/useDebounce';
import Layout from '../../common/layout/Layout';
import './Members.scss';
import { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// useHistory를 사용하면, 페이지 방문 기록을 쉽게 관리할 수 있으며 여러가지 내장 함수를 사용해 뒤로가기, 특정 페이지로 이동하기 등을 구현

// useMemo 는 특정 결과값을 재사용 할 때 사용하는 반면, useCallback 은 특정 함수를 새로 만들지 않고 재사용하고 싶을때 사용
// 패칭 함수 한번 컴포넌트 랜더링 되는데 자식이 짜잘하게 디바운싱 안되면 재랜덜링시 문제 생김(패칭함수 다시 호출되니까) 프롭서 전달 안되면 재호출이 되긴하는데 메모리에 등록된 값을 가져와서 갠차나 or 함수에 유즈메모를 통해 받아오는 반환값을 메모라이징해옴 (useCallback or useMemo or memo)
// 등가교환 : 메모리 늘려서 강제로 가비지 컬렉터에 제외시키니까 좀 용량 커질 수 이께찌?

export default function Members() {
	const history = useHistory();
	const initVal = useRef({ userid: '', pwd1: '', pwd2: '', email: '', comments: '', edu: '', gender: '', interest: [] });
	const [Val, setVal] = useState(initVal.current);
	//useDebouce 훅의 인수로 특정 state를 전달해서 debouncing이 적용된 새로운 state값 반환받음
	//useDebouce 특정 시간이 지난 후에 한 번만 이벤트가 실행되도록 하는 것
	const DebouncedVal = useDebounce(Val);
	const [Errs, setErrs] = useState({});

	const handleReset = () => {
		setVal(initVal.current);
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleCheck = e => {
		const { name } = e.target;
		const inputs = e.target.parentElement.querySelectorAll('input');
		const checkArr = [];
		inputs.forEach(input => input.checked && checkArr.push(input.value));
		setVal({ ...Val, [name]: checkArr });
	};

	const check = value => {
		console.log('check');
		const errs = {};
		const num = /[0-9]/; //정규 표현식 (조건안의 내용이 true여야 반환)
		const txt = /[a-zA-Z]/;
		const spc = /[!@#$%^&*()[\]_.+]/;
		const [m1, m2] = value.email.split('@'); //예약어
		const m3 = m2 && m2.split('.'); // m2스플릿을 통해 값이 없으면 입력이 안되게 처리

		if (value.userid.length < 5) errs.userid = '아이디는 최소 5글자 이상 입력하세요';
		if (value.comments.length < 10) errs.comments = '남기는 말은 최소 10글자 이상 입력하세요';
		if (!value.gender) errs.gender = '성별을 선택하세요';
		if (value.interest.length === 0) errs.interest = '관심사를 하나이상 선택하세요.';
		if (!value.edu) errs.edu = '최종학력을 선택하세요.';
		if (value.pwd1 !== value.pwd2 || !value.pwd2) errs.pwd2 = '두개의 비밀번호를 같게 입력하세요.';
		if (!m1 || !m2 || !m3[0] || !m3[1]) errs.email = '올바른 이메일 형식으로 입력하세요';
		if (!num.test(value.pwd1) || !txt.test(value.pwd1) || !spc.test(value.pwd1) || value.pwd1.length < 5)
			errs.pwd1 = '비밀번호는 특수문자, 문자, 숫자를 모두포함해서 5글자 이상 입력하세요.';

		return errs;
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (Object.keys(check(Val)).length === 0) {
			alert('회원가입을 축하합니다.');
			history.push('/welcome/3');
		}
	};

	//debounding이 적용된 state를 의존성배열에 등록해서
	//해당 값으로 check함수 호출
	useEffect(() => {
		setErrs(check(DebouncedVal));
	}, [DebouncedVal]);

	return (
		<Layout title={'Members'}>
			<div className='wrap'>
				<div className='infoBox'>
					<h2>Join Members</h2>
				</div>

				<div className='formBox'>
					<form onSubmit={handleSubmit}>
						<fieldset>
							<legend className='h'>회원가입 폼</legend>
							<table>
								<tbody>
									{/* userid, email */}
									<tr>
										<td>
											<input type='text' name='userid' placeholder='User ID' value={Val.userid} onChange={handleChange} />
											{Errs.userid && <p>{Errs.userid}</p>}
										</td>
										<td>
											<input type='text' name='email' placeholder='Email' value={Val.email} onChange={handleChange} />
											{Errs.email && <p>{Errs.email}</p>}
										</td>
									</tr>

									{/* pwd1, pwd2 */}
									<tr>
										<td>
											<input type='password' name='pwd1' placeholder='Password' value={Val.pwd1} onChange={handleChange} />
											{Errs.pwd1 && <p>{Errs.pwd1}</p>}
										</td>
										<td>
											<input type='password' name='pwd2' placeholder='Re-Password' value={Val.pwd2} onChange={handleChange} />
											{Errs.pwd2 && <p>{Errs.pwd2}</p>}
										</td>
									</tr>

									{/* edu */}
									<tr>
										<td colSpan='2'>
											<select name='edu' onChange={handleChange}>
												<option value=''>Education</option>
												<option value='elementary-school'>초등학교 졸업</option>
												<option value='middle-school'>중학교 졸업</option>
												<option value='high-school'>고등학교 졸업</option>
												<option value='college'>대학교 졸업</option>
											</select>
											{Errs.edu && <p>{Errs.edu}</p>}
										</td>
									</tr>

									{/* gender */}
									<tr>
										<td colSpan='2'>
											<input type='radio' defaultValue='female' id='female' name='gender' onChange={handleChange} />
											<label htmlFor='female'>Female</label>

											<input type='radio' defaultValue='male' id='male' name='gender' onChange={handleChange} />
											<label htmlFor='male'>Male</label>
											{Errs.gender && <p>{Errs.gender}</p>}
										</td>
									</tr>

									{/* interests */}
									<tr>
										<td colSpan='2'>
											<input type='checkbox' name='interest' id='sports' defaultValue='sports' onChange={handleCheck} />
											<label htmlFor='sports'>Sports</label>

											<input type='checkbox' name='interest' id='reading' defaultValue='reading' onChange={handleCheck} />
											<label htmlFor='reading'>Reading</label>

											<input type='checkbox' name='interest' id='music' defaultValue='music' onChange={handleCheck} />
											<label htmlFor='music'>Music</label>

											<input type='checkbox' name='interest' id='game' defaultValue='game' onChange={handleCheck} />
											<label htmlFor='game'>Game</label>
											{Errs.interest && <p>{Errs.interest}</p>}
										</td>
									</tr>

									{/* comments  */}
									<tr>
										<td colSpan='2'>
											<textarea
												name='comments'
												cols='30'
												rows='5'
												placeholder='Leave a comment'
												value={Val.comments}
												onChange={handleChange}></textarea>
											{Errs.comments && <p>{Errs.comments}</p>}
										</td>
									</tr>

									{/* button set */}
									<tr>
										<td colSpan='2'>
											<input type='reset' value='Cancel' onClick={handleReset} />
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

	리액트에서의 폼 인증 구현 로직 순서
	1. 폼요소에 입력하는 값을 이벤트 핸들러 함수를 통해 실시간으로 state에 저장
	2. state값이 변경될때마다 check 함수를 통해 항목별로 인증 실패시 에러 객체로 묶어서 반환
	3. 폼에 submitHandler 함수를 연결
	4. 전송이벤트가 발생시 submitHandler함수 안쪽에서 check함수를 호출해서 err객체가 있으면 인증 실패
	5. check함수가 내보내는 err객체가 없으면 인증 성공처리
*/

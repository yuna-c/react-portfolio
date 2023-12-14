// reduce -> store 전달
import { createStore } from 'redux'; //18버전부터 안쓰메
import reducers from './reduce';

// store 공간 생성한 다음 reducer가 전달해주는 데이터를 저장
const store = createStore(reducers);
export default store;

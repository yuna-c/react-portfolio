// reduce -> store 전달
import { createStore } from 'redux';
import reducers from './reducer';

//store공간을 생성한 다음 reducer가 전달해주는 데이터를 저장
const store = createStore(reducers);
export default store;

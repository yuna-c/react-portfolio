//import './Welcome.scss';
import { useParams } from 'react-router-dom';
// npm install react-router-dom
import Layout from '../../common/layout/Layout';

export default function Welcome() {
	//useParams 파라미터 정보를 가져와 활용
	const { id } = useParams();
	return (
		<Layout className='Welcome' title={'Welcome'}>
			Welcome {id}
		</Layout>
	);
}

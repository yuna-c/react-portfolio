//import './Welcome.scss';
import { useParams } from 'react-router-dom';

import Layout from '../../common/layout/Layout';

export default function Welcome() {
	const { id } = useParams();
	return (
		<Layout className='Welcome' title={'Welcome'}>
			Welcome {id}
		</Layout>
	);
}

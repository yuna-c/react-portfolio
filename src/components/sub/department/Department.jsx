import Layout from '../../common/layout/Layout';
import './Department.scss';

export default function Department({ title }) {
	return (
		<Layout className='department'>
			<p>Department 전용 컨텐츠</p>
		</Layout>
	);
}

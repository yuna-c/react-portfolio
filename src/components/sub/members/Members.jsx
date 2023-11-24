import './Members.scss';
import Layout from '../../common/layout/Layout.1';
import Person from './person/Person';

export default function Members() {
	return (
		<>
			<Layout title={'Members'}>
				Members
				<Person />
			</Layout>
		</>
	);
}

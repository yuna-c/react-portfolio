import './MainWrap.scss';
import Layout from '../../common/layout/Layout';
import Visual from '../visual/Visual';
import Info from '../info/Info';

export default function MainWrap() {
	return (
		<Layout title={'mainWrap'}>
			<Visual />
			<Info />
		</Layout>
	);
}

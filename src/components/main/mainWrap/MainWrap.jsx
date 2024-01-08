import Info from '../info/Info';
import Visual from '../visual/Visual';
import Pics from '../pics/Pics';
import Banner from '../banner/Banner';
import './MainWrap.scss';
import Btns from '../btns/Btns';
import Illust from '../illust/Illust';

export default function MainWrap() {
	return (
		<div className='MainWrap'>
			<Visual />
			<Info />
			<Pics />
			<Illust />
			<Banner />
			<Btns />
		</div>
	);
}

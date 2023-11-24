import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Contant from './components/sub/contant/Contant';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Youtube from './components/sub/youtube/Youtube';

function App() {
	return (
		<>
			<Header />
			<MainWrap />
			<Department />
			<Youtube />
			<Gallery />
			<Community />
			<Members />
			<Contant />
			<Footer />
		</>
	);
}

export default App;

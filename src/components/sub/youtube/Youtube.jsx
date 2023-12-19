import { useCustomText } from '../../../hooks/useText';
import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Youtube() {
	const Vids = useSelector(store => store.youtubeReducer.youtube);
	// const Vids = useSelector(store => store.youtubeReducer.Youtube);
	// Youtube 이거 왜 대문자 아니야?
	// console.log(Vids);
	const customText = useCustomText('combined');
	const shortenText = useCustomText('shorten');

	return (
		<Layout title={'Youtube'}>
			{Vids.map((data, idx) => {
				const [date, time] = data.snippet.publishedAt.split('T'); //유튜브 업로드 날짜 T를 기점으로 잘라서
				//return <h3 key={idx}>{data.snippet.title}</h3>; 빈 배열은 에러로 안잡아=> 값이 없으면 반복을 안돌리니까
				return (
					<article key={data.id}>
						<h2>{shortenText(data.snippet.title, 50)}</h2>

						<div className='txt'>
							<p>{shortenText(data.snippet.description, 250)}</p>
							<div className='infoBox'>
								<span>{customText(date, '.')}</span>
								{/* 하이픈 대신 .으로 바꾼다 */}
								<em>{time.split('Z')[0]}</em>
								{/* Z 기준으로 맨 앞에 값 가져온다 */}
							</div>
						</div>

						<div className='pic'>
							<Link to={`/detail/${data.id}`}>
								<img src={data.snippet.thumbnails.standard ? data.snippet.thumbnails.standard.url : '/img/member1.jpg'} alt={data.snippet.title} />
							</Link>
						</div>
					</article>
				);
			})}
		</Layout>
	);
}

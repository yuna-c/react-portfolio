import './Members.scss';
import Person from './person/Person';

export default function Members() {
	return (
		<>
			<div className='members'>
				Members
				<Person />
			</div>
		</>
	);
}

import { useQuery } from '@tanstack/react-query';

const fetchFlickr = async ({ queryKey: [_, opt] }) => {
	const num = 50;
	const flickr_api = process.env.REACT_APP_FLICKR_API;
	const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';

	const interestURL = `${baseURL}${method_interest}`;
	const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
	const searchURL = `${baseURL}${method_search}&tags=${opt.keyword}`;

	let url = '';
	opt.type === 'user' && (url = userURL);
	opt.type === 'interest' && (url = interestURL);
	opt.type === 'search' && (url = searchURL);

	const response = await fetch(url);
	const data = await response.json();
	console.log(data);

	return data.photos.photo;
};

export const useFlickrQuery = opt => {
	// console.log(opt);
	return useQuery(['fetchFlickr', opt], fetchFlickr, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		retry: 3
	});
};

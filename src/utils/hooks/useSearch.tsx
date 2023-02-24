import { useState, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import useVideoStore from '../../storage/useVideoStore';
import { searchApi } from '../apis/search';
import { Video } from '../dto/video';

const useSearch = () => {
	const [search, setSearch] = useState<string>('');
	const navigate = useNavigate();
	const videoStore = useVideoStore();
	const searchRef = useRef<HTMLInputElement>(null);
	const onSearch = async () => {
		videoStore.setLoading(true);
		setSearch(searchRef.current?.value || '');
		const videos: Video[] = await searchApi
			.get(searchRef.current?.value || '')
			.then((res) => {
				if (res.data.status === 200) {
					return res.data.data;
				}
			})
			.catch((err: Error) => {
				console.log(err);
				return [];
			})
			.finally(() => {
				videoStore.setLoading(false);
			});
		videos.sort((a: Video, b: Video) => {
			if (a.score - b.score > 0) return -1;
			if (a.score - b.score < 0) return 1;
			return a.views.length - b.views.length;
		});
		videoStore.setVideo(videos);
		navigate('/search');
	};

	return {
		search,
		searchRef,
		onSearch,
	};
};

export default useSearch;

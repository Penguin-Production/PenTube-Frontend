import useVideoStore from '../../storage/useVideoStore';
import SearchItem from './SearchItem';

import { Container, Loading } from '@nextui-org/react';

const SearchPage = () => {
	const videoStore = useVideoStore();
	console.log(videoStore.videos);
	return (
		<Container>
			{videoStore.loading ? (
				<Container css={{ p: 20 }}>
					<Loading type='gradient' />
				</Container>
			) : (
				videoStore.videos.map((item) => {
					return <SearchItem video={item} key={item._id} />;
				})
			)}
		</Container>
	);
};

export default SearchPage;

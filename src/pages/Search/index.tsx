import useVideoStore from '../../storage/useVideoStore';
import CardItem from '../Home/CardItem';
import SearchItem from './SearchItem';

import { Container, Grid, Image, Text } from '@nextui-org/react';

const SearchPage = () => {
	const videoStore = useVideoStore();
	return (
		<Container css={{ p: 10 }}>
			{videoStore.videos.map((item) => {
				return <SearchItem video={item} key={item._id} />;
			})}
		</Container>
	);
};

export default SearchPage;

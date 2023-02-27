import { useEffect } from 'react';

import useVideoStore from '../../storage/useVideoStore';
import videoApi from '../../utils/apis/videoApi';
import { Video } from '../../utils/dto/video';
import useSearch from '../../utils/hooks/useSearch';
import CardItem from './CardItem';

import { Card, Container, Grid, Loading, Text } from '@nextui-org/react';

const HomePage = () => {
	const videoStore = useVideoStore(); // [

	useEffect(() => {
		const getVideo = async () => {
			const res = await videoApi.getAll();
			videoStore.setVideo(res.data || []);
			return res;
		};
		getVideo();
	}, []);
	console.log('home', videoStore.videos);
	return (
		<Grid.Container gap={2}>
			{videoStore.loading ? (
				<Container css={{ p: 20 }}>
					<Loading type='gradient' />
				</Container>
			) : (
				videoStore.videos.map((video: Video, index) => {
					return (
						<Grid key={index} xs={12} sm={4} md={3}>
							<CardItem video={video} />
						</Grid>
					);
				})
			)}
		</Grid.Container>
	);
};

export default HomePage;

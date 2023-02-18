import { useEffect, useState } from 'react';

import videoApi from '../../utils/apis/videoApi';
import { Video } from '../../utils/dto/video';
import CardItem from './CardItem';

import { Card, Grid, Text } from '@nextui-org/react';

const HomePage = () => {
	const [videoList, setVideoList] = useState<Array<Video> | undefined>([]); // [
	useEffect(() => {
		const getVideo = async () => {
			const res = await videoApi.getAll();
			setVideoList(res.data);
			return res;
		};
		getVideo();
	}, []);
	return (
		<Grid.Container gap={2}>
			{videoList?.map((video: Video, index) => {
				return (
					<Grid key={index} xs={12} sm={4} md={3}>
						<CardItem video={video} />
					</Grid>
				);
			})}
		</Grid.Container>
	);
};

export default HomePage;

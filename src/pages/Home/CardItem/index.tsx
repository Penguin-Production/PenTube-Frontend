import { Video } from '../../../utils/dto/video';

import { Card, Grid, Image, Text } from '@nextui-org/react';

type props = {
	video: Video;
};
const CardItem = (props: props) => {
	const { video } = props;
	const createdDate = new Date(video.createdAt);
	return (
		<Card css={{ w: 'stretch' }}>
			<Card.Header css={{ padding: 0, height: '173px' }}>
				<Image width={'100%'} src={video.thumbnail || ''} />
			</Card.Header>
			<Card.Body>
				<Text h4>{video.title}</Text>
				<Text small>{createdDate.toDateString()}</Text>
				<Text>{video.description}</Text>
			</Card.Body>
		</Card>
	);
};

export default CardItem;

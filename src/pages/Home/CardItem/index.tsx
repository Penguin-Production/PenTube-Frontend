import useDarkMode from 'use-dark-mode';

import { darkTheme, lightTheme } from '../../../theme';
import { Video } from '../../../utils/dto/video';

import { Card, Container, Grid, Image, Text, useTheme } from '@nextui-org/react';

type props = {
	video: Video;
};
const CardItem = (props: props) => {
	const darkMode = useDarkMode(false, {
		storageKey: 'theme',
	});
	const { video } = props;
	const descriptionColor = darkMode.value
		? darkTheme.colors.descriptionVideo.value
		: lightTheme.colors.descriptionVideo.value;
	const createdDate = new Date(video.createdAt);
	return (
		<Card css={{ w: 'stretch' }}>
			<Card.Header css={{ padding: 0, height: '173px' }}>
				<Image width={'100%'} src={video.thumbnail || ''} />
			</Card.Header>
			<Card.Body>
				<Text h4>{video.title}</Text>
				<Text color={descriptionColor} small>
					{createdDate.toDateString()}
				</Text>
				<Text color={descriptionColor} small>
					{video.description}
				</Text>
			</Card.Body>
		</Card>
	);
};

export default CardItem;

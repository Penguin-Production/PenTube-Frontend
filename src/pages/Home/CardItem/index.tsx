import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import useDarkMode from 'use-dark-mode';

import { darkTheme, lightTheme } from '../../../theme';
import { Video } from '../../../utils/dto/video';

import { Card, Container, Text } from '@nextui-org/react';

type props = {
	video: Video;
};
const CardItem = (props: props) => {
	const navigate = useNavigate();
	const darkMode = useDarkMode(false, {
		storageKey: 'theme',
	});
	const { video } = props;
	const descriptionColor = darkMode.value
		? darkTheme.colors.descriptionVideo.value
		: lightTheme.colors.descriptionVideo.value;
	const createdDate = new Date(video.createdAt);
	return (
		<Card
			isPressable
			isHoverable
			css={{ w: 'stretch' }}
			onClick={() => navigate(`watch/${video._id}`)}
		>
			<Card.Body css={{ p: 0 }}>
				<Card.Image
					width={'100%'}
					objectFit='cover'
					src={`http://img.youtube.com/vi/${video.url}/maxresdefault.jpg`}
				/>
				<Container css={{ p: 10 }}>
					<Text h4>{video.title}</Text>
					<Text color={descriptionColor} size='$xs'>
						{video.totalViews} Watched - {moment(createdDate).fromNow()}
					</Text>
					<Text
						color={descriptionColor}
						size='$xs'
						css={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
					>
						{video.description}
					</Text>
				</Container>
			</Card.Body>
		</Card>
	);
};

export default CardItem;

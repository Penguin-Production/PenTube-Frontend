import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import useDarkMode from 'use-dark-mode';

import { darkTheme, lightTheme } from '../../../theme';
import { Video } from '../../../utils/dto/video';

import { Card, Col, Container, Grid, Image, Row, Text, useTheme } from '@nextui-org/react';

type Props = {
	video: Video;
};
const SearchItem = (props: Props) => {
	const { video } = props;
	const navigate = useNavigate();
	const darkMode = useDarkMode(false, {
		storageKey: 'theme',
	});
	const descriptionColor = darkMode.value
		? darkTheme.colors.descriptionVideo.value
		: lightTheme.colors.descriptionVideo.value;
	const createdDate = new Date(video.createdAt);
	return (
		<Card
			isHoverable
			isPressable
			css={{ marginBottom: '$10' }}
			onClick={() => navigate(`/watch/${video._id}`)}
		>
			<Grid.Container key={video._id}>
				<Grid xs={4}>
					<Image src={`http://img.youtube.com/vi/${video.url}/maxresdefault.jpg`} />
				</Grid>
				<Grid xs={8} css={{ p: 0 }}>
					<Container>
						<Card.Body>
							<Text h4>{video.title}</Text>
							<Text color={descriptionColor} size='$xs'>
								{video.totalViews} Watched - {moment(createdDate).fromNow()}
							</Text>
							<Text
								css={{
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
								}}
								color={descriptionColor}
								size='$xs'
							>
								{video.description}
							</Text>
						</Card.Body>
					</Container>
				</Grid>
			</Grid.Container>
		</Card>
	);
};

export default SearchItem;

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
			onClick={() => navigate(`/watch/${video._id}`)}
		>
			<Card.Body css={{ p: 0 }}>
				<Card.Image
					width={'100%'}
					objectFit='cover'
					src={`http://img.youtube.com/vi/${video.url}/maxresdefault.jpg`}
				/>
				<Container css={{ p: 10 }}>
					<Text h5 className='line-clamp-2 font-semibold' title={video.title}>
						{video.title}
					</Text>
					<div className='flex gap-2'>
						<div
							className='mt-1 w-8 h-8 rounded-full bg-center bg-cover'
							style={{
								backgroundImage: `url(${video.channel.imageUrl}), url('https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg')`,
							}}
						></div>
						<div style={{ width: 'calc(100% - 2.5rem)' }}>
							<Text color={descriptionColor} size='$xs'>
								{video.totalViews} views - {moment(createdDate).fromNow()}
							</Text>
							<Text
								color={descriptionColor}
								size='$xs'
								css={{
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
									overflow: 'hidden',
								}}
							>
								{video.description}
							</Text>
						</div>
					</div>
				</Container>
			</Card.Body>
		</Card>
	);
};

export default CardItem;

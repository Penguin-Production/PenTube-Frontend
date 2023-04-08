import React from 'react';

import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { Video } from '../../../utils/dto/video';
import { RecommendComponent } from './styles';

import { Grid, Text, theme } from '@nextui-org/react';

export default function RecommendVideo({ video }: { video: Video }) {
	const navigate = useNavigate();

	return (
		<RecommendComponent onClick={() => navigate(`/watch/${video._id}`)}>
			<div className='img-container'>
				<img
					src={`http://img.youtube.com/vi/${video.url}/maxresdefault.jpg`}
					alt='thumbnail-video'
				/>
			</div>

			<div className='content'>
				<Text h5>{video.title}</Text>
				<Text>{video.channel.name}</Text>
				<Text color={theme.colors.accents6.value}>
					{video.totalViews} views
					<span style={{ margin: '0 10px' }}>•</span>
					{moment(new Date(video.createdAt)).fromNow()}
				</Text>
			</div>
		</RecommendComponent>
	);
}

import React, { useState } from 'react';

import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';

import videoApi from '../../utils/apis/videoApi';
import { Video } from '../../utils/dto/video';
import RecommendVideo from '../Watch/RecommendVideo';
import { RecommendComponent } from './styles';

import { Text, theme } from '@nextui-org/react';

interface Iprops {
	video: any;
}

function VideoItem(props: Iprops) {
	const navigate = useNavigate();
	const [video, setVideo] = useState<Video>();
	const {
		video: { videoId },
	} = props;

	console.log(video);

	React.useEffect(() => {
		// if (!id) navigate('/');
		videoApi.getById(videoId || '').then((video) => setVideo(video.data));
		// .catch(() => navigate('/'));
	}, [videoId]);
	return (
		<div>
			<div style={{marginLeft: "30%", marginRight: "25%"}}>
				{video && (
					<RecommendComponent onClick={() => navigate(`/watch/${video._id}`)}>
						<div className='img-container'>
							<img
								src={`http://img.youtube.com/vi/${video.url}/maxresdefault.jpg`}
								alt='thumbnail-video'
							/>
						</div>

						<div className='content'>
							<Text className='title-ref'>{video.title}</Text>
							<Text>{video.channel.name}</Text>
							<Text color={theme.colors.accents6.value}>
								{video.totalViews} views
								<span style={{ margin: '0 10px' }}>•</span>
								{moment(new Date(video.createdAt)).fromNow()}
							</Text>
						</div>
					</RecommendComponent>
				)}
			</div>
		</div>
	);
}

export default VideoItem;

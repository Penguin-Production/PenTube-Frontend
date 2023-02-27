import React from 'react';

import { Video } from '../../../utils/dto/video';
import { RecommendComponent } from './styles';

export default function RecommendVideo({ video }: { video: Video }) {
	return (
		<RecommendComponent href={`/watch/${video._id}`}>
			<div className='img-container'>
				<img
					src={`http://img.youtube.com/vi/${video.url}/maxresdefault.jpg`}
					alt='thumbnail-video'
				/>
			</div>

			<div className='content'>
				<p className='title-ref'>{video.title}</p>
				<p className='channel'>{video.channel.name}</p>
				<p className='views'>{video.totalViews} views</p>
			</div>
		</RecommendComponent>
	);
}
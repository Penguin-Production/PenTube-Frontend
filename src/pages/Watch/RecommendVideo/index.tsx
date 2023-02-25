import React from 'react';

import { VideoType } from '../Entities/type';
import { RecommendComponent } from './styles';

export default function RecommendVideo({ video }: { video: VideoType }) {
	return (
		<RecommendComponent href={`/watch/${video.id}`}>
			<div className='img-container'>
				<img
					src={`http://img.youtube.com/vi/${video.url}/maxresdefault.jpg`}
					alt='thumbnail-video'
				/>
			</div>

			<div className='content'>
				<p className='title-ref'>{video.title}</p>
				<p className='channel'>{video.channel}</p>
				<p className='views'>{video.totalViews} views</p>
			</div>
		</RecommendComponent>
	);
}

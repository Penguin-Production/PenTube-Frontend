import React, { useEffect, useState } from 'react';

import videoApi from '../../utils/apis/videoApi';
import { Video } from '../../utils/dto/video';
import VideoItem from './VideoItem';

export const HistoryPage = () => {
	const [videos, setVideos] = useState<Video[]>([]);
	useEffect(() => {
		const fetch = async () => {
			await videoApi.getHistory().then((data) => {
				console.log(data.data);
				setVideos(data.data?.reverse() || []);
			});
		};
		fetch();
	}, []);

	return (
		<div>
			<h3
				className='text-5xl'
				style={{ marginTop: '3vh', fontSize: '35px', marginBottom: '-0.5vh' }}
			>
				Watch history
			</h3>
			<div>
				{videos.map((video, index) => {
					return <VideoItem key={index} video={video} />;
				})}
			</div>
		</div>
	);
};

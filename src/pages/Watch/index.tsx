import React from 'react';

import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

import { filmInformation, videoType } from './data';
import { WatchComponent } from './styles';

export default function WatchVideo() {
	const { id } = useParams();
	const [video, setVideo] = React.useState<videoType | null>();

	React.useEffect(() => {
		filmInformation.forEach((film) => film.id.toString() === id && setVideo(film));
	}, []);

	const playerRef = React.useRef<ReactPlayer>(null);

	const onReady = React.useCallback(() => {
		const timeToStart = 23;
		playerRef.current && playerRef.current.seekTo(timeToStart, 'seconds');
	}, [playerRef.current]);

	return (
		<WatchComponent>
			<div className='left-content'>
				<ReactPlayer ref={playerRef} url={video?.video} controls={true} onReady={onReady} />
			</div>
			<p>WatchVideo</p>
		</WatchComponent>
	);
}

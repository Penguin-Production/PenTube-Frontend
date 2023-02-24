import React from 'react';

import { Avatar } from 'antd';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

import { VideoType } from './Entities/type';
import RecommendVideo from './RecommendVideo';
import { filmInformation } from './data';
import { WatchComponent } from './styles';

import { Comment } from '@ant-design/compatible';

export default function WatchVideo() {
	const { id } = useParams();
	const [video, setVideo] = React.useState<VideoType | null>();

	React.useEffect(() => {
		filmInformation.forEach((film) => film.id.toString() === id && setVideo(film));
	}, []);

	const ExampleComment: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
		<Comment
			actions={[<span key='comment-nested-reply-to'>Reply to</span>]}
			author={
				<a className='author-comment' href='https://www.facebook.com/DaoThienBinh/'>
					Đào Thiên Bình
				</a>
			}
			avatar={
				<Avatar
					src='https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/299119410_2870334359939162_6764509536935325064_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=nYL7jfot_0oAX-B8Tes&_nc_ht=scontent.fsgn2-8.fna&oh=00_AfDR5LR1XmG9kyv3zK6XA6iJlsbfHktWEgMosfGsxxp5oQ&oe=63FD1A3E'
					alt='binhdt'
					style={{ width: '100%', marginTop: '5px' }}
				/>
			}
			content={
				<p className='content-comment'>
					This is a testing comment for video. Lorem ipsum dolor sit amet consectetur,
					adipisicing elit. Impedit quidem ad totam sunt exercitationem ipsum autem dolor
					inventore excepturi quis. Aperiam numquam quasi omnis! Vel rem quidem eligendi.
					Possimus, esse!
				</p>
			}
		>
			{children}
		</Comment>
	);

	return (
		<WatchComponent>
			<div className='left-content'>
				<ReactPlayer
					url={'https://www.youtube.com/embed/' + video?.url}
					controls={true}
					// onReady={onReady}
					config={{
						youtube: {
							playerVars: {
								start: 20,
							},
						},
					}}
					className='video'
					playing={true}
				/>
				<p className='title'>{video?.title}</p>
				<p className='description'>{video?.description}</p>
				<div className='comment-video'>
					<p className='title' style={{ margin: '1rem 0' }}>
						Comments
					</p>
					<ExampleComment />
					<ExampleComment>
						<ExampleComment />
					</ExampleComment>
					<ExampleComment />
				</div>
			</div>
			<div>
				{filmInformation.map(
					(todo: VideoType, index: number) =>
						todo.id !== video?.id && <RecommendVideo video={todo} key={index} />
				)}
			</div>
		</WatchComponent>
	);
}

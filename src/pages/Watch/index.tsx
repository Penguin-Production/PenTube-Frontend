import React from 'react';

import { Avatar, Button, Form, Input, List } from 'antd';
import moment from 'moment';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';

import useVideoStore from '../../storage/useVideoStore';
import videoApi from '../../utils/apis/videoApi';
import { Video } from '../../utils/dto/video';
import RecommendVideo from './RecommendVideo';
import { WatchComponent } from './styles';

import { Comment } from '@ant-design/compatible';
import {
	DislikeOutlined,
	DownloadOutlined,
	EllipsisOutlined,
	LikeOutlined,
	SendOutlined,
	ShareAltOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;

interface CommentItem {
	author: string;
	avatar: string;
	content: React.ReactNode;
	datetime: string;
}

interface EditorProps {
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onSubmit: () => void;
	submitting: boolean;
	value: string;
}

const CommentList = ({ comments }: { comments: CommentItem[] }) => (
	<List
		dataSource={comments}
		itemLayout='horizontal'
		renderItem={(props) => (
			<Comment {...props} actions={[<span key='comment-nested-reply-to'>Reply</span>]} />
		)}
	/>
);

const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
	<>
		<Form.Item>
			<TextArea rows={4} onChange={onChange} value={value} />
		</Form.Item>
		<Form.Item>
			<Button htmlType='submit' loading={submitting} onClick={onSubmit} type='primary'>
				{!submitting && <SendOutlined style={{ transform: 'rotate(-45deg)' }} />}
				Comment
			</Button>
		</Form.Item>
	</>
);

const ExampleComment: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
	<Comment
		actions={[<span key='comment-nested-reply-to'>Reply</span>]}
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
		datetime={moment('2023-1-1').fromNow()}
	>
		{children}
	</Comment>
);

export default function WatchVideo() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [video, setVideo] = React.useState<Video>();
	const videoStore = useVideoStore();

	React.useEffect(() => {
		if (!id) navigate('/');
		videoApi
			.getById(id || '')
			.then((video) => setVideo(video.data))
			.catch(() => navigate('/'));
		console.log('list', videoStore.videos);
		// if(videos.length === 0) {

		// }
	}, []);

	const [comments, setComments] = React.useState<CommentItem[]>([]);
	const [submitting, setSubmitting] = React.useState(false);
	const [value, setValue] = React.useState('');

	const handleSubmit = () => {
		if (!value) return;

		setSubmitting(true);

		setTimeout(() => {
			setSubmitting(false);
			setValue('');
			setComments([
				{
					author: 'You',
					avatar: 'https://www.w3schools.com/w3css/img_avatar3.png',
					content: <p>{value}</p>,
					datetime: moment(new Date(Date.now())).fromNow(),
				},
				...comments,
			]);
		}, 1000);
	};

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value);
	};

	return (
		<WatchComponent>
			{video && (
				<div className='left-content'>
					<ReactPlayer
						url={'https://www.youtube.com/embed/' + video?.url}
						controls={true}
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
					<div className='channel-container'>
						<div className='channel'>
							<img src={video?.channel.avatar} alt='avatar' />
							<div>
								<p style={{ fontWeight: '500' }}>{video?.channel.name}</p>
								<p className='sl-sub'>
									{Math.round(Math.random() * 100)} subscribers
								</p>
							</div>
							<Button
								type='primary'
								style={{ background: 'black', fontWeight: '500' }}
							>
								Subscribe
							</Button>
						</div>
						<div className='action'>
							<div className='like-dislike'>
								<Button type='text'>
									<LikeOutlined />
								</Button>
								|
								<Button type='text'>
									<DislikeOutlined />
								</Button>
							</div>
							<Button type='text'>
								<ShareAltOutlined />
								Share
							</Button>
							<Button type='text'>
								<DownloadOutlined />
								Download
							</Button>
							<Button type='text'>
								<EllipsisOutlined />
							</Button>
						</div>
					</div>
					<p className='description'>
						<b>{`${video?.totalViews} views - ${moment(
							video?.createdAt
						).fromNow()}`}</b>
						<p>{video?.description}</p>
					</p>
					<div className='comment-video'>
						<p className='title'>
							Comments
							<span>( {comments.length + 4} )</span>
						</p>
						<Comment
							avatar={
								<Avatar
									src='https://www.w3schools.com/w3css/img_avatar3.png'
									alt='your-comment'
								/>
							}
							content={
								<Editor
									onChange={handleChange}
									onSubmit={handleSubmit}
									submitting={submitting}
									value={value}
								/>
							}
						/>
						{comments.length > 0 && <CommentList comments={comments} />}
						<ExampleComment />
						<ExampleComment>
							<ExampleComment />
						</ExampleComment>
						<ExampleComment />
					</div>
				</div>
			)}
			{/* {videoStore.videos.length > 0 && (
				<div>
					{videoStore.videos.map(
						(todo: Video, index: number) =>
							todo._id !== video?._id && <RecommendVideo video={todo} key={index} />
					)}
				</div>
			)} */}
		</WatchComponent>
	);
}

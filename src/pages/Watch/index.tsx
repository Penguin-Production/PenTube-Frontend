import React from 'react';

import moment from 'moment';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';

import useVideoStore from '../../storage/useVideoStore';
import videoApi from '../../utils/apis/videoApi';
import { Video } from '../../utils/dto/video';
import RecommendVideo from './RecommendVideo';
import { CommentContainer, TextAreaComment, WatchComponent } from './styles';

import {
	DislikeOutlined,
	DownloadOutlined,
	EllipsisOutlined,
	LikeOutlined,
	SendOutlined,
	ShareAltOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Spacer, Textarea } from '@nextui-org/react';

interface CommentItem {
	author: string;
	avatar: string;
	content: string;
	datetime: string;
}

const fakeComment: CommentItem[] = [
	{
		author: 'Đào Thiên Bình',
		avatar: 'https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/299119410_2870334359939162_6764509536935325064_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=HS56DQ9W9CwAX_1WODn&_nc_ht=scontent.fsgn2-8.fna&oh=00_AfAGkQ8M4bTWTM606-KFIk3TKivjea8wbuYGTjAvj5oa7w&oe=64010EBE',
		content:
			'This is a testing comment for video. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit quidem ad totam sunt exercitationem ipsum autem dolor inventore excepturi quis. Aperiam numquam quasi omnis! Vel rem quidem eligendi. Possimus, esse!',
		datetime: moment('2023-1-2').fromNow(),
	},
	{
		author: 'Đào Thiên Bình',
		avatar: 'https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/299119410_2870334359939162_6764509536935325064_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=HS56DQ9W9CwAX_1WODn&_nc_ht=scontent.fsgn2-8.fna&oh=00_AfAGkQ8M4bTWTM606-KFIk3TKivjea8wbuYGTjAvj5oa7w&oe=64010EBE',
		content:
			'This is a testing comment for video. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit quidem ad totam sunt exercitationem ipsum autem dolor inventore excepturi quis. Aperiam numquam quasi omnis! Vel rem quidem eligendi. Possimus, esse!',
		datetime: moment('2023-2-1').fromNow(),
	},
];

export default function WatchVideo() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [video, setVideo] = React.useState<Video>();
	const [showMore, setShowMore] = React.useState(false);
	const [listComment, setListComment] = React.useState<CommentItem[]>(fakeComment);
	const [mess, setMess] = React.useState<string>('');
	const videoStore = useVideoStore();

	React.useEffect(() => {
		if (!id) navigate('/');
		videoApi
			.getById(id || '')
			.then((video) => setVideo(video.data))
			.catch(() => navigate('/'));
		const getVideo = async () => {
			const res = await videoApi.getAll();
			videoStore.setVideo(res.data || []);
			return res;
		};

		if (videoStore.videos.length === 0) getVideo();
	}, [id]);

	const handleSubmit = async () => {
		const newMess: CommentItem = {
			author: 'You',
			avatar: 'https://www.w3schools.com/w3css/img_avatar3.png',
			content: mess,
			datetime: moment(new Date(Date.now())).fromNow(),
		};
		setListComment([newMess, ...listComment]);
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
									start: video.totalFrame,
								},
							},
						}}
						className='video'
						playing={true}
					/>
					<p className='title'>{video?.title}</p>
					<div className='channel-container'>
						<div className='channel'>
							<Avatar zoomed src={video?.channel.avatar} alt='avatar' />
							<div>
								<p style={{ fontWeight: '500' }}>{video?.channel.name}</p>
								<p className='sl-sub'>
									{Math.round(Math.random() * 100)} subscribers
								</p>
							</div>
							<Button auto style={{ fontWeight: '500', fontSize: 'inherit' }}>
								Subscribe
							</Button>
						</div>
						<div className='action'>
							<div className='like-dislike'>
								<button>
									<LikeOutlined />
								</button>
								|
								<button>
									<DislikeOutlined />
								</button>
							</div>
							<button>
								<ShareAltOutlined />
								Share
							</button>
							<button>
								<DownloadOutlined />
								Download
							</button>
							<button>
								<EllipsisOutlined />
							</button>
						</div>
					</div>
					<p className='description' style={showMore ? { display: 'block' } : {}}>
						<b>{`${video?.totalViews} views - ${moment(
							video?.createdAt
						).fromNow()}`}</b>
						<p>{video?.description}</p>
						{showMore ? (
							<button onClick={() => setShowMore(false)}>Hidden</button>
						) : (
							<button onClick={() => setShowMore(true)}>Show more</button>
						)}
					</p>
					<div className='comment-video'>
						<p className='title'>
							Comments
							<span>( {listComment.length} )</span>
						</p>
						<TextAreaComment>
							<div className='type-textarea'>
								<Avatar src='https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png' />
								<Textarea
									width='100%'
									maxRows={4}
									onChange={(e) => setMess(e.target.value)}
									placeholder='Your comment write here'
								/>
							</div>
							<Button
								auto
								disabled={mess && mess.trim() !== '' ? false : true}
								onClick={() => handleSubmit()}
							>
								<SendOutlined
									style={{
										transform: 'rotate(-45deg)',
										marginRight: '10px',
										marginTop: '-5px',
									}}
								/>
								Send
							</Button>
						</TextAreaComment>
						{listComment.length &&
							listComment.map((item, index) => (
								<CommentContainer key={index}>
									<Avatar src={item.avatar} alt={item.author} />
									<div className='comment-content'>
										<b>{item.author}</b>
										<p>{item.content}</p>
									</div>
								</CommentContainer>
							))}
						<Spacer y={2} />
					</div>
				</div>
			)}
			{video && videoStore.videos.length > 0 && (
				<div>
					{videoStore.videos.map(
						(todo: Video, index: number) =>
							todo._id !== video?._id && <RecommendVideo video={todo} key={index} />
					)}
				</div>
			)}
		</WatchComponent>
	);
}

import React, { useMemo } from 'react';

import moment from 'moment';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';

import useUserStore from '../../storage/useUserStore';
import useVideoStore from '../../storage/useVideoStore';
import videoApi from '../../utils/apis/videoApi';
import { Video } from '../../utils/dto/video';
import { useFetchComments } from '../../utils/hooks/useGetComment';
import Comments from './Comments';
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
import { Avatar, Button, Loading, Spacer, Textarea, Tooltip } from '@nextui-org/react';

interface CommentItem {
	author: string;
	avatar: string;
	content: string;
	datetime: string;
}

export default function WatchVideo() {
	const navigate = useNavigate();
	const { id } = useParams();
	const { user } = useUserStore();
	const [likeLoading, setLikeLoading] = React.useState(false);
	const [showMore, setShowMore] = React.useState(false);
	const videoStore = useVideoStore();
	const { videoDetail: video } = videoStore;

	React.useEffect(() => {
		if (!id) navigate('/');
		videoApi
			.getById(id || '')
			.then((video) => videoStore.setVideoDetail(video.data))
			.catch(() => navigate('/'));
		const getVideo = async () => {
			const res = await videoApi.getAll();
			videoStore.setVideo(res.data || []);
			return res;
		};

		if (videoStore.videos.length === 0) getVideo();
	}, [id]);

	const handleLike = async () => {
		if (!user?._id) {
			return;
		}
		setLikeLoading(true);
		try {
			await videoApi
				.updateLike(video?._id || '', user?._id || '')
				.then(async () => {
					await videoApi
						.getById(id || '')
						.then((video) => videoStore.setVideoDetail(video.data));
				})
				.finally(() => setLikeLoading(false));
		} catch (e) {
			console.log(e);
		}
	};

	const isLiked = useMemo(() => {
		if (!user?._id) {
			return false;
		}
		return video?.likes?.includes(user?._id);
	}, [video]);

	useFetchComments();

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
					<div className='flex flex-row w-full mb-3 justify-between'>
						<div className='channel flex gap-10 items-center'>
							<div className='flex flex-row gap-3 items-center'>
								<Avatar zoomed src={video?.channel.avatar} alt='avatar' />
								<div>
									<p style={{ fontWeight: '500' }}>{video?.channel.name}</p>
									<p className='sl-sub'>
										{Math.round(Math.random() * 100)} subscribers
									</p>
								</div>
							</div>
							<Button
								auto
								style={{ fontWeight: '500', fontSize: 'inherit' }}
								disabled={!user}
							>
								Subscribe
							</Button>
						</div>
						<div className='flex flex-row gap-3'>
							<div className='flex w-full justify-end'>
								<Tooltip
									isDisabled={user !== null}
									content='You must login to like'
								>
									<Button
										bordered={!isLiked}
										auto
										icon={<LikeOutlined />}
										onClick={() => handleLike()}
									>
										{likeLoading ? (
											<Loading size='xs' color='currentColor' />
										) : (
											<div>{video?.likes?.length}</div>
										)}
									</Button>
								</Tooltip>
								{/* |
								<button>
									<DislikeOutlined />
								</button> */}
							</div>
							<Button size='md'>
								<ShareAltOutlined />
								Share
							</Button>
							{/* <button>
								<DownloadOutlined />
								Download
							</button> */}
							{/* <Button>
								<EllipsisOutlined />
							</Button> */}
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
					<Comments />
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

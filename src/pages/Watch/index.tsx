import React, { useMemo } from 'react';

import moment from 'moment';
import { AiOutlineReload } from 'react-icons/ai';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import { FacebookShareCount, FacebookIcon, FacebookShareButton } from 'react-share';
import { toast } from 'react-toastify';

import useUserStore from '../../storage/useUserStore';
import useVideoStore from '../../storage/useVideoStore';
import ChannelApi from '../../utils/apis/channel.api';
import userApi from '../../utils/apis/user.api';
import videoApi from '../../utils/apis/videoApi';
import { Video } from '../../utils/dto/video';
import { useFetchComments } from '../../utils/hooks/useGetComment';
import Comments from './Comments';
import RecommendVideo from './RecommendVideo';
import { CommentContainer, TextAreaComment, WatchComponent } from './styles';

import { LikeOutlined } from '@ant-design/icons';
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
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [buttonLoading, setButtonLoading] = React.useState<boolean>(false);
	const videoStore = useVideoStore();
	const { videoDetail: video } = videoStore;

	React.useEffect(() => {
		if (!id) navigate('/');
		id && userApi.updateHistory(id);
		const fetchData = async () => {
			setIsLoading(true);
			await videoApi
				.getById(id || '')
				.then((video) => videoStore.setVideoDetail(video.data))
				.catch(() => navigate('/'))
				.finally(() => setIsLoading(false));
			const getVideo = async () => {
				const res = await videoApi.getAll();
				videoStore.setVideo(res.data || []);
				return res;
			};

			if (videoStore.videos.length === 0) getVideo();
			await videoApi.updateView(id || '');
		};

		fetchData();
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
					await videoApi.getById(id || '').then((video) => videoStore.setVideoDetail(video.data));
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

	const handleToggleSubscribeChannel = async (channelId?: string) => {
		if (!channelId || !user)
			toast.error('You need to login to subscribe channel', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				progress: undefined,
				theme: 'light',
			});
		else if (video) {
			setButtonLoading(true);
			await ChannelApi.subscribeChannel(channelId)
				.then(async (res) => {
					// videoStore.setVideoDetail({ ...video, channel: res.data.data });
					if (video?.channel?.subscriber?.includes(user?._id ?? 'null')) {
						video.channel.subscriber = video.channel.subscriber.filter(
							(item) => item !== user?._id
						);
					} else {
						video.channel.subscriber = [...video.channel.subscriber, user?._id];
					}
				})
				.catch((err) => console.log(err));
			setButtonLoading(false);
		}
	};

	if (isLoading) return <Loading type='gradient' />;
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
							<Avatar zoomed src={video?.channel.imageUrl} alt='avatar' />
							<div>
								<p style={{ fontWeight: '500' }}>{video?.channel.name}</p>
								<p className='sl-sub'>{video?.channel?.subscriber?.length} subscribers</p>
							</div>
							<Button
								auto
								style={{ fontWeight: '500', fontSize: 'inherit' }}
								onClick={() => handleToggleSubscribeChannel(video?.channel._id)}
								disabled={!user || buttonLoading}
								bordered={!video?.channel?.subscriber?.includes(user?._id ?? 'null')}
							>
								{buttonLoading ? (
									<AiOutlineReload className='animate-spin text-2xl mx-7' />
								) : video?.channel?.subscriber?.includes(user?._id ?? 'null') ? (
									'Unsubscribe'
								) : (
									'Subscribe'
								)}
							</Button>
						</div>
						<div className='flex flex-row gap-3 mt-3'>
							<div className='flex w-full justify-end'>
								<Tooltip isDisabled={user !== null} content='You must login to like'>
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
							{/* <FacebookShareButton url={window.location.href}>
								<Button auto icon={<FacebookIcon size={24} round />}>
									Share
								</Button>
								<FacebookShareCount url={window.location.href} />
							</FacebookShareButton> */}

							{/* <Button size='md'>
								<ShareAltOutlined />
								Share
							</Button> */}
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
						<b>{`${video?.totalViews} views - ${moment(video?.createdAt).fromNow()}`}</b>
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

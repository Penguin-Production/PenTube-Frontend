import { useEffect, useState } from 'react';

import { AiOutlineReload } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import useUserStore from '../../../storage/useUserStore';
import ChannelApi from '../../../utils/apis/channel.api';
import videoApi from '../../../utils/apis/videoApi';
import { CHANNEL_TYPE } from '../../../utils/dto/channel.type';
import { Video } from '../../../utils/dto/video';
import CardItem from '../../Home/CardItem';
import ModalCreateVideo from './modalCreateVideo';

import { Container, Grid, Loading } from '@nextui-org/react';

export default function DetailChannel() {
	const { id } = useParams();
	const user = useUserStore((state) => state.user);
	const [listVideo, setListVideo] = useState<Video[]>([]);
	const [channelInfo, setChannelInfo] = useState<CHANNEL_TYPE>();
	const [loading, setLoading] = useState<boolean>(false);
	const [buttonLoading, setButtonLoading] = useState<boolean>(false);

	const fetchData = async (id: string) => {
		setLoading(true);
		await ChannelApi.getChannelById(id)
			.then((res) => setChannelInfo(res.data))
			.catch((err) => console.log(err));
		await videoApi
			.getAllByChannelId(id)
			.then((res) => {
				setListVideo(res.data || []);
			})
			.catch((err) => console.log(err));
		setLoading(false);
	};

	useEffect(() => {
		if (id) fetchData(id);
	}, [id]);

	const handleToggleSubscribeChannel = async (channelId?: string) => {
		if (!channelId)
			toast.error('You need to login to subscribe channel', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				progress: undefined,
				theme: 'light',
			});
		else {
			setButtonLoading(true);
			await ChannelApi.subscribeChannel(channelId)
				.then(async () => {
					id &&
						(await ChannelApi.getChannelById(id)
							.then((res) => setChannelInfo(res.data))
							.catch((err) => console.log(err)));
				})
				.catch((err) => console.log(err));
			setButtonLoading(false);
		}
	};

	return (
		<Container>
			<div className='flex gap-10 items-center justify-center text-left py-7 mb-7 shadow-md rounded-lg'>
				<div
					className='w-40 h-40 rounded-full bg-cover bg-center'
					style={{ backgroundImage: `url(${channelInfo?.imageUrl})` }}
				></div>
				<div>
					<h3>{channelInfo?.name}</h3>
					<p>{channelInfo?.subscriber?.length} subscribers</p>
					<p>{listVideo.length} video</p>
					{channelInfo?.userId !== user?._id && (
						<button
							className='bg-black text-white px-4 py-1 rounded-full mt-2 hover:opacity-80'
							onClick={() => handleToggleSubscribeChannel(channelInfo?._id)}
							disabled={buttonLoading}
						>
							{buttonLoading ? (
								<AiOutlineReload className='animate-spin text-2xl mx-7' />
							) : channelInfo?.subscriber?.includes(user?._id ?? 'test') ? (
								'Unsubscribe'
							) : (
								'Subscribe'
							)}
						</button>
					)}
				</div>
			</div>
			{channelInfo && <ModalCreateVideo channelId={channelInfo._id} />}
			<Grid.Container gap={2}>
				{loading ? (
					<Container css={{ p: 20 }}>
						<Loading type='gradient' />
					</Container>
				) : (
					listVideo.map((video: Video, index) => {
						return (
							<Grid key={index} xs={12} sm={4} md={3}>
								<CardItem video={video} />
							</Grid>
						);
					})
				)}
			</Grid.Container>
		</Container>
	);
}

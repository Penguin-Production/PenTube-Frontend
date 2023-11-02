import { useState, useEffect } from 'react';

import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import ChannelApi from '../../utils/apis/channel.api';
import { CHANNEL_TYPE } from '../../utils/dto/channel.type';
import ModalFormChannel from './components/modalFormChannel';
import './style.css';

export default function ListChannel() {
	const [listChannel, setListChannel] = useState<CHANNEL_TYPE[]>([]);
	const [visible, setVisible] = useState(false);
	const [dataForm, setDataForm] = useState<CHANNEL_TYPE | null>(null);
	const navigate = useNavigate();

	const open = () => setVisible(true);
	const closeHandler = () => setVisible(false);

	const fetchData = () => {
		ChannelApi.getListChannel().then((res) => {
			setListChannel(res.data.reverse());
		});
		setDataForm(null);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleDelete = (id: string) => {
		ChannelApi.deleteChannel(id).then(() => {
			toast.success('Delete channel success 🎉', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				progress: undefined,
				theme: 'light',
			});
			fetchData();
		});
	};

	return (
		<div className='m-10'>
			<p className='text-3xl font-semibold mb-16'>Your channel list</p>
			<div className='flex gap-5 flex-wrap justify-center lg:justify-start'>
				<button
					className='rounded-lg w-52 min-h-[170px] flex flex-col justify-center items-center p-5 hover:cursor-pointer transition-all opacity-60 hover:opacity-100'
					style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}
					onClick={open}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='icon icon-tabler icon-tabler-plus'
						width='40'
						height='40'
						viewBox='0 0 24 24'
						strokeWidth='2'
						stroke='currentColor'
						fill='none'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
						<path d='M12 5l0 14'></path>
						<path d='M5 12l14 0'></path>
					</svg>
					<p>Create your channel</p>
				</button>
				{listChannel.map((channel, index) => (
					<button
						key={index}
						className='rounded-lg w-52 flex flex-col justify-between items-center p-5 hover:cursor-pointer transition-all hover:scale-[1.03] relative'
						style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}
						onClick={() => navigate(`/channels/channel/${channel._id}`)}
					>
						<div className='absolute top-2 right-2 w-fit h-fit container-option'>
							<BsThreeDotsVertical className='text-xl' />
							<div
								className='absolute hidden bg-white right-0 p-1 rounded-md w-20'
								style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
							>
								<button
									className='text-sm w-full p-1 mb-1 rounded-sm hover:bg-blue-100'
									onClick={(e) => {
										e.stopPropagation();
										setDataForm(channel);
										open();
									}}
								>
									Edit
								</button>
								<button
									className='text-sm w-full p-1 rounded-sm hover:bg-red-100'
									onClick={(e) => {
										e.stopPropagation();
										handleDelete(channel._id);
									}}
								>
									Delete
								</button>
							</div>
						</div>
						<div
							className='w-20 h-20 rounded-full bg-center bg-cover'
							style={{ backgroundImage: `url(${channel.imageUrl})` }}
						></div>
						<div>
							<p className='font-semibold'>{channel.name}</p>
							<p className='text-sm text-[#00000080]'>
								{channel.subscriber?.length ?? 0} subscribers
							</p>
						</div>
					</button>
				))}
			</div>
			<ModalFormChannel
				visible={visible}
				closeHandler={closeHandler}
				data={dataForm}
				refreshData={fetchData}
			/>
		</div>
	);
}

import { useState } from 'react';

import { AiOutlineReload } from 'react-icons/ai';
import { HiPlus } from 'react-icons/hi';
import { toast } from 'react-toastify';

import videoApi from '../../../utils/apis/videoApi';

import { Button, Input, Modal, Textarea } from '@nextui-org/react';

export default function ModalCreateVideo({
	channelId,
	refreshData,
}: {
	channelId: string;
	refreshData: (channelId: string) => void;
}) {
	const [state, setState] = useState({
		title: '',
		description: '',
		url: '',
	});
	const [visible, setVisible] = useState(false);
	const handler = () => setVisible(true);
	const closeHandler = () => setVisible(false);
	const [loading, setLoading] = useState(false);

	const onSubmit = async () => {
		setLoading(true);
		await videoApi
			.createVideo({
				...state,
				totalFrame: 0,
				status: 'public',
				channel: channelId,
				totalViews: 0,
			})
			.then((res) => {
				toast.success('Create video success 🎉', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					progress: undefined,
					theme: 'light',
				});
				refreshData(channelId);
				setState({
					title: '',
					description: '',
					url: '',
				});
				closeHandler();
			})
			.catch((err) => {
				console.log(err);
				toast.error('Something went wrong, please try again later!', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					progress: undefined,
					theme: 'light',
				});
			});
		setLoading(false);
	};

	return (
		<div>
			<button
				className='flex gap-2 items-center bg-blue-100 rounded-full text-blue-500 px-5 py-2 hover:bg-blue-200 transition-all'
				onClick={handler}
			>
				Create <HiPlus />
			</button>
			<Modal
				closeButton
				aria-labelledby='modal-title'
				className='pt-5 pb-7 px-10 text-left'
				open={visible}
				onClose={closeHandler}
			>
				<form className='grid grid-cols-1' onSubmit={(e) => e.preventDefault()}>
					<p className='text-center text-3xl font-semibold mb-5'>Create new video</p>
					<Input
						required
						label='Title'
						placeholder='Title of video'
						className='mb-3'
						value={state.title}
						onChange={(e) => setState({ ...state, title: e.target.value })}
					/>
					<Input
						required
						label='Url'
						placeholder='Url code of video. Example: UVcX4BlcUrc, ...'
						className='mb-3'
						value={state.url}
						onChange={(e) => setState({ ...state, url: e.target.value })}
					/>
					<Textarea
						required
						label='Description'
						placeholder='More description about video'
						className='mb-3'
						value={state.description ? state.description : ''}
						onChange={(e) => setState({ ...state, description: e.target.value })}
					/>
					<Button type='submit' className='mt-5' onClick={onSubmit} disabled={loading}>
						{loading ? <AiOutlineReload className='animate-spin text-2xl ml-2' /> : 'Create'}
					</Button>
				</form>
			</Modal>
		</div>
	);
}

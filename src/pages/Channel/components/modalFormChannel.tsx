import React from 'react';

import { toast } from 'react-toastify';

import ChannelApi from '../../../utils/apis/channel.api';
import { CHANNEL_TYPE, FORM_CHANNEL_TYPE } from '../../../utils/dto/channel.type';

import { Modal, Button, Text } from '@nextui-org/react';

export default function ModalFormChannel({
	visible,
	closeHandler,
	refreshData,
	data,
}: {
	visible: boolean;
	closeHandler: () => void;
	refreshData: () => void;
	data: CHANNEL_TYPE | null;
}) {
	const [state, setState] = React.useState<FORM_CHANNEL_TYPE>({
		name: data ? data.name : '',
		imageUrl: data ? data.imageUrl : '',
	});
	const [msg, setMsg] = React.useState<FORM_CHANNEL_TYPE>({
		name: '',
		imageUrl: '',
	});
	const [loading, setLoading] = React.useState<boolean>(false);

	React.useEffect(() => {
		setState({
			name: data ? data.name : '',
			imageUrl: data ? data.imageUrl : '',
		});
		setMsg({
			name: '',
			imageUrl: '',
		});
	}, [data]);

	const checkIsEmpty = () => {
		if (!state.name.trim()) {
			setMsg({ ...msg, name: 'Name can not be empty!' });
		}
		if (!state.imageUrl.trim()) {
			setMsg({ ...msg, imageUrl: 'Avatar can not be empty!' });
		}
	};

	const onSubmit = async () => {
		checkIsEmpty();
		if (msg.name || msg.imageUrl) return;

		if (data) {
			// update
			setLoading(true);
			await ChannelApi.updateChannel(data._id, state)
				.then((res) => {
					toast.success('Update channel success 🎉', {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						progress: undefined,
						theme: 'light',
					});
				})
				.catch((err) => {
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
			refreshData();
			closeHandler();
		} else {
			// create
			setLoading(true);
			await ChannelApi.createChannel(state)
				.then((res) => {
					toast.success('Create channel success 🎉', {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						progress: undefined,
						theme: 'light',
					});
				})
				.catch((err) => {
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
			refreshData();
			closeHandler();
		}
	};

	return (
		<Modal
			closeButton
			aria-labelledby='modal-title'
			open={visible}
			onClose={() => !loading && closeHandler()}
			className='cursor-default'
		>
			<Modal.Header className='!pb-0'>
				<Text id='modal-title' size={24} className='font-semibold'>
					{data ? 'Update your channel' : 'Create your channel'}
				</Text>
			</Modal.Header>
			<Modal.Body>
				<div className='relative'>
					<p className='!my-1 font-semibold'>Name</p>
					<input
						type='text'
						placeholder='Name of channel'
						className='border-[#00000020] border-[1px] w-full py-2 px-4 rounded-lg focus:border-blue-500'
						value={state.name}
						onChange={(e) => setState({ ...state, name: e.target.value })}
						onFocus={() => setMsg({ ...msg, name: '' })}
						onBlur={() => checkIsEmpty()}
					/>
					<span className='absolute -bottom-1 left-4 translate-y-full text-xs text-red-500'>
						{msg.name}
					</span>
				</div>
				<div className='relative'>
					<p className='!my-1 font-semibold'>Avatar</p>
					<input
						type='text'
						placeholder='Avatar of channel'
						className='border-[#00000020] border-[1px] w-full py-2 px-4 rounded-lg focus:border-blue-500'
						value={state.imageUrl}
						onChange={(e) => setState({ ...state, imageUrl: e.target.value })}
						onFocus={() => setMsg({ ...msg, imageUrl: '' })}
						onBlur={() => checkIsEmpty()}
					/>
					<span className='absolute -bottom-1 left-4 translate-y-full text-xs text-red-500'>
						{msg.imageUrl}
					</span>
				</div>
				{state.imageUrl.trim() && (
					<img src={state.imageUrl} className='w-40 rounded-md mt-2' alt='' />
				)}
			</Modal.Body>
			<Modal.Footer className='mx-auto my-2'>
				<Button auto flat color='error' onPress={closeHandler} disabled={loading}>
					Cancel
				</Button>
				<Button auto onPress={onSubmit} disabled={loading}>
					{data ? 'Update' : 'Create'}
					{loading ? (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='icon icon-tabler icon-tabler-rotate-clockwise-2 animate-spin ml-1'
							width='20'
							height='20'
							viewBox='0 0 24 24'
							strokeWidth='2'
							stroke='currentColor'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
							<path d='M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5'></path>
							<path d='M5.63 7.16l0 .01'></path>
							<path d='M4.06 11l0 .01'></path>
							<path d='M4.63 15.1l0 .01'></path>
							<path d='M7.16 18.37l0 .01'></path>
							<path d='M11 19.94l0 .01'></path>
						</svg>
					) : (
						''
					)}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

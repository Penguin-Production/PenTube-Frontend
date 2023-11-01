import { useState } from 'react';

import { HiPlus } from 'react-icons/hi';

import { Button, Input, Modal } from '@nextui-org/react';

export default function ModalCreateVideo({ channelId }: { channelId: string }) {
	const [state, setState] = useState({
		title: '',
		description: '',
		url: '',
	});
	const [visible, setVisible] = useState(false);
	const handler = () => setVisible(true);
	const closeHandler = () => setVisible(false);

	// const onSubmit = () => {}

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
				<p className='text-center text-3xl font-semibold mb-5'>Create new video</p>
				<Input
					clearable
					required
					label='Title'
					placeholder='Title of video'
					className='mb-3'
					value={state.title}
					onChange={(e) => setState({ ...state, title: e.target.value })}
				/>
				<Input
					clearable
					required
					label='Description'
					placeholder='More description about video'
					className='mb-3'
					value={state.description ? state.description : ''}
					onChange={(e) => setState({ ...state, description: e.target.value })}
				/>
				<Input
					clearable
					required
					label='Url'
					placeholder='Url code of video. Example: UVcX4BlcUrc, ...'
					className='mb-3'
					value={state.url}
					onChange={(e) => setState({ ...state, url: e.target.value })}
				/>
				<Button className='mt-5'>Create</Button>
			</Modal>
		</div>
	);
}

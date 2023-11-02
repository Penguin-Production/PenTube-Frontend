import React, { useState } from 'react';

import moment from 'moment';

import useUserStore from '../../../storage/useUserStore';
import useVideoStore from '../../../storage/useVideoStore';
import videoApi from '../../../utils/apis/videoApi';
import { useGetComments } from '../../../utils/hooks/useGetComment';
import { TextAreaComment } from '../styles';
import ConfirmModal from './ConfirmModal';

import { DotChartOutlined, MoreOutlined, SendOutlined } from '@ant-design/icons';
import {
	Avatar,
	Textarea,
	Button,
	Spacer,
	Container,
	Loading,
	Card,
	Grid,
	Dropdown,
} from '@nextui-org/react';

interface CommentItem {
	author: string;
	avatar: string;
	content: string;
	datetime: string;
}

const Comments = () => {
	const [mess, setMess] = useState<string>('');
	const videoStore = useVideoStore();
	const { videoDetail: video } = videoStore;
	const { user } = useUserStore();
	const [buttonLoading, setButtonLoading] = useState<boolean>(false);
	const { videoComments, loading, postComment } = useGetComments();
	const [confirmModal, setConfirmModal] = useState<boolean>(false);
	const [commentId, setCommentId] = useState<string>('');
	const handleSubmit = async () => {
		try {
			setButtonLoading(true);
			await postComment({
				content: mess,
				authorId: user?._id || '',
			}).finally(() => {
				setButtonLoading(false);
				setMess('');
			});
		} catch (e) {
			console.log(e);
		}
	};

	const onConfirmDelete = async () => {
		try {
			await videoApi.deleteComment(video?._id || '', commentId).then(() => {
				setConfirmModal(false);
			});
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<div className='comment-video'>
			<p className='title'>
				Comments
				<span>( {videoComments?.length} )</span>
			</p>
			<TextAreaComment>
				<div className='type-textarea'>
					<Avatar src={user?.avatarUrl} />
					<Textarea
						width='100%'
						maxRows={4}
						value={mess}
						onChange={(e) => setMess(e.target.value)}
						placeholder='Your comment write here'
					/>
				</div>
				<Button
					auto
					disabled={mess && mess.trim() !== '' ? false : true}
					onClick={() => handleSubmit()}
				>
					<>
						{buttonLoading ? (
							<Loading
								color='currentColor'
								size='xs'
								style={{
									marginRight: '10px',
									marginTop: '-5px',
								}}
							/>
						) : (
							<SendOutlined
								style={{
									transform: 'rotate(-45deg)',
									marginRight: '10px',
									marginTop: '-5px',
								}}
							/>
						)}
						Send
					</>
				</Button>
			</TextAreaComment>
			{loading ? (
				<Container css={{ p: 20 }}>
					<Loading type='gradient' />
				</Container>
			) : (
				videoComments?.length !== 0 &&
				videoComments?.map((item) => (
					<Card
						key={item._id}
						css={{
							marginBottom: '$8',
							transitionDuration: '0.2s',
						}}
						isHoverable
					>
						<Card.Body className='flex space-x-2 gap-4 mb-4p-4 rounded-md'>
							<Grid.Container gap={1}>
								<Grid>
									<Avatar src={item.authorId.avatarUrl} alt={item.authorId.name} />
								</Grid>
								<Grid.Container justify='space-between' className='flex-1'>
									<Grid>
										<div className=''>
											<h5 className='mb-0'>{item.authorId.name}</h5>
											<p className='text-neutral-400 mb-1'>{moment(item.createdAt).fromNow()}</p>
											<p>{item.content}</p>
										</div>
									</Grid>
									<Grid>
										{user?._id === item.authorId._id && (
											<Dropdown placement='bottom-right'>
												<Dropdown.Trigger>
													<Button icon={<MoreOutlined size={30} />} auto light></Button>
												</Dropdown.Trigger>
												<Dropdown.Menu>
													<Dropdown.Item color='error'>
														<Button
															auto
															color='error'
															light
															css={{ width: '100%', justifyContent: 'flex-start' }}
															onClick={() => {
																setConfirmModal(true);
																setCommentId(item._id);
															}}
														>
															Delete
														</Button>
													</Dropdown.Item>
												</Dropdown.Menu>
											</Dropdown>
										)}
									</Grid>
								</Grid.Container>
							</Grid.Container>
						</Card.Body>
					</Card>
				))
			)}
			<ConfirmModal
				open={confirmModal}
				onClose={() => setConfirmModal(false)}
				onConfirm={() => onConfirmDelete()}
			/>
			<Spacer y={2} />
		</div>
	);
};

export default Comments;

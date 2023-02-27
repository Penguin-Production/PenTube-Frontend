import React from 'react';

import { Button, Form, Input, Select, Spin, Modal, Image, notification } from 'antd';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import userApi from '../../utils/apis/user.api';
import { RegisterComponent } from './styles';

import { LoadingOutlined, CameraOutlined } from '@ant-design/icons/lib/icons';

const { Option } = Select;

type UserType = {
	name: string;
	email: string;
	avatar: string;
};
type NotificationType = 'success' | 'error';

const antIcon = (
	<LoadingOutlined
		style={{
			fontSize: 18,
			marginLeft: '5px',
			color: 'white',
		}}
		spin
	/>
);

export default function RegisterPage() {
	const [api, contextHolder] = notification.useNotification();
	const [isLoad, setIsLoad] = React.useState<boolean>(false);
	const [isHover, setIsHover] = React.useState<boolean>(false);
	const [avatar, setAvatar] = React.useState<string>('');
	const [isModal, setIsModal] = React.useState<boolean>(false);
	const [temporal, setTemporal] = React.useState<string>('');
	const [user, setUser] = React.useState<UserType>();
	const navigate = useNavigate();
	const [tokens] = useSearchParams();

	React.useEffect(() => {
		if (tokens.get('token')) {
			localStorage.setItem('token', tokens.get('token') || '');
			localStorage.setItem('refresh-token', tokens.get('refreshToken') || '');
			navigate('/register');
		}
		userApi
			.getInformation()
			.then(async (res) => {
				setAvatar(res.data.avatarUrl);
				setTemporal(res.data.avatarUrl);
				setUser(res.data);
			})
			.catch(() => navigate('/'));
	}, []);

	const openNotificationWithIcon = (type: NotificationType, content: string) => {
		api[type]({
			message: content,
		});
	};

	const onFinishForm = async (values: { name: string; email: string; sex: number }) => {
		await setIsLoad(true);
		await userApi
			.updateInformation({
				name: values.name,
				email: values.email,
				avatarUrl: avatar,
			})
			.then(() => {
				openNotificationWithIcon('success', 'Update successfully!');
				setTimeout(() => navigate('/'), 1000);
			})
			.catch(() =>
				openNotificationWithIcon('error', 'Something went wrong, please try again later!')
			);
	};

	const onFinishModal = () => {
		setAvatar(temporal);
		setIsModal(false);
	};

	const onCancelModal = () => {
		setTemporal(avatar);
		setIsModal(false);
	};

	return (
		<RegisterComponent>
			{contextHolder}
			{user && (
				<div className='container'>
					<div
						className='avatar'
						onMouseEnter={() => setIsHover(true)}
						onMouseLeave={() => setIsHover(false)}
					>
						<img src={avatar} alt='avatar' />
						{isHover && (
							<button onClick={() => setIsModal(true)}>
								<CameraOutlined style={{ marginRight: '5px' }} /> Change
							</button>
						)}
					</div>
					<Form name='basic' onFinish={onFinishForm} autoComplete='off'>
						<span>
							<span style={{ color: 'red' }}>*</span>
							Name
						</span>
						<Form.Item
							name='name'
							rules={[{ required: true, message: 'Please input your name!' }]}
							initialValue={user?.name}
						>
							<Input placeholder='Input your name' />
						</Form.Item>

						<span>
							<span style={{ color: 'red' }}>*</span>
							Sex
						</span>
						<Form.Item
							name='sex'
							rules={[{ required: true, message: 'Please choose your sex!' }]}
							initialValue={0}
						>
							<Select placeholder='Select'>
								<Option value={0}>Male</Option>
								<Option value={1}>Female</Option>
								<Option value={2}>Other</Option>
							</Select>
						</Form.Item>

						<span>
							<span style={{ color: 'red' }}>*</span>
							Email
						</span>
						<Form.Item name='email' initialValue={user?.email}>
							<Input type='email' readOnly={true} />
						</Form.Item>

						<Form.Item className='cancel-btn'>
							<Button disabled={isLoad} danger onClick={() => navigate('/homepage')}>
								Cancel
							</Button>
						</Form.Item>
						<Form.Item className='update-btn'>
							<Button type='primary' htmlType='submit' disabled={isLoad}>
								Update {isLoad && <Spin indicator={antIcon} />}
							</Button>
						</Form.Item>
					</Form>
					<Modal
						title='Change avatar'
						open={isModal}
						onOk={onFinishModal}
						onCancel={onCancelModal}
						centered
					>
						<Input
							onChange={(e) => setTemporal(e.target.value)}
							value={temporal}
							placeholder='Url image'
						/>
						{temporal && temporal.trim() !== '' && <Image src={temporal} />}
					</Modal>
				</div>
			)}
		</RegisterComponent>
	);
}

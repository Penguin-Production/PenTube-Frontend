import React from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import userApi from '../../utils/apis/user.api';
import { RegisterComponent } from './styles';

import { CameraOutlined } from '@ant-design/icons/lib/icons';
import { Modal, Button, Text, Input, Image, Grid, Spacer, Loading } from '@nextui-org/react';
import 'react-toastify/dist/ReactToastify.css';

type UserType = {
	name: string;
	email: string;
	avatar: string;
};
type NotificationType = 'success' | 'error';

export default function RegisterPage() {
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
		if (type === 'success')
			toast.success(content, {
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				progress: undefined,
				theme: 'light',
			});
		else
			toast.error(content, {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				progress: undefined,
				theme: 'light',
			});
	};

	const onFinishForm = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			email: { value: string };
			name: { value: string };
			sex: { value: number };
		};
		await setIsLoad(true);
		await userApi
			.updateInformation({
				name: target.name.value,
				email: target.email.value,
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
			<ToastContainer />
			{user && (
				<div className='container'>
					<h3 style={{ textAlign: 'center' }}>Update Your Account</h3>
					<div
						className='avatar'
						onMouseEnter={() => setIsHover(true)}
						onMouseLeave={() => setIsHover(false)}
					>
						<img src={avatar} alt='avatar' />
						{isHover && (
							<button onClick={() => openNotificationWithIcon('success', 'test')}>
								<CameraOutlined style={{ marginRight: '5px' }} /> Change
							</button>
						)}
					</div>
					<form onSubmit={onFinishForm}>
						<p>
							<span style={{ color: 'red' }}>*</span>
							Name
						</p>
						<Input
							placeholder='Input your name'
							required
							initialValue={user?.name}
							bordered
							color='primary'
							width='100%'
							name='name'
						/>
						<Spacer y={1} />
						<p>
							<span style={{ color: 'red' }}>*</span>
							Email
						</p>
						<Input
							type='email'
							readOnly
							initialValue={user?.email}
							bordered
							color='primary'
							width='100%'
							name='email'
						/>
						<Spacer y={1} />
						<Grid.Container style={{ fontSize: '16px' }} justify='center'>
							<Button
								bordered
								color='error'
								auto
								style={{ margin: '5px' }}
								onClick={() => navigate('/')}
							>
								Cancel
							</Button>
							<Button type='submit' auto style={{ margin: '5px' }}>
								{isLoad && (
									<Loading
										type='default'
										color='white'
										size='sm'
										style={{ marginRight: '5px' }}
									/>
								)}
								Update
							</Button>
						</Grid.Container>
					</form>
					<Modal
						closeButton
						aria-labelledby='modal-title'
						open={isModal}
						onClose={onCancelModal}
					>
						<Modal.Header>
							<Text id='modal-title' size={18}>
								Change avatar
							</Text>
						</Modal.Header>
						<Modal.Body>
							<Input
								clearable
								bordered
								fullWidth
								color='primary'
								size='lg'
								placeholder='Avatar url'
								onChange={(e) => setTemporal(e.target.value)}
								initialValue={temporal}
							/>
							{temporal && temporal.trim() !== '' && <Image src={temporal} />}
						</Modal.Body>
						<Modal.Footer>
							<Button auto flat color='error' onPress={onCancelModal}>
								Close
							</Button>
							<Button auto onPress={onFinishModal}>
								Save
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
			)}
		</RegisterComponent>
	);
}

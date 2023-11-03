import styled from 'styled-components';

export const ProfileComponent = styled.div`
	width: 100vw;
	height: calc(100vh - 80px);
	display: flex;
	justify-content: center;
	align-items: center;
	.container {
		width: 90%;
		max-width: 30rem;
		text-align: left;
		background: rgba(0, 0, 0, 0.07);
		padding: 1.5rem 2rem;
		border-radius: 10px;
		.avatar {
			width: 100px;
			height: 100px;
			border-radius: 50%;
			overflow: hidden;
			margin: 0 auto;
			margin-bottom: 1rem;
			position: relative;
			img {
				width: 100%;
				height: 100%;
			}
			button {
				display: flex;
				position: absolute;
				z-index: 2;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				color: white;
				border: none;
				background: rgba(0, 0, 0, 0.7);
				align-items: center;
				justify-content: center;
				cursor: pointer;
			}
		}
		.ant-form-item {
			margin-bottom: 1rem;
		}
		.cancel-btn,
		.update-btn {
			display: inline-block;
			width: calc(50% - 5px);
			text-align: right;
			margin: 0;
			margin-top: 1rem;
		}
		.update-btn {
			margin-left: 10px;
			text-align: left;
		}
	}
`;

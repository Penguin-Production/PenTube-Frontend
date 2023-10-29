import styled from 'styled-components';

export const RecommendComponent = styled.a`
	display: grid;
	grid-template-columns: 50% 50%;
	justify-content: space-between;
	margin: 1rem 1rem 2rem 1rem;
	text-align: left;
	cursor: pointer;
	color: black;
	&:hover .img-container::after {
		content: 'Watch Again';
		display: flex;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		color: white;
		background-color: rgba(0, 0, 0, 0.8);
		justify-content: center;
		align-items: center;
		padding-left: 10px;
		z-index: 2;
	}
	&:hover .img-container::before {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		border-left: 15px solid white;
		top: 50%;
		left: 33%;
		transform: translate(-50%, -50%);
		z-index: 3;
	}
	.img-container {
		border-radius: px;
		margin: 1rem 0;
		position: relative;
		overflow: hidden;
		border-radius: 20px;
		width: 20vw;
		margin-left: 0vw;
	}
	.title-ref {
		font-size: 20px;
		line-height: 21px;
		font-weight: 500;
		
	}
	.channel,
	.views {
		font-size: 15px;
		color: gray;
		line-height: 22px;
	}
	.content {
		margin-left: 0vw;
		margin-bottom: 10%;
	}
`;


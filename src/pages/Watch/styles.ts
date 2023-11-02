import styled from 'styled-components';

export const WatchComponent = styled.div`
	padding: 1rem 2rem;
	display: grid;
	grid-template-columns: auto auto;
	justify-content: space-between;
	.left-content {
		width: 67vw !important;
		height: 75vh !important;
		text-align: left;

		.video {
			width: 67vw !important;
			height: 75vh !important;
		}

		.channel-container {
			display: grid;
			grid-template-columns: 30% 40%;
			justify-content: space-between;
			margin: 0.5rem 0 1rem;
			.channel {
				display: grid;
				grid-template-columns: 50px 35% 35%;
				justify-content: space-between;
				align-items: center;
				img {
					border-radius: 50%;
				}
				.sl-sub {
					color: gray;
					font-size: 14px;
				}
				p {
					line-height: 19px;
				}
			}
			.action {
				display: grid;
				grid-template-columns: auto auto auto auto;
				column-gap: 10px;
				align-items: center;
				.like-dislike {
					display: flex;
					border-radius: 7px;
					align-items: center;
					overflow: hidden;
					background: rgba(0, 0, 0, 0.08);
					button {
						width: 50%;
						border-radius: 0;
						border: none;
						background: transparent;
						&:hover {
							background: rgba(0, 0, 0, 0.1);
							color: black;
						}
					}
				}
				button {
					background: rgba(0, 0, 0, 0.08);
					border-radius: 5px;
					padding: 7px;
					border: none;
					font-weight: 500;
					&:hover {
						background: rgba(0, 0, 0, 0.18);
						color: black;
					}
				}
			}
		}

		.description {
			background: rgba(0, 0, 0, 0.08);
			padding: 0.5rem 1rem;
			border-radius: 10px;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			overflow: hidden;
			display: -webkit-box;
			position: relative;
			button {
				position: absolute;
				top: 10px;
				right: 10px;
				border: 1px dashed black;
				line-height: 20px;
				border-radius: 5px;
				cursor: pointer;
				transition: all 0.2s linear;
				&:hover {
					border: 1px solid black;
					background: rgba(0, 0, 0, 0.1);
				}
			}
		}

		.comment-video {
			comment-item {
				transition: all 0.2s linear;
				&:hover {
					transform: translateY(-10px);
				}
			}
			padding-right: 20px;
			.ant-comment-inner {
				padding: 0;
				margin-bottom: 0.5rem;
			}
			.ant-form-item {
				margin-bottom: 0.5rem;
			}
			.title {
				margin: 1rem 0;
				position: relative;
				span {
					font-size: 18px;
					color: gray;
					position: absolute;
					top: 5px;
					margin-left: 5px;
				}
			}
			.ant-comment-actions {
				margin: 0;
				span {
					&:hover {
						color: black;
						text-decoration: underline;
						font-weight: 500;
					}
				}
			}
			.author-comment,
			.ant-comment-content-author,
			.ant-comment-content-author-name {
				font-weight: bold;
				color: black;
				font-size: 14px;
				margin: 0;
				padding: 0;
			}
			.ant-comment-content-author-time {
				font-weight: 400;
				font-size: 14px;
				margin: 0;
				padding: 0;
				margin-left: 10px;
			}
			.content-comment,
			.ant-comment-content-detail p {
				font-size: 15px;
				line-height: 22px;
			}
			.ant-form-item-control-input-content {
				text-align: right;
				button {
					font-weight: 500;
					background: black;
					&:hover {
						box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 5px;
					}
				}
			}
		}
	}
	.title {
		font-size: 23px;
		font-weight: 500;
	}
`;
export const RecommendComponent = styled.a`
	display: grid;
	grid-template-columns: 40% 58%;
	justify-content: space-between;
	margin: 0.5rem 1rem 0 1rem;
	text-align: left;
	cursor: pointer;
	color: black;
	&:hover .img-container::after {
		content: 'Watch';
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
		left: 30%;
		transform: translate(-50%, -50%);
		z-index: 3;
	}
	.img-container {
		border-radius: 7px;
		margin: 0.2rem 0;
		position: relative;
		overflow: hidden;
	}
	.title-ref {
		font-size: 16px;
		line-height: 21px;
		font-weight: 500;
	}
	.channel,
	.views {
		font-size: 15px;
		color: gray;
		line-height: 22px;
	}
`;
export const TextAreaComment = styled.div`
	margin: 2rem 0;
	.type-textarea {
		display: grid;
		grid-template-columns: 50px auto;
		margin: 1rem 0;
	}
	button {
		margin-left: auto;
	}
`;
export const CommentContainer = styled.div`
	display: grid;
	grid-template-columns: 50px 50px auto;
	margin-bottom: 2rem;
`;

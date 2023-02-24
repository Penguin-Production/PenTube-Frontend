import styled from 'styled-components';

export const WatchComponent = styled.div`
	padding: 1rem 2rem;
	display: grid;
	grid-template-columns: auto auto;
	justify-content: space-between;
	.left-content {
		width: 68vw !important;
		height: 75vh !important;
		text-align: left;

		.video {
			width: 68vw !important;
			height: 75vh !important;
		}

		.description {
			background: rgba(0, 0, 0, 0.07);
			padding: 0.5rem 1rem;
			border-radius: 10px;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			overflow: hidden;
			display: -webkit-box;
		}

		.comment-video {
			padding-right: 20px;
			.ant-comment-inner {
				padding: 0;
				margin-bottom: 0.5rem;
			}
			.ant-comment-actions {
				margin: 0;
				span {
					&:hover {
						color: black;
						text-decoration: underline;
					}
				}
			}
			.author-comment,
			.ant-comment-content-author {
				font-weight: bold;
				color: black;
				font-size: 14px;
				margin: 0;
				padding: 0;
			}
			.content-comment {
				font-size: 15px;
				line-height: 22px;
			}
		}
	}
	.title {
		font-size: 23px;
		font-weight: 500;
	}
`;

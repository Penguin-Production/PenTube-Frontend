import styled from 'styled-components';

export const RecommendComponent = styled.div`
	display: grid;
	grid-template-columns: 40% 58%;
	justify-content: space-between;
	padding: 0.5rem 1rem 0 1rem;
	text-align: left;
	img {
		border-radius: 7px;
		margin: 0.2rem 0;
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

import { useEffect, useState } from 'react';

import useVideoStore from '../../storage/useVideoStore';
import videoApi, { CommentUpdateType } from '../apis/videoApi';
import { Comment } from '../dto/video';

export const useGetComments = () => {
	const { videoDetail } = useVideoStore();
	const { videoComments, setVideoComments, loading, setLoading } = useVideoStore();
	const fetchComment = async () => {
		setLoading(true);
		if (!videoDetail) return;
		await videoApi
			.getComments(videoDetail?._id)
			.then((res) => {
				setVideoComments(res.data);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const postComment = async (body: CommentUpdateType) => {
		await videoApi.postComment(videoDetail?._id || '', body).then(() => {
			fetchComment();
		});
	};

	return { videoComments, loading, fetchComment, postComment };
};

export const useFetchComments = () => {
	const { videoDetail } = useVideoStore();

	const { fetchComment } = useGetComments();
	useEffect(() => {
		fetchComment();
	}, [videoDetail?._id]);
};

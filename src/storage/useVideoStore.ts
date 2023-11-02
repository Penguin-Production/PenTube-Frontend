import create from 'zustand';

import { Comment, Video } from './../utils/dto/video';

// Type for state
type VideoStore = {
	videos: Video[]; // value that use in store
	videoDetail: Video | undefined;
	loading: boolean;
	videoComments: Comment[];
	setVideoComments: (comments?: Comment[]) => void;
	setVideo: (videos: Video[]) => void; // function to update state
	setVideoDetail: (video?: Video) => void;
	setLoading: (loading: boolean) => void;
};

// using generic with type is VideoStore for the store
const useVideoStore = create<VideoStore>((set) => ({
	// put any state here, it could be any type of data
	videos: [],
	videoDetail: undefined,
	videoComments: [],
	loading: false,
	setVideo(videos: Video[]) {
		// the set function using for update state
		set(() => ({
			videos: videos,
		}));
	},
	setVideoDetail(video?: Video) {
		set(() => ({
			videoDetail: video,
		}));
	},
	setVideoComments(comments?: Comment[]) {
		set(() => ({
			videoComments: comments,
		}));
	},
	setLoading(loading: boolean) {
		set(() => ({
			loading: loading,
		}));
	},
}));

export default useVideoStore;

import create from 'zustand';

import { Video } from './../utils/dto/video';

// Type for state
type VideoStore = {
	videos: Video[]; // value that use in store
	loading: boolean;
	setVideo: (videos: Video[]) => void; // function to update state
	setLoading: (loading: boolean) => void; // function to
};

// using generic with type is VideoStore for the store
const useVideoStore = create<VideoStore>((set) => ({
	// put any state here, it could be any type of data
	videos: [],
	loading: false,
	setVideo(videos: Video[]) {
		// the set function using for update state
		set(() => ({
			videos: videos,
		}));
	},
	setLoading(loading: boolean) {
		set(() => ({
			loading: loading,
		}));
	},
}));

export default useVideoStore;

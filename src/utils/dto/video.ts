export interface Video {
	_id: string;
	title: string;
	description: string;
	tags: string[];
	url: string;
	totalFrame: number;
	status: string;
	key: string | null;
	views: any[];
	totalViews: number;
	like: any[];
	dislike: any[];
	channel: {
		_id: string;
		name: string;
		avatar: string;
	};
	thumbnail: string;
	createdAt: string;
	updatedAt: string;
	score: number;
}

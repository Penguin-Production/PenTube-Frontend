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
	like: any[];
	dislike: any[];
	thumbnail: string;
	createdAt: string;
	updatedAt: string;
	score: number;
}

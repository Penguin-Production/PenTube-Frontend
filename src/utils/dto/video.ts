import { create } from 'zustand';

import { User } from './user';

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
	likes: any[];
	dislikes: any[];
	channel: {
		_id: string;
		name: string;
		avatar: string;
	};
	comments: Comment[];
	totalViews: number;
	thumbnail: string;
	createdAt: string;
	updatedAt: string;
	score: number;
}

export interface Comment {
	_id: string;
	content: string;
	authorId: User;
	createdAt: Date;
}

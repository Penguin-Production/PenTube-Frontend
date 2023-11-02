import { create } from 'zustand';

import { CHANNEL_TYPE } from './channel.type';
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
	channel: CHANNEL_TYPE;
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

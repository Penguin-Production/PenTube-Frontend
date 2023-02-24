export type VideoType = {
	id: string;
	title: string;
	channel: string;
	description: string;
	category: string;
	tags: string[];
	url: string;
	// status: string;
	// key?:  string <videoID, keyCreatedAt: date,
	like:
		| []
		| [
				{
					userID: string;
				}
		  ];
	dislike:
		| []
		| [
				{
					userID: string;
				}
		  ];
	totalViews: number;
	createdAt: Date;
	updateAt: Date;
};

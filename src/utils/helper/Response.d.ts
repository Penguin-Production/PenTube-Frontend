interface Response {
	readonly code: number;
	readonly message: string;
	readonly data: Array | object | null;
}

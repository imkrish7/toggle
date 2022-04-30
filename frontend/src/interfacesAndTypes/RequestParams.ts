export type PresignedURLParamsTypes = {
	fileName: string,
	fileType: string,
	type: string
}

export type PostParamsType = {
	_id?: string,
	isPrivate: boolean,
	image?: {
		url: string,
		caption: string
	},
	content?: string
}

export type DeletePostParams = {
	id: string
}
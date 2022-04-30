export type StateType = {
	error: any | boolean,
	data: any | null,
	success: boolean,
	loading: boolean
}

export type ActionType = {
	type: string,
	isLoading?: boolean,
	data?: any,
	error?: any
}
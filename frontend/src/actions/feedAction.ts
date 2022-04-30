import { getActionsStates } from "../Utils/storeHelpers";
import { GET_FEED, GET_PRESIGNED_URL, CREATE_POST, DELETE_POST, TOGGLE_PRIVACY } from "./Types";
import { sendRequest } from "../services"
import { PresignedURLParamsTypes, PostParamsType, DeletePostParams } from "../interfacesAndTypes/RequestParams";

export const getFeedLoading = (isLoading: boolean) =>{
	return {
		type: getActionsStates(GET_FEED).loading,
		isLoading
	}
}

export const getFeedSuccess = (data: any) =>{
	return {
		type: getActionsStates(GET_FEED).success,
		data
	}
}

export const getFeedError = (error: any)=>{
	return {
		type: getActionsStates(GET_FEED).error,
		error
	}
}

export const getFeed = ()=>{
	let url = "/feeds"
	let params = {}
	return (dispatch: any) => sendRequest.get(dispatch, url, params,getFeedLoading, getFeedSuccess, getFeedError)
}


export const getPresignedUrlLoading = (isLoading: boolean) =>{
	return {
		type: getActionsStates(GET_PRESIGNED_URL).loading,
		isLoading
	}
}

export const getPresignedUrlSuccess = (data: any) =>{
	return {
		type: getActionsStates(GET_PRESIGNED_URL).success,
		data
	}
}

export const getPresignedUrlError = (error: any)=>{
	return {
		type: getActionsStates(GET_PRESIGNED_URL).error,
		error
	}
}

export const getPresignedUrl = (params: PresignedURLParamsTypes)=>{
	let url = "/presignedurl"
	return (dispatch: any) => sendRequest.post(dispatch, url, params,getPresignedUrlLoading, getPresignedUrlSuccess, getPresignedUrlError)
}


export const createPostLoading = (isLoading: boolean) =>{
	return {
		type: getActionsStates(CREATE_POST).loading,
		isLoading
	}
}

export const createPostSuccess = (data: any) =>{
	return {
		type: getActionsStates(CREATE_POST).success,
		data
	}
}

export const createPostError = (error: any)=>{
	return {
		type: getActionsStates(CREATE_POST).error,
		error
	}
}

export const createPostReset = ()=>{
	return {
		type: getActionsStates(CREATE_POST).reset
	}
}

export const createPost = (params: PostParamsType)=>{
	let url = "/post"
	return (dispatch: any) => sendRequest.post(dispatch, url, params,createPostLoading, createPostSuccess, createPostError)
}

export const deletePostLoading = (isLoading: boolean) =>{
	return {
		type: getActionsStates(DELETE_POST).loading,
		isLoading
	}
}


export const deletePostSuccess = (data: any) =>{
	return {
		type: getActionsStates(DELETE_POST).success,
		data
	}
}

export const deletePostError = (error: any)=>{
	return {
		type: getActionsStates(DELETE_POST).error,
		error
	}
}


export const deletePost = (params: DeletePostParams)=>{
	let url = "/post/delete"
	return (dispatch: any) => sendRequest.post(dispatch, url, params, deletePostLoading, deletePostSuccess, deletePostError)
}


export const togglePrivacyPostLoading = (isLoading: boolean) =>{
	return {
		type: getActionsStates(TOGGLE_PRIVACY).loading,
		isLoading
	}
}


export const togglePrivacyPostSuccess = (data: any) =>{
	return {
		type: getActionsStates(TOGGLE_PRIVACY).success,
		data
	}
}

export const togglePrivacyPostError = (error: any)=>{
	return {
		type: getActionsStates(TOGGLE_PRIVACY).error,
		error
	}
}


export const togglePrivacyPost = (params: DeletePostParams)=>{
	let url = "/toggle/privacy"
	return (dispatch: any) => sendRequest.post(dispatch, url, params, togglePrivacyPostLoading, togglePrivacyPostSuccess, togglePrivacyPostError)
}
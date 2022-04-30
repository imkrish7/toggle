import { getActionsStates } from "../Utils/storeHelpers";
import { defaultState, errorState, successState, loadingState } from "../Utils/defaultStates";
import { StateType, ActionType } from "../interfacesAndTypes/TState";
import { GET_FEED, GET_PRESIGNED_URL, CREATE_POST, DELETE_POST, TOGGLE_PRIVACY } from "../actions/Types";


let initalState = {
	error: false,
	data: null,
	success: false,
	loading: false
}



function feedResponse(state: StateType=initalState, action: ActionType){
	switch(action.type){
		case getActionsStates(GET_FEED).success:
			return {
				...successState,
				data: action.data
			}
		case getActionsStates(GET_FEED).loading:
			return {
				...loadingState,
				loading: action.isLoading
			}
		case getActionsStates(GET_FEED).error:
			return {
				...errorState,
				error: action.error
			}
		default:
			return defaultState
	}
}



function presignedURLResponse(state: StateType=initalState, action: ActionType){
	switch(action.type){
		case getActionsStates(GET_PRESIGNED_URL).success:
			return {
				...successState,
				data: action.data
			}
		case getActionsStates(GET_PRESIGNED_URL).loading:
			return {
				...loadingState,
				loading: action.isLoading
			}
		case getActionsStates(GET_PRESIGNED_URL).error:
			return {
				...errorState,
				error: action.error
			}
		default:
			return defaultState
	}
}


function createPostResponse(state: StateType=initalState, action: ActionType){
	switch(action.type){
		case getActionsStates(CREATE_POST).success:
			return {
				...successState,
				data: action.data
			}
		case getActionsStates(CREATE_POST).loading:
			return {
				...loadingState,
				loading: action.isLoading
			}
		case getActionsStates(CREATE_POST).error:
			return {
				...errorState,
				error: action.error
			}
		case getActionsStates(CREATE_POST).reset:
			return {
				...defaultState
			}
		default:
			return state;
	}
}

function deletePostResponse(state: StateType=initalState, action: ActionType){
	switch(action.type){
		case getActionsStates(DELETE_POST).success:
			return {
				...successState,
				data: action.data
			}
		case getActionsStates(DELETE_POST).loading:
			return {
				...loadingState,
				loading: action.isLoading
			}
		case getActionsStates(DELETE_POST).error:
			return {
				...errorState,
				error: action.error
			}
		default:
			return state;
	}
}


function togglePostPrivacyResponse(state: StateType=initalState, action: ActionType){
	switch(action.type){
		case getActionsStates(TOGGLE_PRIVACY).success:
			return {
				...successState,
				data: action.data
			}
		case getActionsStates(TOGGLE_PRIVACY).loading:
			return {
				...loadingState,
				loading: action.isLoading
			}
		case getActionsStates(TOGGLE_PRIVACY).error:
			return {
				...errorState,
				error: action.error
			}
		default:
			return state;
	}
}


export {
	feedResponse,
	presignedURLResponse,
	createPostResponse,
	deletePostResponse,
	togglePostPrivacyResponse
}
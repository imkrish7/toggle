import { getActionsStates } from "../Utils/storeHelpers";
import { defaultState, errorState, successState, loadingState } from "../Utils/defaultStates";
import { StateType, ActionType } from "../interfacesAndTypes/TState";
import { GET_OTP, VERIFY_OTP, GET_LOGOUT } from "../actions/Types";

function loginResponse(state: StateType, action: ActionType){
	switch(action.type){
		case getActionsStates(GET_OTP).success:
			return {
				...successState,
				data: action.data
			}
		case getActionsStates(GET_OTP).loading:
			return {
				...loadingState,
				loading: action.isLoading
			}
		case getActionsStates(GET_OTP).error:
			return {
				...errorState,
				error: action.error
			}
		default:
			return defaultState
	}
}

function verifyResponse(state: StateType, action: ActionType){
	switch(action.type){
		case getActionsStates(VERIFY_OTP).success:
			console.log(action)
			const { token } = action.data;
			if(token){
				localStorage.setItem('TOGGLE_AUTH_TOKEN', token)
			}
			return {
				...successState,
				data: action.data
			}
		case getActionsStates(VERIFY_OTP).loading:
			return {
				...loadingState,
				loading: action.isLoading
			}
		case getActionsStates(VERIFY_OTP).error:
			return {
				...errorState,
				error: action.error
			}
		default:
			return defaultState
	}
}



function logoutResponse(state: StateType, action: ActionType){
	switch(action.type){
		case getActionsStates(GET_LOGOUT).success:
			return {
				...successState,
				data: action.data
			}
		case getActionsStates(GET_LOGOUT).loading:
			return {
				...loadingState,
				loading: action.isLoading
			}
		case getActionsStates(GET_LOGOUT).error:
			return {
				...errorState,
				error: action.error
			}
		default:
			return defaultState
	}
}



export {
	loginResponse,
	verifyResponse,
	logoutResponse
}
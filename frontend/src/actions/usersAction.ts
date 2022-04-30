
import { getActionsStates } from "../Utils/storeHelpers";
import { GET_LOGOUT, GET_OTP, VERIFY_OTP } from "./Types";
import { sendRequest } from "../services"
import { Action, Dispatch } from "redux";
import { ParamsType } from "../Context/AuthContext";

export const getOTPLoading = (isLoading: boolean) =>{
	return {
		type: getActionsStates(GET_OTP).loading,
		isLoading
	}
}

export const getOTPSuccess = (data: any) =>{
	return {
		type: getActionsStates(GET_OTP).success,
		data
	}
}

export const getOTPError = (error: any)=>{
	return {
		type: getActionsStates(GET_OTP).error,
		error
	}
}

export const getOTP = (params: any)=>{
	let url = "/login"
	return (dispatch: any) => sendRequest.post(dispatch, url, params,getOTPLoading, getOTPSuccess, getOTPError)
}

export const verifyOTPLoading = (isLoading: boolean) =>{
	return {
		type: getActionsStates(VERIFY_OTP).loading,
		isLoading
	}
}

export const verifyOTPSuccess = (data: any) =>{
	return {
		type: getActionsStates(VERIFY_OTP).success,
		data
	}
}

export const verifyOTPError = (error: any)=>{
	return {
		type: getActionsStates(VERIFY_OTP).error,
		error
	}
}

export const verifyOTP = (params: ParamsType)=>{
	let url = "/verify"
	return (dispatch: Dispatch<Action> ) => sendRequest.post(dispatch, url, params,verifyOTPLoading, verifyOTPSuccess, verifyOTPError)
}

export const logoutLoading = (isLoading: boolean) =>{
	return {
		type: getActionsStates(GET_LOGOUT).loading,
		isLoading
	}
}

export const logoutSuccess = (data: any) =>{
	return {
		type: getActionsStates(GET_LOGOUT).success,
		data
	}
}

export const logoutError = (error: any)=>{
	return {
		type: getActionsStates(GET_LOGOUT).error,
		error
	}
}

export const getLogout = ()=>{
	let url = "/logout"
	let params = {}
	return (dispatch: Dispatch<Action> ) => sendRequest.post(dispatch, url, params,logoutLoading, logoutSuccess, logoutError)
}
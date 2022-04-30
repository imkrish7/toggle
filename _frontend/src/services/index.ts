import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ActionCreator, Action, Dispatch } from "redux";
import { AppDispatch } from "../store";

const config: AxiosRequestConfig = {
	baseURL: "http://localhost:5000/api/v1"
}

const instance = axios.create(config);


const makeRequest = (dispatch: Dispatch<Action>, reqObject: AxiosRequestConfig,loadingAction: ActionCreator<Action>, successAction: ActionCreator<Action>, errorAction: ActionCreator<Action>)=>{
	dispatch<any>(loadingAction(true))
	instance(reqObject).then((res: AxiosResponse)=>{

	dispatch<any>(successAction(res.data))

	}).catch(error=>{
		dispatch<any>(errorAction(error))
	})

}

const sendRequest = {
	get: (dispatch: AppDispatch, url: string, params: any, loadingAction: ActionCreator<Action>, successAction: ActionCreator<Action>, errorAction: ActionCreator<Action> )=>{
		const headers = {
			'Authorization': `Bearer ${localStorage.getItem('TOGGLE_AUTH_TOKEN')}`,
			'Content-Type': "application/json"
		}
		let reqObj: AxiosRequestConfig = {
			url,
			method: "GET",
			headers: headers,
			params: params,
		}

		return makeRequest(dispatch, reqObj, loadingAction, successAction, errorAction);
	},
	post: (dispatch: Dispatch<Action>, url: string, params: any, loadingAction: ActionCreator<Action>, successAction: ActionCreator<Action>, errorAction: ActionCreator<Action> )=>{
		const headers = {
			'Authorization': `Bearer ${localStorage.getItem('TOGGLE_AUTH_TOKEN')}`,
			'Content-Type': "application/json"
		}
		let reqObj: AxiosRequestConfig = {
			url,
			method: "POST",
			headers: headers,
			params: params,
			data: JSON.stringify(params)
		}

		makeRequest(dispatch, reqObj, loadingAction, successAction, errorAction);
	}
}

export {
	sendRequest
}
import { StateType } from "../interfacesAndTypes/TState";


let errorState: StateType = {
	error: true,
	data: null,
	loading: false,
	success: false
}


let successState: StateType = {
	error: false,
	data: {},
	loading: false,
	success: true
}

let loadingState: StateType = {
	error: false,
	data: null,
	loading: true,
	success: false
}

let defaultState: StateType = {
	error: false,
	data: null,
	loading: false,
	success: false
}

export {
	loadingState,
	errorState,
	successState,
	defaultState
}
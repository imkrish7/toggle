

const getActionsStates = (actionName: string)=>{

	actionName = actionName.toUpperCase();
	let loading = `FETCHING_${actionName}_LOADING`;
	let success = `FETCHING_${actionName}_SUCCESS`;
	let error = `FETCHING_${actionName}_ERROR`;
	let reset = `FETCHING_${actionName}_RESET`;
	return {
		loading,
		success,
		error,
		reset
	}
}

export {
	getActionsStates
}
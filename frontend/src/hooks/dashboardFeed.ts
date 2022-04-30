import { getFeed } from "../actions/feedAction"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../store"
import { StateType } from "../interfacesAndTypes/TState"
import { useEffect } from "react"

const useFetchDashboardFeed = ()=>{
	const response: StateType = useSelector((state: RootState)=> state.dashboardFeed); 
	const dispatch = useDispatch();

	useEffect(()=>{
		dispatch<any>(getFeed())
	},[])
	return response;
}

export {
	useFetchDashboardFeed
}
import { combineReducers } from "redux";
import { loginResponse, verifyResponse, logoutResponse } from "../reducers/userReducers"
import { feedResponse, presignedURLResponse, createPostResponse, deletePostResponse, togglePostPrivacyResponse,  } from "./feedReducers";
export const RootReducer = combineReducers({
	loggedin: loginResponse,
	verifyOTP: verifyResponse,
	dashboardFeed: feedResponse,
	presignedUrl: presignedURLResponse,
	createPost: createPostResponse,
	deletePost: deletePostResponse,
	togglePrivacy: togglePostPrivacyResponse,
	logout: logoutResponse
})
import { ReactNode, useState, useEffect, useMemo }from 'react'
import { AuthContext, ParamsType } from './AuthContext'
import { verifyOTP, getLogout } from "../actions/usersAction"
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store"
import { StateType } from "../interfacesAndTypes/TState"
import { useSnackbar } from "notistack"
import { io, Socket } from "socket.io-client";
import styled from "styled-components";

type Props = {
	children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const {enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [login, setLogin] = useState<boolean>(false)
  const [socket, setSocket] = useState<Socket<any, any>| null>(null);
  const response: StateType = useSelector((state: RootState)=> state.verifyOTP);
  const logoutResponse: StateType = useSelector((state: RootState)=> state.logout);
  const dispatch = useDispatch<AppDispatch>();
  const signin = (params: ParamsType, callback: VoidFunction )=>{
    dispatch<any>(verifyOTP(params))
    callback()
   }

   const signout = ()=>{
      dispatch<any>(getLogout())
   }

   let loggedin = useMemo(()=>{
    if(localStorage.getItem("TOGGLE_AUTH_TOKEN")){
      return true;
    }else{
      return false;
    }
   }, [login])
  let value = { loggedin, signin, signout, socket }
  useEffect(()=>{
    if(response.success){
      let token = localStorage.getItem("TOGGLE_AUTH_TOKEN");
      let _socket = io("ws://localhost:5000", {
        auth: {
          token
        }
      });
      setSocket(_socket);
      setLogin(true);
    }
    if(response.error){
			enqueueSnackbar(response.error.message, {
				variant: "error",
				action: <CloseButton onClick={()=>closeSnackbar()}>Dismiss</CloseButton>
			})
    }
  }, [response, enqueueSnackbar, closeSnackbar])
  useEffect(()=>{
    if(logoutResponse.success){
      localStorage.removeItem("TOGGLE_AUTH_TOKEN");
      setSocket(null);
      setLogin(false);
    }
    if(logoutResponse.error){
			enqueueSnackbar(logoutResponse.error.message, {
				variant: "error",
				action: <CloseButton onClick={()=>closeSnackbar()}>Dismiss</CloseButton>
			})
    }
  },[enqueueSnackbar, closeSnackbar, logoutResponse])
  return (
	<AuthContext.Provider value={value}>
		{children}
	</AuthContext.Provider>
  )
}

const CloseButton = styled.button`
	border: 1px solid #fff;
	border-radius: 4px;
	padding: 10px 20px;
	background: transparent;
	color: #fff;
	font-weight: 500;
`

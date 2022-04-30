import { createContext, useContext } from 'react';


type ParamsType = {
	phoneNumber: string,
	otp: string
}

interface AuthContextType{
	loggedin: boolean,
	signin: (params: ParamsType, callback: VoidFunction) => void;
	signout: () => void;
	socket: any;
}

let AuthContext = createContext<AuthContextType>(null!);

const useAuth = ()=>{
	return useContext(AuthContext);
}

export {
	AuthContext,
	useAuth
};
export type { AuthContextType };
export type { ParamsType };

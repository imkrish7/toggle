import { Navigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'


type Props = {
	children: JSX.Element
}


const RequiredAuth = ({children}:Props) => {
	const auth = useAuth();
	if(!auth.loggedin){
		return <Navigate to="/" replace={true} />
 	}
    return children
}

export default RequiredAuth
import { ReactNode, useEffect } from 'react'
import styled from 'styled-components'
import Header from './Header'
import {Outlet} from "react-router-dom"
import ComposePost from '../ComposePost'
import { useDispatch } from 'react-redux'
import { useAuth } from "../../Context/AuthContext";
import { createPostReset } from "../../actions/feedAction";
type Props = {
	children?: ReactNode
}



const DashboardLayout = ({children}:Props) => {
	const dispatch = useDispatch()
	const auth = useAuth();
	useEffect(()=>{
		dispatch<any>(createPostReset())
	})

  return (
	<Container>
		<Header />
		<Main>
			<Outlet />
		</Main>
		{auth.loggedin ? <ComposePost /> : null}
	</Container>
  )
}

const Container = styled.div`
	display: grid;
	grid-template-rows: 60px auto;
	grid-tempate-columns: 1fr;
	position: relative;
	min-height: inherit;
	width: 100%;
	place-items: center;
	overflow: hidden;
`;

const Main = styled.main`
	width: 100%;
	height: calc(100vh - 60px);
	display: flex;
	justify-content: center;
	padding: 20px;
	overflow: auto;
`


export default DashboardLayout
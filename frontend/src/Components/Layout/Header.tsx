import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../../Context/AuthContext'

type ToggleProps = {
	toggle: boolean
}


const Header = () => {
	const auth = useAuth();
	const [toggle, setToggle] = useState<boolean>(false);
	const _signout = ()=>{
		setToggle(!toggle)
		auth.signout()
	}
  return (
	<HeaderContainer>
		<Logo>Toggle</Logo>
		{auth.loggedin ? <Actions>
			<Action onClick={()=> {setToggle(!toggle)}}>
				<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M352 128C352 198.7 294.7 256 224 256C153.3 256 96 198.7 96 128C96 57.31 153.3 0 224 0C294.7 0 352 57.31 352 128zM209.1 359.2L176 304H272L238.9 359.2L272.2 483.1L311.7 321.9C388.9 333.9 448 400.7 448 481.3C448 498.2 434.2 512 417.3 512H30.72C13.75 512 0 498.2 0 481.3C0 400.7 59.09 333.9 136.3 321.9L175.8 483.1L209.1 359.2z"/></SVG>
			</Action>
			<POPUP toggle={toggle}>
				<Button onClick={_signout}>Logout</Button>
			</POPUP>
		</Actions>: null}
	</HeaderContainer>
  )
}

const HeaderContainer = styled.header`
	position: sticky;
	top: 0px;
	height: 100%;
	width: 90%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #fff;
	padding: 0px 30px;
	box-shadow: 2px 5px 10px #d3d3d3;
	border-radius: 20px;
	z-index: 9
`;

const Logo = styled.div`
	font-size: 30px;
	font-weight: 600;
	color: #636e72;
`

const Actions = styled.div`
	position: relative;
`

const SVG = styled.svg`
	width: 30px;
	height: 30px;
`

const POPUP = styled.div<ToggleProps>`
	position: absolute;
	top: calc(100% + 5px);
	right: 0px;
	width: 200px;
	height: ${props=> props.toggle ? "auto" : "0px"};
	display: ${props => props.toggle ? "block": "none"};
	transition: all 0.2s linear;
	visibility: ${props=> props.toggle ? "visible": "hidden"};
	padding: 20px 10px;
	transform-origin: center top;
	border-radius: 10px;
	background: #fff;
	z-index: 11;
	box-shadow: 5px 5px 20px #ccc0;
`

const Action = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	backgrun-color: #858585;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`
const Button = styled.button`
	width: 100%;
	padding: 10px;
	border: none;
	border-radius: 4px;
	background: none;
	text-align: center;
	font-weight: 500;
	font-size: 20px;
	color: #636e72;
	cursor: pointer;
	&:hover{
		background: #ccc;
	}
`;
export default Header
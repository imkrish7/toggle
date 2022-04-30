import React from 'react'
import styled, { keyframes } from 'styled-components'

const Loading = () => {
  return (
	<Container>
		<InnerContainer />
	</Container>
  )
}


const circle = keyframes`
	from{
		transform : rotate(0deg)
	}
	to{
		transform: rotate(360deg)
	}
`

const Container = styled.div`
	width: 80px;
	height: 80px;
	border-width: 3px;
	border-style: solid;
	border-color: #4834d4;
	border-top-color: transparent;
	border-bottom-color: transparent;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	animation: ${circle} 2s linear infinite;
`

const InnerContainer = styled.div`
	width: 40px;
	height: 40px;
	border-width: 3px;
	border-style: solid;
	border-color: #4834d4;
	border-top-color: transparent;
	border-bottom-color: transparent;
	border-radius: 50%;
	animation: ${circle} 1s 0.5s linear reverse infinite;
`

export default Loading
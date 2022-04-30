import { useState } from 'react'
import styled from 'styled-components'

type Props = {
	data: any,
	handleDelete: (id: string)=> void
	handleTogglePrivacy: (id: string)=> void
}

const PostCard = ({data, handleDelete, handleTogglePrivacy}:Props) => {
	const [toggle, setToggle] = useState<boolean>(false);
  return (
	<Container>
		<Card>
			{data.content ? <Content>
				{data.content}
			</Content> :<ImageWrapper>
				<Image src={data.image.url}/>
			</ImageWrapper>}
			<Actions>
				<Wrapper>
				<Action onClick={()=> handleDelete(data._id) }>
					<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#b2bec3" d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></SVG>
				</Action>
				</Wrapper>
				{toggle ? <POPUP>
					<Span onClick={()=> handleTogglePrivacy(data._id)}>{data.isPrivate ? "Make public" : "Make private" }</Span>
				</POPUP> : null}
				<Action onClick={()=> setToggle(!toggle)}>
					<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 360C94.93 360 120 385.1 120 416C120 446.9 94.93 472 64 472C33.07 472 8 446.9 8 416C8 385.1 33.07 360 64 360zM64 200C94.93 200 120 225.1 120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200zM64 152C33.07 152 8 126.9 8 96C8 65.07 33.07 40 64 40C94.93 40 120 65.07 120 96C120 126.9 94.93 152 64 152z"/></SVG>
				</Action>
			</Actions>
		</Card>
	</Container>
  )
}


const Container = styled.div`
	width: 100%;
	background-color: #fff;
	border-radius: 10px;
	position: relative;
`

const Card = styled.div`
	display: flex;
	flex-direction: column;
`;

const ImageWrapper = styled.div`
	width: 100%;
	padding: 20px;
	height: 350px;
	
`

const Actions = styled.div`
	width: 100%;
	height: 50px;
	border-top: 1px solid #ccc;
	display: flex;
	align-items: center;
	padding: 0px 20px;
	justify-content: space-around;
	position: relative;
`

const Action = styled.span`
	/* width: 30px; */
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
	cursor: pointer;
	padding: 10px;
	border-radius: 5px;
	transition: all 0.2s linear;
	&:hover{
		background-color: #4834d4;
	}
`

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
	border-radius: 10px;
`

const Content = styled.p`
	padding: 10px;
	color: #636e72;
	font-size: 16px;
	font-weight: 450;
	line-height: 20px;
	letter-spacing: 0.001em;
`

const SVG = styled.svg`
	flex: 1;
	width: 20px;
	height: 20px;
`

const POPUP = styled.div`
	width: 200px;
	position: absolute;
	bottom: 50px;
	right: 30px;
	background: #fff;
	border-radius: 4px;
	box-shadow: 0px 0px 5px #ccc;
` 

const Wrapper = styled.div`
	flex: 1;
	display: flex;
	justify-content: space-between;
`

const Span = styled.span`
	height: 40px;
	width: 100%;
	display:flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	border-radius: 4px;
	&:hover{
		background: #ccc;
	}
`

export default PostCard
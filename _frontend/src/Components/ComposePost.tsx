import { Fragment, useEffect, useState } from 'react'
import AddPost from "./AddPost"
import styled from 'styled-components';
import { createPostReset } from "../actions/feedAction";
import { useDispatch } from "react-redux";

type AddProps = {
	toggle?: boolean
}

const ComposePost = () => {
	const dispatch = useDispatch()
	const [addPost, setAddPost] = useState<boolean>(false);
	const _toggleAddPost = ()=>{
		setAddPost(!addPost);
	}

	useEffect(()=>{
		dispatch<any>(createPostReset());
	},[addPost, dispatch])

  return (
	  <Fragment>
	{addPost ? <AddPost toggle={addPost} />: null}
		<AddButton toggle={addPost} onClick={_toggleAddPost}>
			<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#6c5ce7" d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></SVG>
		</AddButton>
	</Fragment>
  )
}



const AddButton = styled.div<AddProps>`
	position: absolute;
	bottom: 30px;
	right: 30px;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: transform 0.4s linear;
	transform:${props=> props.toggle ? "rotate(45deg)": "rotate(0deg)"}
`

const SVG = styled.svg`
	width: 30px;
	height: 30px;
`
export default ComposePost
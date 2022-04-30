import { Fragment, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import UploadFile from "./UploadFile";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { StateType } from "../interfacesAndTypes/TState";
import { getPresignedUrl } from "../actions/feedAction";
import { PostParamsType } from  "../interfacesAndTypes/RequestParams";
import { createPost } from "../actions/feedAction";

import Loading from "./Loading"

type Props = {
	toggle: boolean
}

type ToggleProps = {
	toggle?: boolean
}

type ErrorProps = {
	msg: string,
	hasError: boolean
}

const AddPost = ({toggle}: Props) => {
	const [success, setSuccess] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const presignedUrlResponse: StateType = useSelector((state: RootState)=> state.presignedUrl);
	const [error, setError] = useState<ErrorProps>({
		msg: "",
		hasError: false
	});
	const _createPost: StateType = useSelector((state: RootState)=> state.createPost);
	const dispatch = useDispatch();
	const [isPrivate, setIsPrivate] = useState<boolean>(false);
	const [type, setType] = useState<string>("")
	const [file, setFile] = useState<File | null>(null)
	const [content, setContent] = useState<string>("");
	const _typeHandler = (_type:string)=>{
		setType(_type);
	}
   const presignedUrl = useMemo(()=>{
		if(presignedUrlResponse.success){
			return {_endUrl: presignedUrlResponse.data.presigned, url: presignedUrlResponse.data.url};
		}
		return null;
   },[presignedUrlResponse])

    const _handleChange = async (file:File)=>{
	   setFile(file);
	   if(!presignedUrl){
		     const params = {
				fileName: file.name,
				fileType: file.type,
				type: "memory"
			 }
			dispatch<any>(getPresignedUrl(params))
	   }
   }

   const _handleCheckbox = ()=>{
		setIsPrivate(!isPrivate);
   }

   const _handleSubmit = async ()=>{
	   try {
		   setLoading(true)
		   let params: PostParamsType = {
			   isPrivate
		   }
		   if(presignedUrl){
			   params["image"] = {
				   url: presignedUrl.url,
				   caption: ""
			   }

			   let formData = new FormData();
			   if(file){
			   	formData.append("file", file);
			   }
			   const reqObj= {
				   method: "PUT",
				   body: file
			   }
			   await fetch(presignedUrl._endUrl,reqObj);
		   }else{
			   params["content"] = content;
		   }

		   dispatch<any>(createPost(params));
	   } catch (error) {
		   
	   }
   }
   useEffect(()=>{
	   if(_createPost.error){
			setError({
				msg: _createPost.error.message,
				hasError: true
			})
	   }
	   if(_createPost.success){
		   setSuccess(true)
	   }
	   if(!_createPost.loading){
		   setLoading(false)
	   }
   },[_createPost])

   const _clear = ()=>{
	   setError({
		   msg: "",
		   hasError: false
	   })
	   setSuccess(false)
	   setContent("")
	   setFile(null)
	   setType("")
	   setLoading(false)
   }
  return (
	<Container toggle={toggle}>
		{type.length > 0 ? <PostContainer>
			
			{ loading || success || error.hasError ? <WarningWrapper>
				{loading ? <Loading /> : null }
				{success ? <Fragment> 
					<SuccessMessage>AHOY! Post has been created</SuccessMessage>
					<Button toggle={success} onClick={_clear}>Share Another memory</Button>
				</Fragment>: null}
				{error.hasError ? <Fragment>
					<ErrorMessage>
						{error.msg}
					</ErrorMessage>
					<Button toggle={error.hasError} onClick={_clear}>Give another try</Button>
				</Fragment>: null}
			</WarningWrapper> : <Fragment>{
			type!== "memory" ? 
			<TextArea value={content} onChange={(e)=>{ setContent(e.target.value)}} rows={5} /> 
			:<UploadFile image={file} cb={_handleChange} />
			}
			<InputWrapper>
				<Checkbox checked={isPrivate} onChange={_handleCheckbox} type="checkbox" /> 
				<Label>Private</Label>
			</InputWrapper>
			
			{toggle ? <ButtonWrapper>
				<Button onClick={_handleSubmit} toggle={toggle}>Submit</Button>
				<Button onClick={_clear} toggle={toggle}>Cancel</Button>
			</ButtonWrapper> : null }</Fragment>}
		</PostContainer>: <Action>
			 <Button onClick={()=> _typeHandler("post")} toggle={toggle}>Add Your Thought</Button>
			 <Button onClick={()=> _typeHandler("memory")} toggle={toggle}>Add Your Memory</Button>
			</Action>}
	</Container>
  )
}

const Container = styled.div<ToggleProps>`
	position: absolute;
	right: ${props => props.toggle ? "80px": "50px"};
	bottom: ${props => props.toggle ? "80px": "50px"};
	opacity: ${props => props.toggle ? 1: 0};
	min-width: 100px;
	width: ${props => props.toggle ? "500px": "0px"};
	min-height: ${props => props.toggle ? "200px": "0px"};
	max-height: 400px;
	background-color: #ffffffa3;
	border-radius: 10px;
	transform-origin: bottom right;
	transition: all 0.4s linear;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;
	flex-wrap: wrap;
	@media (max-width: 500px){
		width: 100%;
		right: 0;
	}
`;

const Action = styled.div`
	width: 100%;
	min-height: inherit;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	gap: 20px;
	@media (max-width: 500px){
		flex-direction: column;
	}
`

const Button = styled.button<ToggleProps>`
	border: none;
	height: 48px;
	padding: 10px;
	background-color: #4834d4;
	color: #fff;
	font-weight: 600;
	transition-delay: 200s;
	opacity: ${props => props.toggle ? 1: 0};
	font-size: 20px;
	border-radius: 4px;
	transition: all 0.1s linear;
	&:hover{
		box-shadow: 5px 5px 20px #4834d4;
	}
	cursor: pointer;
	display: ${props=> props.toggle ? "block": "none"}
`


const PostContainer = styled.div`
	width: 100%;
	min-height: inherit;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const WarningWrapper = styled.div`
	width: 100%;
	height: 100%;
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 20px; 
`

const Checkbox = styled.input`

`;

const Label = styled.label`
	color: #212121;
`

const InputWrapper = styled.div`
	width: 100%;
	display: flex;
	gap: 10px;
`

const TextArea = styled.textarea`
	width: 100%;
	border: none;
	border-radius: 10px;
	resize: none;
	flex: 1;
	padding: 20px;
	background-color: #636e722e;
	color: #212121;
	font-weight: 500;
`

const ButtonWrapper = styled.div`
	width: 100%;
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
`

const SuccessMessage = styled.h3`
	color: #009432;
`;

const ErrorMessage = styled.h3`
	color: #ED4C67;
`

export default AddPost
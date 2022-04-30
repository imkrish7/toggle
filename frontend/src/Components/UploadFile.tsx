import { useRef } from 'react'
import styled from 'styled-components'

type Props = {
	image: File | null,
	cb: (file: File)=> void
}
const UploadFile = ({image, cb}:Props) => {
	const input = useRef<HTMLInputElement>(null)
	const _handleChange = (e: any)=>{
		cb(e.target.files[0])
	}

	const _handleBackgroundClick = ()=>{
		if(input.current){
			input.current.click()
		}
	}

	const _dragOver = (ev: any)=>{
		ev.preventDefault();
	}

	const _drop = (ev: any)=>{
		ev.preventDefault();
		cb(ev.dataTransfer.files[0])
	}																										
  if(image){
	return <ImageWrapper>
		<Image src={URL.createObjectURL(image)}/>
	</ImageWrapper>
  }

  return (
	<Container onDragOver={_dragOver} onDrop={_drop} onClick={_handleBackgroundClick}>
		<Input onChange={_handleChange} ref={input} type="file" />
		<IconWrapper>
			<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M144 480C64.47 480 0 415.5 0 336C0 273.2 40.17 219.8 96.2 200.1C96.07 197.4 96 194.7 96 192C96 103.6 167.6 32 256 32C315.3 32 367 64.25 394.7 112.2C409.9 101.1 428.3 96 448 96C501 96 544 138.1 544 192C544 204.2 541.7 215.8 537.6 226.6C596 238.4 640 290.1 640 352C640 422.7 582.7 480 512 480H144zM223 263C213.7 272.4 213.7 287.6 223 296.1C232.4 306.3 247.6 306.3 256.1 296.1L296 257.9V392C296 405.3 306.7 416 320 416C333.3 416 344 405.3 344 392V257.9L383 296.1C392.4 306.3 407.6 306.3 416.1 296.1C426.3 287.6 426.3 272.4 416.1 263L336.1 183C327.6 173.7 312.4 173.7 303 183L223 263z"/></SVG>
			<Label>
			Upload your memory or Drag and drop
		</Label>
		</IconWrapper>
	</Container>
  )
}

const Container = styled.div`
	flex: 1;
	width: 100%;
	border: 1px dashed #ccc;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-content: center;
	position: relative;
	cusror: pointer;
`
const Input = styled.input`
	opacity: 0;
	position: absolute;
	flex: 1;
	z-index: 1;
`;


const ImageWrapper = styled.div`
	width: 100%;
	height: 250px;
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
`;


const IconWrapper = styled.div`
	position: absolute;
	flex: 1;
	z-index: 1;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
`;

const Label = styled.label`
	color: #212121;
	font-weight: 500;
`

const SVG = styled.svg`
	width: 50px;
	height: 50px;
`
export default UploadFile
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getOTP } from '../actions/usersAction'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store';
import { StateType } from "../interfacesAndTypes/TState"
import { useAuth } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';


export const Login = () => {
	const {enqueueSnackbar, closeSnackbar } = useSnackbar();
	const auth = useAuth();
	const [otpSent, setOtpSent] = useState<boolean>(false)
	const [phoneNumber, setPhoneNumber] = useState("");
	const [otp, setOtp] = useState("");
	const response: StateType  = useSelector((state: RootState)=> state.loggedin);
	const dispatch = useDispatch();

	const _validate = (isOtp: boolean)=>{
		if(!isOtp){
			return (/[0-9]{12}/).test(phoneNumber);
		}else{
			return (/[0-9]{6}/).test(otp);
		}
	}

	const _getOTP = ()=>{
		
		if(phoneNumber.length>0 && phoneNumber.length===12 && _validate(false) ){
			dispatch<any>(getOTP({phoneNumber: `+${phoneNumber}`}));
		}else{
			enqueueSnackbar("Phone number is not valid", {
				variant: "error",
				action: <CloseButton onClick={()=>closeSnackbar()}>Dismiss</CloseButton>
			})
		}
	}

	const _verifyOTP = ()=>{
		if(phoneNumber.length>0 && phoneNumber.length===12 && otp.length === 6 && _validate(true)){
			const params = {
				phoneNumber: `+${phoneNumber}`,
				otp
			}

			auth.signin(params, ()=>{
				console.log("Login")
			});
		}else{
			enqueueSnackbar("OTP is not valid", {
				variant: "error",
				action: <CloseButton onClick={()=>closeSnackbar()}>Dismiss</CloseButton>
			})
		}
	}

	useEffect(()=>{
		if(response.success){
			setOtpSent(true);
		}
		if(response.error){
			enqueueSnackbar(response.error.message, {
				variant: "error",
				action: <CloseButton onClick={()=>closeSnackbar()}>Dismiss</CloseButton>
			})
		}
		
	},[response, enqueueSnackbar, closeSnackbar])
  return (
	<Container>
		{auth.loggedin && <Navigate to="/dashboard" replace={true}/>}
		{otpSent ? <Section>
			<Header>Verify OTP</Header>
			<InputWrapper>
				<SubLabel>Enter your otp</SubLabel>
				<Input type="text" value={otp} name="otp" onChange={(e)=>{
					setOtp(e.target.value)
				}} placeholder="212121" />
			</InputWrapper>
			<ButtonWrapper>
			<Button onClick={_verifyOTP}>Submit</Button>
			<Button onClick={_getOTP}>Resend OTP</Button>
			</ButtonWrapper>
		</Section> :<Section>
			<Header>Login</Header>
			<InputWrapper>
				<SubLabel>Please enter phone number with country code</SubLabel>
				<Input type="tel" pattern="[0-9]{2}[0-9]{10}" name="phoneNumber" onChange={(e)=>{
					setPhoneNumber(e.target.value)
				}} placeholder='(21)2121212121' />
			</InputWrapper>
			<Button onClick={_getOTP}>Get OTP</Button>
		</Section>}
	</Container>
  )
}


const Container = styled.div`
	flex: 50%;
	width: 100%;
	/* min-height: inherit; */
	display: flex;
	justify-content: center;
	align-items: center;

`

const Section = styled.section`
	width: 450px;
	height: 300px;
	background-color: #ffffffa1;
	border-radius: 10px;
	backdrop-filter: blur(10px);
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: center;
	justify-content: center;
`;

const Header = styled.h1`
	font-size: 40px;
	color: #636e72;
	width: 100%;
	text-align: center;
`;


const Input = styled.input`
	width: 100%;
	border: none;
	height: 48px;
	border-radius: 4px;
	background-color: #fff;
	padding: 0px 10px;
	box-shadow: 1px 1px 10px #ff868a;
`

const ButtonWrapper = styled.div`
	display: flex;
	gap: 10px;
`;

const Button = styled.button`
	border: none;
	padding: 10px;
	background-color: #4834d4;
	color: #fff;
	font-weight: 600;
	font-size: 20px;
	border-radius: 4px;
	transition: all 0.1s linear;
	&:hover{
		box-shadow: 5px 5px 20px #4834d4;
	}
	cursor: pointer;
`;

const SubLabel = styled.label`
	font-size: 16px;
	color: #636e72;
`

const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	font-weight: 500;
`;

const CloseButton = styled.button`
	border: 1px solid #fff;
	border-radius: 4px;
	padding: 10px 20px;
	background: transparent;
	color: #fff;
	font-weight: 500;
`

// color = #4834d4
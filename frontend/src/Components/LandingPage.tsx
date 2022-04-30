import styled from 'styled-components'
import { Login } from './Login'

const LandingPage = () => {
  return (
	<Container>
		<HeroContainer>
			<Header>
				Share your thought and memory with your loved ones
			</Header>
		</HeroContainer>
		<Login />
	</Container>
  )
}


const Container = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
`;

const HeroContainer = styled.div`
	flex: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0px 30px;
`

const Header = styled.h1`
	color: #b2bec3;
`

export default LandingPage
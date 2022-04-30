import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from './Components/Layout/DashboardLayout';
import Dashboard from './Components/Dashboard';
import RequiredAuth from './Components/RequiredAuth';
import { AuthProvider } from './Context/AuthProvider';
import LandingPage from './Components/LandingPage';
function App() {
  return (
    <AuthProvider>
    <Container>
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<RequiredAuth><Dashboard /></RequiredAuth>} />
        </Route>
        
      </Routes>
    </BrowserRouter>
    </Container>
    </AuthProvider>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: inherit;
  background: #ffffff4a;
  backdrop-filter: blur(10px);

`

export default App;

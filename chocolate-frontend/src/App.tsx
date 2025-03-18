import LandingPage from "./components/pages/LandingPage"
import { Route, Routes } from "react-router-dom";
import ReviewPage from "./components/pages/ReviewPage";
import Header from "./components/Header";
import CreatePage from "./components/pages/CreatePage";
import RegisterPage from "./components/pages/RegisterPage";
import useAuthentication from "./hooks/useAuthentication";
import LoginPage from "./components/pages/LoginPage";
import { Navigate } from "react-router-dom";

function App() {

  const { appUser } = useAuthentication();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/review" element={appUser ? <ReviewPage /> : <Navigate to="/login" />} />
        <Route path="/create" element={appUser ? <CreatePage /> : <Navigate to="/login" />} />
        <Route path="/register" element={appUser ? <LandingPage /> : <RegisterPage />} />
        <Route path="/login" element={appUser ? <LandingPage /> : <LoginPage />} />
      </Routes>
    </>
  )
}

export default App

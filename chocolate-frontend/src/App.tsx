import LandingPage from "./components/pages/LandingPage"
import { Route, Routes } from "react-router-dom";
import ReviewPage from "./components/pages/ReviewPage";
import Header from "./components/Header";
import CreatePage from "./components/pages/CreatePage";
import RegisterPage from "./components/pages/RegisterPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  )
}

export default App

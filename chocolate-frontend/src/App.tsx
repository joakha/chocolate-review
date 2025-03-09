import LandingPage from "./components/pages/LandingPage"
import { Route, Routes } from "react-router-dom";
import { ReviewPage } from "./components/pages/ReviewPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
    </>
  )
}

export default App

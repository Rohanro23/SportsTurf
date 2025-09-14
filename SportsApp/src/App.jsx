import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./LandingPage";
import { AuthContainer } from "./AuthContainer";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthContainer />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;

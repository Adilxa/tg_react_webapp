import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { useTelegramHook } from "./hooks/useTelegramHook";
import { Route, Routes } from "react-router-dom";
import FormPage from "./pages/register/FormPage";
import ComplainPage from "./pages/complain";
import HelpPage from "./pages/help";
import AboutPage from "./pages/about";
import ChangePass from "./pages/changePass";

function App() {
  const { tg } = useTelegramHook();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<FormPage />} />
      <Route path="/changePass" element={<ChangePass />} />
      <Route path="/complain" element={<ComplainPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { useTelegramHook } from "./hooks/useTelegramHook";
import { Route, Routes } from "react-router-dom";
import FormPage from "./pages/register/FormPage";
import ComplainPage from "./pages/complain";
import HelpPage from "./pages/help";
import AboutPage from "./pages/about";
import ChangePass from "./pages/changePass";

function App() {
  const { tg } = useTelegramHook();

  const [lang, setLang] = useState("en");

  const [inn, setInn] = useState("");

  useEffect(() => {
    tg.ready();
    const url = window.location.href;

    const urlObj = new URL(url);

    const langParam = urlObj.searchParams.get("lang");

    setLang(langParam || "en");
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<FormPage lang={lang} inn={inn} setInn={setInn} />}
      />
      <Route
        path="/changePass"
        element={<ChangePass lang={lang} inn={inn} />}
      />
      <Route path="/complain" element={<ComplainPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

export default App;

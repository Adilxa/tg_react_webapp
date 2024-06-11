import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { useTelegramHook } from "./hooks/useTelegramHook";
import { Route, Routes } from "react-router-dom";
import FormPage from "./pages/register/FormPage";
import Set_auth from "./pages/set_auth/FormPage";
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
      <Route
        path="/set_auth"
        element={<Set_auth lang={lang} inn={inn} setInn={setInn} />}
      />
    </Routes>
  );
}

export default App;

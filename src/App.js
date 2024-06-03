import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => {
    tg.close();
  };

  console.log(tg);

  return (
    <form>
      <h1>{tg.initData}</h1>
      <input type="text" />
      <div className="App">
        <button onClick={onClose}>Close </button>
      </div>
    </form>
  );
}

export default App;

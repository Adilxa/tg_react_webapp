import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [appData, setAppData] = useState(null);
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    const fetchAppData = async () => {
      if (window.Telegram && window.Telegram.WebApp) {
        const app = window.Telegram.WebApp;
        app.ready(); // Make sure the app is ready before accessing initDataUnsafe
        setAppData(app.initDataUnsafe);

        // Extract chat_id from initData
        const params = new URLSearchParams(app.initData);
        const chatId = params.get("chat_id");
        setChatId(chatId);
      }
    };
    fetchAppData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>{appData?.user?.first_name}</div>
        <div>
          <h1>{chatId} da</h1>
        </div>
      </header>
    </div>
  );
}

export default App;

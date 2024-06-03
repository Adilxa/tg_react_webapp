import React, { useState } from 'react';
import { useTelegramHook } from '../../hooks/useTelegramHook';
import './FormPage.css';
import axios from 'axios';

function FormPage() {
    const { user, tg, onClose, chatId } = useTelegramHook();

    const [inn, setInn] = useState("");

    const [password, setPassword] = useState("")

    const onSendRequest = async () => {
        await axios.post("", {

        })
    }

    console.log(user);

    return (
        <div className="container">
            {chatId}

            <div className="card">
                <h2>Enter Inn & Password</h2>
                <form>
                    <input onChange={(e) => setInn(e.target.value)} value={inn} type="text" placeholder="Inn" />
                    <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default FormPage;

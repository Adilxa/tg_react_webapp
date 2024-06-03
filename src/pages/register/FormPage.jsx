import React, { useState } from 'react';
import { useTelegramHook } from '../../hooks/useTelegramHook';
import './FormPage.css';

function FormPage() {
    const { user, tg, onClose } = useTelegramHook();

    const [inn, setInn] = useState("");

    const [password, setPassword] = useState("")

    return (
        <div className="container">
            {user?.username}

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

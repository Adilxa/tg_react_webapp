import React, { useEffect, useState } from 'react';
import { useTelegramHook } from '../../hooks/useTelegramHook';
import './FormPage.css';
import axios from 'axios';
import $api from '../../Api/http';
import Popup from '../../components/PopUp/index';

function FormPage() {
    const { user, tg, onClose, chatId } = useTelegramHook();
    const [inn, setInn] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [isChatExist, setChatExist] = useState(false)

    const onSendRequest = async (e) => {
        e.preventDefault();
        try {
            const res = await $api.post("registration", {
                INN: inn,
                password: password,
                chatId: user.id
            });
            // Handle successful request

            if (res.status === 200) {
                onClose()
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setErrorMessage("Unauthorized: Incorrect INN or password.");
                } else if (error.response.status === 404) {
                    setErrorMessage("Not Found: The requested resource was not found.");
                } else {
                    setErrorMessage("An error occurred. Please try again.");
                }
            } else {
                setErrorMessage("An error occurred. Please try again.");
            }
        }
    };

    const closePopup = () => {
        setErrorMessage(null);
    };


    const ifChatExist = async () => {
        try {
            const res = await $api.get("registration", {
                chatId: user.id
            })
            if (res.status === 200) {
                setChatExist(true)
            }
        } catch (e) {
            if (e.response.status === 404) {
                setChatExist(false)
            }
        }

    }

    useEffect(() => {
        ifChatExist()
    }, [])

    if (!isChatExist)
        return (
            <div className="container">
                <div className="card">
                    <h2>Enter Inn & Password</h2>
                    <form onSubmit={onSendRequest}>
                        <input onChange={(e) => setInn(e.target.value)} value={inn} type="text" placeholder="Inn" />
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                {errorMessage && <Popup message={errorMessage} onClose={closePopup} />}
            </div>
        )
    else {
        return (
            <section>
                <h1>You are autherized!</h1>
                <button onClick={onClose}>go to telegram</button>
            </section>
        )
    }
}

export default FormPage;

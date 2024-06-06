import React, { useEffect, useState } from 'react';
import "./ChangePass.css";
import Popup from '../../components/PopUp';
import { useTelegramHook } from '../../hooks/useTelegramHook';

function ChangePass() {
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const { user, tg, onClose } = useTelegramHook();

    const onSendRequest = async (e) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.');
            return;
        }

        try {
            const res = { status: 200 };

            if (res.status === 200) {

            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setErrorMessage('Unauthorized: Incorrect INN or password.');
                } else if (error.response.status === 404) {
                    setErrorMessage('Not Found: The requested resource was not found.');
                } else {
                    setErrorMessage('An error occurred. Please try again.');
                }
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    const closePopup = () => {
        setErrorMessage(null);
    };

    useEffect(() => {
        tg.MainButton.setParams({
            text: "Back to Telegram",
            onClick: () => onClose()
        });
    }, []);

    console.log(tg);

    return (
        <div className='container'>
            <div className='card'>
                <h2>Enter Password & Confirm Password</h2>
                <form onSubmit={onSendRequest}>
                    <input
                        type='password'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        value={repeatPassword}
                    />
                    <button type='submit'>Submit</button>
                </form>
            </div>
            {errorMessage && <Popup message={errorMessage} onClose={closePopup} />}
        </div>
    );
}

export default ChangePass;

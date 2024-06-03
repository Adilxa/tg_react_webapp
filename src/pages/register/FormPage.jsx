import React from 'react';
import { useTelegramHook } from '../hooks/useTelegramHook';
import './FormPage.css';

function FormPage() {
    const { user, username, userId, firstName, lastName, languageCode, chatId, onClose, onToggleMainButton, setHeaderColor, setMainButton } = useTelegramHook();

    return (
        <div className="container">
            <div className="card">
                <h2>Telegram User Info</h2>
                <p>Username: {username}</p>
                <p>User ID: {userId}</p>
                <p>First Name: {firstName}</p>
                <p>Last Name: {lastName}</p>
                <p>Language Code: {languageCode}</p>
                <p>Chat ID: {chatId}</p>
                <button onClick={onClose}>Close</button>
                <button onClick={onToggleMainButton}>Toggle Main Button</button>
                <button onClick={() => setHeaderColor('#0000FF')}>Set Header Color</button>
                <button onClick={() => setMainButton('Click Me', true)}>Set Main Button</button>
            </div>
            <div className="card">
                <h2>Enter Username</h2>
                <form>
                    <input type="text" placeholder="Username" />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="card">
                <h2>Enter Email</h2>
                <form>
                    <input type="email" placeholder="Email" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default FormPage;

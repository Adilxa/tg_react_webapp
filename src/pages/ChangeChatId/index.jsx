import React, { useState } from 'react';
import "./ChangeChatId.css";
import Popup from '../../components/PopUp';
import { useTelegramHook } from '../../hooks/useTelegramHook';
import $api from '../../Api/http';

function ChangeChatId({ lang }) {
    const [inn, setInn] = useState('');
    const [chatId, setChatId] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [isReqDone, setReqDone] = useState(false);
    const [responseCode, setResponseCode] = useState(null);
    const [responseExpiry, setResponseExpiry] = useState(null);

    const { user, onClose } = useTelegramHook();

    const tgtoken = "7199195085:AAGX3FedvGavLPKAKee5fLJly0lKZOIO3W0"

    const translations = {
        en: {
            enterINN: 'Enter INN',
            enterChatID: 'Enter previous Chat ID',
            submit: 'Submit',
            goBack: 'Go Back',
            unauthorized: 'Unauthorized: Incorrect INN or password.',
            notFound: 'Not Found: The requested resource was not found.',
            errorOccurred: 'An error occurred. Please try again.'
        },
        ru: {
            enterINN: 'Введите ИНН',
            enterChatID: 'Введите предыдущий ID чата',
            submit: 'Отправить',
            goBack: 'Назад',
            unauthorized: 'Несанкционированный: Неверный ИНН или пароль.',
            notFound: 'Не найдено: запрашиваемый ресурс не найден.',
            errorOccurred: 'Произошла ошибка. Пожалуйста, попробуйте снова.'
        },
        ky: {
            enterINN: 'ИНН киргизиңиз',
            enterChatID: 'Мурунку чат ID киргизиңиз',
            submit: 'Жөнөтүү',
            goBack: 'Артка кайтуу',
            unauthorized: 'Рүқсатсыз: Дүзгүн ИНН же сырсөз.',
            notFound: 'Табылган жок: Суроо берилген ресурс табылган жок.',
            errorOccurred: 'Ката кетти. Кийинки тазартыңыз.'
        }
    };

    const onCloseClick = async (code, chatId) => {
        try {
            await $api.post(`https://api.telegram.org/bot${tgtoken}/sendMessage`, {
                chat_id: user.id,
                text: `OTP: ${code}\nTelegram ID: ${chatId}`
            });
        } catch (error) {
            console.error('Error sending message to Telegram:', error);
        } finally {
            onClose();
        }
    };

    const onSendRequest = async (e) => {
        e.preventDefault();

        if (!inn || !chatId) {
            setErrorMessage(translations[lang].errorOccurred); // More specific message could be added
            return;
        }

        try {
            const res = await $api.put("update_chat_id", {
                INN: inn,
                chatId: chatId,
                new_chat_id: user.id
            });

            if (res.status === 200) {
                setReqDone(true);
                setResponseCode(res.data.code);
                setResponseExpiry(new Date(res.data.expiryDate).toLocaleString());
            } else if (res.status === 300) {
                setErrorMessage(translations[lang].unauthorized);
            }

        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setErrorMessage(translations[lang].unauthorized);
                } else if (error.response.status === 404) {
                    setErrorMessage(translations[lang].notFound);
                } else {
                    setErrorMessage(translations[lang].errorOccurred);
                }
            } else {
                setErrorMessage(translations[lang].errorOccurred);
            }
        }
    };

    const closePopup = () => {
        setErrorMessage(null);
    };

    return (
        <div className='container'>
            {!isReqDone ? (
                <div className='card'>
                    <h2>{translations[lang].enterINN} & {translations[lang].enterChatID}</h2>
                    <form onSubmit={onSendRequest}>
                        <input
                            type='text'
                            placeholder={translations[lang].enterINN}
                            onChange={(e) => setInn(e.target.value)}
                            value={inn}
                        />
                        <input
                            type='text'
                            placeholder={translations[lang].enterChatID}
                            onChange={(e) => setChatId(e.target.value)}
                            value={chatId}
                        />
                        <button type='submit'>{translations[lang].submit}</button>
                    </form>
                </div>
            ) : (
                <div className='card'>
                    <h1>{translations[lang].authorized}</h1>
                    {responseCode && <p>Code: {responseCode}</p>}
                    {responseExpiry && <p>Expires at: {responseExpiry}</p>}
                    <br />
                    <button onClick={() => onCloseClick(responseCode, user.id)}>{translations[lang].goBack}</button>
                </div>
            )}
            {errorMessage && <Popup message={errorMessage} onClose={closePopup} />}
        </div>
    );
}

export default ChangeChatId;

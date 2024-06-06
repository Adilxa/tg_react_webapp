import React, { useEffect, useState } from 'react';
import "./ChangePass.css";
import Popup from '../../components/PopUp';
import { useTelegramHook } from '../../hooks/useTelegramHook';
import $api from '../../Api/http';

function ChangePass({ lang, inn }) {
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const { user, tg, onClose } = useTelegramHook();

    // Language objects
    const translations = {
        en: {
            enterPassword: 'Enter Password',
            confirmPassword: 'Confirm Password',
            submit: 'Submit',
            passwordsMatch: 'Passwords do not match.',
            passwordLength: 'Password must be at least 6 characters long.',
            unauthorized: 'Unauthorized: Incorrect INN or password.',
            notFound: 'Not Found: The requested resource was not found.',
            errorOccurred: 'An error occurred. Please try again.'
        },
        ru: {
            enterPassword: 'Введите пароль',
            confirmPassword: 'Подтвердите пароль',
            submit: 'Отправить',
            passwordsMatch: 'Пароли не совпадают.',
            passwordLength: 'Пароль должен содержать не менее 6 символов.',
            unauthorized: 'Несанкционированный: Неверный ИНН или пароль.',
            notFound: 'Не найдено: запрашиваемый ресурс не найден.',
            errorOccurred: 'Произошла ошибка. Пожалуйста, попробуйте снова.'
        },
        ky: {
            enterPassword: 'Сырсөздү киргизиңиз',
            confirmPassword: 'Сырсөздү бекитиңиз',
            submit: 'Жөнөтүү',
            passwordsMatch: 'Сырсөздөрдү теңдейт.',
            passwordLength: 'Сырсөз узундугу 6 белгиден аз болбош керек.',
            unauthorized: 'Рүқсатсыз: Дүзгүн ИНН же сырсөз.',
            notFound: 'Табылган жок: Суроо берилген ресурс табылган жок.',
            errorOccurred: 'Ката кетти. Кийинки тазартыңыз.'
        }
    };

    const onSendRequest = async (e) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            setErrorMessage(translations[lang].passwordsMatch);
            return;
        }

        if (password.length < 6) {
            setErrorMessage(translations[lang].passwordLength);
            return;
        }

        try {
            const res = await $api.put("registration", {
                password: password,
                repeatPassword: repeatPassword,
                INN: inn
            })

            console.log(res , "----------")

            if (res.status === 200) {
                await $api.post(`https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`, {
                    chat_id: user.id,
                    text: '✅'
                  }).finally(() => {
                    onClose()
                  })                 
            } else {
                setErrorMessage("404")
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
            <div className='card'>
                <h2>{translations[lang].enterPassword} & {translations[lang].confirmPassword}</h2>
                <form onSubmit={onSendRequest}>
                    <input
                        type='password'
                        placeholder={translations[lang].enterPassword}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <input
                        type='password'
                        placeholder={translations[lang].confirmPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        value={repeatPassword}
                    />
                    <button type='submit'>{translations[lang].submit}</button>
                </form>
            </div>
            {errorMessage && <Popup message={errorMessage} onClose={closePopup} />}
        </div>
    );
}

export default ChangePass;

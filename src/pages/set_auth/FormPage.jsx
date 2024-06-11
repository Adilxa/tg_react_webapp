import React, { useState } from 'react';
import { useTelegramHook } from '../../hooks/useTelegramHook';
import './FormPage.css';
import $api from '../../Api/http';
import Popup from '../../components/PopUp';

function Set_auth({ lang, inn, setInn }) {
  const tgtoken = "7199195085:AAGX3FedvGavLPKAKee5fLJly0lKZOIO3W0"

  const { user, tg, onClose, chatId } = useTelegramHook();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isReqDone, setReqDone] = useState(false);
  const [responseCode, setResponseCode] = useState(null);
  const [responseExpiry, setResponseExpiry] = useState(null);

  // Translations object
  const translations = {
    en: {
      enterINN: 'Enter INN',
      enterPassword: 'Enter Password',
      submit: 'Submit',
      authorized: 'You are authorized!',
      goBack: 'Go Back',
      unauthorized: 'Unauthorized: Incorrect INN or password.',
      notFound: 'Not Found: The requested resource was not found.',
      errorOccurred: 'An error occurred. Please try again.'
    },
    ru: {
      enterINN: 'Введите ИНН',
      enterPassword: 'Введите пароль',
      submit: 'Отправить',
      authorized: 'Вы авторизованы!',
      goBack: 'Назад',
      unauthorized: 'Несанкционированный: Неверный ИНН или пароль.',
      notFound: 'Не найдено: запрашиваемый ресурс не найден.',
      errorOccurred: 'Произошла ошибка. Пожалуйста, попробуйте снова.'
    },
    ky: {
      enterINN: 'ИННди киргизиңиз',
      enterPassword: 'Сырсөздү киргизиңиз',
      submit: 'Жөнөтүү',
      authorized: 'Сизге рүқсат берилген!',
      goBack: 'Артка',
      unauthorized: 'Рүқсатсыз: Дүзгүн ИНН же сырсөз.',
      notFound: 'Табылган жок: Суроо берилген ресурс табылган жок.',
      errorOccurred: 'Ката кетти. Кийинки тазартыңыз.'
    }
  };

  async function OnCloseClick(code, chatId) {
    try{
      await $api.post(`https://api.telegram.org/bot${tgtoken}/sendMessage`, {
        chat_id: user.id,
        text: `${code}, ${chatId}`
      }).finally(() => {
        onClose()
      })                 
    } 
    catch(error){
      onClose();
    }
}

  // Handle form submission
  const onSendRequest = async (e) => {
    e.preventDefault();
    try {
      const res = await $api.post('set_auth', {
        INN: inn,
        chatId: user.id,
      });

      if (res.status === 200) {
        setReqDone(true);
        setResponseCode(res.data.code);
        setResponseExpiry(new Date(res.data.expiryDate).toLocaleString());
				
      } else if (res.status === 300) {
        setErrorMessage(translations[lang].authorized);
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
          <h2>{translations[lang].enterINN}</h2>
          <form onSubmit={onSendRequest}>
            <input
              onChange={(e) => setInn(e.target.value)}
              value={inn}
              type='text'
              required
              placeholder={translations[lang].enterINN}
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
          <button onClick={()=>(OnCloseClick(responseCode, user.id))}>{translations[lang].goBack}</button>
        </div>
      )}
      {errorMessage && <Popup message={errorMessage} onClose={closePopup} />}
    </div>
  );
}

export default Set_auth;

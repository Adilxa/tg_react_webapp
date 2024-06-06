import React, { useEffect, useState } from 'react';
import { useTelegramHook } from '../../hooks/useTelegramHook';
import './FormPage.css';
import $api from '../../Api/http';
import Popup from '../../components/PopUp';
import { useNavigate } from 'react-router-dom';

function FormPage({ lang, inn, setInn }) {
	const { user, tg, onClose, chatId } = useTelegramHook();
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);
	const [isChatExist, setChatExist] = useState(false);

	const navigate = useNavigate();

	// Language objects
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

	const onSendRequest = async (e) => {
		e.preventDefault();

		// Removed useState call from here

		// Validation for minimum password length


		try {
			const res = await $api.post('registration', {
				INN: inn,
				password: password,
				chatId: user.id,
				lang
			});

			if (res.status === 200) {
				navigate("/changePass");
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

	const ifChatExist = async () => {
		try {
			const res = await $api.get('/registration', {
				params: {
					chatId: user.id,
				},
			});
			if (res.status === 200) {
				setChatExist(true);
			} else {
				setChatExist(false);
			}
		} catch (error) {
			if (error.response?.status === 404) {
				setChatExist(false);
			} else {
				console.error('Error checking chat existence:', error);
			}
		}
	};

	useEffect(() => {
		ifChatExist();
	}, []);

	return (
		<div className='container'>
			{/* Language: {lang} */}

			{!isChatExist ? (
				<div className='card'>
					<h2>{translations[lang].enterINN} & {translations[lang].enterPassword}</h2>
					<form onSubmit={onSendRequest}>
						<input
							onChange={(e) => setInn(e.target.value)}
							value={inn}
							type='text'
							required
							placeholder={translations[lang].enterINN}
						/>
						<input
							type='password'
							required
							placeholder={translations[lang].enterPassword}
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
						<button type='submit'>{translations[lang].submit}</button>
					</form>
				</div>
			) : (
				<div className='card'>
					<h1>{translations[lang].authorized}</h1>
					<button onClick={onClose}>{translations[lang].goBack}</button>
				</div>
			)}
			{errorMessage && <Popup message={errorMessage} onClose={closePopup} />}
		</div>
	);
}

export default FormPage;

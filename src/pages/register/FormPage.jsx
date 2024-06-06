import React, { useEffect, useState } from 'react';
import { useTelegramHook } from '../../hooks/useTelegramHook';
import './FormPage.css';
import $api from '../../Api/http';
import Popup from '../../components/PopUp';
import { useNavigate } from 'react-router-dom';

function FormPage() {
	const { user, tg, onClose, chatId } = useTelegramHook();
	const [inn, setInn] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);
	const [isChatExist, setChatExist] = useState(false);
	const [lang, setLang] = useState(null); // Define lang state variable

	const navigate = useNavigate();

	const onSendRequest = async (e) => {
		e.preventDefault();

		// Removed useState call from here

		// Validation for minimum password length
		try {
			const res = { status: 200 };
			// const res = await $api.post('registration', {
			//     INN: inn,
			//     password: password,
			//     chatId: user.id,
			// });

			if (res.status === 200) {
				navigate("/changePass");
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

		const url = window.location.href;

		// Create a new URL object
		const urlObj = new URL(url);

		// Use URLSearchParams to get the lang parameter
		const langParam = urlObj.searchParams.get('lang');

		// Set the state
		setLang(langParam);

	}, []);

	return (
		<div className='container'>
			Language: {lang}

			{!isChatExist ? (
				<div className='card'>
					<h2>Enter INN & Password</h2>
					<form onSubmit={onSendRequest}>
						<input
							onChange={(e) => setInn(e.target.value)}
							value={inn}
							type='text'
							placeholder='INN'
						/>
						<input
							type='password'
							placeholder='Password'
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
						<button type='submit'>Submit</button>
					</form>
				</div>
			) : (
				<div className='card'>
					<h1>You are authorized!</h1>
					<button onClick={onClose}>Go Back</button>
				</div>
			)}
			{errorMessage && <Popup message={errorMessage} onClose={closePopup} />}
		</div>
	);
}

export default FormPage;

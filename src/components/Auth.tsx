"use client";

import { useState, useEffect } from "react";
import { authenticateUser, setCurrentUser, getUsers } from "@/lib/user";
import Register from "./Register";
import { useLanguage } from "@/context/LanguageContext";

export default function Auth() {
	const { language } = useLanguage();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [invalidFields, setInvalidFields] = useState({
		username: false,
		password: false,
	});
	const [showRegister, setShowRegister] = useState(false);

	useEffect(() => {
		if (invalidFields.username || invalidFields.password) {
			const timer = setTimeout(() => {
				setInvalidFields({
					username: false,
					password: false,
				});
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [invalidFields]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		const fieldsInvalid = {
			username: !username.trim(),
			password: !password.trim(),
		};

		setInvalidFields(fieldsInvalid);

		if (fieldsInvalid.username || fieldsInvalid.password) {
			return;
		}

		const user = authenticateUser(username, password);
		if (user) {
			setCurrentUser(user);
			window.location.reload();
		} else {
			const users = getUsers();
			const userExists = users.some((u) => u.username === username);

			if (userExists) {
				setError(language === "en" ? "Incorrect password" : "Неверный пароль");
			} else {
				setError(
					language === "en"
						? "User not found. Do you want to register?"
						: "Пользователь не найден. Хотите зарегистрироваться?"
				);
			}
		}
	};

	const handleSwitchToRegister = () => {
		setShowRegister(true);
	};

	if (showRegister) {
		return <Register onBack={() => setShowRegister(false)} />;
	}

	return (
		<div className="max-w-md mx-auto mt-30 p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-bold mb-4">
				{language === "en" ? "Sign in" : "Вход"}
			</h2>
			{error && (
				<div className="mb-4">
					<p className="text-red-500">{error}</p>
					{error.includes(
						language === "en" ? "register" : "зарегистрироваться"
					) && (
						<button
							onClick={handleSwitchToRegister}
							className="mt-2 text-black/60 hover:text-black transition-colors duration-200"
						>
							{language === "en" ? "Yes, register" : "Да, зарегистрироваться"}
						</button>
					)}
				</div>
			)}
			<form onSubmit={handleSubmit} noValidate>
				<div className="mb-4">
					<label className="block mb-2">
						{language === "en" ? "Username:" : "Логин:"}
					</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className={`w-full p-2 border rounded transition-colors duration-300 ${
							invalidFields.username
								? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,1)]"
								: "border-amber-200 focus:border-amber-400"
						}`}
					/>
				</div>
				<div className="mb-4">
					<label className="block mb-2">
						{language === "en" ? "Password:" : "Пароль:"}
					</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className={`w-full p-2 border rounded transition-colors duration-300 ${
							invalidFields.password
								? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,1)]"
								: "border-amber-200 focus:border-amber-400"
						}`}
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-amber-100 text-black/80 p-2 rounded hover:bg-amber-300 hover:text-black mb-4 transition-colors duration-250"
				>
					{language === "en" ? "Sign in" : "Войти"}
				</button>
				<div className="text-center">
					<button
						type="button"
						onClick={handleSwitchToRegister}
						className="text-black/60 hover:text-black transition-colors duration-200"
					>
						{language === "en"
							? "Don't have an account? Sign up"
							: "Нет аккаунта? Зарегистрироваться"}
					</button>
				</div>
			</form>
		</div>
	);
}

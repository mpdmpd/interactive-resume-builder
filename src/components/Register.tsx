"use client";

import { useState, useEffect } from "react";
import { setCurrentUser, registerUser, User } from "@/lib/user";
import { useLanguage } from "@/context/LanguageContext";

interface RegisterProps {
	onBack: () => void;
}

export default function Register({ onBack }: RegisterProps) {
	const { language } = useLanguage();
	const [userData, setUserData] = useState<
		Omit<User, "password"> & { password: string; confirmPassword: string }
	>({
		username: "",
		password: "",
		confirmPassword: "",
		firstName: "",
		lastName: "",
	});

	const [error, setError] = useState("");
	const [invalidFields, setInvalidFields] = useState({
		username: false,
		firstName: false,
		lastName: false,
		password: false,
		confirmPassword: false,
	});

	useEffect(() => {
		if (Object.values(invalidFields).some((field) => field)) {
			const timer = setTimeout(() => {
				setInvalidFields({
					username: false,
					firstName: false,
					lastName: false,
					password: false,
					confirmPassword: false,
				});
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [invalidFields]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		const fieldsInvalid = {
			username: !userData.username.trim(),
			firstName: !userData.firstName.trim(),
			lastName: !userData.lastName.trim(),
			password: !userData.password.trim(),
			confirmPassword: !userData.confirmPassword.trim(),
		};

		setInvalidFields(fieldsInvalid);

		if (Object.values(fieldsInvalid).some((field) => field)) {
			return;
		}

		if (userData.password !== userData.confirmPassword) {
			setError(
				language === "en" ? "Passwords do not match" : "Пароли не совпадают"
			);
			setInvalidFields((prev) => ({
				...prev,
				password: true,
				confirmPassword: true,
			}));
			return;
		}

		const newUser: User = {
			username: userData.username,
			password: userData.password,
			firstName: userData.firstName,
			lastName: userData.lastName,
		};

		if (registerUser(newUser)) {
			setCurrentUser(newUser);
			window.location.reload();
		} else {
			setError(
				language === "en"
					? "User with this username already exists"
					: "Пользователь с таким логином уже существует"
			);
			setInvalidFields((prev) => ({ ...prev, username: true }));
		}
	};

	const handleFieldChange = (field: keyof typeof userData, value: string) => {
		setUserData({ ...userData, [field]: value });
		if (invalidFields[field as keyof typeof invalidFields]) {
			setInvalidFields((prev) => ({ ...prev, [field]: false }));
		}
	};

	return (
		<div className="max-w-md mx-auto mt-30 p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-bold mb-4">
				{language === "en" ? "Sign up" : "Регистрация"}
			</h2>
			{error && <p className="text-red-500 mb-4">{error}</p>}
			<form onSubmit={handleSubmit} noValidate>
				<div className="mb-4">
					<label className="block mb-2">
						{language === "en" ? "Username:" : "Логин:"}
					</label>
					<input
						type="text"
						value={userData.username}
						onChange={(e) => handleFieldChange("username", e.target.value)}
						className={`w-full p-2 border rounded transition-colors duration-300 ${
							invalidFields.username
								? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,1)]"
								: "border-amber-200 focus:border-amber-400"
						}`}
					/>
				</div>
				<div className="mb-4">
					<label className="block mb-2">
						{language === "en" ? "First name:" : "Имя:"}
					</label>
					<input
						type="text"
						value={userData.firstName}
						onChange={(e) => handleFieldChange("firstName", e.target.value)}
						className={`w-full p-2 border rounded transition-colors duration-300 ${
							invalidFields.firstName
								? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,1)]"
								: "border-amber-200 focus:border-amber-400"
						}`}
					/>
				</div>
				<div className="mb-4">
					<label className="block mb-2">
						{language === "en" ? "Last name:" : "Фамилия:"}
					</label>
					<input
						type="text"
						value={userData.lastName}
						onChange={(e) => handleFieldChange("lastName", e.target.value)}
						className={`w-full p-2 border rounded transition-colors duration-300 ${
							invalidFields.lastName
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
						value={userData.password}
						onChange={(e) => handleFieldChange("password", e.target.value)}
						className={`w-full p-2 border rounded transition-colors duration-300 ${
							invalidFields.password
								? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,1)]"
								: "border-amber-200 focus:border-amber-400"
						}`}
					/>
				</div>
				<div className="mb-4">
					<label className="block mb-2">
						{language === "en" ? "Confirm password:" : "Подтвердите пароль:"}
					</label>
					<input
						type="password"
						value={userData.confirmPassword}
						onChange={(e) =>
							handleFieldChange("confirmPassword", e.target.value)
						}
						className={`w-full p-2 border rounded transition-colors duration-300 ${
							invalidFields.confirmPassword
								? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,1)]"
								: "border-amber-200 focus:border-amber-400"
						}`}
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-amber-100 text-black/80 p-2 rounded hover:bg-amber-300 hover:text-black mb-4 transition-colors duration-250"
				>
					{language === "en" ? "Register" : "Зарегистрироваться"}
				</button>
				<div className="text-center">
					<button
						type="button"
						onClick={onBack}
						className="text-black/60 hover:text-black transition-colors duration-200"
					>
						{language === "en" ? "Back to login" : "Назад к входу"}
					</button>
				</div>
			</form>
		</div>
	);
}

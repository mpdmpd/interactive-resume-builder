"use client";

import { getCurrentUser, logoutUser, User } from "@/lib/user";
import { useEffect, useState, useRef } from "react";
import Auth from "@/components/Auth";
import GenderChoice from "@/components/GenderChoice";
import { useLanguage } from "@/context/LanguageContext";

export default function ProfilePage() {
	const { language } = useLanguage();
	const [user, setUser] = useState<User | null>(null);
	const [formData, setFormData] = useState<Partial<User>>({});
	const dateInputRef = useRef<HTMLInputElement>(null);
	const [hasDateValue, setHasDateValue] = useState(false);

	useEffect(() => {
		const currentUser = getCurrentUser();
		setUser(currentUser);
		if (currentUser) {
			setFormData({
				firstName: currentUser.firstName,
				lastName: currentUser.lastName,
				username: currentUser.username,
				gender: currentUser.gender as "Man" | "Woman" | undefined,
				email: currentUser.email,
				phoneNumber: currentUser.phoneNumber,
				dateOfBirth: currentUser.dateOfBirth,
				country: currentUser.country,
			});
			setHasDateValue(!!currentUser.dateOfBirth);
		}
	}, []);

	const handleLogout = () => {
		logoutUser();
		setUser(null);
	};

	const handleSave = () => {
		if (!user) return;

		const updatedUser = { ...user, ...formData };

		window.localStorage.setItem("currentUser", JSON.stringify(updatedUser));

		const usersJson = window.localStorage.getItem("users");
		const users = usersJson ? JSON.parse(usersJson) : [];
		const updatedUsers = users.map((u: User) =>
			u.username === user.username ? updatedUser : u
		);
		window.localStorage.setItem("users", JSON.stringify(updatedUsers));

		setUser(updatedUser);
		alert(
			language === "en"
				? "Profile updated successfully!"
				: "Профиль успешно обновлен!"
		);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleGenderChange = (gender: "Man" | "Woman") => {
		setFormData((prev) => ({ ...prev, gender }));
	};

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setHasDateValue(value !== "");
		setFormData((prev) => ({ ...prev, dateOfBirth: value }));
	};

	if (!user) {
		return <Auth />;
	}

	return (
		<div className="container mt-10">
			<div className="flex justify-center">
				<span className="text-3xl font-medium text-shadow-md">
					{language === "en"
						? "Your Profile Information"
						: "Информация о профиле"}
				</span>
			</div>

			<div className="container justify-center mt-10">
				<div className="flex justify-center gap-2 items-center">
					<span className="text-shadow-md font-medium text-lg">
						{language === "en" ? "Surname" : "Фамилия"}
					</span>
					<input
						type="text"
						name="lastName"
						value={formData.lastName || ""}
						onChange={handleChange}
						className="border-2 px-3 rounded-md h-10 border-amber-200 focus:border-amber-400 transition-colors duration-300 focus:outline-none shadow-lg"
					/>
					<span className="text-shadow-md font-medium text-lg ml-4">
						{language === "en" ? "Name" : "Имя"}
					</span>
					<input
						type="text"
						name="firstName"
						value={formData.firstName || ""}
						onChange={handleChange}
						className="border-2 px-3 rounded-md h-10 border-amber-200 focus:border-amber-400 transition-colors duration-300 focus:outline-none shadow-lg"
					/>
				</div>
			</div>

			<div className="container justify-center mt-10">
				<div className="flex justify-center gap-2 items-center">
					<span className="text-shadow-md font-medium text-lg">
						{language === "en" ? "Username" : "Логин"}
					</span>
					<input
						type="text"
						name="username"
						value={formData.username || ""}
						onChange={handleChange}
						disabled
						className="border-2 px-3 rounded-md h-10 border-amber-200 focus:border-amber-400 transition-colors duration-300 focus:outline-none shadow-lg bg-gray-100"
					/>
				</div>
			</div>

			<GenderChoice
				selectedGender={formData.gender as "Man" | "Woman" | undefined}
				onGenderChange={handleGenderChange}
			/>

			<div className="container justify-center mt-10">
				<div className="flex flex-col md:flex-row justify-center gap-4 items-center">
					<div className="flex items-center gap-2 w-full max-w-xs">
						<label className="text-shadow-md font-medium text-lg whitespace-nowrap">
							Email
						</label>
						<input
							name="email"
							type="email"
							value={formData.email || ""}
							onChange={handleChange}
							placeholder="example@mail.com"
							className="border-2 rounded-md h-10 px-3 w-full border-amber-200 focus:border-amber-400 transition-colors duration-300 focus:outline-none shadow-lg"
						/>
					</div>

					<div className="flex items-center gap-2 w-full max-w-xs">
						<label className="text-shadow-md font-medium text-lg whitespace-nowrap">
							{language === "en" ? "Phone" : "Телефон"}
						</label>
						<input
							name="phoneNumber"
							type="tel"
							value={formData.phoneNumber || ""}
							onChange={handleChange}
							placeholder={
								language === "en" ? "+1 (___) ___-____" : "+7 (___) ___-____"
							}
							className="border-2 rounded-md h-10 px-3 w-full border-amber-200 focus:border-amber-400 transition-colors duration-300 focus:outline-none shadow-lg"
						/>
					</div>
				</div>
			</div>

			<div className="container justify-center mt-10">
				<div className="flex justify-center gap-2 items-center">
					<label className="text-shadow-md font-medium text-lg">
						{language === "en" ? "Birth Date" : "Дата рождения"}
					</label>
					<div className="relative">
						<input
							ref={dateInputRef}
							type="date"
							name="dateOfBirth"
							value={formData.dateOfBirth || ""}
							onChange={handleDateChange}
							style={{
								color: hasDateValue ? "inherit" : "transparent",
							}}
							className="border-2 rounded-md h-10 px-3 border-amber-200 focus:border-amber-400 transition-colors duration-300 focus:outline-none shadow-lg"
						/>
						{!hasDateValue && (
							<span
								className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 opacity-70 text-sm"
								style={{
									color: "#6b7280",
								}}
							>
								{language === "en" ? "MM/DD/YYYY" : "ДД.ММ.ГГГГ"}
							</span>
						)}
					</div>
				</div>
			</div>

			<div className="container justify-center mt-10">
				<div className="flex justify-center gap-2 items-center">
					<span className="text-shadow-md font-medium text-lg">
						{language === "en" ? "Country" : "Страна"}
					</span>
					<input
						type="text"
						name="country"
						value={formData.country || ""}
						onChange={handleChange}
						className="border-2 rounded-md h-10 px-3 border-amber-200 focus:border-amber-400 transition-colors duration-300 focus:outline-none shadow-lg"
					/>
				</div>
			</div>

			<div className="container justify-center mt-10 text-center">
				<button
					onClick={handleSave}
					className="border-2 border-amber-200 bg-amber-50 hover:bg-amber-100 h-12 w-32 rounded-2xl hover:scale-115 active:scale-95 transition-all duration-300 px-2 text-black/70 hover:text-black hover:border-amber-400"
				>
					<span className="text-shadow-md">
						{language === "en" ? "Save Profile" : "Сохранить"}
					</span>
				</button>
				<button
					onClick={handleLogout}
					className="border-2 border-amber-200 bg-amber-50 ml-5 hover:bg-amber-100 h-12 w-32 rounded-2xl hover:scale-115 active:scale-95 transition-all duration-300 px-2 text-black/70 hover:text-black hover:border-amber-400"
				>
					<span className="text-shadow-md">
						{language === "en" ? "Logout" : "Выйти"}
					</span>
				</button>
			</div>
		</div>
	);
}

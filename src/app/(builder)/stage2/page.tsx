"use client";

import DateInput from "@/components/DateInput";
import GenderChoice from "@/components/GenderChoice";
import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import { useResume } from "@/context/ResumeContext";
import { useState, useEffect } from "react";
import { getCurrentUser, User } from "@/lib/user";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function Page() {
	const { language } = useLanguage();
	const { resume, updateResume, isHydrated } = useResume();
	const router = useRouter();
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [formData, setFormData] = useState({
		surname: "",
		name: "",
		email: "",
		phone: [""],
		country: "",
		birthDate: "",
		gender:
			language === "en"
				? "Man"
				: ("Мужчина" as "Man" | "Woman" | "Мужчина" | "Женщина"),
	});
	const [invalidFields, setInvalidFields] = useState({
		surname: false,
		name: false,
		email: false,
		phone: [false],
		country: false,
		birthDate: false,
	});

	useEffect(() => {
		const user = getCurrentUser();
		setCurrentUser(user);

		if (isHydrated) {
			setFormData({
				surname: resume.surname || user?.lastName || "",
				name: resume.name || user?.firstName || "",
				email: resume.email || user?.email || "",
				phone:
					resume.phone.length > 0
						? resume.phone
						: user?.phoneNumber
						? [user.phoneNumber]
						: [""],
				country: resume.country || user?.country || "",
				birthDate: resume.birthDate || user?.dateOfBirth || "",
				gender: resume.gender
					? language === "ru"
						? resume.gender === "Man"
							? "Мужчина"
							: "Женщина"
						: resume.gender
					: language === "ru"
					? "Мужчина"
					: "Man",
			});
		}
	}, [isHydrated, resume, language]);

	useEffect(() => {
		if (
			Object.values(invalidFields).some((field) =>
				Array.isArray(field) ? field.some(Boolean) : Boolean(field)
			)
		) {
			const timer = setTimeout(() => {
				setInvalidFields({
					surname: false,
					name: false,
					email: false,
					phone: [false],
					country: false,
					birthDate: false,
				});
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [invalidFields]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setInvalidFields((prev) => ({ ...prev, [name]: false }));
		updateResume({ [name]: value });
	};

	const handlePhoneChange = (index: number, value: string) => {
		const newPhones = [...formData.phone];
		newPhones[index] = value;
		setFormData((prev) => ({ ...prev, phone: newPhones }));
		setInvalidFields((prev) => ({
			...prev,
			phone: newPhones.map((p) => !p.trim()),
		}));
		updateResume({ phone: newPhones.filter((p) => p.trim() !== "") });
	};

	const handleAddPhone = () => {
		const newPhones = [...formData.phone, ""];
		setFormData((prev) => ({ ...prev, phone: newPhones }));
		setInvalidFields((prev) => ({ ...prev, phone: [...prev.phone, false] }));
	};

	const handleRemovePhone = (index: number) => {
		if (formData.phone.length > 1) {
			const newPhones = formData.phone.filter((_, i) => i !== index);
			setFormData((prev) => ({ ...prev, phone: newPhones }));
			setInvalidFields((prev) => ({
				...prev,
				phone: newPhones.map(() => false),
			}));
			updateResume({ phone: newPhones.filter((p) => p.trim() !== "") });
		}
	};

	const handleGenderChange = (
		gender: "Man" | "Woman" | "Мужчина" | "Женщина"
	) => {
		setFormData((prev) => ({ ...prev, gender }));
		const genderToSave =
			gender === "Мужчина" ? "Man" : gender === "Женщина" ? "Woman" : gender;
		updateResume({ gender: genderToSave });
	};

	const handleDateChange = (date: string) => {
		setFormData((prev) => ({ ...prev, birthDate: date }));
		setInvalidFields((prev) => ({ ...prev, birthDate: false }));
		updateResume({ birthDate: date });
	};

	const validateForm = () => {
		const newInvalidFields = {
			surname: !formData.surname.trim(),
			name: !formData.name.trim(),
			email: !formData.email.trim(),
			phone: formData.phone.map((phone) => !phone.trim()),
			country: !formData.country.trim(),
			birthDate: !formData.birthDate.trim(),
		};

		setInvalidFields(newInvalidFields);
		return !Object.values(newInvalidFields).some((field) =>
			Array.isArray(field) ? field.some(Boolean) : Boolean(field)
		);
	};

	const handleNextClick = (e: React.MouseEvent) => {
		e.preventDefault();
		const isValid = validateForm();

		if (isValid) {
			const genderToSave =
				formData.gender === "Мужчина"
					? "Man"
					: formData.gender === "Женщина"
					? "Woman"
					: formData.gender;

			updateResume({
				surname: formData.surname,
				name: formData.name,
				email: formData.email,
				phone: formData.phone.filter((p) => p.trim() !== ""),
				country: formData.country,
				birthDate: formData.birthDate,
				gender: genderToSave,
			});
			router.push("/stage3");
		}
	};

	const handleReset = () => {
		const defaultData = {
			surname: currentUser?.lastName || "",
			name: currentUser?.firstName || "",
			email: currentUser?.email || "",
			phone: currentUser?.phoneNumber ? [currentUser.phoneNumber] : [""],
			country: currentUser?.country || "",
			birthDate: currentUser?.dateOfBirth || "",
			gender: (currentUser?.gender as "Man" | "Woman") || "Man",
		};

		setFormData(defaultData);
		setInvalidFields({
			surname: false,
			name: false,
			email: false,
			phone: [false],
			country: false,
			birthDate: false,
		});
		updateResume(defaultData);
	};

	if (!isHydrated) {
		return <div>{language === "en" ? "Loading..." : "Загрузка..."}</div>;
	}

	const getInputClass = (isInvalid: boolean) =>
		`border-2 rounded-md h-10 px-3 focus:outline-none shadow-lg transition-colors duration-300 ${
			isInvalid
				? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,1)]"
				: "border-amber-200 focus:border-amber-400"
		}`;

	return (
		<div className="container">
			<ProgressBar progress={1} />

			<div className="flex justify-center">
				<span className="text-3xl font-medium text-shadow-md">
					{language === "en"
						? "Fill in basic information about yourself"
						: "Заполните основную информацию о себе"}
				</span>
			</div>

			<div className="container justify-center mt-10">
				<div className="flex justify-center gap-2 items-center">
					<span className="text-shadow-md font-medium text-lg">
						{language === "en" ? "Surname" : "Фамилия"}
					</span>
					<input
						type="text"
						name="surname"
						value={formData.surname}
						onChange={handleChange}
						className={getInputClass(invalidFields.surname)}
					/>
					<span className="text-shadow-md font-medium text-lg ml-4">
						{language === "en" ? "Name" : "Имя"}
					</span>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className={getInputClass(invalidFields.name)}
					/>
				</div>
			</div>

			<GenderChoice
				selectedGender={formData.gender}
				onGenderChange={handleGenderChange}
			/>

			<div className="container justify-center mt-10">
				<div className="flex flex-col md:flex-row justify-center gap-4 items-center">
					<div className="flex items-center gap-2 w-full max-w-xs">
						<label
							htmlFor="email"
							className="text-shadow-md font-medium text-lg whitespace-nowrap"
						>
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="example@mail.com"
							autoComplete="email"
							className={getInputClass(invalidFields.email)}
						/>
					</div>

					<div className="flex flex-col items-center gap-2 w-full max-w-xs">
						<div className="flex items-center gap-2 w-full">
							<label
								htmlFor="phone"
								className="text-shadow-md font-medium text-lg whitespace-nowrap ml-4"
							>
								{language === "en" ? "Phone number(s)" : "Телефон(ы)"}
							</label>
							<button
								type="button"
								onClick={handleAddPhone}
								className="text-xl"
							>
								+
							</button>
						</div>
						{formData.phone.map((phone, index) => (
							<div key={index} className="flex items-center gap-2 w-full">
								<input
									id={`phone-${index}`}
									type="tel"
									value={phone}
									onChange={(e) => handlePhoneChange(index, e.target.value)}
									placeholder={
										language === "en"
											? "+1 (___) ___-____"
											: "+7 (___) ___-____"
									}
									autoComplete="tel"
									className={getInputClass(invalidFields.phone[index])}
								/>
								{formData.phone.length > 1 && (
									<button
										type="button"
										onClick={() => handleRemovePhone(index)}
										className="text-xl"
									>
										×
									</button>
								)}
							</div>
						))}
					</div>
				</div>
			</div>

			<DateInput
				selectedDate={formData.birthDate}
				onDateChange={handleDateChange}
				isInvalid={invalidFields.birthDate}
				language={language}
			/>

			<div className="container justify-center mt-10">
				<div className="flex justify-center gap-2 items-center">
					<span className="text-shadow-md font-medium text-lg">
						{language === "en" ? "Country" : "Страна"}
					</span>
					<input
						type="search"
						name="country"
						value={formData.country}
						onChange={handleChange}
						className={getInputClass(invalidFields.country)}
					/>
				</div>
			</div>

			<div className="container justify-center mt-10 text-center">
				<Link href="/stage1">
					<button className="border-2 border-amber-200 bg-amber-50 hover:bg-amber-100 h-12 w-20 rounded-2xl hover:scale-115 active:scale-95 transition-all duration-300 px-2 text-black/70 hover:text-black hover:border-amber-400">
						<span className="text-shadow-md">
							{language === "en" ? "Back" : "Назад"}
						</span>
					</button>
				</Link>
				<button
					onClick={handleReset}
					className="border-2 border-amber-200 bg-amber-50 ml-5 h-12 w-20 hover:bg-amber-100 rounded-2xl hover:scale-115 active:scale-95 transition-all duration-300 px-2 text-black/70 hover:text-black hover:border-amber-400"
				>
					<span className="text-shadow-md">
						{language === "en" ? "Reset" : "Сброс"}
					</span>
				</button>
				<button
					onClick={handleNextClick}
					className="mb-10 border-2 border-amber-200 ml-5 bg-amber-50 hover:bg-amber-100 h-12 w-20 rounded-2xl hover:scale-115 active:scale-95 transition-all duration-300 px-2 text-black/70 hover:text-black hover:border-amber-400"
				>
					<span className="text-shadow-md">
						{language === "en" ? "Next" : "Далее"}
					</span>
				</button>
			</div>
		</div>
	);
}

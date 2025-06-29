"use client";

import { useState, useEffect } from "react";
import ProgressBar from "@/components/ProgressBar";
import Link from "next/link";
import { useResume } from "@/context/ResumeContext";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function Page() {
	const { language } = useLanguage();
	const { resume, updateResume, isHydrated } = useResume();
	const router = useRouter();
	const [educationLevel, setEducationLevel] = useState("");
	const [institution, setInstitution] = useState("");
	const [city, setCity] = useState("");
	const [startYear, setStartYear] = useState("");
	const [endYear, setEndYear] = useState("");
	const [errors, setErrors] = useState({
		educationLevel: false,
		institution: false,
		city: false,
		startYear: false,
	});
	const [showErrors, setShowErrors] = useState(false);

	const educationLevels =
		language === "en"
			? [
					"Secondary education",
					"Vocational education",
					"Bachelor's degree",
					"Master's degree",
					"PhD",
					"Other",
			  ]
			: [
					"Среднее образование",
					"Среднее специальное",
					"Бакалавриат",
					"Магистратура",
					"Аспирантура",
					"Другое",
			  ];

	const currentYear = new Date().getFullYear();
	const yearOptions = Array.from({ length: 50 }, (_, i) => currentYear - i);

	useEffect(() => {
		if (isHydrated) {
			setEducationLevel(resume.educationLevel || "");
			setInstitution(resume.institution || "");
			setCity(resume.city || "");
			setStartYear(resume.startYear || "");
			setEndYear(resume.endYear || "");
		}
	}, [isHydrated, resume]);

	useEffect(() => {
		if (showErrors) {
			const timer = setTimeout(() => setShowErrors(false), 3000);
			return () => clearTimeout(timer);
		}
	}, [showErrors]);

	const validateForm = () => {
		const newErrors = {
			educationLevel: !educationLevel.trim(),
			institution: !institution.trim(),
			city: !city.trim(),
			startYear: !startYear.trim(),
		};

		setErrors(newErrors);
		return !Object.values(newErrors).some(Boolean);
	};

	const handleSave = () => {
		const isValid = validateForm();
		if (isValid) {
			updateResume({
				educationLevel,
				institution,
				city,
				startYear,
				endYear,
			});
			return true;
		} else {
			setShowErrors(true);
			return false;
		}
	};

	const handleNextClick = (e: React.MouseEvent) => {
		e.preventDefault();
		if (handleSave()) {
			router.push("/stage6");
		}
	};

	const handleReset = () => {
		setEducationLevel("");
		setInstitution("");
		setCity("");
		setStartYear("");
		setEndYear("");
		setErrors({
			educationLevel: false,
			institution: false,
			city: false,
			startYear: false,
		});
		updateResume({
			educationLevel: "",
			institution: "",
			city: "",
			startYear: "",
			endYear: "",
		});
	};

	const getInputClass = (isError: boolean) =>
		`w-full border-2 rounded-md p-2 focus:outline-none shadow-lg transition-colors duration-300 ${
			isError && showErrors
				? "border-red-500 bg-red-50"
				: "border-amber-200 bg-amber-50 focus:border-amber-400"
		}`;

	if (!isHydrated) {
		return (
			<div className="flex justify-center items-center h-screen">
				{language === "en" ? "Loading..." : "Загрузка..."}
			</div>
		);
	}

	return (
		<div className="container">
			<ProgressBar progress={4} />

			<div className="flex justify-center">
				<span className="text-3xl font-medium text-shadow-lg">
					{language === "en" ? "Education" : "Образование"}
				</span>
			</div>

			<div className="flex flex-col items-center mt-10 space-y-6">
				<div className="flex items-center w-full max-w-lg">
					<label className="text-shadow-md font-medium text-lg mr-5 w-40">
						{language === "en" ? "Education Level" : "Уровень образования"}
					</label>
					<select
						value={educationLevel}
						onChange={(e) => setEducationLevel(e.target.value)}
						className={getInputClass(errors.educationLevel)}
					>
						<option value="">
							{language === "en"
								? "Select education level"
								: "Выберите уровень образования"}
						</option>
						{educationLevels.map((level) => (
							<option key={level} value={level}>
								{level}
							</option>
						))}
					</select>
				</div>

				<div className="flex items-center w-full max-w-lg">
					<label className="text-shadow-md font-medium text-lg mr-5 w-40">
						{language === "en" ? "Institution" : "Учебное заведение"}
					</label>
					<input
						type="text"
						value={institution}
						onChange={(e) => setInstitution(e.target.value)}
						placeholder={
							language === "en"
								? "University/School name"
								: "Название университета/школы"
						}
						className={getInputClass(errors.institution)}
					/>
				</div>

				<div className="flex items-center w-full max-w-lg">
					<label className="text-shadow-md font-medium text-lg mr-5 w-40">
						{language === "en" ? "City" : "Город"}
					</label>
					<input
						type="text"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						placeholder={language === "en" ? "City of study" : "Город обучения"}
						className={getInputClass(errors.city)}
					/>
				</div>

				<div className="flex items-center w-full max-w-lg space-x-4">
					<div className="flex items-center flex-1">
						<label className="text-shadow-md font-medium text-lg mr-5 w-40">
							{language === "en" ? "Start Year" : "Год начала"}
						</label>
						<select
							value={startYear}
							onChange={(e) => setStartYear(e.target.value)}
							className={getInputClass(errors.startYear)}
						>
							<option value="">
								{language === "en" ? "Select year" : "Выберите год"}
							</option>
							{yearOptions.map((year) => (
								<option key={`start-${year}`} value={year}>
									{year}
								</option>
							))}
						</select>
					</div>

					<div className="flex items-center flex-1">
						<label className="text-shadow-md font-medium text-lg mr-5 w-40">
							{language === "en" ? "End Year" : "Год окончания"}
						</label>
						<select
							value={endYear}
							onChange={(e) => setEndYear(e.target.value)}
							className="w-full border-2 rounded-md border-amber-200 bg-amber-50 p-2 focus:border-amber-400 transition-colors duration-300 focus:outline-none shadow-lg"
						>
							<option value="">
								{language === "en" ? "Select year" : "Выберите год"}
							</option>
							{yearOptions.map((year) => (
								<option key={`end-${year}`} value={year}>
									{year}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>

			<div className="container justify-center mt-10 text-center mb-10">
				<Link href="/stage4">
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
					className="border-2 border-amber-200 ml-5 bg-amber-50 hover:bg-amber-100 h-12 w-20 rounded-2xl hover:scale-115 active:scale-95 transition-all duration-300 px-2 text-black/70 hover:text-black hover:border-amber-400"
				>
					<span className="text-shadow-md">
						{language === "en" ? "Next" : "Далее"}
					</span>
				</button>
			</div>
		</div>
	);
}

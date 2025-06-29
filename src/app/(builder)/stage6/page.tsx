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
	const [experienceLevel, setExperienceLevel] = useState("");
	const [workEntries, setWorkEntries] = useState<
		Array<{
			company: string;
			position: string;
			startYear: string;
			endYear: string;
		}>
	>([]);
	const [showError, setShowError] = useState(false);

	const experienceLevels =
		language === "en"
			? [
					"No experience",
					"Less than 1 year",
					"1-3 years",
					"3-5 years",
					"5-10 years",
					"More than 10 years",
			  ]
			: [
					"Нет опыта",
					"Менее 1 года",
					"1-3 года",
					"3-5 лет",
					"5-10 лет",
					"Более 10 лет",
			  ];

	const currentYear = new Date().getFullYear();
	const yearOptions = Array.from({ length: 20 }, (_, i) => currentYear - i);

	useEffect(() => {
		if (isHydrated) {
			setExperienceLevel(resume.jobExperience || "");
			setWorkEntries(resume.workExperience || []);
		}
	}, [isHydrated, resume]);

	useEffect(() => {
		if (showError) {
			const timer = setTimeout(() => setShowError(false), 3000);
			return () => clearTimeout(timer);
		}
	}, [showError]);

	const addWorkEntry = () => {
		const newEntries = [
			...workEntries,
			{
				company: "",
				position: "",
				startYear: "",
				endYear: "",
			},
		];
		setWorkEntries(newEntries);
		updateResume({ workExperience: newEntries });
	};

	const updateWorkEntry = (index: number, field: string, value: string) => {
		const updatedEntries = [...workEntries];
		updatedEntries[index] = {
			...updatedEntries[index],
			[field]: value,
		};
		setWorkEntries(updatedEntries);
		updateResume({ workExperience: updatedEntries });
	};

	const removeWorkEntry = (index: number) => {
		const updatedEntries = workEntries.filter((_, i) => i !== index);
		setWorkEntries(updatedEntries);
		updateResume({ workExperience: updatedEntries });
	};

	const handleNextClick = (e: React.MouseEvent) => {
		e.preventDefault();

		if (!experienceLevel) {
			setShowError(true);
			return;
		}

		updateResume({
			jobExperience: experienceLevel,
			workExperience: workEntries,
		});
		router.push("/stage7");
	};

	const handleReset = () => {
		setExperienceLevel("");
		setWorkEntries([]);
		setShowError(false);
		updateResume({
			jobExperience: "",
			workExperience: [],
		});
	};

	if (!isHydrated) {
		return (
			<div className="flex justify-center items-center h-screen">
				{language === "en" ? "Loading..." : "Загрузка..."}
			</div>
		);
	}

	return (
		<div className="container">
			<ProgressBar progress={5} />

			<div className="flex justify-center">
				<span className="text-3xl font-medium text-shadow-md">
					{language === "en" ? "Job experience" : "Опыт работы"}
				</span>
			</div>

			<div className="flex flex-col items-center mt-10 space-y-6">
				<div className="flex items-center w-full max-w-md">
					<label className="text-shadow-md font-medium text-lg mr-5 w-40">
						{language === "en" ? "Experience" : "Опыт"}
					</label>
					<select
						value={experienceLevel}
						onChange={(e) => {
							setExperienceLevel(e.target.value);
							setShowError(false);
						}}
						className={`w-full border-2 rounded-md p-2 focus:outline-none shadow-lg transition-colors duration-300 ${
							showError && !experienceLevel
								? "border-red-500 bg-red-50"
								: "border-amber-200 bg-amber-50 focus:border-amber-400"
						}`}
					>
						<option value="">
							{language === "en"
								? "Select experience level"
								: "Выберите уровень опыта"}
						</option>
						{experienceLevels.map((level) => (
							<option key={level} value={level}>
								{level}
							</option>
						))}
					</select>
				</div>

				{workEntries.map((entry, index) => (
					<div
						key={index}
						className="w-full max-w-lg border-2 border-amber-200 rounded-lg p-4 bg-amber-50 shadow-lg"
					>
						<div className="flex justify-between items-center mb-3">
							<h3 className="font-medium text-lg text-shadow-md">
								{language === "en"
									? `Work experience #${index + 1}`
									: `Место работы #${index + 1}`}
							</h3>
							<button
								onClick={() => removeWorkEntry(index)}
								className="text-2xl hover:text-amber-600"
							>
								×
							</button>
						</div>

						<div className="space-y-4">
							<div className="flex items-center">
								<label className="text-shadow-md font-medium text-sm mr-5 w-24">
									{language === "en" ? "Company" : "Компания"}
								</label>
								<input
									type="text"
									value={entry.company}
									onChange={(e) =>
										updateWorkEntry(index, "company", e.target.value)
									}
									placeholder={
										language === "en" ? "Company name" : "Название компании"
									}
									className="w-full border-2 rounded-md border-amber-200 bg-white p-2 focus:border-amber-400 transition-colors duration-300 focus:outline-none"
								/>
							</div>

							<div className="flex items-center">
								<label className="text-shadow-md font-medium text-sm mr-5 w-24">
									{language === "en" ? "Position" : "Должность"}
								</label>
								<input
									type="text"
									value={entry.position}
									onChange={(e) =>
										updateWorkEntry(index, "position", e.target.value)
									}
									placeholder={
										language === "en" ? "Your position" : "Ваша должность"
									}
									className="w-full border-2 rounded-md border-amber-200 bg-white p-2 focus:border-amber-400 transition-colors duration-300 focus:outline-none"
								/>
							</div>

							<div className="flex items-center space-x-4">
								<div className="flex items-center flex-1">
									<label className="text-shadow-md font-medium text-sm mr-5 w-24">
										{language === "en" ? "Start Year" : "Год начала"}
									</label>
									<select
										value={entry.startYear}
										onChange={(e) =>
											updateWorkEntry(index, "startYear", e.target.value)
										}
										className="w-full border-2 rounded-md border-amber-200 bg-white p-2 focus:border-amber-400 transition-colors duration-300 focus:outline-none"
									>
										<option value="">
											{language === "en" ? "Select year" : "Выберите год"}
										</option>
										{yearOptions.map((year) => (
											<option key={`start-${year}-${index}`} value={year}>
												{year}
											</option>
										))}
									</select>
								</div>

								<div className="flex items-center flex-1">
									<label className="text-shadow-md font-medium text-sm mr-5 w-24">
										{language === "en" ? "End Year" : "Год окончания"}
									</label>
									<select
										value={entry.endYear}
										onChange={(e) =>
											updateWorkEntry(index, "endYear", e.target.value)
										}
										className="w-full border-2 rounded-md border-amber-200 bg-white p-2 focus:border-amber-400 transition-colors duration-300 focus:outline-none"
									>
										<option value="">
											{language === "en" ? "Select year" : "Выберите год"}
										</option>
										{yearOptions.map((year) => (
											<option key={`end-${year}-${index}`} value={year}>
												{year}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
					</div>
				))}

				<button
					onClick={addWorkEntry}
					className="flex items-center justify-center w-full max-w-md border-2 border-amber-200 bg-amber-50 rounded-lg p-3 hover:bg-amber-100 hover:border-amber-400 transition-colors duration-300 shadow-lg"
				>
					<span className="font-medium mr-2 text-2xl">+</span>
					<span className="text-shadow-md">
						{language === "en"
							? "Add work experience"
							: "Добавить место работы"}
					</span>
				</button>
			</div>

			<div className="container justify-center mt-10 text-center mb-10">
				<Link href="/stage5">
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

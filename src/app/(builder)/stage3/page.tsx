"use client";

import { useState, useEffect } from "react";
import ProgressBar from "@/components/ProgressBar";
import { softSkills, softSkillsRU } from "@/types/softSkills";
import Link from "next/link";
import { useResume } from "@/context/ResumeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Page() {
	const { language } = useLanguage();
	const { resume, updateResume, isHydrated } = useResume();
	const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
	const [aboutText, setAboutText] = useState("");
	const [showError, setShowError] = useState(false);

	// Получаем соответствующий список навыков в зависимости от языка
	const currentSkills = language === "ru" ? softSkillsRU : softSkills;

	useEffect(() => {
		if (isHydrated) {
			setSelectedSkills(resume.softSkills || []);
			setAboutText(resume.aboutYourself || "");
		}
	}, [isHydrated, resume]);

	const handleSkillToggle = (skill: string) => {
		const newSkills = selectedSkills.includes(skill)
			? selectedSkills.filter((s) => s !== skill)
			: selectedSkills.length < 15
			? [...selectedSkills, skill]
			: selectedSkills;

		setSelectedSkills(newSkills);
		updateResume({ softSkills: newSkills });
		setShowError(false);
	};

	const handleAboutChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const text = e.target.value;
		setAboutText(text);
		updateResume({ aboutYourself: text });
	};

	const handleReset = () => {
		setSelectedSkills([]);
		setAboutText("");
		updateResume({
			softSkills: [],
			aboutYourself: "",
		});
		setShowError(false);
	};

	const handleNextClick = (e: React.MouseEvent) => {
		if (selectedSkills.length === 0) {
			e.preventDefault();
			setShowError(true);
			setTimeout(() => setShowError(false), 3000);
		}
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
			<ProgressBar progress={2} />

			<div className="flex justify-center">
				<span className="text-3xl font-medium text-shadow-md">
					{language === "en"
						? "Fill in additional information about yourself"
						: "Дополнительная информация о вас"}
				</span>
			</div>

			<div className="flex justify-center mt-10">
				<span
					className={`text-shadow-md font-medium text-lg mr-5 mt-2 w-58 transition-colors duration-300 ${
						showError ? "text-red-500" : ""
					}`}
				>
					{language === "en"
						? `Soft skills (${selectedSkills.length}/15 selected)`
						: `Гибкие навыки (выбрано ${selectedSkills.length}/15)`}
				</span>
				<div className="w-160 h-60 border-2 rounded-md border-amber-200 p-2 focus:border-amber-400 transition-colors duration-300 focus:outline-none shadow-lg overflow-y-auto">
					<div className="grid grid-cols-2 gap-2">
						{currentSkills.map((skill, index) => (
							<div
								key={index}
								className={`flex items-center p-2 rounded cursor-pointer transition-all duration-300 ${
									selectedSkills.includes(skill)
										? "bg-amber-100"
										: "hover:bg-amber-50"
								}`}
								onClick={() => handleSkillToggle(skill)}
							>
								<div
									className={`w-5 h-5 border-2 rounded mr-2 flex items-center justify-center ${
										selectedSkills.includes(skill)
											? "border-amber-500 bg-amber-500 text-white"
											: "border-amber-300"
									}`}
								>
									{selectedSkills.includes(skill) && (
										<span className="text-xs">✓</span>
									)}
								</div>
								<span>{skill}</span>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="flex justify-center mt-10">
				<span className="text-shadow-md font-medium text-lg mr-5 mt-2">
					{language === "en" ? "About yourself" : "О себе"}
				</span>
				<textarea
					value={aboutText}
					onChange={handleAboutChange}
					placeholder={
						language === "en"
							? "Tell a short story about yourself (up to 100 words)."
							: "Кратко расскажите о себе (до 100 слов)."
					}
					className="w-180 h-42 border-2 rounded-md border-amber-200 p-2 focus:border-amber-400 transition-colors duration-300 focus:outline-none shadow-lg"
					maxLength={500}
				/>
			</div>

			<div className="container justify-center mt-10 text-center mb-10">
				<Link href="/stage2">
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
				<Link href="/stage4" passHref>
					<button
						onClick={handleNextClick}
						className="border-2 border-amber-200 ml-5 bg-amber-50 hover:bg-amber-100 h-12 w-20 rounded-2xl hover:scale-115 active:scale-95 transition-all duration-300 px-2 text-black/70 hover:text-black hover:border-amber-400"
					>
						<span className="text-shadow-md">
							{language === "en" ? "Next" : "Далее"}
						</span>
					</button>
				</Link>
			</div>
		</div>
	);
}

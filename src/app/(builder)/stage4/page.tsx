"use client";

import { useState, useEffect } from "react";
import ProgressBar from "@/components/ProgressBar";
import {
	generalHardSkills,
	itHardSkills,
	generalHardSkillsRU,
	itHardSkillsRU,
} from "@/types/hardSkills";
import Link from "next/link";
import { useResume } from "@/context/ResumeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Page() {
	const { language } = useLanguage();
	const { resume, updateResume, isHydrated } = useResume();
	const [activeTab, setActiveTab] = useState<"general" | "it">("general");
	const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
	const [showError, setShowError] = useState(false);
	const [dragItemIndex, setDragItemIndex] = useState<number | null>(null);
	const [dragOverItemIndex, setDragOverItemIndex] = useState<number | null>(
		null
	);

	// Получаем соответствующие списки навыков в зависимости от языка
	const currentGeneralSkills =
		language === "ru" ? generalHardSkillsRU : generalHardSkills;
	const currentItSkills = language === "ru" ? itHardSkillsRU : itHardSkills;
	const currentSkills =
		activeTab === "general" ? currentGeneralSkills : currentItSkills;

	useEffect(() => {
		if (isHydrated) {
			setSelectedSkills(resume.hardSkills || []);
		}
	}, [isHydrated, resume]);

	useEffect(() => {
		if (showError) {
			const timer = setTimeout(() => setShowError(false), 3000);
			return () => clearTimeout(timer);
		}
	}, [showError]);

	const handleDragStart = (index: number) => {
		setDragItemIndex(index);
	};

	const handleDragOver = (
		e: React.DragEvent<HTMLDivElement>,
		index: number
	) => {
		e.preventDefault();
		setDragOverItemIndex(index);
	};

	const handleDrop = (
		e: React.DragEvent<HTMLDivElement>,
		dropIndex: number
	) => {
		e.preventDefault();

		if (dragItemIndex === null || dragItemIndex === dropIndex) {
			setDragItemIndex(null);
			setDragOverItemIndex(null);
			return;
		}

		const newSkills = [...selectedSkills];
		const [draggedItem] = newSkills.splice(dragItemIndex, 1);
		newSkills.splice(dropIndex, 0, draggedItem);

		setSelectedSkills(newSkills);
		updateResume({ hardSkills: newSkills });
		setDragItemIndex(null);
		setDragOverItemIndex(null);
	};

	const handleDropFromList = (skill: string) => {
		if (selectedSkills.length >= 15 || selectedSkills.includes(skill)) return;

		setSelectedSkills([...selectedSkills, skill]);
		updateResume({ hardSkills: [...selectedSkills, skill] });
	};

	const removeSkill = (index: number) => {
		const newSkills = selectedSkills.filter((_, i) => i !== index);
		setSelectedSkills(newSkills);
		updateResume({ hardSkills: newSkills });
	};

	const handleNextClick = (e: React.MouseEvent) => {
		if (selectedSkills.length === 0) {
			e.preventDefault();
			setShowError(true);
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
			<ProgressBar progress={3} />

			<div className="flex justify-center">
				<span className="text-3xl font-medium text-shadow-md">
					{language === "en"
						? "Your hard skills"
						: "Ваши профессиональные навыки"}
				</span>
			</div>

			<div className="flex justify-center mt-10 min-h-20">
				<div
					className={`w-250 min-h-20 border-2 rounded-lg p-2 flex flex-wrap gap-2 transition-colors ${
						showError
							? "border-red-500 bg-red-50"
							: "border-amber-300 bg-amber-50"
					}`}
					onDragOver={(e) => e.preventDefault()}
					onDrop={(e) => {
						e.preventDefault();
						const skill = e.dataTransfer.getData("text/plain");
						if (skill && !selectedSkills.includes(skill)) {
							handleDropFromList(skill);
						}
					}}
				>
					{selectedSkills.length === 0 ? (
						<div
							className={`w-full h-full flex items-center justify-center transition-colors ${
								showError ? "text-red-500" : "text-gray-400"
							}`}
						>
							{language === "en"
								? `Drag skills here (${selectedSkills.length}/15 selected)`
								: `Перетащите навыки сюда (выбрано ${selectedSkills.length}/15)`}
						</div>
					) : (
						selectedSkills.map((skill, index) => (
							<div
								key={`${skill}-${index}`}
								className={`px-3 py-1 rounded-full text-sm flex items-center cursor-move transition-all ${
									dragOverItemIndex === index
										? "bg-amber-300 scale-110 border-2 border-amber-400"
										: "bg-amber-200"
								}`}
								draggable
								onDragStart={() => handleDragStart(index)}
								onDragOver={(e) => handleDragOver(e, index)}
								onDrop={(e) => handleDrop(e, index)}
								onDragEnd={() => {
									setDragItemIndex(null);
									setDragOverItemIndex(null);
								}}
							>
								{skill}
								<button
									onClick={() => removeSkill(index)}
									className="ml-2 text-xs font-bold hover:text-amber-700"
								>
									<span className="text-xl">×</span>
								</button>
							</div>
						))
					)}
				</div>
			</div>

			<div className="flex justify-center mt-5">
				<span className="items-center w-250 align opacity-80 text-shadow-md text-center">
					{language === "en"
						? "Select the appropriate skills and move them to the field above (max 15). You can prioritize skills by dragging. Switch between tabs to see different skill categories."
						: "Выберите подходящие навыки и перетащите их в поле выше (макс. 15). Вы можете изменять приоритет навыков перетаскиванием. Переключайтесь между вкладками для просмотра разных категорий навыков."}
				</span>
			</div>

			<div className="flex justify-center mt-5">
				<button
					onClick={() => setActiveTab("general")}
					className={`h-10 w-40 mx-2 border-2 rounded-lg transition-colors duration-300 ${
						activeTab === "general"
							? "border-amber-400 bg-amber-100"
							: "border-amber-200 bg-amber-50 hover:border-amber-400 hover:bg-amber-100"
					}`}
				>
					{language === "en" ? "General skills" : "Общие навыки"}
				</button>
				<button
					onClick={() => setActiveTab("it")}
					className={`h-10 w-40 mx-2 border-2 rounded-lg transition-colors duration-300 ${
						activeTab === "it"
							? "border-amber-400 bg-amber-100"
							: "border-amber-200 bg-amber-50 hover:border-amber-400 hover:bg-amber-100"
					}`}
				>
					{language === "en" ? "IT skills" : "IT-навыки"}
				</button>
			</div>

			<div className="flex justify-center mt-5">
				<div className="w-250 min-h-50 border-2 border-amber-300 bg-amber-50 rounded-lg p-4 flex flex-wrap gap-2">
					{currentSkills.map((skill) => (
						<div
							key={skill}
							className={`px-3 py-1 rounded-full text-sm cursor-move transition-all ${
								selectedSkills.includes(skill)
									? "bg-gray-200 text-gray-400 cursor-not-allowed"
									: selectedSkills.length >= 15
									? "bg-gray-100 text-gray-400 cursor-not-allowed"
									: "bg-white border border-amber-200 hover:bg-amber-100"
							}`}
							draggable={
								!selectedSkills.includes(skill) && selectedSkills.length < 15
							}
							onDragStart={(e) => {
								e.dataTransfer.setData("text/plain", skill);
							}}
						>
							{skill}
						</div>
					))}
				</div>
			</div>

			<div className="container justify-center mt-10 text-center mb-10">
				<Link href="/stage3">
					<button className="border-2 border-amber-200 bg-amber-50 hover:bg-amber-100 h-12 w-20 rounded-2xl hover:scale-115 active:scale-95 transition-all duration-300 px-2 text-black/70 hover:text-black hover:border-amber-400">
						<span className="text-shadow-md">
							{language === "en" ? "Back" : "Назад"}
						</span>
					</button>
				</Link>
				<Link href="/stage5" passHref>
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

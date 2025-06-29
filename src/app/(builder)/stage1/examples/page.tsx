"use client";

import Link from "next/link";
import { professions, professionsRU } from "@/types/professions";
import { useState, useEffect } from "react";
import { useResume } from "@/context/ResumeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Page() {
	const { language } = useLanguage();
	const { resume, updateResume, isHydrated } = useResume();
	const [randomProfessions, setRandomProfessions] = useState<string[]>([]);

	// Get the appropriate professions array based on language
	const currentProfessions = language === "en" ? professions : professionsRU;

	useEffect(() => {
		setRandomProfessions(getRandomProfessions(10));
	}, [language]); // Add language as dependency to regenerate when language changes

	function getRandomProfessions(count: number): string[] {
		const shuffled = [...currentProfessions].sort(() => 0.5 - Math.random());
		return shuffled.slice(0, count);
	}

	const refreshProfessions = () => {
		setRandomProfessions(getRandomProfessions(10));
	};

	const handleProfessionSelect = (profession: string) => {
		updateResume({ profession });
	};

	if (!isHydrated) {
		return <div>{language === "en" ? "Loading..." : "Загрузка..."}</div>;
	}

	return (
		<div>
			<div className="container h-10 mt-3 flex justify-center items-center">
				<span className="text-shadow-sm text-lg">
					{language === "en"
						? "Below we have provided some examples of in-demand work that you might enjoy."
						: "Ниже мы предоставили несколько примеров востребованных профессий, которые могут вам понравиться."}
				</span>
			</div>

			<div className="flex justify-center mt-2">
				<button
					onClick={refreshProfessions}
					className="h-10.5 w-10.5 border-2 rounded-md border-amber-300 bg-amber-50 mt-2 shadow-lg hover:scale-110 active:scale-100 transition-all duration-150 flex items-center justify-center"
				>
					<img
						src="/reload.svg"
						alt={
							language === "en" ? "Refresh professions" : "Обновить профессии"
						}
						className="w-5 h-5"
					/>
				</button>
				<div className="h-120 w-100 px-4 mr-2">
					{randomProfessions.map((profession, index) => (
						<Link
							href="/stage2"
							key={index}
							onClick={() => handleProfessionSelect(profession)}
						>
							<div className="border-2 rounded-md px-4 py-2 border-amber-300 bg-amber-50 my-2 shadow-lg hover:scale-105 active:scale-100 transition-all duration-150 cursor-pointer">
								{profession}
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

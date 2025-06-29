"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { professions, professionsRU } from "@/types/professions";
import { useResume } from "@/context/ResumeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Page() {
	const { language } = useLanguage();
	const { resume, updateResume, isHydrated } = useResume();
	const [searchTerm, setSearchTerm] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const [isFieldEmpty, setIsFieldEmpty] = useState(false);

	// Get the appropriate professions array based on language
	const currentProfessions = language === "en" ? professions : professionsRU;

	const filteredProfessions = useMemo(() => {
		if (!searchTerm) return [];
		return currentProfessions.filter((profession) =>
			profession.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [searchTerm, currentProfessions]);

	useEffect(() => {
		if (isFieldEmpty) {
			const timer = setTimeout(() => {
				setIsFieldEmpty(false);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [isFieldEmpty]);

	const handleSelect = (profession: string) => {
		setSearchTerm(profession);
		setIsFocused(false);
		updateResume({ profession });
		setIsFieldEmpty(false);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleNextClick = (e: React.MouseEvent) => {
		if (!searchTerm.trim()) {
			e.preventDefault();
			setIsFieldEmpty(true);
			updateResume({ profession: "" });
		} else if (!resume.profession || resume.profession !== searchTerm) {
			updateResume({ profession: searchTerm });
		}
	};

	if (!isHydrated) {
		return <div>{language === "en" ? "Loading..." : "Загрузка..."}</div>;
	}

	return (
		<div className="container">
			<div className="flex flex-col items-center mt-15">
				<div className="relative w-full max-w-md">
					<input
						type="search"
						placeholder={
							language === "en" ? "Search profession..." : "Поиск профессии..."
						}
						value={searchTerm}
						onChange={handleSearchChange}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setTimeout(() => setIsFocused(false), 200)}
						className={`border-2 w-full rounded-2xl bg-amber-50 hover:bg-amber-100 px-4 py-3 focus:outline-none shadow-lg transition-colors duration-300 ${
							isFieldEmpty
								? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,1)]"
								: "border-amber-200 hover:border-amber-400 focus:border-amber-400"
						}`}
					/>

					{isFocused && filteredProfessions.length > 0 && (
						<div className="absolute z-10 mt-1 w-full bg-white rounded-2xl shadow-lg max-h-96 overflow-y-auto border border-gray-200">
							{filteredProfessions.map((profession, index) => (
								<div
									key={index}
									className="px-4 py-2 hover:bg-amber-100 cursor-pointer transition-colors text-shadow-md"
									onMouseDown={() => handleSelect(profession)}
								>
									{profession}
								</div>
							))}
						</div>
					)}
				</div>

				<div className="mt-10">
					<Link href="/stage1">
						<button className="border-2 border-amber-200 bg-amber-50 hover:bg-amber-100 h-12 w-20 rounded-2xl hover:scale-115 active:scale-95 transition-all duration-300 px-2 text-black/70 hover:text-black hover:border-amber-400">
							<span className="text-shadow-md">
								{language === "en" ? "Back" : "Назад"}
							</span>
						</button>
					</Link>
					<Link href="/stage2">
						<button
							className="border-2 border-amber-200 ml-5 bg-amber-50 hover:bg-amber-100 h-12 w-20 rounded-2xl hover:scale-115 active:scale-95 transition-all duration-300 px-2 text-black/70 hover:text-black hover:border-amber-400"
							onClick={handleNextClick}
						>
							<span className="text-shadow-md">
								{language === "en" ? "Next" : "Далее"}
							</span>
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

"use client";

import { forwardRef, useState, useImperativeHandle, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

type Gender = "Man" | "Woman";
type GenderRU = "Мужчина" | "Женщина";
type GenderAll = Gender | GenderRU;

interface GenderChoiceProps {
	selectedGender?: GenderAll | null;
	onGenderChange?: (gender: GenderAll) => void;
}

const GenderChoice = forwardRef<{ reset: () => void }, GenderChoiceProps>(
	({ selectedGender = null, onGenderChange }, ref) => {
		const { language } = useLanguage();
		const [internalGender, setInternalGender] = useState<GenderAll | null>(
			selectedGender
		);

		// Функция для нормализации значения пола
		const normalizeGender = (gender: GenderAll): Gender => {
			return gender === "Мужчина" || gender === "Man" ? "Man" : "Woman";
		};

		// Функция для получения отображаемого значения
		const getDisplayGender = (gender: Gender): GenderAll => {
			return language === "ru"
				? gender === "Man"
					? "Мужчина"
					: "Женщина"
				: gender;
		};

		useImperativeHandle(ref, () => ({
			reset: () => {
				setInternalGender(getDisplayGender("Man"));
				onGenderChange?.(getDisplayGender("Man"));
			},
		}));

		useEffect(() => {
			setInternalGender(selectedGender);
		}, [selectedGender]);

		const handleGenderSelect = (gender: Gender) => {
			const selected = getDisplayGender(gender);
			setInternalGender(selected);
			onGenderChange?.(selected);
		};

		// Проверка выбран ли данный пол
		const isSelected = (gender: Gender) => {
			return normalizeGender(internalGender || "Man") === gender;
		};

		return (
			<div className="container justify-center mt-8">
				<div className="flex justify-center gap-5 items-center">
					<span className="text-shadow-md font-medium text-lg rounded-md">
						{language === "en" ? "Gender" : "Пол"}
					</span>

					<button
						type="button"
						className={`w-40 h-12 border-2 rounded-md transition-colors duration-300 ${
							isSelected("Man")
								? "border-amber-400 bg-amber-100 shadow-lg"
								: "border-amber-50 bg-amber-50"
						}`}
						onClick={() => handleGenderSelect("Man")}
					>
						<span className="text-shadow-md font-medium text-xl">
							{language === "en" ? "Man" : "Мужчина"}
						</span>
					</button>

					<button
						type="button"
						className={`w-40 h-12 border-2 rounded-md transition-colors duration-300 ${
							isSelected("Woman")
								? "border-amber-400 bg-amber-100 shadow-lg"
								: "border-amber-50 bg-amber-50"
						}`}
						onClick={() => handleGenderSelect("Woman")}
					>
						<span className="text-shadow-md font-medium text-xl">
							{language === "en" ? "Woman" : "Женщина"}
						</span>
					</button>
				</div>
			</div>
		);
	}
);

GenderChoice.displayName = "GenderChoice";

export default GenderChoice;

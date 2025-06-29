"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export const DynamicMetadata = () => {
	const { language } = useLanguage();

	useEffect(() => {
		document.title =
			language === "en" ? "Interactive resume builder" : "Конструктор резюме";
	}, [language]);

	return null;
};

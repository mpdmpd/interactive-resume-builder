"use client";

import { createContext, useContext, useState, useEffect } from "react";

type LanguageContextType = {
	language: "ru" | "en";
	toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType>({
	language: "en",
	toggleLanguage: () => {},
});

export const LanguageProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [language, setLanguage] = useState<"ru" | "en">("en");

	useEffect(() => {
		const savedLanguage = localStorage.getItem("language");
		if (savedLanguage === "ru" || savedLanguage === "en") {
			setLanguage(savedLanguage);
			document.documentElement.lang = savedLanguage;
		} else {
			localStorage.setItem("language", "en");
			document.documentElement.lang = "en";
		}
	}, []);

	const toggleLanguage = () => {
		const newLanguage = language === "ru" ? "en" : "ru";
		setLanguage(newLanguage);
		localStorage.setItem("language", newLanguage);
		document.documentElement.lang = newLanguage;
	};

	return (
		<LanguageContext.Provider value={{ language, toggleLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};

export const useLanguage = () => useContext(LanguageContext);

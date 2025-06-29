"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
	const { language } = useLanguage();
	const currentYear = new Date().getFullYear();

	const marginLeft = language === "ru" ? "ml-157" : "ml-196";

	const footerLinks = [
		{ text: language === "en" ? "About" : "О нас", href: "/about" },
		{
			text:
				language === "en" ? "Privacy Policy" : "Политика конфиденциальности",
			href: "/privacy-policy",
		},
		{ text: language === "en" ? "Contact" : "Контакты", href: "/contact" },
	];

	return (
		<footer className="mt-auto flex w-full bg-gradient-to-l from-amber-100 via-amber-50 to-white items-center">
			<div className="container mx-auto flex">
				<p
					className={`text-amber-400 font-medium text-shadow-md ${marginLeft}`}
				>
					© {currentYear}{" "}
					{language === "en"
						? "Interactive resume builder. All rights reserved."
						: "Конструктор резюме. Все права защищены."}
				</p>
				{footerLinks.map((link, index) => (
					<Link
						key={index}
						href={link.href}
						className="text-amber-400 font-medium hover:text-black transition-colors duration-200 text-shadow-md ml-10"
					>
						{link.text}
					</Link>
				))}
			</div>
		</footer>
	);
}

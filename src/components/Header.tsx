"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect } from "react";

export default function Header() {
	const { language, toggleLanguage } = useLanguage();

	useEffect(() => {
		document.documentElement.lang = language;
	}, [language]);

	const headerLinks = [
		{
			text: language === "en" ? "Examples" : "Примеры",
			href: "/example-resume",
			src: "lamp.svg",
		},
		{
			text: language === "en" ? "My profile" : "Мой профиль",
			href: "/profile",
			src: "settings.svg",
		},
	];

	return (
		<header className="fixed top-0 left-0 right-0 z-50 flex bg-gradient-to-l from-amber-100 via-amber-50 to-white h-15 w-full justify-center">
			<div className="flex container mx-auto justify-between">
				<Link href="/" className="self-center">
					<div className="font-medium text-3xl hover:text-amber-400 transition-colors duration-200 text-shadow-lg">
						{language === "en" ? (
							<>
								<span className="text-amber-400">I</span>nteractive{" "}
								<span className="text-amber-400">R</span>esume{" "}
								<span className="text-amber-400">B</span>uilder
							</>
						) : (
							<>
								<span className="text-amber-400">К</span>онструктор{" "}
								<span className="text-amber-400">р</span>езюме
							</>
						)}
					</div>
				</Link>

				<nav className="flex items-center gap-4 self-center text-amber-400 font-medium text-shadow-md">
					{headerLinks.map((link, index) => (
						<Link
							key={index}
							href={link.href}
							className="flex items-center hover:text-black transition-colors duration-200"
						>
							<Image
								src={`/${link.src}`}
								alt={link.text}
								width={20}
								height={20}
								className="mr-2"
							/>
							{link.text}
						</Link>
					))}

					<button
						onClick={toggleLanguage}
						className="flex items-center justify-center h-8 w-12 rounded-md border border-amber-200 bg-amber-50 hover:bg-amber-100 transition-colors duration-200"
					>
						<span className="text-sm font-medium">{language}</span>
					</button>
				</nav>
			</div>
		</header>
	);
}

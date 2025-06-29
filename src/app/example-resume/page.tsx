"use client";

import ExampleResumeView from "@/components/ExampleResumeView";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ExampleResumePage() {
	const { language } = useLanguage();

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-black text-shadow-lg">
					{language === "en" ? "Example Resume" : "Пример резюме"}
				</h1>
				<Link
					href="/"
					className="border-2 border-amber-200 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-lg transition-colors"
				>
					{language === "en" ? "Back to Resumes" : "Назад к резюме"}
				</Link>
			</div>
			<ExampleResumeView />
		</div>
	);
}

"use client";

import Link from "next/link";
import { useResume } from "@/context/ResumeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Page() {
	const { language } = useLanguage();
	const { isHydrated, updateResume } = useResume();

	if (!isHydrated) {
		return <div>{language === "en" ? "Loading..." : "Загрузка..."}</div>;
	}

	const handleAnythingClick = () => {
		updateResume({ profession: language === "en" ? "Anything" : "Любая" });
	};

	return (
		<div className="flex justify-center mt-15">
			<Link href="/stage1/choice">
				<button className="w-70 h-20 border-2 border-amber-100 rounded-2xl shadow-md bg-amber-50/50 hover:scale-115 active:scale-95 transition-all duration-300 px-2 text-black/70 hover:text-black mx-4">
					<span className="text-lg text-shadow-md">
						{language === "en" ? "I know what I want!" : "Я знаю, что хочу!"}
					</span>
				</button>
			</Link>
			<Link href="/stage1/examples">
				<button className="w-70 h-20 border-2 border-amber-100 rounded-2xl shadow-md bg-amber-50/50 hover:scale-115 active:scale-95 transition-all duration-300 px-2 text-black/70 hover:text-black mx-4">
					<span className="text-lg text-shadow-md">
						{language === "en"
							? "I don't know what I want."
							: "Я не знаю, что хочу."}
					</span>
				</button>
			</Link>
			<Link href="/stage2">
				<button
					className="w-70 h-20 border-2 border-amber-100 rounded-2xl shadow-md bg-amber-50/50 hover:scale-115 active:scale-95 transition-all duration-300 px-2 text-black/70 hover:text-black mx-4"
					onClick={handleAnythingClick}
				>
					<span className="text-lg text-shadow-md">
						{language === "en"
							? "I'm looking for anything."
							: "Рассматриваю любые варианты."}
					</span>
				</button>
			</Link>
		</div>
	);
}

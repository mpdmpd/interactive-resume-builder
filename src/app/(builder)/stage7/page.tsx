"use client";

import { useState, useEffect } from "react";
import ProgressBar from "@/components/ProgressBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Resume } from "@/types/resume";
import { useLanguage } from "@/context/LanguageContext";

export default function Page() {
	const { language } = useLanguage();
	const [countdown, setCountdown] = useState(10);
	const router = useRouter();

	const archiveAndGoHome = () => {
		Resume.archiveCurrentResume();
		localStorage.removeItem("resumeData");
		router.push("/");
	};

	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					archiveAndGoHome();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [router]);

	return (
		<div className="container">
			<ProgressBar progress={6} />

			<div className="flex justify-center">
				<span className="text-5xl font-medium text-shadow-md">
					{language === "en" ? "That's all!" : "Готово!"}
				</span>
			</div>

			<div className="flex justify-center mt-6">
				<p className="text-lg text-shadow-sm text-black/70">
					{language === "en"
						? `You will be redirected to home page in ${countdown} seconds...`
						: `Вы будете перенаправлены на главную страницу через ${countdown} секунд...`}
				</p>
			</div>

			<div className="container flex justify-center mt-10 text-center mb-10">
				<Link href="/stage6">
					<button className="border-2 border-amber-200 bg-amber-50 hover:bg-amber-100 h-12 w-20 rounded-2xl hover:scale-115 active:scale-95 transition-all duration-300 px-2 text-black/70 hover:text-black hover:border-amber-400">
						<span className="text-shadow-md">
							{language === "en" ? "Back" : "Назад"}
						</span>
					</button>
				</Link>
				<button
					onClick={archiveAndGoHome}
					className="border-2 border-amber-200 ml-5 bg-amber-50 hover:bg-amber-100 h-12 w-30 rounded-2xl hover:scale-115 active:scale-95 transition-all duration-300 px-2 text-black/70 hover:text-black hover:border-amber-400"
				>
					<span className="text-shadow-md">
						{language === "en" ? "Home" : "На главную"}
					</span>
				</button>
			</div>
		</div>
	);
}

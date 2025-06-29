"use client";

import ProgressBar from "@/components/ProgressBar";
import { useLanguage } from "@/context/LanguageContext";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { language } = useLanguage();

	return (
		<div className="container">
			<ProgressBar progress={0} />

			<div className="flex justify-center">
				<span className="text-3xl font-medium text-shadow-md">
					{language === "en"
						? "What do you want to work as?"
						: "Кем вы хотите работать?"}
				</span>
			</div>

			<div className="container">{children}</div>
		</div>
	);
}

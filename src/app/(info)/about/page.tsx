"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
	const { language } = useLanguage();

	return (
		<div className="container mx-auto bg-gradient-to-b from-amber-50 to-white p-8">
			<div className="mt-5 mx-auto">
				<h1 className="text-4xl font-bold text-black mb-8 text-shadow-lg">
					{language === "en" ? "About Resume Builder" : "О Конструкторе Резюме"}
				</h1>

				<section className="mb-10">
					<h2 className="text-2xl font-semibold text-amber-400 text-shadow-md mb-4">
						{language === "en"
							? "Technologies Used"
							: "Используемые технологии"}
					</h2>
					<ul className="grid grid-cols-2 gap-4">
						<li className="bg-amber-100 p-4 rounded-lg shadow">
							Next.js 15 with Turbopack
						</li>
						<li className="bg-amber-100 p-4 rounded-lg shadow">React 19</li>
						<li className="bg-amber-100 p-4 rounded-lg shadow">
							Tailwind CSS v4
						</li>
						<li className="bg-amber-100 p-4 rounded-lg shadow">TypeScript</li>
					</ul>
				</section>

				<section className="mb-10">
					<h2 className="text-2xl font-semibold text-amber-400 mb-4 text-shadow-md">
						{language === "en" ? "Project Features" : "Возможности проекта"}
					</h2>
					<div className="space-y-4">
						<div className="bg-amber-50 p-4 rounded-lg shadow">
							<h3 className="text-xl font-medium text-amber-300">
								{language === "en"
									? "Interactive Resume Creation"
									: "Интерактивное создание резюме"}
							</h3>
							<p className="mt-2">
								{language === "en"
									? "Create professional resumes with an intuitive drag-and-drop interface."
									: "Создавайте профессиональные резюме с интуитивно понятным интерфейсом."}
							</p>
						</div>
						<div className="bg-amber-50 p-4 rounded-lg shadow">
							<h3 className="text-xl font-medium text-amber-300">
								{language === "en" ? "User profile" : "Профиль пользователя"}
							</h3>
							<p className="mt-2">
								{language === "en"
									? "Full user registration and login to accounts. Flexible profile editing."
									: "Полная регистрация пользователя и вход в аккаунты. Гибкое редактирование профиля."}
							</p>
						</div>
						<div className="bg-amber-50 p-4 rounded-lg shadow">
							<h3 className="text-xl font-medium text-amber-300">
								{language === "en" ? "Resume examples" : "Примеры резюме"}
							</h3>
							<p className="mt-2">
								{language === "en"
									? "Several clear and detailed examples of resume writing in various fields of work."
									: "Несколько наглядных и подробных примера написания резюме в различных сферах работы."}
							</p>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}

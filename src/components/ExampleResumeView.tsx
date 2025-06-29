"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ExampleResumeView() {
	const { language } = useLanguage();

	const exampleResume = {
		profession:
			language === "en"
				? "Senior Frontend Developer"
				: "Старший фронтенд-разработчик",
		name: language === "en" ? "John" : "Иван",
		surname: language === "en" ? "Doe" : "Петров",
		gender: language === "en" ? "Man" : "Мужчина",
		email: "john.doe@example.com",
		phone: ["+1 (123) 456-7890", "+1 (987) 654-3210"],
		birthDate: "1985-05-15",
		country: language === "en" ? "United States" : "США",
		softSkills:
			language === "en"
				? [
						"Teamwork",
						"Communication",
						"Problem Solving",
						"Time Management",
						"Adaptability",
				  ]
				: [
						"Командная работа",
						"Коммуникация",
						"Решение проблем",
						"Тайм-менеджмент",
						"Адаптивность",
				  ],
		aboutYourself:
			language === "en"
				? "Experienced frontend developer with 8+ years of experience building responsive and accessible web applications. Passionate about creating intuitive user interfaces and optimizing performance. Strong collaboration skills with designers and backend developers."
				: "Опытный фронтенд-разработчик с более чем 8-летним стажем создания адаптивных и доступных веб-приложений. Увлечен созданием интуитивно понятных пользовательских интерфейсов и оптимизацией производительности. Обладает сильными навыками сотрудничества с дизайнерами и бэкенд-разработчиками.",
		hardSkills: [
			"JavaScript",
			"TypeScript",
			"React",
			"Next.js",
			"Redux",
			"HTML5",
			"CSS3",
			"SASS",
			"Git",
			"Jest",
			"Webpack",
		],
		educationLevel: language === "en" ? "Master's degree" : "Магистр",
		institution:
			language === "en"
				? "Massachusetts Institute of Technology"
				: "Массачусетский технологический институт",
		city: language === "en" ? "Cambridge, MA" : "Кембридж, Массачусетс",
		startYear: "2008",
		endYear: "2012",
		jobExperience: language === "en" ? "5-10 years" : "5-10 лет",
		workExperience: [
			{
				company: "TechCorp Inc.",
				position:
					language === "en"
						? "Senior Frontend Developer"
						: "Старший фронтенд-разработчик",
				startYear: "2018",
				endYear: language === "en" ? "Present" : "Настоящее время",
			},
			{
				company: "WebSolutions Ltd.",
				position:
					language === "en" ? "Frontend Developer" : "Фронтенд-разработчик",
				startYear: "2014",
				endYear: "2018",
			},
			{
				company: "Digital Creations",
				position:
					language === "en"
						? "Junior Web Developer"
						: "Младший веб-разработчик",
				startYear: "2012",
				endYear: "2014",
			},
		],
	};

	return (
		<div className="bg-amber-50 rounded-2xl shadow-lg p-8 border-2 border-amber-100">
			{/* Personal Information */}
			<div className="mb-8">
				<h2 className="text-2xl font-semibold text-amber-400 border-b-2 border-amber-200 pb-2 mb-4">
					{language === "en" ? "Personal Information" : "Личная информация"}
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<p className="font-medium">
							{language === "en" ? "Name:" : "Имя:"}
						</p>
						<p>
							{exampleResume.name} {exampleResume.surname}
						</p>
					</div>
					<div>
						<p className="font-medium">
							{language === "en" ? "Gender:" : "Пол:"}
						</p>
						<p>{exampleResume.gender}</p>
					</div>
					<div>
						<p className="font-medium">Email:</p>
						<p>{exampleResume.email}</p>
					</div>
					<div>
						<p className="font-medium">
							{language === "en" ? "Phone:" : "Телефон:"}
						</p>
						<p>{exampleResume.phone.join(", ")}</p>
					</div>
					<div>
						<p className="font-medium">
							{language === "en" ? "Birth Date:" : "Дата рождения:"}
						</p>
						<p>{exampleResume.birthDate}</p>
					</div>
					<div>
						<p className="font-medium">
							{language === "en" ? "Country:" : "Страна:"}
						</p>
						<p>{exampleResume.country}</p>
					</div>
				</div>
			</div>

			{/* Skills */}
			<div className="mb-8">
				<h2 className="text-2xl font-semibold text-amber-400 border-b-2 border-amber-200 pb-2 mb-4">
					{language === "en" ? "Skills" : "Навыки"}
				</h2>
				<div className="mb-6">
					<h3 className="text-xl font-medium text-amber-300 mb-2">
						{language === "en" ? "Hard Skills:" : "Технические навыки:"}
					</h3>
					<div className="flex flex-wrap gap-2">
						{exampleResume.hardSkills.map((skill, index) => (
							<span
								key={index}
								className="bg-amber-200 px-3 py-1 rounded-full text-sm"
							>
								{skill}
							</span>
						))}
					</div>
				</div>
				<div>
					<h3 className="text-xl font-medium text-amber-300 mb-2">
						{language === "en" ? "Soft Skills:" : "Гибкие навыки:"}
					</h3>
					<div className="flex flex-wrap gap-2">
						{exampleResume.softSkills.map((skill, index) => (
							<span
								key={index}
								className="bg-amber-100 px-3 py-1 rounded-full text-sm"
							>
								{skill}
							</span>
						))}
					</div>
				</div>
			</div>

			{/* About */}
			<div className="mb-8">
				<h2 className="text-2xl font-semibold text-amber-400 border-b-2 border-amber-200 pb-2 mb-4">
					{language === "en" ? "About Me" : "О себе"}
				</h2>
				<p className="whitespace-pre-line">{exampleResume.aboutYourself}</p>
			</div>

			{/* Education */}
			<div className="mb-8">
				<h2 className="text-2xl font-semibold text-amber-400 border-b-2 border-amber-200 pb-2 mb-4">
					{language === "en" ? "Education" : "Образование"}
				</h2>
				<div className="bg-amber-100 rounded-lg p-4">
					<p className="font-medium">{exampleResume.educationLevel}</p>
					<p>
						{exampleResume.institution}, {exampleResume.city}
					</p>
					<p>
						{exampleResume.startYear} - {exampleResume.endYear}
					</p>
				</div>
			</div>

			{/* Work Experience */}
			<div className="mb-8">
				<h2 className="text-2xl font-semibold text-amber-400 border-b-2 border-amber-200 pb-2 mb-4">
					{language === "en" ? "Work Experience" : "Опыт работы"}
				</h2>
				<div className="mb-4">
					<p className="font-medium">
						{language === "en" ? "Experience Level:" : "Уровень опыта:"}
					</p>
					<p>{exampleResume.jobExperience}</p>
				</div>

				<div className="space-y-4">
					{exampleResume.workExperience.map((exp, index) => (
						<div key={index} className="bg-amber-100 rounded-lg p-4">
							<p className="font-medium">{exp.position}</p>
							<p>{exp.company}</p>
							<p>
								{exp.startYear} - {exp.endYear}
							</p>
						</div>
					))}
				</div>
			</div>

			<div className="mt-8 pt-4 border-t border-amber-200">
				<p className="text-sm text-black">
					{language === "en"
						? "This is an example resume. Create your own to get started!"
						: "Это пример резюме. Создайте свое собственное, чтобы начать!"}
				</p>
				<Link href="/">
					<button className="mt-4 border-2 border-amber-300 bg-amber-100 hover:bg-amber-200 px-6 py-2 rounded-lg transition-colors">
						{language === "en" ? "Create Your Resume" : "Создать резюме"}
					</button>
				</Link>
			</div>
		</div>
	);
}

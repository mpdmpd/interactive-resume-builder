"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

type WorkExperience = {
	company: string;
	position: string;
	startYear: string;
	endYear: string;
	description: string;
};

type Resume = {
	id?: string;
	profession: string;
	surname: string;
	name: string;
	gender: "Man" | "Woman";
	email: string;
	phone: string[];
	birthDate: string;
	country: string;
	city: string;
	softSkills: string[];
	aboutYourself: string;
	hardSkills: string[];
	educationLevel: string;
	institution: string;
	startYear: string;
	endYear: string;
	jobExperience: string;
	workExperience: WorkExperience[];
};

export default function ExampleResumeView() {
	const { language } = useLanguage();

	const getGenderLabel = (gender: string) => {
		if (language === "ru") {
			return gender === "Man" ? "Мужской" : "Женский";
		}
		return gender;
	};

	const exampleResumes: Resume[] = [
		{
			id: "1",
			profession:
				language === "en"
					? "Senior Frontend Developer"
					: "Старший фронтенд-разработчик",
			name: "Иван",
			surname: "Петров",
			gender: "Man",
			email: "ivan.petrov@example.com",
			phone: ["+7 (912) 345-67-89"],
			birthDate: "1988-11-23",
			country: language === "en" ? "Russia" : "Россия",
			city: language === "en" ? "Moscow" : "Москва",
			softSkills:
				language === "en"
					? ["Teamwork", "Time Management", "Critical Thinking"]
					: ["Командная работа", "Тайм-менеджмент", "Критическое мышление"],
			aboutYourself:
				language === "en"
					? "Lead developer with 10+ years experience in banking applications. Expert in React and state management."
					: "Ведущий разработчик с 10+ годами опыта в банковских приложениях. Эксперт по React и управлению состоянием.",
			hardSkills: ["JavaScript", "React", "Redux", "Webpack"],
			educationLevel: language === "en" ? "Master's degree" : "Магистр",
			institution:
				language === "en"
					? "Moscow State University"
					: "Московский государственный университет",
			startYear: "2006",
			endYear: "2011",
			jobExperience: language === "en" ? "10+ years" : "10+ лет",
			workExperience: [
				{
					company: "SberTech",
					position: language === "en" ? "Team Lead" : "Тимлид",
					startYear: "2018",
					endYear: language === "en" ? "Present" : "Настоящее время",
					description:
						language === "en"
							? "Leading a team of 5 frontend developers working on banking applications"
							: "Руководство командой из 5 фронтенд-разработчиков, работающих над банковскими приложениями",
				},
				{
					company: "Yandex",
					position:
						language === "en"
							? "Senior Frontend Developer"
							: "Старший фронтенд-разработчик",
					startYear: "2014",
					endYear: "2018",
					description:
						language === "en"
							? "Developed and maintained web applications using React and Redux"
							: "Разработка и поддержка веб-приложений на React и Redux",
				},
			],
		},
		{
			id: "2",
			profession: language === "en" ? "UX/UI Designer" : "UX/UI Дизайнер",
			name: "Emily",
			surname: "Johnson",
			gender: "Woman",
			email: "emily.j@example.com",
			phone: ["+1 (415) 555-0192"],
			birthDate: "1992-07-04",
			country: "United States",
			city: "San Francisco, CA",
			softSkills:
				language === "en"
					? ["Creativity", "Communication", "Empathy"]
					: ["Креативность", "Коммуникация", "Эмпатия"],
			aboutYourself:
				language === "en"
					? "Passionate designer focused on creating intuitive user experiences for SaaS products."
					: "Увлеченный дизайнер, создающий интуитивные пользовательские интерфейсы для SaaS-продуктов.",
			hardSkills: ["Figma", "Sketch", "Adobe XD", "User Research"],
			educationLevel: language === "en" ? "Bachelor's degree" : "Бакалавр",
			institution: "Stanford University",
			startYear: "2010",
			endYear: "2014",
			jobExperience: language === "en" ? "5-7 years" : "5-7 лет",
			workExperience: [
				{
					company: "Salesforce",
					position: "Senior Product Designer",
					startYear: "2019",
					endYear: language === "en" ? "Present" : "Настоящее время",
					description:
						language === "en"
							? "Leading design for enterprise SaaS products"
							: "Руководство дизайном корпоративных SaaS-продуктов",
				},
				{
					company: "Adobe",
					position: "UI Designer",
					startYear: "2016",
					endYear: "2019",
					description:
						language === "en"
							? "Created UI components and design systems"
							: "Создание UI-компонентов и дизайн-систем",
				},
			],
		},
		{
			id: "3",
			profession: language === "en" ? "Mechanical Engineer" : "Инженер-механик",
			name: "Hans",
			surname: "Schmidt",
			gender: "Man",
			email: "h.schmidt@example.com",
			phone: ["+49 89 1234567"],
			birthDate: "1985-03-18",
			country: language === "en" ? "Germany" : "Германия",
			city: language === "en" ? "Munich" : "Мюнхен",
			softSkills:
				language === "en"
					? ["Precision", "Analytical Thinking", "Project Management"]
					: ["Точность", "Аналитическое мышление", "Управление проектами"],
			aboutYourself:
				language === "en"
					? "Specialized in automotive industry with focus on electric vehicles."
					: "Специалист в автомобильной промышленности с фокусом на электромобили.",
			hardSkills: ["CAD", "SolidWorks", "FEA", "DFM"],
			educationLevel: language === "en" ? "Diploma" : "Диплом",
			institution:
				language === "en"
					? "Technical University of Munich"
					: "Мюнхенский технический университет",
			startYear: "2004",
			endYear: "2009",
			jobExperience: language === "en" ? "12+ years" : "12+ лет",
			workExperience: [
				{
					company: "BMW",
					position: language === "en" ? "Lead Engineer" : "Ведущий инженер",
					startYear: "2015",
					endYear: language === "en" ? "Present" : "Настоящее время",
					description:
						language === "en"
							? "Leading mechanical engineering team for electric vehicle components"
							: "Руководство командой инженеров-механиков по компонентам электромобилей",
				},
				{
					company: "Audi",
					position: language === "en" ? "Senior Engineer" : "Старший инженер",
					startYear: "2010",
					endYear: "2015",
					description:
						language === "en"
							? "Developed mechanical systems for automotive applications"
							: "Разработка механических систем для автомобильных приложений",
				},
			],
		},
	];

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-black text-shadow-lg">
					{language === "en" ? "Example Resumes" : "Примеры резюме"}
				</h1>
				<Link
					href="/"
					className="border-2 border-amber-200 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-lg transition-colors"
				>
					{language === "en" ? "Back to Resumes" : "К списку резюме"}
				</Link>
			</div>

			<div className="space-y-8">
				{exampleResumes.map((resume) => (
					<div
						key={resume.id}
						className="bg-amber-50 rounded-2xl shadow-lg p-8 border-2 border-amber-100"
					>
						<div className="flex justify-between items-start mb-6">
							<h1 className="text-3xl font-bold text-black text-shadow-lg">
								{resume.profession ||
									(language === "en"
										? "Untitled Resume"
										: "Резюме без названия")}
							</h1>
						</div>

						<div className="mb-8">
							<h2 className="text-2xl font-semibold text-amber-400 border-b-2 border-amber-200 pb-2 mb-4">
								{language === "en"
									? "Personal Information"
									: "Личная информация"}
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<p className="font-medium">
										{language === "en" ? "Name:" : "Имя:"}
									</p>
									<p>
										{resume.name} {resume.surname}
									</p>
								</div>
								<div>
									<p className="font-medium">
										{language === "en" ? "Gender:" : "Пол:"}
									</p>
									<p>{getGenderLabel(resume.gender)}</p>
								</div>
								<div>
									<p className="font-medium">Email:</p>
									<p>{resume.email}</p>
								</div>
								<div>
									<p className="font-medium">
										{language === "en" ? "Phone:" : "Телефон:"}
									</p>
									<p>{resume.phone.join(", ")}</p>
								</div>
								<div>
									<p className="font-medium">
										{language === "en" ? "Birth Date:" : "Дата рождения:"}
									</p>
									<p>{resume.birthDate}</p>
								</div>
								<div>
									<p className="font-medium">
										{language === "en" ? "Country:" : "Страна:"}
									</p>
									<p>{resume.country}</p>
								</div>
							</div>
						</div>

						<div className="mb-8">
							<h2 className="text-2xl font-semibold text-amber-400 border-b-2 border-amber-200 pb-2 mb-4">
								{language === "en" ? "Skills" : "Навыки"}
							</h2>
							<div className="mb-6">
								<h3 className="text-xl font-medium text-amber-300 mb-2">
									{language === "en"
										? "Hard Skills:"
										: "Профессиональные навыки:"}
								</h3>
								<div className="flex flex-wrap gap-2">
									{resume.hardSkills.map((skill, index) => (
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
									{resume.softSkills.map((skill, index) => (
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

						{resume.aboutYourself && (
							<div className="mb-8">
								<h2 className="text-2xl font-semibold text-amber-400 border-b-2 border-amber-200 pb-2 mb-4">
									{language === "en" ? "About Me" : "О себе"}
								</h2>
								<p className="whitespace-pre-line">{resume.aboutYourself}</p>
							</div>
						)}

						{resume.educationLevel && (
							<div className="mb-8">
								<h2 className="text-2xl font-semibold text-amber-400 border-b-2 border-amber-200 pb-2 mb-4">
									{language === "en" ? "Education" : "Образование"}
								</h2>
								<div className="bg-amber-100 rounded-lg p-4">
									<p className="font-medium">{resume.educationLevel}</p>
									<p>
										{resume.institution}, {resume.city}
									</p>
									<p>
										{resume.startYear} -{" "}
										{resume.endYear ||
											(language === "en" ? "Present" : "Настоящее время")}
									</p>
								</div>
							</div>
						)}

						{resume.jobExperience && (
							<div className="mb-8">
								<h2 className="text-2xl font-semibold text-amber-400 border-b-2 border-amber-200 pb-2 mb-4">
									{language === "en" ? "Work Experience" : "Опыт работы"}
								</h2>
								<div className="mb-4">
									<p className="font-medium">
										{language === "en" ? "Experience Level:" : "Уровень опыта:"}
									</p>
									<p>{resume.jobExperience}</p>
								</div>

								{resume.workExperience.length > 0 && (
									<div className="space-y-4">
										{resume.workExperience.map((exp, index) => (
											<div key={index} className="bg-amber-100 rounded-lg p-4">
												<p className="font-medium">{exp.position}</p>
												<p>{exp.company}</p>
												<p>
													{exp.startYear} -{" "}
													{exp.endYear ||
														(language === "en" ? "Present" : "Настоящее время")}
												</p>
												{exp.description && (
													<p className="mt-2 text-sm">{exp.description}</p>
												)}
											</div>
										))}
									</div>
								)}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

"use client";

import Link from "next/link";
import { Resume } from "@/types/resume";
import { useLanguage } from "@/context/LanguageContext";

interface ResumeFullViewProps {
	resume: Resume;
}

export default function ResumeFullView({ resume }: ResumeFullViewProps) {
	const { language } = useLanguage();

	const getGenderLabel = (gender: string) => {
		if (language === "ru") {
			return gender === "Man"
				? "Мужской"
				: gender === "Woman"
				? "Женский"
				: gender;
		}
		return gender;
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="bg-amber-50 rounded-2xl shadow-lg p-8 border-2 border-amber-100">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-black text-shadow-lg">
						{resume.profession ||
							(language === "en" ? "Untitled Resume" : "Резюме без названия")}
					</h1>
					<Link
						href="/"
						className="border-2 border-amber-200 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-lg transition-colors"
					>
						{language === "en" ? "Back to Resumes" : "К списку резюме"}
					</Link>
				</div>

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

				{/* Skills */}
				<div className="mb-8">
					<h2 className="text-2xl font-semibold text-amber-400 border-b-2 border-amber-200 pb-2 mb-4">
						{language === "en" ? "Skills" : "Навыки"}
					</h2>
					<div className="mb-6">
						<h3 className="text-xl font-medium text-amber-300 mb-2">
							{language === "en" ? "Hard Skills:" : "Профессиональные навыки:"}
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

				{/* About */}
				{resume.aboutYourself && (
					<div className="mb-8">
						<h2 className="text-2xl font-semibold text-amber-400 border-b-2 border-amber-200 pb-2 mb-4">
							{language === "en" ? "About Me" : "О себе"}
						</h2>
						<p className="whitespace-pre-line">{resume.aboutYourself}</p>
					</div>
				)}

				{/* Education */}
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

				{/* Work Experience */}
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
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

"use client";

import Link from "next/link";
import { useResume } from "@/context/ResumeContext";
import { Resume } from "@/types/resume";
import ResumeView from "@/components/ResumeView";
import { useEffect, useState } from "react";
import { getCurrentUser, User } from "@/lib/user";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
	const { language } = useLanguage();
	const { resetResume } = useResume();
	const [savedResumes, setSavedResumes] = useState<Resume[]>([]);
	const [resumeKeys, setResumeKeys] = useState<string[]>([]);
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	const width = language === "ru" ? "w-40" : "w-30";

	useEffect(() => {
		loadResumes();
		setCurrentUser(getCurrentUser());
	}, []);

	const loadResumes = () => {
		const keys = Object.keys(localStorage);
		const resumeKeys = keys.filter((key) => key.startsWith("resume_"));
		setResumeKeys(resumeKeys);

		const resumes = resumeKeys
			.map((key) => {
				const data = localStorage.getItem(key);
				if (data) {
					const parsed = JSON.parse(data);
					const resume = new Resume();
					Object.assign(resume, parsed);
					return resume;
				}
				return null;
			})
			.filter(Boolean) as Resume[];

		setSavedResumes(resumes);
	};

	const handleNewResume = () => {
		const newResume = new Resume();
		localStorage.setItem("resumeData", JSON.stringify(newResume));
		resetResume();
	};

	const handleDeleteResume = (index: number) => {
		const keyToDelete = resumeKeys[index];
		if (keyToDelete) {
			localStorage.removeItem(keyToDelete);
			loadResumes();
		}
	};

	return (
		<div>
			<div className="flex justify-between h-30 w-[1533px] mx-auto mt-10">
				<div className="self-center ml-10 font-medium text-5xl text-shadow-lg text-amber-400 animate-pulse">
					{language === "en" ? "My resúmes" : "Мои резюме"}
				</div>

				<div className="flex border-2 border-amber-50 rounded-2xl mr-10 px-12 h-20 self-center justify-between items-center w-270 bg-gradient-to-br from-amber-200 via-amber-100 to-amber-50 shadow-sm">
					{currentUser ? (
						<>
							<span className="font-medium self-center text-xl">
								{language === "en" ? "Welcome," : "Добро пожаловать,"}{" "}
								<span className="font-semibold text-2xl">
									{currentUser.firstName}!
								</span>
							</span>
							<div>
								<span className="opacity-50 mr-2">
									{language === "en" ? "Go to" : "Перейти в"}
								</span>
								<Link href="/profile">
									<button
										className={`ml-2 border-2 border-white rounded-2xl h-12 ${width} hover:scale-115 opacity-80 hover:opacity-100 active:opacity-100 active:scale-95 transition-all duration-300 backdrop-blur-2xl shadow-2xl hover:shadow-2xl`}
									>
										<span className="text-lg font-medium text-shadow-md px-2">
											{language === "en" ? "My Profile" : "Мой профиль"}
										</span>
									</button>
								</Link>
							</div>
						</>
					) : (
						<div className="text-shadow-md ml-8">
							{language === "en"
								? "You are not logged in."
								: "Вы не авторизованы."}
							<span className="ml-5 opacity-50">
								{language === "en" ? "Click here" : "Нажмите здесь"}
								<span className="ml-2 text-2xl">→</span>
							</span>
							<Link href="/profile">
								<button className="ml-5 border-2 border-white rounded-2xl h-12 w-30 hover:scale-115 opacity-80 hover:opacity-100 active:opacity-100 active:scale-95 transition-all duration-300 backdrop-blur-2xl shadow-2xl hover:shadow-2xl">
									<span className="text-lg font-medium text-shadow-md">
										{language === "en" ? "Sign in" : "Войти"}
										<img
											src="/login.svg"
											alt={"."}
											width={20}
											height={20}
											className="ml-1 inline"
										/>
									</span>
								</button>
							</Link>
							<span className="ml-5 opacity-50">
								{language === "en"
									? 'Or go to the "My profile" tab.'
									: 'Или перейдите во вкладку "Мой профиль".'}
							</span>
						</div>
					)}
				</div>
			</div>

			<Link href="/stage1">
				<button
					onClick={handleNewResume}
					className="bg-amber-50 h-20 w-69 ml-18 mt-10 rounded-2xl p-1 border-2 border-amber-100 shadow-2xl opacity-80 hover:opacity-100 active:opacity-100 hover:scale-105 active:scale-95 transition-all duration-300"
				>
					<span className="text-2xl font-medium text-shadow-md">
						{language === "en" ? "New Resume" : "Новое резюме"}
						<img
							src="/new.svg"
							alt={"."}
							width={30}
							height={30}
							className="ml-2 inline mb-1"
						/>
					</span>
				</button>
			</Link>

			{savedResumes.length > 0 ? (
				savedResumes.map((resume, index) => (
					<ResumeView
						key={index}
						profession={resume.profession}
						onDelete={() => handleDeleteResume(index)}
						resumeKey={resumeKeys[index]}
					/>
				))
			) : (
				<div className="flex mx-auto mt-20 h-30 w-350 border-2 border-amber-200/20 rounded-md bg-amber-50/30 shadow-md p-5">
					<span className="text-black/70">
						{language === "en"
							? "You don't have a ready resume yet."
							: "У вас еще нет готового резюме."}
					</span>
					<span className="ml-1">
						{language === "en"
							? "Start creating it right now!"
							: " Начните создавать его прямо сейчас!"}
					</span>
				</div>
			)}
		</div>
	);
}

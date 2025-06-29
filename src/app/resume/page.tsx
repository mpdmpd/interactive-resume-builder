"use client";

import { useEffect, useState } from "react";
import ResumeFullView from "@/components/ResumeFullView";
import { useSearchParams } from "next/navigation";
import { Resume } from "@/types/resume";
import Link from "next/link";

export default function ResumePage() {
	const searchParams = useSearchParams();
	const resumeKey = searchParams.get("key");
	const [resumeData, setResumeData] = useState<Resume | null>(null);

	useEffect(() => {
		if (resumeKey) {
			const data = localStorage.getItem(resumeKey);
			if (data) {
				try {
					const parsed = JSON.parse(data);
					const resume = new Resume();
					Object.assign(resume, parsed);
					resume.phone = parsed.phone || [];
					resume.softSkills = parsed.softSkills || [];
					resume.hardSkills = parsed.hardSkills || [];
					resume.workExperience = parsed.workExperience || [];
					setResumeData(resume);
				} catch (e) {
					console.error("Error parsing resume data:", e);
				}
			}
		}
	}, [resumeKey]);

	if (!resumeData) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-center">
					<p className="text-xl mb-4">Loading resume...</p>
					<Link
						href="/"
						className="text-amber-600 hover:text-amber-800 underline"
					>
						Back to resumes list
					</Link>
				</div>
			</div>
		);
	}

	return <ResumeFullView resume={resumeData} />;
}

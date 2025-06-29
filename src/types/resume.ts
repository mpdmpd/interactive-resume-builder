export class Resume {
	// Personal Information
	profession: string;
	surname: string;
	name: string;
	gender: "Man" | "Woman" | "Мужчина" | "Женщина";
	email: string;
	phone: string[];
	birthDate: string;
	country: string;

	// Skills and About
	softSkills: string[];
	aboutYourself: string;
	hardSkills: string[];

	// Education
	educationLevel: string;
	institution: string;
	city: string;
	startYear: string;
	endYear: string;

	// Experience
	jobExperience: string;
	workExperience: WorkExperience[];

	constructor() {
		this.profession = "";
		this.surname = "";
		this.name = "";
		this.gender = "Man";
		this.email = "";
		this.phone = [];
		this.birthDate = "";
		this.country = "";
		this.softSkills = [];
		this.aboutYourself = "";
		this.hardSkills = [];
		this.educationLevel = "";
		this.institution = "";
		this.city = "";
		this.startYear = "";
		this.endYear = "";
		this.jobExperience = "";
		this.workExperience = [];
	}

	saveToLocalStorage() {
		localStorage.setItem("resumeData", JSON.stringify(this));
	}

	static loadFromLocalStorage(): Resume {
		const savedData = localStorage.getItem("resumeData");
		const resume = new Resume();
		if (savedData) {
			try {
				const parsed = JSON.parse(savedData);
				Object.assign(resume, parsed);
				// Ensure arrays are properly initialized
				resume.phone = parsed.phone || [];
				resume.softSkills = parsed.softSkills || [];
				resume.hardSkills = parsed.hardSkills || [];
				resume.workExperience = parsed.workExperience || [];
			} catch (e) {
				console.error("Failed to parse saved resume data", e);
			}
		}
		return resume;
	}

	static archiveCurrentResume() {
		try {
			const currentResume = localStorage.getItem("resumeData");
			if (!currentResume) return;
			const nextNumber = this.getNextResumeNumber();
			localStorage.setItem(`resume_${nextNumber}`, currentResume);
		} catch (e) {
			console.error("Archive error:", e);
		}
	}

	static getNextResumeNumber(): number {
		const keys = Object.keys(localStorage);
		const resumeKeys = keys.filter((key) => key.startsWith("resume_"));
		let maxNumber = 0;

		resumeKeys.forEach((key) => {
			const number = parseInt(key.replace("resume_", ""));
			if (number > maxNumber) {
				maxNumber = number;
			}
		});

		return maxNumber + 1;
	}
}

interface WorkExperience {
	company: string;
	position: string;
	startYear: string;
	endYear: string;
}

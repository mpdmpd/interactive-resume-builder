"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	useCallback,
} from "react";
import { Resume } from "@/types/resume";

type ResumeContextType = {
	resume: Resume;
	updateResume: (updates: Partial<Resume>) => void;
	resetResume: () => void;
	isHydrated: boolean;
	saveResume: () => void;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
	const [resume, setResume] = useState<Resume>(new Resume());
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		const savedResume = Resume.loadFromLocalStorage();
		setResume(savedResume);
		setIsHydrated(true);
	}, []);

	const updateResume = useCallback((updates: Partial<Resume>) => {
		setResume((prev) => {
			const updated = new Resume();
			Object.assign(updated, prev, updates);
			updated.saveToLocalStorage();
			return updated;
		});
	}, []);

	const saveResume = useCallback(() => {
		resume.saveToLocalStorage();
	}, [resume]);

	const resetResume = useCallback(() => {
		const newResume = new Resume();
		setResume(newResume);
	}, []);

	return (
		<ResumeContext.Provider
			value={{
				resume,
				updateResume,
				resetResume,
				isHydrated,
				saveResume,
			}}
		>
			{children}
		</ResumeContext.Provider>
	);
}

export function useResume() {
	const context = useContext(ResumeContext);
	if (!context) {
		throw new Error("useResume must be used within a ResumeProvider");
	}
	return context;
}

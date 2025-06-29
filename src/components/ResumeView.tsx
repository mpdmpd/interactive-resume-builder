"use client";

import { useState } from "react";
import DeleteModal from "./DeleteModal";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface ResumeViewProps {
	profession: string;
	onDelete: () => void;
	resumeKey: string;
}

export default function ResumeView({
	profession,
	onDelete,
	resumeKey,
}: ResumeViewProps) {
	const { language } = useLanguage();
	const [isHover, setIsHover] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const handleDeleteClick = () => {
		setIsDeleteModalOpen(true);
	};

	const handleConfirmDelete = () => {
		onDelete();
		setIsDeleteModalOpen(false);
	};

	const handleCancelDelete = () => {
		setIsDeleteModalOpen(false);
	};

	return (
		<>
			<div className="flex mx-auto mt-20 w-350 border-2 border-amber-200/20 rounded-md bg-amber-50/30 shadow-md p-5 justify-between">
				<div className="flex items-center">
					<span className="text-shadow-md opacity-80">
						{language === "en" ? "Resume" : "Резюме"}
					</span>
					<span
						className={`ml-5 text-3xl font-bold text-shadow-lg transition-colors duration-300 ${
							isHover && "text-amber-400"
						}`}
					>
						{profession}
					</span>
				</div>
				<div className="flex mr-5 gap-7">
					<Link
						href={`/resume?key=${resumeKey}`}
						className="border-2 border-amber-200 rounded-md px-4 py-1.5 bg-amber-50 shadow-lg hover:scale-115 active:scale-95 transition-all duration-300"
					>
						<button
							onMouseEnter={() => setIsHover(true)}
							onMouseLeave={() => setIsHover(false)}
						>
							<span className="font-medium text-shadow-md text-lg">
								{language === "en" ? "Full view" : "Полный просмотр"}
							</span>
						</button>
					</Link>
					<button
						onClick={handleDeleteClick}
						onMouseEnter={() => setIsHover(true)}
						onMouseLeave={() => setIsHover(false)}
						className="border-2 border-amber-200 rounded-md px-4 py-1 bg-amber-50 shadow-lg hover:scale-115 active:scale-95 transition-all duration-300"
					>
						<div className="flex items-center">
							<span className="font-medium text-shadow-md text-lg">
								{language === "en" ? "Delete" : "Удалить"}
							</span>
							<span className="text-2xl ml-1">×</span>
						</div>
					</button>
				</div>
			</div>

			<DeleteModal
				isOpen={isDeleteModalOpen}
				onClose={handleCancelDelete}
				onConfirm={handleConfirmDelete}
				profession={profession}
			/>
		</>
	);
}

"use client";

import { useLanguage } from "@/context/LanguageContext";

interface DeleteModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	profession: string;
}

export default function DeleteModal({
	isOpen,
	onClose,
	onConfirm,
	profession,
}: DeleteModalProps) {
	const { language } = useLanguage();

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 max-w-md w-full">
				<h3 className="text-xl font-bold mb-4 text-center">
					{language === "en" ? "Confirm Deletion" : "Подтвердите удаление"}
				</h3>
				<p className="mb-6">
					{language === "en"
						? `Are you sure you want to delete the resume for `
						: `Вы уверены, что хотите удалить резюме для `}
					<span className="font-semibold">{profession}</span>?
					{language === "en"
						? " This action cannot be undone."
						: " Это действие нельзя отменить."}
				</p>
				<div className="flex justify-center gap-4">
					<button
						onClick={onClose}
						className="px-4 py-2 border border-gray-300 rounded-md hover:bg-amber-100 transition-colors"
					>
						{language === "en" ? "Cancel" : "Отмена"}
					</button>
					<button
						onClick={onConfirm}
						className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
					>
						{language === "en" ? "Delete" : "Удалить"}
					</button>
				</div>
			</div>
		</div>
	);
}

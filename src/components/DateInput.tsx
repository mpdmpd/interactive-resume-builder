// DateInput.tsx
"use client";

import {
	forwardRef,
	useState,
	useImperativeHandle,
	useRef,
	useEffect,
} from "react";

interface DateInputProps {
	selectedDate?: string;
	onDateChange?: (date: string) => void;
	isInvalid?: boolean;
	language?: "en" | "ru";
}

const DateInput = forwardRef<{ reset: () => void }, DateInputProps>(
	(
		{ selectedDate = "", onDateChange, isInvalid = false, language = "en" },
		ref
	) => {
		const [hasValue, setHasValue] = useState(false);
		const dateInputRef = useRef<HTMLInputElement>(null);

		useImperativeHandle(ref, () => ({
			reset: () => {
				if (dateInputRef.current) {
					dateInputRef.current.value = "";
					setHasValue(false);
					onDateChange?.("");
				}
			},
		}));

		useEffect(() => {
			if (dateInputRef.current) {
				dateInputRef.current.classList.add("hide-date-placeholder");
				setHasValue(!!selectedDate);
				if (selectedDate) {
					dateInputRef.current.value = selectedDate;
				}
			}
		}, [selectedDate]);

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			setHasValue(value !== "");
			onDateChange?.(value);
		};

		const getInputClass = () => {
			const baseClass = `border-2 rounded-md h-10 focus:outline-none shadow-lg px-2
          w-full text-gray-800 hide-date-placeholder transition-colors duration-300`;

			return isInvalid
				? `${baseClass} border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,1)]`
				: `${baseClass} border-amber-200 focus:border-amber-400`;
		};

		return (
			<div className="container justify-center mt-10">
				<div className="flex justify-center gap-2 items-center">
					<span className="text-shadow-md font-medium text-lg">
						{language === "en" ? "Date of birth" : "Дата рождения"}
					</span>
					<div className="relative">
						<input
							ref={dateInputRef}
							type="date"
							className={getInputClass()}
							onChange={handleChange}
							required
						/>
						{!hasValue && (
							<span
								className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none
                text-gray-500 opacity-70 text-sm"
							>
								{language === "en" ? "MM/DD/YYYY" : "ДД.ММ.ГГГГ"}
							</span>
						)}
					</div>
				</div>
			</div>
		);
	}
);

DateInput.displayName = "DateInput";

export default DateInput;

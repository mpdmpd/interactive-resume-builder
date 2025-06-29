import { useEffect, useState } from "react";

export function useLocalStorage<T>(
	key: string,
	initialValue: T
): [T, (value: T) => void] {
	const [storedValue, setStoredValue] = useState<T>(initialValue);

	useEffect(() => {
		try {
			const item = window.localStorage.getItem(key);
			setStoredValue(item ? JSON.parse(item) : initialValue);
		} catch (error) {
			console.error(error);
			setStoredValue(initialValue);
		}
	}, [key, initialValue]);

	const setValue = (value: T) => {
		try {
			setStoredValue(value);
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.error(error);
		}
	};

	return [storedValue, setValue];
}

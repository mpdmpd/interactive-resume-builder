export interface User {
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	gender?: string;
	email?: string;
	phoneNumber?: string;
	dateOfBirth?: string;
	country?: string;
}

const isBrowser = typeof window !== "undefined";

export const registerUser = (user: User): boolean => {
	if (!isBrowser) return false;

	const users = getUsers();
	if (users.some((u) => u.username === user.username)) {
		return false;
	}
	users.push(user);
	window.localStorage.setItem("users", JSON.stringify(users));
	return true;
};

export const authenticateUser = (
	username: string,
	password: string
): User | null => {
	if (!isBrowser) return null;

	const users = getUsers();
	const user = users.find(
		(u) => u.username === username && u.password === password
	);
	return user || null;
};

export const getCurrentUser = (): User | null => {
	if (!isBrowser) return null;

	const userJson = window.localStorage.getItem("currentUser");
	return userJson ? JSON.parse(userJson) : null;
};

export const setCurrentUser = (user: User | null) => {
	if (!isBrowser) return;

	if (user) {
		window.localStorage.setItem("currentUser", JSON.stringify(user));
	} else {
		window.localStorage.removeItem("currentUser");
	}
};

export const logoutUser = () => {
	if (!isBrowser) return;
	window.localStorage.removeItem("currentUser");
};

export const getUsers = (): User[] => {
	if (!isBrowser) return [];

	const usersJson = window.localStorage.getItem("users");
	return usersJson ? JSON.parse(usersJson) : [];
};

export const clearAll = (key, parse = false) => {
	localStorage.clear();
};

export const getItem = (key, parse = false) => {
	if (parse)
		return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : {};
	return localStorage.getItem(key);
};

export const setItem = (key, value) => {
	localStorage.setItem(key, value);
};
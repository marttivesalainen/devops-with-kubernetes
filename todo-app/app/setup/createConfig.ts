const requireInteger = (key: string): number => {
	const value = process.env[key];

	if (!value) {
		throw new Error(`Missing required environment variable: ${key}`);
	}

	const intValue = parseInt(value, 10);

	if (Number.isNaN(intValue)) {
		throw new Error(`Environment variable ${key} must be an integer`);
	}

	return intValue;
};

export const createConfig = () => {
	return {
		port: requireInteger("PORT"),
	};
};

module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node", "css"],
	moduleNameMapper: {
		"\\.(css|less|scss)$": "jest-css-modules",
	},
};

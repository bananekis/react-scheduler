import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
	beforeEach(() => {
		// Mock local storage
		Object.defineProperty(window, "localStorage", {
			value: {
				getItem: jest.fn(() => null),
				setItem: jest.fn(),
			},
			writable: true,
		});
	});

	test("should render ScheduleComponent", () => {
		render(<App />);
		const scheduleComponent = screen.getByRole("button", {
			name: "Agenda",
		});
		expect(scheduleComponent).toBeTruthy();
	});

	test("loads data from local storage", () => {
		const loadDataFromLocalStorage = jest.spyOn(
			require("./functions"),
			"loadDataFromLocalStorage"
		);
		render(<App />);
		expect(loadDataFromLocalStorage).toHaveBeenCalledTimes(1);
	});
});

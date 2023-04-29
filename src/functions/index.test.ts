import {
	handleActionComplete,
	loadDataFromLocalStorage,
	onEventRendered,
	onPopupOpen,
} from ".";
import { expect, jest, test } from "@jest/globals";
import { PopupType } from "@syncfusion/ej2-react-schedule";

describe("loadDataFromLocalStorage", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	test("should return null if the key is not found", () => {
		const result = loadDataFromLocalStorage("invalid-key");
		expect(result).toBeNull();
	});

	test("should return parsed data if the key is found", () => {
		const data = [{ id: 1, title: "Meeting" }];
		localStorage.setItem("scheduleData", JSON.stringify(data));

		const result = loadDataFromLocalStorage("scheduleData");

		expect(result).toEqual(data);
	});

	test("should log an error and return null if parsing fails", () => {
		const consoleSpy = jest.spyOn(console, "error");
		const invalidData = "{invalid-json}";

		localStorage.setItem("invalid-key", invalidData);

		const result = loadDataFromLocalStorage("invalid-key");

		expect(result).toBeNull();
		expect(consoleSpy).toHaveBeenCalled();
	});
});

describe("onEventRendered", () => {
	test("sets background color style correctly", () => {
		const mockElement = document.createElement("div");

		const mockData = {
			Color: "red",
		};

		const mockArgs = {
			data: mockData,
			element: mockElement,
			cancel: false,
		};
		onEventRendered(mockArgs);
		expect(mockElement.style.backgroundColor).toEqual("red");
	});
});

describe("onPopupOpen", () => {
	const type: PopupType = "Editor";

	it("onPopupOpen", () => {
		// Create a mock event object with a custom field row
		const element = document.createElement("div");
		const customFieldRow = document.createElement("div");
		customFieldRow.className = "custom-field-row";
		element.appendChild(customFieldRow);
		const args = {
			type,
			element,
			cancel: false,
		};

		// Call the function
		onPopupOpen(args);

		// Assert that the custom field row was not added again
		const customFieldRows =
			args.element.querySelectorAll(".custom-field-row");
		expect(customFieldRows.length).toBe(1);
	});
});

describe("handleActionComplete", () => {
	const LS_KEY = "scheduleData";

	const dataSource = [
		{
			Id: 1,
			Subject: "Meeting",
			StartTime: new Date(),
			Color: "",
			EndTime: new Date(),
			IsAllDay: true,
			Guid: "",
		},
	];

	it("should set localStorage when eventAction is triggered", () => {
		const eventSettings = dataSource;
		const setItemSpy = jest.spyOn(window.localStorage.__proto__, "setItem");
		const mockEvent = { requestType: "eventCreated" };
		handleActionComplete(mockEvent, eventSettings, LS_KEY);

		expect(setItemSpy).toHaveBeenCalledWith(
			LS_KEY,
			JSON.stringify(eventSettings)
		);
	});

	it("should not set localStorage when eventAction is not triggered", () => {
		const eventSettings = dataSource;
		const setItemSpy = jest.spyOn(window.localStorage.__proto__, "setItem");
		const mockEvent = { requestType: "navigation" };
		handleActionComplete(mockEvent, eventSettings, LS_KEY);

		expect(setItemSpy).not.toHaveBeenCalled();
	});
});

import {
	ActionEventArgs,
	EventRenderedArgs,
	PopupOpenEventArgs,
} from "@syncfusion/ej2-react-schedule";
import { IscheduleData } from "../types/interfaces";
import { createElement } from "@syncfusion/ej2-base";
import { EventAction } from "../types/enums";

export const loadDataFromLocalStorage = (
	key: string
): IscheduleData[] | null => {
	try {
		const serializedData = localStorage.getItem(key);
		if (serializedData === null) {
			return null;
		}
		return JSON.parse(serializedData);
	} catch (error) {
		console.error(
			`Failed to load data from localStorage with key "${key}":`,
			error
		);
		return null;
	}
};

// change background color on event rendered

export const onEventRendered = (e: EventRenderedArgs) =>
	(e.element.style.backgroundColor = e.data.Color);

// store current event to previous state of dataSource and set to LS

export const handleActionComplete = (
	e: ActionEventArgs,
	eventSettings: IscheduleData[],
	key: string
) => {
	if (Object.values(EventAction).some((action) => action === e.requestType)) {
		const events = eventSettings;

		localStorage.setItem(key, JSON.stringify(events));
	}
};

// create color field inside event window

export const onPopupOpen = (args: PopupOpenEventArgs) => {
	if (args.type === "Editor") {
		if (!args.element.querySelector(".custom-field-row")) {
			let row = createElement("div", {
				className: "custom-field-row",
			});
			let label = createElement("label", {
				className: "e-float-text e-label-top",
				attrs: {
					for: "Color",
				},
				innerHTML: "Color",
			});
			let span = createElement("span", {
				className: "e-float-line",
			});
			let descriptionDiv = document.querySelector(".e-description-row");
			let formElement = args.element.querySelector(".e-schedule-form");

			let container = createElement("div", {
				className: "e-float-input e-control-wrapper",
			});
			let inputEle = createElement("input", {
				className: "e-subject e-field",
				attrs: {
					name: "Color",
					type: "text",
					id: "Color",
					placeholder:
						"Write down your desired color without spaces (default: oceanblue)",
					value: "oceanblue",
				},
			});

			formElement!.firstChild?.insertBefore(row, descriptionDiv);

			container.appendChild(inputEle);
			container.appendChild(span);
			container.appendChild(label);

			row.appendChild(container);

			inputEle.setAttribute("name", "Color");
		}
	}
};

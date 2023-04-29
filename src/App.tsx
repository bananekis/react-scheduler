import "./App.css";
import {
	ScheduleComponent,
	Day,
	Week,
	WorkWeek,
	Month,
	Agenda,
	Inject,
	Resize,
	DragAndDrop,
	ActionEventArgs,
} from "@syncfusion/ej2-react-schedule";
import { useEffect, useState } from "react";
import { IscheduleData } from "./types/interfaces";
import { fieldsData } from "./data";
import {
	loadDataFromLocalStorage,
	onEventRendered,
	onPopupOpen,
	handleActionComplete,
} from "./functions";

const LS_KEY = "scheduleData";

function App() {
	const [scheduleData, setScheduleData] = useState<IscheduleData[]>([]);

	const eventSettings = {
		dataSource: scheduleData,
		fields: fieldsData,
	};

	useEffect(() => {
		const scheduleData = loadDataFromLocalStorage(LS_KEY);

		scheduleData !== null && setScheduleData(scheduleData);
	}, []);

	return (
		<ScheduleComponent
			eventSettings={eventSettings}
			selectedDate={new Date()}
			actionComplete={(e: ActionEventArgs) =>
				handleActionComplete(e, eventSettings.dataSource, LS_KEY)
			}
			firstDayOfWeek={1}
			eventRendered={onEventRendered}
			popupOpen={onPopupOpen}
		>
			<Inject
				services={[
					Day,
					Week,
					WorkWeek,
					Month,
					Agenda,
					Resize,
					DragAndDrop,
				]}
			/>
		</ScheduleComponent>
	);
}

export default App;

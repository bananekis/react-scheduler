import { FieldModel } from "@syncfusion/ej2-react-schedule";

export interface IscheduleData {
	Subject: string;
	Color: string;
	Id: number;
	StartTime: Date;
	EndTime: Date;
	IsAllDay: boolean;
	Guid: string;
	RecurrenceRule?: string;
	StartTimezone?: string;
}

export interface IEventSettings {
	dataSource: IscheduleData[];
	fields: FieldModel;
}

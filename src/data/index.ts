import { FieldModel } from "@syncfusion/ej2-react-schedule";

//  event window pop up validation data
export const fieldsData: FieldModel = {
	id: "Id",
	subject: { name: "Subject", validation: { required: true } },
	location: { name: "Location", validation: { required: false } },
	description: {
		name: "Description",
		validation: {
			required: false,
		},
	},
	startTime: { name: "StartTime", validation: { required: true } },
	endTime: { name: "EndTime", validation: { required: true } },
};

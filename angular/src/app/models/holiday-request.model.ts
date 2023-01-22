export class HolidayRequest {
  id?: number;
  userId: number
  dateFrom: any;
  dateTo: any;
  totalHours: number;
  comment: string;
  holidayRequestTypeId: number;
  holidayRequestTypeName: string;
  holidayRequestStatusId: number;
  holidayRequestStatusName: string;
}

export class HolidayRequestType {
  id: number;
  name: string;
}

export class HolidayRequestStatus {
  id: number;
  name: string;
}

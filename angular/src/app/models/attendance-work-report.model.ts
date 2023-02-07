export class AttendanceWorkReportModel {
  id?: number;
  userId: number;
  date: Date;
  remoteWork: boolean;
}

export class DicAttendanceWorkType {
  id?: number;
  name: string;
}

export class AttendanceWorkDay {
  id?: number;
  attendanceWorkReport: AttendanceWorkReportModel;
  dicAttendanceWorkType: DicAttendanceWorkType;
  hours: number;
  comment: string;

  constructor(attendanceWorkReport?: AttendanceWorkReportModel) {
    this.attendanceWorkReport = attendanceWorkReport;
  }
}

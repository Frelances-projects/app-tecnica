import { Class } from "./class";
import { Student } from "./student";

export interface ScheduleClass {
  id: string;
  schedulingDate?: string;
  schedulingHour?: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED';
  studentId: string;
  classId: string;
  class: Class;
  student: Student;
}
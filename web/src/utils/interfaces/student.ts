export interface Student {
  id: string;
  name: string;
  email: string;
  number: number;
  driverLicenseCategoryId: string;
  paymentId: string;
  token: string | null;
  schoolId: string;
  enrolledAt: string;
  school: {
    id: string,
    name: string,
  };
}
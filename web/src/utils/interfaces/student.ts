import { DriverLicenseCategory } from './driver-license-category'
import { ScheduleClass } from './schedule-class'
import { User } from './user'

export interface Student {
  id: string
  name: string
  email: string
  number: number
  phone?: string
  driverLicenseCategoryId: string
  paymentId: string
  token: string | null
  imtId?: string
  schoolId: string
  enrolledAt: string
  school: {
    id: string
    name: string
    users?: User[]
  }
  scheduledClass?: ScheduleClass[]
  driverLicenseCategory?: DriverLicenseCategory
}

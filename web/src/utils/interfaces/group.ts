import { DriverLicenseCategory } from './driver-license-category'

export interface Group {
  id: string
  name: string
  schools: {
    id: string
    name: string
    driverLicenseCategories: DriverLicenseCategory[]
  }[]
}

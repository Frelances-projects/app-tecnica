interface Installments {
  firstInstallment: number
  secondInstallment: number
  thirdInstallment?: number | null
  fourthInstallment?: number | null
}

export interface DriverLicenseCategory {
  id: string
  name: string
  price: number
  installments: Installments
  schoolId: string
  vehicles?: string[]
  school: {
    id: string
    name: string
  }
}

import type { Student } from './student'

export interface Payment {
  id: string
  method: 'INSTALLMENTS' | 'INCASH'
  total: number
  formattedTotal: string
  amountOfInstallments?: number
  amountOfInstallmentsPaid?: number
  amountOfRemainingInstallments?: number
  createdAt: Date
  student: Student
}

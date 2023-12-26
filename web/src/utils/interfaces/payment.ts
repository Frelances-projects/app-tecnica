import type { Student } from './student'

export interface Payment {
  id: string
  method: 'INSTALLMENTS' | 'INCASH'
  total: number
  amountOfInstallments?: number
  amountOfInstallmentsPaid?: number
  amountOfRemainingInstallments?: number
  createdAt: Date
  student: Student
}

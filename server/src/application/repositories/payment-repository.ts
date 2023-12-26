import { Payment } from '../entities/payment'

export abstract class PaymentRepository {
  abstract create(payment: Payment): Promise<void>
  abstract findById(paymentId: string): Promise<Payment | null>
  abstract findByStudent(StudentId: string): Promise<Payment | null>
  abstract findManyBySchool(SchoolId: string): Promise<Payment[]>
  abstract findMany(): Promise<Payment[]>
  abstract save(payment: Payment): Promise<void>
  abstract delete(paymentId: string): Promise<void>
}

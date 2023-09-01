import { Installments } from '../entities/installments'

export abstract class InstallmentsRepository {
  abstract create(installments: Installments): Promise<void>
  abstract findById(installmentsId: string): Promise<Installments | null>
  abstract save(installments: Installments): Promise<void>
}

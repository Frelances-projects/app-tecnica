import { IsNumber } from 'class-validator'

export class UpdatePaymentBody {
  method: 'INSTALLMENTS' | 'INCASH'

  @IsNumber()
  amountOfInstallments: number

  @IsNumber()
  amountOfInstallmentsPaid: number

  @IsNumber()
  amountOfRemainingInstallments: number

  @IsNumber()
  total: number
}

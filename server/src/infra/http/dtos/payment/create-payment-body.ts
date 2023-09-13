import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreatePaymentBody {
  @IsNotEmpty()
  method: 'INSTALLMENTS' | 'INCASH'

  @IsNumber()
  amountOfInstallments: number

  @IsNumber()
  amountOfInstallmentsPaid: number

  @IsNumber()
  amountOfRemainingInstallments: number

  @IsNotEmpty()
  @IsNumber()
  total: number
}

import { IsNumber } from 'class-validator'

export class UpdateInstallmentsBody {
  @IsNumber()
  valueOfAnInstallment: number

  @IsNumber()
  amountOfInstallments: number

  @IsNumber()
  amountOfInstallmentsPaid: number

  @IsNumber()
  amountOfRemainingInstallments: number
}

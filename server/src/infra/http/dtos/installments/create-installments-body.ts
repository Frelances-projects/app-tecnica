import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateInstallmentsBody {
  @IsNotEmpty()
  @IsNumber()
  valueOfAnInstallment: number

  @IsNotEmpty()
  @IsNumber()
  amountOfInstallments: number

  @IsNotEmpty()
  @IsNumber()
  amountOfInstallmentsPaid: number

  @IsNotEmpty()
  @IsNumber()
  amountOfRemainingInstallments: number
}

import { IsNotEmpty } from "class-validator";

export class UpdatePaymentBody {
  @IsNotEmpty()
  method: 'INSTALLMENTS' |'INCASH'

  @IsNotEmpty()
  total: number
}
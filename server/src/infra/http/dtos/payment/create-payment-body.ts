import { IsNotEmpty } from "class-validator";

export class CreatePaymentBody {
  @IsNotEmpty()
  method: 'INSTALLMENTS' |'INCASH'

  @IsNotEmpty()
  total: number
}

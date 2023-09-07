import { IsNumber } from 'class-validator'

export class UpdateDriverLicenseCategoryBody {
  name: string

  @IsNumber()
  price: number

  @IsNumber()
  firstInstallment: number

  @IsNumber()
  secondInstallment: number

  @IsNumber()
  thirdInstallment: number

  @IsNumber()
  fourthInstallment: number
}

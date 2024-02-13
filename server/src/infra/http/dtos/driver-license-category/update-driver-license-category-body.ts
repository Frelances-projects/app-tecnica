import { IsNumber } from 'class-validator'

export class UpdateDriverLicenseCategoryBody {
  name: string

  @IsNumber()
  price: number

  @IsNumber()
  firstInstallment: number

  @IsNumber()
  secondInstallment: number

  thirdInstallment: number

  fourthInstallment: number

  vehicles: string[]
}

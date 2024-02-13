import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator'

export class CreateDriverLicenseCategoryBody {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsNotEmpty()
  @IsUUID()
  schoolId: string

  @IsNotEmpty()
  @IsNumber()
  firstInstallment: number

  @IsNotEmpty()
  @IsNumber()
  secondInstallment: number

  thirdInstallment: number

  fourthInstallment: number

  vehicles: string[]
}

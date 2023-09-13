import { IsNotEmpty, Length, IsEmail, IsNumber, IsUUID } from 'class-validator'

export class CreateStudentBody {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @Length(5, 300)
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsUUID()
  schoolId: string

  @IsNotEmpty()
  paymentMethod: 'INSTALLMENTS' | 'INCASH'

  @IsNotEmpty()
  enrolledAt: string

  @IsNotEmpty()
  @IsNumber()
  number: number

  @IsNotEmpty()
  @IsUUID()
  driverLicenseCategoryId: string
}

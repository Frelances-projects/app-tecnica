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

  paymentMethod?: 'INSTALLMENTS' | 'INCASH'

  enrolledAt?: string

  imtId?: string

  @IsNotEmpty()
  @IsNumber()
  number: number

  @IsNotEmpty()
  phone: string

  birthDate?: string

  @IsNotEmpty()
  @IsUUID()
  driverLicenseCategoryId: string
}

import { IsNotEmpty, Length, IsEmail, IsNumber } from 'class-validator'

export class CreateStudentBody {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @Length(5, 300)
  @IsEmail()
  email: string

  @IsNotEmpty()
  schoolId: string

  @IsNotEmpty()
  enrolledAt: string

  @IsNotEmpty()
  @IsNumber()
  number: number

  @IsNotEmpty()
  driverLicenseCategory: 'A' | 'B' | 'C' | 'ALL'
}

import { Length, IsEmail, IsNumber, IsString, IsUUID } from 'class-validator'

export class UpdateStudentBody {
  @IsString()
  name: string

  @Length(5, 300)
  @IsEmail()
  email: string

  @IsString()
  @IsUUID()
  schoolId: string

  @IsString()
  @IsUUID()
  driverLicenseCategoryId: string

  firebaseToken?: string

  imtId?: string

  phone: string

  // @IsString()
  // enrolledAt: string

  @IsNumber()
  number: number
}

import { IsNotEmpty } from 'class-validator'

export class UpdateScheduledClassStatusBody {
  @IsNotEmpty()
  status: 'PENDING' | 'UNCHECKED' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
}

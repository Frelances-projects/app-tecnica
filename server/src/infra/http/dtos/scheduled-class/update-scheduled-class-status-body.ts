import { IsNotEmpty } from 'class-validator'

export class UpdateScheduledClassStatusBody {
  @IsNotEmpty()
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
}

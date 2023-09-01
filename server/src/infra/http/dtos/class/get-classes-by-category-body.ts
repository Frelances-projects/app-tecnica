import { IsNotEmpty } from 'class-validator'

export class GetClassesByCategoryBody {
  @IsNotEmpty()
  category: 'THEORETICAL' | 'PRACTICAL'
}

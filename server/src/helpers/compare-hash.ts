import { Injectable } from '@nestjs/common'
import { compare } from 'bcrypt'

@Injectable()
export class CompareHash {
  async execute(payload: string, hashed: string): Promise<boolean> {
    return await compare(payload, hashed)
  }
}

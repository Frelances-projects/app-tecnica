import { Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'

@Injectable()
export class GenerateHash {
  async execute(payload: string): Promise<string> {
    return hash(payload, 10)
  }
}

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserRepository } from 'src/application/repositories/user-repository'
import { GetUserByEmail } from './get-user-by-email'

import { GenerateHash } from 'src/helpers/generate-hash'

interface ResetUserPasswordRequest {
  token: string
  newPassword: string
}

@Injectable()
export class ResetUserPassword {
  constructor(
    private jwtService: JwtService,
    private getUserByEmail: GetUserByEmail,
    private userRepository: UserRepository,
    private generateHash: GenerateHash,
  ) {}

  async execute(data: ResetUserPasswordRequest): Promise<void> {
    try {
      const { newPassword, token } = data

      const { email } = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })

      const { user } = await this.getUserByEmail.execute(email)

      if (!user) {
        throw new NotFoundException('User not found')
      }

      const passwordHashed = await this.generateHash.execute(newPassword)

      user.password = passwordHashed

      await this.userRepository.save(user)
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}

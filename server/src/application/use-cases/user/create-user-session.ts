import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common'

import { User } from '../../entities/user'
import { UserRepository } from '../../repositories/user-repository'

import { CompareHash } from '../../../helpers/compare-hash'
import { CreateToken } from '../../../helpers/create-token'
import { GetUserByEmail } from './get-user-by-email'

interface CreateUserSessionRequest {
  email: string
  password: string
}

interface CreateUserSessionResponse {
  user: User
}

@Injectable()
export class CreateUserSession {
  constructor(
    private userRepository: UserRepository,
    private getUserByEmail: GetUserByEmail,
    private compareHash: CompareHash,
    private createToken: CreateToken,
  ) {}

  async execute(
    request: CreateUserSessionRequest,
  ): Promise<CreateUserSessionResponse> {
    try {
      const { email, password } = request

      const { user } = await this.getUserByEmail.execute(email)

      if (!user) {
        throw new NotFoundException('Email or password incorrect')
      }

      const isValidUser = await this.compareHash.execute(
        password,
        user.password,
      )

      if (!isValidUser) {
        throw new UnauthorizedException('Email or password incorrect')
      }

      const token = await this.createToken.execute(user.id)

      user.token = token

      await this.userRepository.save(user)

      return { user }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}

import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common'

import { User } from '../../entities/user'
import { UserRepository } from '../../repositories/user-repository'
import { GetUserByEmail } from './get-user-by-email'

import { GenerateHash } from '../../../helpers/generate-hash'

interface CreateUserRequest {
  name: string
  email: string
  password: string
  schoolId: string
  imtId?: string
  function: 'ADMIN' | 'DIRECTOR' | 'INSTRUCTOR'
}

interface CreateUserResponse {
  user: User
}

@Injectable()
export class CreateUser {
  constructor(
    private userRepository: UserRepository,
    private getUserByEmail: GetUserByEmail,
    private generateHash: GenerateHash,
  ) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    try {
      const {
        email,
        name,
        password,
        schoolId,
        function: userFunction,
        imtId,
      } = request

      const { user: foundUserByEmail } = await this.getUserByEmail.execute(
        email,
      )

      if (foundUserByEmail) {
        throw new ConflictException('This email has already been used')
      }

      const passwordHashed = await this.generateHash.execute(password)

      const user = new User({
        email,
        name,
        password: passwordHashed,
        schoolId,
        function: userFunction,
        imtId,
      })

      await this.userRepository.create(user)

      return {
        user,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}

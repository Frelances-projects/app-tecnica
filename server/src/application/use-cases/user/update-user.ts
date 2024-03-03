import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'

import { UserRepository } from '../../repositories/user-repository'
import { GetUserById } from './get-user-by-id'
import { GetUserByEmail } from './get-user-by-email'
import { User } from '../../entities/user'

interface UpdateUserRequest {
  userId: string
  name?: string
  email?: string
  schoolId?: string
  imtId?: string
}

interface UpdateUserResponse {
  user: User
}

@Injectable()
export class UpdateUser {
  constructor(
    private userRepository: UserRepository,
    private getUserById: GetUserById,
    private getUserByEmail: GetUserByEmail,
  ) {}

  async execute(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    try {
      const { userId, email, name, schoolId, imtId } = request

      const { user } = await this.getUserById.execute(userId)

      const { user: foundUserByEmail } = await this.getUserByEmail.execute(
        email,
      )

      if (foundUserByEmail.email === email) {
        throw new ConflictException('This email has already been used')
      }

      user.name = name ?? user.name
      user.email = email ?? user.email
      user.schoolId = schoolId ?? user.schoolId
      user.imtId = imtId ?? user.imtId

      await this.userRepository.save(user)

      return {
        user,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}

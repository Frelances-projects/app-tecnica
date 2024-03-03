import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Post,
  Patch,
  Delete,
} from '@nestjs/common'

import { CreateUser } from '../../../application/use-cases/user/create-user'
import { CreateUserSession } from '../../../application/use-cases/user/create-user-session'
import { UpdateUser } from '../../../application/use-cases/user/update-user'
import { DeleteUser } from '../../../application/use-cases/user/delete-user'
import { GetUserById } from '../../../application/use-cases/user/get-user-by-id'
import { GetManyUsers } from '../../../application/use-cases/user/get-many-users'
import { ForgotUserPassword } from '../../../application/use-cases/user/forgot-user-password'
import { ResetUserPassword } from '../../../application/use-cases/user/reset-user-password'
import { GetManyUsersBySchool } from '../../../application/use-cases/user/get-many-users-by-school'

import { UserViewModel } from '../view-models/user-view-model'

import { CreateUserBody } from '../dtos/user/create-user-body'
import { CreateUserSessionBody } from '../dtos/user/create-user-session-body'
import { UpdateUserBody } from '../dtos/user/update-user-body'
import { ForgotUserPasswordBody } from '../dtos/user/forgot-password-user-body'
import { ResetUserPasswordBody } from '../dtos/user/reset-password-user-body'

@Controller('user')
export class UserController {
  constructor(
    private createUser: CreateUser,
    private createUserSession: CreateUserSession,
    private updateUser: UpdateUser,
    private deleteUser: DeleteUser,
    private getUserById: GetUserById,
    private getManyUsers: GetManyUsers,
    private forgotUserPassword: ForgotUserPassword,
    private resetUserPassword: ResetUserPassword,
    private getManyUsersBySchool: GetManyUsersBySchool,
  ) {}

  @Get(':userId')
  async getById(@Param('userId') userId: string) {
    const { user } = await this.getUserById.execute(userId)

    return {
      user: UserViewModel.toHTTP(user),
    }
  }

  @Get()
  async getMany() {
    const { users } = await this.getManyUsers.execute()

    const usersToHTTP = users.map((user) => UserViewModel.toHTTP(user))

    return {
      users: usersToHTTP,
    }
  }

  @Get('school/:schoolId')
  async getManyBySchool(@Param('schoolId') schoolId: string) {
    const { users } = await this.getManyUsersBySchool.execute(schoolId)

    const usersToHTTP = users.map((user) => UserViewModel.toHTTP(user))

    return {
      users: usersToHTTP,
    }
  }

  @Post()
  async create(@Body() body: CreateUserBody) {
    const { user } = await this.createUser.execute(body)

    return {
      user: UserViewModel.toHTTP(user),
    }
  }

  @Post('session')
  async createSession(@Body() body: CreateUserSessionBody) {
    const { user } = await this.createUserSession.execute(body)

    return {
      user: UserViewModel.toHTTP(user),
    }
  }

  @Put(':userId')
  async update(@Param('userId') userId: string, @Body() body: UpdateUserBody) {
    const { name, email, schoolId, imtId } = body

    const { user } = await this.updateUser.execute({
      userId,
      name,
      email,
      schoolId,
      imtId,
    })

    return {
      user: UserViewModel.toHTTP(user),
    }
  }

  @Post('password/forgot-password')
  async forgotPassword(@Body() body: ForgotUserPasswordBody) {
    const { email, link } = body

    await this.forgotUserPassword.execute({ email, link })
  }

  @Patch('password/reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() body: ResetUserPasswordBody,
  ) {
    const { newPassword } = body

    await this.resetUserPassword.execute({ token, newPassword })
  }

  @Delete(':userId')
  async delete(@Param('userId') userId: string) {
    await this.deleteUser.execute(userId)
  }
}

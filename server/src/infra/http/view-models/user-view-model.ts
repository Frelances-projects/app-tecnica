import { User } from '../../../application/entities/user'

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      function: user.userFunction,
      token: user.token,
      schoolId: user.schoolId,
      createdAt: user.createdAt,
    }
  }
}

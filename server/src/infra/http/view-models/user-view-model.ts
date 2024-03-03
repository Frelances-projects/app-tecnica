import { User } from '../../../application/entities/user'

export class UserViewModel {
  static toHTTP(user: any) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      function: user.userFunction,
      token: user.token,
      imtId: user.imtId,
      schoolId: user.schoolId,
      createdAt: user.createdAt,
      school: user.props.school,
    }
  }
}

import { User } from '../entities/user'

export abstract class UserRepository {
  abstract create(user: User): Promise<void>
  abstract findById(userId: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract findMany(): Promise<User[]>
  abstract findManyBySchool(schoolId: string): Promise<User[]>
  abstract save(user: User): Promise<void>
  abstract delete(userId: string): Promise<void>
}

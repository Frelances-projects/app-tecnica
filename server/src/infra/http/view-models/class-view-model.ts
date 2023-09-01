import { Class } from '../../../application/entities/class'

export class ClassViewModel {
  static toHTTP(lesson: Class) {
    return {
      id: lesson.id,
      name: lesson.name,
      code: lesson.code,
      description: lesson.description,
      category: lesson.category,
      createdAt: lesson.createdAt,
    }
  }
}

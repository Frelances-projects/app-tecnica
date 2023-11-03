import { Class } from '../../../application/entities/class'

export class ClassViewModel {
  static toHTTP(lesson: any) {
    return {
      id: lesson.id,
      name: lesson.name,
      code: lesson.code,
      description: lesson.description,
      category: lesson.category,
      createdAt: lesson.createdAt,
      scheduledClass: lesson?.props?.scheduledClass
        ? lesson.props.scheduledClass[0]
        : undefined,
    }
  }
}

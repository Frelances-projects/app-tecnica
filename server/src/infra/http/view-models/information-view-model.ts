import { Information } from '../../../application/entities/information';

export class InformationViewModel {
  static toHTTP(information: Information) {
    return {
      id: information.id,
      name: information.name,
      description: information.description,
      createdAt: information.createdAt,
    };
  }
}
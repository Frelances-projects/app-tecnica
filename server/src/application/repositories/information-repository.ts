import { Information } from '../entities/information';

export abstract class InformationRepository {
  abstract create(information: Information): Promise<void>;
  abstract findById(informationId: string): Promise<Information | null>;
  abstract findMany(): Promise<Information[]>;
  abstract save(information: Information): Promise<void>;
}
import { Information as RawInformation } from '@prisma/client';

import { Information } from '../../../../application/entities/information';

export class PrismaInformationMapper {
  static toPrisma(information: Information) {
    return {
      id: information.id,
      name: information.name,
      description: information.description,
      createdAt: information.createdAt,
    };
  }

  static toDomain(raw: RawInformation): Information {
    return new Information(
      {
        name: raw.name,
        description: raw.description,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}

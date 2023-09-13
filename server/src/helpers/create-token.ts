import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class CreateToken {
  constructor(private jwtService: JwtService) {}

  async execute(userId: string): Promise<string> {
    const payload = { sub: userId }

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '30 days',
      secret: process.env.JWT_SECRET,
    })

    return token
  }
}

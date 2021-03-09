import { ConfigModule, ConfigService } from '@nestjs/config'

export const provide = <T>(config: string) => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) =>
    configService.get<T>(config),
})

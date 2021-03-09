import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { API, APP, DB } from './constants'

export interface Configuration {
  [APP]: AppConfiguration
  [API]: ApiConfiguration
  [DB]: TypeOrmModuleOptions
}

export interface ApiConfiguration {
  prefix: string
  version: number
  swaggerPrefix: string
}

export interface AppConfiguration {
  name: string
  port: number
}

export default () =>
  <Configuration>{
    [APP]: {
      name: process.env.APP_NAME || 'Evoraid',
      port: parseInt(process.env.APP_PORT) || parseInt(process.env.PORT) || 3000,
    },
    [API]: {
      prefix: process.env.API_PREFIX || '/api',
      version: parseInt(process.env.API_VERSION) || 0,
      swaggerPrefix: process.env.API_SWAGGER_PREFIX || '/docs',
    },
    [DB]: {
      type: process.env.DB_DRIVER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'loonify',
      namingStrategy: new SnakeNamingStrategy(),
      autoLoadEntities: true,
      synchronize: true,
      logging: ['error', 'warn', 'info'],
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { ConfigService } from '@nestjs/config'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { ApiConfiguration, AppConfiguration } from './configuration'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger } from '@nestjs/common'
import { API, APP } from './constants'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  const configService = app.get(ConfigService)

  const appConfig: AppConfiguration = configService.get(APP),
    apiConfig: ApiConfiguration = configService.get(API)

  // TODO: application url
  const urlGlobalPrefix = 'http://localhost:' + appConfig.port,
    appGlobalPrefix = apiConfig.prefix + '/v' + apiConfig.version.toString()

  // TODO: working swagger prefix
  app.setGlobalPrefix(appGlobalPrefix)

  const swaggerOptions = new DocumentBuilder()
    .setTitle(appConfig.name)
    .setDescription('Swagger-styled API documentation')
    .setVersion(apiConfig.version.toString())
    .build()

  const document = SwaggerModule.createDocument(app, swaggerOptions)
  SwaggerModule.setup(apiConfig.swaggerPrefix, app, document)

  await app.listen(appConfig.port)

  Logger.log('Application: ' + urlGlobalPrefix + appGlobalPrefix)
  Logger.log(
    'Swagger: ' + urlGlobalPrefix + appGlobalPrefix + apiConfig.swaggerPrefix,
  )
}

bootstrap()

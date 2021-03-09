import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import configuration from '../configuration'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { provide } from '../utils'
import { DB } from '../constants'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync(provide<TypeOrmModuleOptions>(DB)),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}

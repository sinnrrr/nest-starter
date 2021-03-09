import { DynamicModule, ForwardReference, Type } from '@nestjs/common'

export type Asyncable = { forRootAsync?: (arg0: any) => DynamicModule }

export type Importable = (
  | Type<any>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference<any>
) &
  Asyncable

export interface Castable {
  module: Importable
  options?: any
}

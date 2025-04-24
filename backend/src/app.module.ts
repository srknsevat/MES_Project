import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemModule } from './modules/system/system.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'mes_admin',
      password: 'securepass123',
      database: 'mes_prod',
      autoLoadEntities: true,
      synchronize: true, // Geliştirme için true, prod'da migration kullanın!
    }),
    SystemModule,
  ],
})
export class AppModule {}
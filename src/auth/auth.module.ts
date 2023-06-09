import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UtilsModule } from 'src/utils/utils.module';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UtilsModule,
    UsersModule,
    PassportModule.registerAsync({
      useFactory: () => ({
        defaultStrategy: 'jwt',
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

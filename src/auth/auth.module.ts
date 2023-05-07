import { Module, forwardRef } from '@nestjs/common';
import { AuthContoller } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtService, JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '60s' },
      secret: '123',
      privateKey: 'private123',
      publicKey: 'public123',
    }),
  ],
  controllers: [AuthContoller],
  providers: [AuthService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}

// global: true,
// secret: `${process.env.JWT_SECRET}`,
// signOptions: { expiresIn: '60s' },

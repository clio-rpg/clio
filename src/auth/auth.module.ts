import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guards/auth.strategy';
import { RolesGuard } from './guards/roles.guard';
import { UserResolver } from './user/user.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRY },
      }),
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    UserService,
    JwtStrategy,
    RolesGuard,
    UserResolver,
    UserService,
  ],
})
export class AuthModule {}

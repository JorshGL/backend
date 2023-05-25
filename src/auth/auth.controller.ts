import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { UtilsService } from 'src/utils/utils.service';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _utilsService: UtilsService,
  ) {}

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    try {
      const data = await this._authService.register(registerDTO);
      return await this._utilsService.successResponse(data);
    } catch (err) {
      return await this._utilsService.handleError(err);
    }
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    try {
      const data = await this._authService.login(loginDTO);
      return await this._utilsService.successResponse(data);
    } catch (err) {
      return await this._utilsService.handleError(err);
    }
  }

  @Get('refresh-token')
  @UseGuards(AuthGuard())
  async refreshToken(@Req() req) {
    try {
      const data = await this._authService.refreshToken(req.user.uid);
      return await this._utilsService.successResponse(data);
    } catch (err) {
      return await this._utilsService.handleError(err);
    }
  }
}

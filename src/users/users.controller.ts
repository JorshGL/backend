import { Controller, Get, Query, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UtilsService } from 'src/utils/utils.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _utilsService: UtilsService,
  ) {}

  @Get('search')
  @UseGuards(AuthGuard())
  async getAll(
    @Query('searchString') searchString: string,
    @Query('userId') id: string,
  ) {
    try {
      const users = await this._usersService.findAll(searchString, id);
      return await this._utilsService.successResponse(users);
    } catch (err) {
      return await this._utilsService.handleError(err);
    }
  }

  @Get('one/:userId')
  @UseGuards(AuthGuard())
  async getOne(@Param('userId') userId: string) {
    try {
      const user = await this._usersService.findOne(userId);
      return await this._utilsService.successResponse(user);
    } catch (err) {
      return await this._utilsService.handleError(err);
    }
  }
}

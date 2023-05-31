import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly _userModel: Model<User>,
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = new this._userModel(createUserDTO);
    return await newUser.save();
  }

  async findOneByFirebaseUid(firebaseUid: string): Promise<User> {
    return await this._userModel.findOne({ firebaseUid }).exec();
  }

  async findAll(param: string, id: string): Promise<User[]> {
    if (id) {
      return [await this._userModel.findById(id).exec()];
    }
    return await this._userModel
      .find(
        {
          $or: [
            { username: { $regex: param ?? '', $options: 'i' } },
            { name: { $regex: param ?? '', $options: 'i' } },
          ],
        },
        null,
        { limit: 100 },
      )
      .exec();
  }

  async checkIfUsernameAlreadyExists(username: string): Promise<boolean> {
    const user = await this._userModel.findOne({ username }).exec();
    return !!user;
  }

  async findOne(id: string): Promise<User> {
    return await this._userModel.findById(id).exec();
  }
}

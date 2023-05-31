import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './schemas/chat.schema';
import { type User } from 'src/users/schemas/user.schema';
import { Message } from './schemas/message.schema';
import { MessageDTO } from './dto/message.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private readonly _chatModel: Model<Chat>,
    @InjectModel(Message.name) private readonly _messageModel: Model<Message>,
    private readonly _usersService: UsersService,
  ) {}

  async newMessage({ content, receiverId, senderId }: MessageDTO) {
    const users = [
      await this._usersService.findOne(receiverId),
      await this._usersService.findOne(senderId),
    ]
    console.log(users);
    let chat = await this._chatModel
      .findOne({ users: { $all: [receiverId, senderId] } })
      .populate('messages')
      .exec();
    if (!chat) {
      chat = new this._chatModel({
        users
      });
      await chat.save();
    }
    const message = new this._messageModel({
      content,
      senderId,
      date: new Date(),
    });
    await message.save()
    chat.messages = chat.messages ? [...chat.messages, message] : [message];
    await chat.save();
    return message;
  }
}

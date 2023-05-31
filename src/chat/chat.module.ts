import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { ChatGateway } from './chat.gateway';
import { UsersModule } from 'src/users/users.module';
import { Message, MessageSchema } from './schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Chat.name, schema: ChatSchema}, {name: Message.name, schema: MessageSchema}]),
    UsersModule
  ],
  providers: [ChatService, ChatGateway]
})
export class ChatModule {}

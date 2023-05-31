import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessageDTO } from './dto/message.dto';
import { ChatService } from './chat.service';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() server: Server;
  activeUsers: Map<string, string>;

  constructor(
    private readonly _chatService: ChatService,
    private readonly _usersService: UsersService,
  ) {
    this.activeUsers = new Map();
  }

  @SubscribeMessage('join')
  async handleJoin(@MessageBody('userId') userId: string, @ConnectedSocket() socket: Socket) {
    const user = await this._usersService.findOne(userId);
    this.activeUsers.set(user._id.toString(), socket.id);
  }

  async handleDisconnect(socket: Socket) {
    const userId = Array.from(this.activeUsers.entries()).find(
      ([_, value]) => value === socket.id,
    )[0];
    this.activeUsers.delete(userId);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() message: MessageDTO,
    @ConnectedSocket() socket: Socket,
  ) {
    const createdMessage = await this._chatService.newMessage(message);
    if (this.activeUsers.has(message.receiverId)) {
      socket.to(this.activeUsers.get(message.receiverId)).emit('message', createdMessage);
    }
  }
}

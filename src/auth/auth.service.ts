import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseConfig } from './firebase.config';
import { RegisterDTO } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { type User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  readonly _app: FirebaseApp;

  constructor(
    private readonly _configService: ConfigService,
    private readonly _usersService: UsersService,
  ) {
    this._app = initializeApp({
      ...firebaseConfig,
      apiKey: _configService.get('FIREBASE_API_KEY'),
    });
  }

  async register(
    registerDTO: RegisterDTO,
  ): Promise<{ token: string; user: User }> {
    const { email, password, username } = registerDTO;

    if (await this._usersService.checkIfUsernameAlreadyExists(username))
      throw new Error('Username already exists');

    const { user: credentials } = await createUserWithEmailAndPassword(
      getAuth(this._app),
      email,
      password,
    );
    const token = await credentials.getIdToken();
    const user: User = await this._usersService.create({
      ...registerDTO,
      firebaseUid: credentials.uid,
    });
    return { token, user };
  }

  async login(loginDTO: LoginDTO): Promise<{ token: string; user: User }> {
    const { email, password } = loginDTO;
    const { user: credentials } = await signInWithEmailAndPassword(
      getAuth(this._app),
      email,
      password,
    );
    const token = await credentials.getIdToken();
    const user = await this._usersService.findOneByFirebaseUid(credentials.uid);
    return { token, user };
  }

  async refreshToken(firebaseUid: string) {
    const user = await this._usersService.findOneByFirebaseUid(firebaseUid);
    return { user };
  }
}

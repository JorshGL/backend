import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import * as firebaseAdmin from 'firebase-admin';
import { firebaseCert } from './firebase.config';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  readonly _app: firebaseAdmin.app.App;

  constructor(
    private readonly _utilsService: UtilsService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ingoreExpiration: true
    });
    this._app = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({ ...firebaseCert }),
    });
  }

  async validate(token: string) {
    try {
      const decodedToken = await firebaseAdmin
        .auth(this._app)
        .verifyIdToken(token);
      return { uid: decodedToken.uid };
    } catch (err) {
      return await this._utilsService.handleError(err);
    }
  }
}

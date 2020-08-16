import { TokenPayload } from '../src/auth/auth.interface';

declare global {
  namespace Express {
    export interface Request {
      user: TokenPayload;
      filemetadata: {
        width?: number;
        height?: number;
        metadata?: {};
      };
    }
  }
}

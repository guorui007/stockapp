import { TokenPayload } from '../src/auth/auth.interface';
import {
  GetPostsOptionsFilter,
  GetPostOptionsPagination,
} from '../src/post/post.service';

declare global {
  namespace Express {
    export interface Request {
      user: TokenPayload;
      filemetadata: {
        width?: number;
        height?: number;
        metadata?: {};
      };
      sort: string;
      filter: GetPostsOptionsFilter;
      pagination: GetPostOptionsPagination;
    }
  }
}

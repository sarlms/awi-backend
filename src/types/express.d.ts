// src/types/express.d.ts
import { ProfileDto } from '../manager/dto/profile.dto';

declare module 'express' {
  export interface Request {
    user?: { id: string; email: string }; // Déclare `user` avec `id` et `email`
  }
}

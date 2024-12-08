import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { Session, SessionSchema } from '../schemas/session.schema';
import { DepositedGameModule } from '../depositedGame/depositedGame.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
    forwardRef(() => DepositedGameModule), // Evite la dépendance circulaire
  ],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [MongooseModule, SessionService], // Exporte MongooseModule pour d'autres modules
})
export class SessionModule {}

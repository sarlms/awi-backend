import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Manager, ManagerSchema } from '../schemas/manager.schema'; // Ensure the Manager schema is correctly imported
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { AdminGuard } from 'src/guards/admin.guard';


@Module({
  imports: [
    // Registers the Manager model with Mongoose to enable database operations for the Manager collection
    MongooseModule.forFeature([{ name: Manager.name, schema: ManagerSchema }]),
    
    // Import AuthModule with forwardRef to prevent circular dependencies between ManagerModule and AuthModule
    forwardRef(() => AuthModule),
  ],

  // Define the controller handling the routes for manager operations
  controllers: [ManagerController],

  // Define the services provided by this module, available within the module itself
  providers: [ManagerService, AdminGuard],

  // Export the ManagerService to make it accessible to other modules, such as AuthModule
  exports: [ManagerService],
})
export class ManagerModule {}

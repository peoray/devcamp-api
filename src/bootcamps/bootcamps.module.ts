import { Module } from '@nestjs/common';
import { BootcampsService } from './bootcamps.service';
import { BootcampsController } from './bootcamps.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BootcampSchema } from './schemas/bootcamp.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Bootcamp', schema: BootcampSchema }]),
  ],
  providers: [BootcampsService],
  controllers: [BootcampsController],
})
export class BootcampsModule {}

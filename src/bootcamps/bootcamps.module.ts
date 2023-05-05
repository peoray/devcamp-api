import { Module } from '@nestjs/common';
import { BootcampsService } from './bootcamps.service';
import { BootcampsController } from './bootcamps.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bootcamp, BootcampSchema } from './schemas/bootcamp.schema';
import slugifyName from 'src/utils/slugify';
import geocoder from 'src/utils/geocoder';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Bootcamp',
        useFactory: () => {
          const schema = BootcampSchema;

          schema.pre<Bootcamp>('save', async function () {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const bootcamp = this;
            bootcamp.slug = slugifyName(bootcamp.name);

            const location = await geocoder(bootcamp.address);

            bootcamp.location = location;
            bootcamp.address = undefined;
          });
          return schema;
        },
      },
    ]),
  ],
  providers: [BootcampsService],
  controllers: [BootcampsController],
})
export class BootcampsModule {}

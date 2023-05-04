import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// database
import { MongooseModule } from '@nestjs/mongoose';
// confug
import { ConfigModule } from '@nestjs/config';
import { BootcampsModule } from './bootcamps/bootcamps.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    BootcampsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

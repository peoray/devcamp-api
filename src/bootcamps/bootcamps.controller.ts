import { Body, Controller, Get, Post } from '@nestjs/common';
import { BootcampsService } from './bootcamps.service';
import { CreateBootcampDto } from './dtos/create-bootcamp.dto';

@Controller('bootcamps')
export class BootcampsController {
  constructor(private bootcampService: BootcampsService) {}

  @Post()
  async createBootcamp(@Body() data: CreateBootcampDto) {
    return this.bootcampService.create(data);
  }
}

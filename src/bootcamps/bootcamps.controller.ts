import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BootcampsService } from './bootcamps.service';
import { CreateBootcampDto } from './dtos/create-bootcamp.dto';
import { Bootcamp } from './schemas/bootcamp.schema';

@Controller('bootcamps')
export class BootcampsController {
  constructor(private bootcampService: BootcampsService) {}

  @Post()
  async createBootcamp(@Body() data: CreateBootcampDto): Promise<Bootcamp> {
    return this.bootcampService.create(data);
  }

  @Get()
  async findBootcamps(): Promise<Bootcamp[]> {
    return this.bootcampService.findAll();
  }

  @Get(':id')
  async findBootcamp(@Param('id') id: string): Promise<Bootcamp> {
    return this.bootcampService.findOne(id);
  }
}

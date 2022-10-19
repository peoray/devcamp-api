import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BootcampsService } from './bootcamps.service';
import { CreateBootcampDto } from './dtos/create-bootcamp.dto';
import { UpdateBootcampDto } from './dtos/update-bootcamp.dto';
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

  @Put(':id')
  async updateBootcamp(
    @Param('id') id: string,
    @Body() data: UpdateBootcampDto,
  ): Promise<Bootcamp> {
    return this.bootcampService.update(id, data);
  }

  @Delete(':id')
  async deleteBootcamp(@Param('id') id: string): Promise<Bootcamp> {
    return this.bootcampService.delete(id);
  }

  @Get('radius/:zipcode/:distance')
  async getBootcampsInRadius(
    @Param('zipcode') zipcode: string,
    @Param('distance') distance: number,
  ): Promise<Bootcamp[]> {
    return this.bootcampService.getBootcampsInRadius(zipcode, distance);
  }
}

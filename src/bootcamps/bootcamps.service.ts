import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBootcampDto } from './dtos/create-bootcamp.dto';
import { Bootcamp, BootcampDocument } from './schemas/bootcamp.schema';

@Injectable()
export class BootcampsService {
  constructor(
    @InjectModel('Bootcamp') private bootcampModel: Model<BootcampDocument>,
  ) {}

  async create(data: CreateBootcampDto): Promise<Bootcamp> {
    const bootcamp = await this.bootcampModel.create(data);
    return bootcamp;
  }

  async findAll(): Promise<Bootcamp[]> {
    const bootcamps = await this.bootcampModel.find();
    return bootcamps;
  }

  async findOne(id: string): Promise<Bootcamp> {
    const bootcamp = this.bootcampModel.findById(id);
    return bootcamp;
  }
}

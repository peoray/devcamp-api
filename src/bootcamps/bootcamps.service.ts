import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateBootcampDto } from './dtos/create-bootcamp.dto';
import { UpdateBootcampDto } from './dtos/update-bootcamp.dto';
import { Bootcamp, BootcampDocument } from './schemas/bootcamp.schema';

@Injectable()
export class BootcampsService {
  constructor(
    @InjectModel('Bootcamp') private bootcampModel: Model<BootcampDocument>,
  ) {}

  validateMongoId = (id: string) => {
    const isValid = mongoose.isValidObjectId(id);
    if (!isValid) throw new BadRequestException('Wrong mongoose ID error');
    return true;
  };

  async create(data: CreateBootcampDto): Promise<Bootcamp> {
    const bootcamp = await this.bootcampModel.create(data);
    return bootcamp;
  }

  async findAll(): Promise<Bootcamp[]> {
    const bootcamps = await this.bootcampModel.find();
    // if (!bootcamps.length)
    //   return {
    //     data: bootcamps,
    //   };
    return bootcamps;
  }

  async findOne(id: string): Promise<Bootcamp> {
    await this.validateMongoId(id);

    const bootcamp = await this.bootcampModel.findById(id);
    if (!bootcamp) throw new NotFoundException('Bootcamp does not exist');
    return bootcamp;
  }

  async update(id: string, data: UpdateBootcampDto): Promise<Bootcamp> {
    await this.validateMongoId(id);

    const bootcamp = await this.bootcampModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) throw new NotFoundException('Bootcamp does not exist');

    return bootcamp;
  }

  async delete(id: string): Promise<Bootcamp> {
    await this.validateMongoId(id);

    const bootcamp = await this.bootcampModel.findByIdAndDelete(id);

    if (!bootcamp) throw new NotFoundException('Bootcamp does not exist');

    return bootcamp;
  }
}

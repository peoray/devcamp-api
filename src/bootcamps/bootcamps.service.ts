import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { Query } from 'express-serve-static-core';
import mongoose, { Model } from 'mongoose';
import geocoder from 'src/utils/geocoder';
import { CreateBootcampDto } from './dtos/create-bootcamp.dto';
import { UpdateBootcampDto } from './dtos/update-bootcamp.dto';
import { Bootcamp, BootcampDocument } from './schemas/bootcamp.schema';
import { Query } from 'express-serve-static-core';

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

  async findAll(query: Query): Promise<Bootcamp[]> {
    const reqQuery = { ...query };
    let queryStr = JSON.stringify(query);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`,
    );

    const bootcamps = await this.bootcampModel.find(JSON.parse(queryStr));
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

  async getBootcampsInRadius(
    zipcode: string,
    distance: number,
  ): Promise<Bootcamp[]> {
    const loc = await geocoder(zipcode);

    console.log(loc);

    const lat = loc.coordinates[1];
    const lng = loc.coordinates[0];

    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth Radius = 3,963 mi / 6,378 km
    const radius = distance / 3963;

    const bootcamps = await this.bootcampModel.find({
      location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    });

    return bootcamps;
  }
}

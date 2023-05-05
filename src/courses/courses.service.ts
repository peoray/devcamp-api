import { Injectable } from '@nestjs/common';
import { CourseDocument } from './schemas/course.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { validateMongoId } from 'src/utils/validate-mongo-id';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel('Course') private courseModel: Model<CourseDocument>,
  ) {}

  async getCourses(): Promise<CourseDocument[]> {
    return this.courseModel.find().exec();
  }

  async getCoursesByBoootcamp(bootcampId: string): Promise<CourseDocument[]> {
    await validateMongoId(bootcampId);
    return this.courseModel.find({ bootcamp: bootcampId }).exec();
  }
}

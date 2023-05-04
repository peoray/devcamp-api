import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose } from 'mongoose';
import { Bootcamp } from 'src/bootcamps/schemas/bootcamp.schema';

export type CourseDocument = Course & Document;

export enum Skills {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

@Schema({ timestamps: true, versionKey: false })
export class Course {
  @Prop({
    required: [true, 'Please add a course title'],
    trim: true,
  })
  title: string;

  @Prop({
    required: [true, 'Please add a description'],
  })
  description: string;

  @Prop({
    required: [true, 'Please add number of weeks'],
  })
  weeks: string;

  @Prop({
    required: [true, 'Please add a tuition cost'],
  })
  tuition: string;

  @Prop({
    type: [String],
    required: [true, 'Please add a minimum skill'],
    enum: Skills,
  })
  minimumSkill: Skills;

  @Prop({})
  scholarshipAvailable: boolean;

  @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'Bootcamp' })
  bootcamp: Bootcamp;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

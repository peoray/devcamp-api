import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Location } from './location.schema';

export type BootcampDocument = Bootcamp & Document;

export enum Careers {
  WEB_DEVELOPMENT = 'Web Development',
  MOBILE_DEVELOPMENT = 'Mobile Development',
  UI_UX = 'UI/UX',
  DATE_SCIENCE = 'Data Science',
  BUSINESS = 'Business',
  OTHER = 'Other',
}

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Bootcamp {
  @Prop({ unique: true, trim: true })
  name: string;

  @Prop()
  slug: string;

  @Prop()
  description: string;

  @Prop()
  website: string;

  @Prop()
  phone: string;

  @Prop({ trim: true, unique: true })
  email: string;

  @Prop({ trim: true })
  address: string;

  @Prop({ type: Object, ref: 'Location' })
  location: Location;

  @Prop({ type: [String], enum: Careers })
  careers!: Careers;

  @Prop({})
  averageRating: number;

  @Prop({})
  averageCost: number;

  @Prop({})
  photo: string;

  @Prop({})
  housing: boolean;

  @Prop({})
  jobAssistance: boolean;

  @Prop({})
  jobGuarantee: boolean;

  @Prop({})
  acceptGi: boolean;

  // set virtuals for courses
}

export const BootcampSchema = SchemaFactory.createForClass(Bootcamp);

// Add a virtual property 'courses' that retrieves all courses associated with this bootcamp
BootcampSchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'bootcamp',
  justOne: false,
});

// Override the default 'toJSON()' method to include the virtual 'id' property and exclude the '__v' property
BootcampSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  },
});

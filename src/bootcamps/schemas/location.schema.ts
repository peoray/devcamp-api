import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Location {
  @Prop({ enum: ['Point'], type: String })
  type: string;

  @Prop({ index: '2dsphere' })
  coordinates: number[];

  @Prop()
  formattedAddress: string;

  @Prop()
  street: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zipcode: string;

  @Prop()
  country: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);

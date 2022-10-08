import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsEnum,
  IsUrl,
  MaxLength,
  IsNumber,
  Max,
  IsBoolean,
  Min,
  ArrayUnique,
  Matches,
} from 'class-validator';
import { Careers } from '../schemas/bootcamp.schema';

// class Location {
//   @IsString()
//   code: string;

//   @IsString() // To make a field optional you can add @IsOptional
//   name: string;
// }

export class CreateBootcampDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(51, { message: 'Name can not be more than 50 characters' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500, {
    message: 'Description can not be more than 500 characters',
  })
  readonly description: string;

  @IsString()
  @IsUrl()
  @Matches('^(http|https)://', 'i', {
    message: 'Please add https or http to the url',
  })
  readonly website: string;

  @IsPhoneNumber()
  readonly phone: string;

  @IsEmail({ message: 'Enter a valid email address' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsNotEmpty()
  @ArrayUnique({ message: 'You cannot chose the same value twice' })
  @IsEnum(Careers, {
    each: true,
    message: 'You must select one of the options given',
  })
  readonly careers: Careers;

  @IsNumber()
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(10, { message: 'Rating must can not be more than 10' })
  readonly averageRating: number;

  @IsNumber()
  averageCost: number;

  @IsBoolean()
  readonly housing: boolean;

  @IsBoolean()
  readonly jobAssistance: boolean;

  @IsBoolean()
  readonly jobGuarantee: boolean;

  @IsBoolean()
  readonly acceptGi: boolean;
}

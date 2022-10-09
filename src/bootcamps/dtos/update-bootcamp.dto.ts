import {
  IsOptional,
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

export class UpdateBootcampDto {
  @IsString()
  @IsOptional()
  @MaxLength(51, { message: 'Name can not be more than 50 characters' })
  readonly name: string;

  @IsString()
  @IsOptional()
  @MaxLength(500, {
    message: 'Description can not be more than 500 characters',
  })
  readonly description: string;

  @IsString()
  @IsUrl()
  @Matches('^(http|https)://', 'i', {
    message: 'Please add https or http to the url',
  })
  @IsOptional()
  readonly website: string;

  @IsPhoneNumber()
  @IsOptional()
  readonly phone: string;

  @IsEmail({ message: 'Enter a valid email address' })
  @IsOptional()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly address: string;

  @IsOptional()
  @ArrayUnique({ message: 'You cannot chose the same value twice' })
  @IsEnum(Careers, {
    each: true,
    message: 'You must select one of the options given',
  })
  readonly careers: Careers;

  @IsNumber()
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(10, { message: 'Rating must can not be more than 10' })
  @IsOptional()
  readonly averageRating: number;

  @IsNumber()
  @IsOptional()
  averageCost: number;

  @IsBoolean()
  @IsOptional()
  readonly housing: boolean;

  @IsBoolean()
  @IsOptional()
  readonly jobAssistance: boolean;

  @IsBoolean()
  @IsOptional()
  readonly jobGuarantee: boolean;

  @IsBoolean()
  @IsOptional()
  readonly acceptGi: boolean;
}

import { BadRequestException } from '@nestjs/common';
import * as mongoose from 'mongoose';

const validateMongoId = (id: string) => {
  const isValid = mongoose.isValidObjectId(id);
  if (!isValid) throw new BadRequestException('Wrong mongoose ID error');
  return true;
};

export { validateMongoId };

import { Listing } from '@src/types';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

export const listingSchema = z.object({
  id: z.string().min(1, 'Id is required'),
  title: z.string().min(1, 'Title is required'),
  price: z.number().min(1, 'Price is required'),
  description: z.string().min(1, 'Description is required'),
});

const METHODS_TO_VALIDATE = ['POST', 'PATCH', 'PUT'];

export const validateListingMiddleware = (
  request: Request<{}, {}, Listing>,
  response: Response,
  next: NextFunction,
) => {
  try {
    if (METHODS_TO_VALIDATE.includes(request.method)) {
      listingSchema.parse(request.body);
    }

    next();
  } catch (error) {
    console.log(error);
    return response.status(StatusCodes.BAD_REQUEST).json(error.errors);
  }
};

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as listingService from '../service/listing.service';
import { Listing } from '../types';

const getAll = async (
  _request: Request,
  response: Response,
): Promise<Response<Listing[]>> => {
  return response.status(StatusCodes.OK).json(listingService.getAll());
};

const create = async (
  request: Request<{}, Listing, Listing>,
  response: Response,
): Promise<Response<Listing>> => {
  const createdListing = listingService.create(request.body);
  return response.status(StatusCodes.ACCEPTED).json(createdListing);
};

const remove = async (
  request: Request<{ id: Listing['id'] }>,
  response: Response,
): Promise<Response> => {
  const removedListing = listingService.remove(request.params.id);
  const statusCode =
    removedListing != null ? StatusCodes.NO_CONTENT : StatusCodes.NOT_FOUND;
  return response.status(statusCode).end();
};

export const ListingController = {
  getAll,
  create,
  remove,
};

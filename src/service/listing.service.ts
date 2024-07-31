import { Listing } from '../types';

const listings: Listing[] = [];

const getAll = (): Listing[] => {
  return [...listings];
};

const create = (listing: Listing): Listing => {
  listings.push(listing);
  return listing;
};

const remove = (id: Listing['id']): Listing | undefined => {
  const index = listings.findIndex((listing) => listing.id === id);

  if (index !== -1) {
    const [deleted] = listings.splice(index, 1);
    return deleted;
  }
};

export { create, getAll, remove };

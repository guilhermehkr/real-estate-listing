import { Listing } from '../../types';
import * as listingService from '../listing.service';

const listing: Listing = {
  id: '1234',
  title: 'Pink house',
  price: 445,
  description: "Argentina's house",
};

describe('ListingService', () => {
  test('should create new listing', async () => {
    const createdListing = listingService.create(listing);

    expect(createdListing).toEqual(listing);
  });

  test('should get all listings', async () => {
    listingService.create(listing);

    const [retrivedListing] = listingService.getAll();

    expect(retrivedListing).toEqual(listing);
  });

  test('should delete listing', async () => {
    const createdListing = listingService.create(listing);
    const deletedListing = listingService.remove(createdListing.id);

    expect(deletedListing).toEqual(createdListing);
  });

  test('should return undefined when listing is not found', async () => {
    const deletedListing = listingService.remove('123');
    expect(deletedListing).toBeUndefined();
  });
});

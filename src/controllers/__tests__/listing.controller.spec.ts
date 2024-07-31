import { Listing } from '@src/types';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '../../app';

const listing: Listing = {
  id: '1234',
  title: 'Pink house',
  price: 445,
  description: "Argentina's house",
};

const server = app.listen();

describe('ListingController', () => {
  afterAll(() => server.close());

  test('POST/GET - should create and get listings', async () => {
    await request(server)
      .post('/listings')
      .send(listing)
      .set('Content-Type', 'application/json');
    await request(server)
      .post('/listings')
      .send(listing)
      .set('Content-Type', 'application/json');

    const response = await request(server).get('/listings');

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body?.length).toBe(2);
  });

  test('DELETE /:id - should return NO_CONTENT when resouce is found', async () => {
    const { body } = await request(server)
      .post('/listings')
      .send(listing)
      .set('Content-Type', 'application/json');

    const response = await request(server).delete(`/listings/${body.id}`);

    expect(response.status).toBe(StatusCodes.NO_CONTENT);
  });

  test('DELETE /:id - should return NOT_FOUND when resource is not found for delete listing', async () => {
    const response = await request(server).delete('/listings/0000');

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });
});

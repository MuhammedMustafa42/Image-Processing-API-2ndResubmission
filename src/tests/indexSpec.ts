import app from '../index';
import supertest from 'supertest';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('Gets the main endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('Gets and shows the chosen image', async () => {
    const response = await request.get('/api?image=fjord');
    expect(response.status).toBe(200);
  });

  it('Sends Please enter valid image name', async () => {
    const response = await request.get('/api?image=fjord123');
    expect(response.status).toBe(400);
  });

  it('Resizes the image', async () => {
    const response = await request.get(
      '/api/imageprocess/?image=fjord&height=200&width=150'
    );
    expect(response.status).toBe(200);
  });

  it('Sends Please Enter a valid Image name', async () => {
    const response = await request.get(
      '/api/imageprocess/?image=fjord123&height=200&width=150'
    );
    expect(response.status).toBe(400);
  });
});

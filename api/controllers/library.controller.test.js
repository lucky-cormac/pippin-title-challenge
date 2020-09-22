const request = require('supertest');
const app = require('../../config/express');

describe('Test Library', () => {
  test('It should be up running', async () => {
    const response = await request(app).get('/v1/status');
    expect(response.statusCode).toBe(200);
  });

  test('It should add two books successfully', async () => {
    const response1 = await request(app).post('/v1/library').send({ book: 'Book1' });
    const response2 = await request(app).post('/v1/library').send({ book: 'Book2' });
    expect(response1.statusCode).toBe(200);
    expect(response2.statusCode).toBe(200);
  });

  test('It should fail to add duplicated books', async () => {
    const response1 = await request(app).post('/v1/library').send({ book: 'Book3' });
    const response2 = await request(app).post('/v1/library').send({ book: 'Book3' });
    expect(response1.statusCode).toBe(200);
    expect(response2.statusCode).toBe(400);
  });

  test('It should get book list successfully', async () => {
    const response = await request(app).get('/v1/library');
    expect(response.text).toBe('Book1,Book2,Book3');
  });

  test('It should delete book successfully', async () => {
    const response = await request(app).delete('/v1/library').send({ book: 'Book3' });
    expect(response.statusCode).toBe(200);
  });

  test('It should fail to delete non-existing book', async () => {
    const response = await request(app).delete('/v1/library').send({ book: 'Book10' });
    expect(response.statusCode).toBe(404);
  });

  test('It should update book successfully', async () => {
    const response = await request(app)
      .patch('/v1/library')
      .send({ original_book: 'Book2', new_book: 'Book22' });
    expect(response.statusCode).toBe(200);
  });

  test('It should fail to update non-existing book', async () => {
    const response = await request(app)
      .patch('/v1/library')
      .send({ original_book: 'Book256', new_book: 'Book262' });
    expect(response.statusCode).toBe(404);
  });

  test('It should fail to update book to another existing book', async () => {
    const response = await request(app)
      .patch('/v1/library')
      .send({ original_book: 'Book22', new_book: 'Book1' });
    expect(response.statusCode).toBe(400);
  });

  test('It should save books successfully', async () => {
    const response = await request(app).put('/v1/library');
    expect(response.statusCode).toBe(200);
    expect(Object.keys(response.body)).toEqual(['Book1', 'Book22']);
  });
});

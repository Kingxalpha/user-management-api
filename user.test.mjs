import supertest from 'supertest';
import  app from './index';
import { getAllUser, getSingleUser, updateUser, deleteUser } from './controller/usersController';
import User from './model/user';

describe('User API', () => {
  describe('GET /users', () => {
    it('should return a list of users', async () => {
      const res = await supertest(app).get('/users');
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /users/:id', () => {
    it('should return a single user', async () => {
      const userId = 4;
      const res = await supertest(app).get(`/users/${userId}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', userId);
    });

    it('should return 404 if user not found', async () => {
      const userId = 999;
      const res = await supertest(app).get(`/users/${userId}`);
      expect(res.status).toBe(404);
    });
  });

  describe('PUT /users/:id', () => {
    it('should update a user', async () => {
      const userId = 4;
      const updatedUsername = 'new-username';
      const res = await supertest(app)
       .put(`/users/${userId}`)
       .send({ username: updatedUsername });
      expect(res.status).toBe(200);
      expect(res.body).toBe('User updated successfully');
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user', async () => {
      const userId = 4;
      const res = await supertest(app).delete(`/users/${userId}`);
      expect(res.status).toBe(200);
      expect(res.body).toBe('User deleted successfully');
    });
  });
});
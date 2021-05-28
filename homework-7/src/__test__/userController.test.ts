import { Request, Response } from 'express';
import UserRepository from '../data-access/UserRepository';
import UserService from '../services/UserService';
import AuthService from '../services/AuthService';
import Env from '../config/Env';
import UserController from '../controllers/User.controller';

describe('User controller', () => {
  it('should get user successfully', async () => {
    const userRepository = new UserRepository();

    const mockedCreatedUser = {
      id: 'test',
      login: 'test',
      age: 22,
      password: 'test',
      isDeleted: false,
    };
    jest.spyOn(userRepository, 'get').mockResolvedValue(mockedCreatedUser);

    const authService = new AuthService(new Env());
    const userService = new UserService(userRepository);

    jest.spyOn(userService, 'get');

    const userController = new UserController(userService, authService);

    const userId = '1';
    const mRequest: Partial<Request> = {
      params: {
        id: userId,
      },
    };

    const mResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.get(mRequest as Request, mResponse as Response);

    expect(userService.get).toBeCalledWith(userId);
    expect(mResponse.status).toBeCalledWith(200);
    expect(mResponse.json).toBeCalledWith(mockedCreatedUser);
  });
});

import 'reflect-metadata';
import { Request, Response } from 'express';
import Env from '../config/Env';
import AuthController from '../controllers/Auth.controller';
import AuthService from '../services/AuthService';

describe('Auth controller', () => {
  it('should successfully login user', () => {
    const authService = new AuthService(new Env());
    const authenticateReturnValue = { accessToken: 'access', refreshToken: 'refresh' };
    jest.spyOn(authService, 'authenticate').mockReturnValue(authenticateReturnValue);

    const authController = new AuthController(authService);

    const login = '123abc';
    const mRequest: Partial<Request> = {
      body: {
        login,
      },
    };

    const authenticateResponseValue = { accessToken: 'access', refreshToken: 'refresh' };
    const mResponse: Partial<Response> = {
      json: jest.fn(),
    };

    authController.login(mRequest as Request, mResponse as Response);

    expect(authService.authenticate).toBeCalledWith(login);
    expect(mResponse.json).toBeCalledWith(authenticateResponseValue);
  });

  it('should return error status if login invalid', () => {
    const authService = new AuthService(new Env());
    const authController = new AuthController(authService);

    const mRequest: Partial<Request> = {
      body: {},
    };

    const mResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    authController.login(mRequest as Request, mResponse as Response);

    expect(mResponse.status).toBeCalledWith(400);
    expect(mResponse.send).toBeCalled();
  });
});

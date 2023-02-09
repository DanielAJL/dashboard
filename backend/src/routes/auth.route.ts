import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { UserDTO } from '@/DTOs/userDTO';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import sessionMiddleware from '@/middlewares/session.middleware';

class AuthRoute implements Routes {
	public path = '/api/';
	public router = Router();
	public authController = new AuthController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(`${this.path}login`, validationMiddleware(UserDTO, 'body'), this.authController.logIn);
		this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
		this.router.get(`${this.path}session`, sessionMiddleware, this.authController.getCurrentSession);
	}
}

export default AuthRoute;

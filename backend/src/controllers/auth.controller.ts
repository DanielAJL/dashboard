import { NextFunction, Request, Response } from 'express';
import { UserDTO } from '@/DTOs/userDTO';
import { CredentialsUserDTO } from '@/DTOs/userDTO';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  // public signUp = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const userData: UserDTO = req.body;
  //     const signUpUserData: User = await this.authService.signup(userData);

  //     res.status(201).json({ data: signUpUserData, message: 'signup' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CredentialsUserDTO = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };

  public getCurrentSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      res.status(200).json({ data: req.body, message: 'current_user_session' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;

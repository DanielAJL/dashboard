import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { AuthService } from "../services/auth.service";
@Injectable()
export class RedirectGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { };
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const isLoggedIn = await this.authService.getCurrentSession();
    if (isLoggedIn) {
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  }
}

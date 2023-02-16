import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { UserDTO } from "../DTOs/UserDTO";
import { AuthService } from "../services/auth.service";
import { SharedDataService } from "../services/shared-data.service";
@Injectable()
export class RedirectGuard implements CanActivate {
  isActiveSession: any;
  constructor(private authService: AuthService, private router: Router, private sharedDataService: SharedDataService) {
    this.sharedDataService.getUserObs().subscribe(res => {
      this.isActiveSession = res;
    })
  };

  // Returns wether route can be activated depending on if the user is signed in.
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    if (!this.isActiveSession) {
      const user = await this.authService.getCurrentSession();
      if (user) {
        this.sharedDataService.setUserObs(user);
        if ((user as UserDTO).onboarded === true) {
          this.router.navigate(['/dashboard']);
          return false;
        }
        this.router.navigate(['/onboarding']);
        return false;
      } else {
        return true;
      }
    }
    return this.isActiveSession;
  }
}

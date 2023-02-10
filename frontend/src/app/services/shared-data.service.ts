import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// Used to share active user session data, if none, userObs should be `null`.
export class SharedDataService {

  private userObs$: BehaviorSubject<any> = new BehaviorSubject(null);

  // Get user observable
  getUserObs(): Observable<any> {
    return this.userObs$.asObservable();
  }

  // Set user observable (see app.component.ts getCurrentSession() request)
  setUserObs(user: any) {
    this.userObs$.next(user);
  }
}

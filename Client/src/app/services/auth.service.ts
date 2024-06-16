import {Injectable, OnInit} from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {apiConfig} from "../../environments/api-routes";
import {BehaviorSubject, map, Observable} from "rxjs";

interface User {
  phoneNumber: string;
  // Add other user properties if needed
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  ngOnInit() {
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  generateOtp(phoneNumber: string) {
    return this.http.post(apiConfig.generateOtp, { phoneNumber });
  }

  verifyOtp(phoneNumber: string, otp: string) {
    return this.http.post(apiConfig.login, { phoneNumber, otp });
  }

  loadUserProfile() {
    return this.http.get<{ user: User }>(apiConfig.profile)
        .pipe(map(response => {
          if (response && response.user) {
            this.currentUserSubject.next(response.user);
          } else {
            this.currentUserSubject.next(null);
          }
          return response.user;
        }));
  }
}

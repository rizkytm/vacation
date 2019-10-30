import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
}
@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _userIsAuthenticated = false;
  private _userId = null;

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    );
  }

  get userId() {
    return this._userId;
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
      {
        email: email,
        password: password
      }
    );
  }

  logout() {
    this._userIsAuthenticated = false;
  }
}

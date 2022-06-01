import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { baseUrl } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  

  getUsersUrl = baseUrl+'/user';
  saveUserUrl = baseUrl+'/register'

  constructor(private http: HttpClient) { }
  getConfig() {
    return this.http.get<User[]>(this.getUsersUrl);
  }

  saveUser(user:User) {
    return this.http.post<User>(this.saveUserUrl,user);
  }
}
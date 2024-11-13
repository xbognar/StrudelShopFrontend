import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private baseService: BaseService) { }

  getAllUsers(): Observable<User[]> {
    return this.baseService.get<User[]>('/user');
  }

  getUserById(id: number): Observable<User> {
    return this.baseService.get<User>(`/user/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.baseService.post<User>('/user', user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.baseService.put<User>(`/user/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.baseService.delete<void>(`/user/${id}`);
  }
}

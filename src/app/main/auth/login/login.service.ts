import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'environments/environment';
import {Colaborador} from '@cdk/models/colaborador.model';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) {
    }

    getUserProfile(): Colaborador {
        return JSON.parse(localStorage.getItem('userProfile'));
    }

    setUserProfile(userProfile: any): void {
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }

    setToken(action): void {
        localStorage.setItem('token', action.payload.token);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    removeToken(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('userProfile');
    }

    login(username: string, password: string): Observable<any> {
        const url = `${environment.base_url}auth/getToken` + environment.xdebug;
        return this.http.post(url, {username, password});
    }

    getProfile(): Observable<any> {
        const url = `${environment.base_url}v1/colaborador/profile` + environment.xdebug;
        return this.http.get(url);
    }
}


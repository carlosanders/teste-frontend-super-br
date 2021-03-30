import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Usuario} from '@cdk/models';
import {Store} from '@ngrx/store';
import {State} from 'app/store';
import {environment} from '../../../../environments/environment';
import * as fromLoginStore from 'app/main/auth/login/store';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient, private _store: Store<State>) {
    }

    getUserProfile(): Usuario {
        return JSON.parse(localStorage.getItem('userProfile'));
    }

    setUserProfile(userProfile: any): void {
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }

    removeUserProfile(): void {
        localStorage.removeItem('userProfile');
    }

    setToken(action): void {
        this.removeToken();
        localStorage.setItem('token', action.payload.token);
        this.setTimestamp(action);
        this.setExp(action);
        this.startCountdown();
    }

    setExp(action): void {
        localStorage.setItem('exp', action.payload.exp);
    }

    setTimestamp(action): void {
        localStorage.setItem('timestamp', action.payload.timestamp);
    }

    getExp(): number {
        return Number(localStorage.getItem('exp'));
    }

    getTimestamp(): number {
        return Number(localStorage.getItem('timestamp'));
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    removeToken(): void {
        localStorage.removeItem('token');
        this.removeExp();
        this.removeTimestamp();
    }

    removeExp(): void {
        localStorage.removeItem('exp');
    }

    removeTimestamp(): void {
        localStorage.removeItem('timestamp');
    }

    login(username: string, password: string): Observable<any> {
        const url = `${environment.base_url}auth/get_token` + environment.xdebug;
        return this.http.post(url, {username, password});
    }

    loginGovBr(code: string): Observable<any> {
        const url = `${environment.base_url}auth/govbr_get_token` + environment.xdebug;
        return this.http.post(url, {code: code});
    }

    getProfile(): Observable<any> {
        const url = `${environment.base_url}profile` + environment.xdebug;
        return this.http.get(url);
    }

    refreshToken(): Observable<any> {
        const url = `${environment.base_url}auth/refresh_token` + environment.xdebug;
        return this.http.get(url);
    }

    isGranted(role: string): boolean {
        const profile = this.getUserProfile();
        let hasAccess = false;

        if (profile && profile.roles && profile.roles.length > 0) {
            hasAccess = profile.roles.findIndex((papel: string) => {
                return papel.includes(role);
            }) !== -1;
        }
        return hasAccess;
    }

    isCoordenador(): boolean {
        const profile = this.getUserProfile();
        let hasAccess = false;

        if (profile && profile.roles && profile.roles.length > 0) {
            hasAccess = profile.roles.findIndex((papel: string) => {
                return papel.includes('ROLE_COORDENADOR');
            }) !== -1;
        }
        if (hasAccess) {
            return profile.coordenadores.length > 0;
        }
        return hasAccess;
    }

    getConfig(): Observable<any> {
        const url = `${environment.base_url}config` + environment.xdebug;
        return this.http.get(url);
    }

    private startCountdown(): void {
        // Renova o token quando faltar 3 minutos para expirar
        const timeExpToken = this.getExp() - this.getTimestamp();
        if (timeExpToken > 0) {
            const timeout = (timeExpToken > 180) ?  (timeExpToken - 180) * 1000 : 1;
            setTimeout(() => {
                this._store.dispatch(new fromLoginStore.LoginRefreshToken());
            }, timeout);
        }
    }
}


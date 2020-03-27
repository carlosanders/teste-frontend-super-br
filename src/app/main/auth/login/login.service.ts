import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Usuario} from '@cdk/models';
import {EventSourcePolyfill} from 'event-source-polyfill';
import * as fromStore from 'app/store';
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
        this.setMercure(userProfile);
    }

    setMercure(userProfile: any): void {
        const EventSource = EventSourcePolyfill;
        const es = new EventSource(environment.mercure_hub + '?topic=' + userProfile.username,
            {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOltdfX0.R2VYhXy7uBsCqiXb9TRhEccaAiidwkZm_1sQP0JPutw'
                }
            }
        );
        es.onmessage = e => {
            const message = JSON.parse(e.data);
            this._store.dispatch(new fromStore.Message({
                type: Object.keys(message)[0],
                content: Object.values(message)[0]
            }));
        };
    }

    removeUserProfile(): void {
        localStorage.removeItem('userProfile');
    }

    setToken(action): void {
        this.removeToken();
        localStorage.setItem('token', action.payload.token);
        this.setExp(action);
        this.startCountdown();
    }

    setExp(action): void {
        localStorage.setItem('exp', action.payload.exp);
    }

    getExp(): Date {
        return new Date(Number(localStorage.getItem('exp')) * 1000);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    removeToken(): void {
        localStorage.removeItem('token');
        this.removeExp();
    }

    removeExp(): void {
        localStorage.removeItem('exp');
    }

    login(username: string, password: string): Observable<any> {
        const url = `${environment.base_url}auth/getToken` + environment.xdebug;
        return this.http.post(url, {username, password});
    }

    getProfile(): Observable<any> {
        const url = `${environment.base_url}profile` + environment.xdebug;
        return this.http.get(url);
    }

    refreshToken(): Observable<any> {
        const url = `${environment.base_url}auth/refreshToken` + environment.xdebug;
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

    private startCountdown(): void {
        // Removing 3 minutes of token Exp time
        var timeExpToken: number | null;
        timeExpToken = ((this.getExp().getTime() - new Date().getTime()) / 1000) - 1;
        setTimeout(() => { this._store.dispatch(new fromLoginStore.LoginRefreshToken()); }, timeExpToken - 180);

    }
}


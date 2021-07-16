import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Usuario} from '@cdk/models';
import {Store} from '@ngrx/store';
import {State} from 'app/store';
import {environment} from '../../../../environments/environment';
import * as fromLoginStore from 'app/main/auth/login/store';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class LoginService {

    private _timeout;
    private _userProfileSubject: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(null);

    constructor(private http: HttpClient, private _store: Store<State>) {
    }

    getUserProfileChanges(): Observable<Usuario>
    {
        return this._userProfileSubject.asObservable();
    }

    checkUserProfileChanges(): void
    {
        this._userProfileSubject.next(!!this.getUserProfile() ? this.getUserProfile() : null);
    }

    getUserProfile(): Usuario {
        return JSON.parse(localStorage.getItem('userProfile'));
    }

    setUserProfile(userProfile: any): void {
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        this._userProfileSubject.next(userProfile);
    }

    removeUserProfile(): void {
        localStorage.removeItem('userProfile');
        this._userProfileSubject.next(null);
    }

    setToken(action): void {
        this.removeToken();
        this.setVersion(action.payload.version);
        localStorage.setItem('token', action.payload.token);
        this.setTimestamp(action);
        this.setExp(action);
        this.setLocalBrowserExpiration(action);
        this.startCountdown();
    }

    setLoginType(type): void {
        localStorage.setItem('loginType', type);
    }

    setExp(action): void {
        localStorage.setItem('exp', action.payload.exp);
    }

    setTimestamp(action): void {
        localStorage.setItem('timestamp', action.payload.timestamp);
    }

    setLocalBrowserExpiration(action): void {
        const duration = Number(action.payload.exp) - Number(action.payload.timestamp);
        const expiration = moment().add(duration, 'seconds').unix();
        localStorage.setItem('localBrowserExp', expiration.toString());
    }

    setVersion(version): void {
        localStorage.setItem('version', version);
    }

    getLoginType(): string {
        return localStorage.getItem('loginType');
    }

    getExp(): number {
        return Number(localStorage.getItem('exp'));
    }

    getTimestamp(): number {
        return Number(localStorage.getItem('timestamp'));
    }

    getLocalBrowserExp(): number {
        return Number(localStorage.getItem('localBrowserExp'));
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    getVersion(): string {
        return localStorage.getItem('version');
    }

    removeToken(): void {
        localStorage.removeItem('token');
        this.removeExp();
        this.removeTimestamp();
        this.removeLocalBrowserExp();
        this.removeVersion();
    }

    removeExp(): void {
        localStorage.removeItem('exp');
    }

    removeTimestamp(): void {
        localStorage.removeItem('timestamp');
    }

    removeLocalBrowserExp(): void {
        localStorage.removeItem('localBrowserExp');
    }

    removeVersion(): void {
        localStorage.removeItem('version');
    }

    login(username: string, password: string): Observable<any> {
        const url = `${environment.base_url}auth/get_token` + environment.xdebug;
        return this.http.post(url, {username, password});
    }

    loginLdap(username: string, password: string): Observable<any> {
        const url = `${environment.base_url}auth/ldap_get_token` + environment.xdebug;
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
        const roleExp = RegExp(role.replace('*', '.*'), 'i');
        if (profile && profile.roles && profile.roles.length > 0) {
            return profile.roles.filter((value) => value.match(roleExp)).length > 0;
        }
        return false;
    }

    isCoordenador(): boolean {
        const profile = this.getUserProfile();
        let hasAccess = false;

        if (profile && profile.roles && profile.roles.length > 0) {
            hasAccess = profile.roles.findIndex((papel: string) => papel.includes('ROLE_COORDENADOR')) !== -1;
        }
        if (hasAccess) {
            return profile.coordenadores.length > 0;
        }
        return hasAccess;
    }

    isAdmin(): boolean {
        const profile = this.getUserProfile();
        let hasAccess = false;

        if (profile && profile.roles && profile.roles.length > 0) {
            hasAccess = profile.roles.findIndex((papel: string) => papel.includes('ROLE_ADMIN')) !== -1;
        }
        return hasAccess;
    }

    getConfig(): Observable<any> {
        const url = `${environment.base_url}config` + environment.xdebug;
        return this.http.get(url);
    }

    isExpired(): boolean {
        const expiration = this.getLocalBrowserExp();
        const timestamp = moment().unix();
        return timestamp > expiration;
    }

    removeTimeout(): void {
        if (this._timeout) {
            clearTimeout(this._timeout);
        }
    }

    startCountdown(): void {
        const duracaoPadrao = this.getExp() - this.getTimestamp();
        // Renova o token quando faltar 15% do tempo de duração configurado no sistema
        const proporcao = 0.15;
        const renovacao = Math.round(duracaoPadrao * proporcao);
        const browserExpiration = this.getLocalBrowserExp();
        const duracaoRestante = browserExpiration - moment().unix();
        if (renovacao) {
            const timeout = ((duracaoRestante - renovacao) < 30 ? 1 : (duracaoRestante - renovacao)) * 1000;
            this.removeTimeout();
            this._timeout = setTimeout(() => {
                this._store.dispatch(new fromLoginStore.LoginRefreshToken());
            }, timeout);
        }
    }
}


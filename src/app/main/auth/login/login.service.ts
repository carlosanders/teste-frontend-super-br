import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from 'environments/environment';
import {Colaborador} from '@cdk/models/colaborador.model';
import {Store} from '@ngrx/store';
import {State} from 'app/store/reducers';
import {EventSourcePolyfill} from 'event-source-polyfill';
import * as fromStore from 'app/store';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient, private _store: Store<State>) {
    }

    getUserProfile(): Colaborador {
        return JSON.parse(localStorage.getItem('userProfile'));
    }

    setUserProfile(userProfile: any): void {
        localStorage.setItem('userProfile', JSON.stringify(userProfile));

        const EventSource = EventSourcePolyfill;
        const es = new EventSource(environment.mercure_hub + '?topic=' + userProfile.usuario.username,
            {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOltdfX0.R2VYhXy7uBsCqiXb9TRhEccaAiidwkZm_1sQP0JPutw'
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


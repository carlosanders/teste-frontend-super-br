import { Injectable } from '@angular/core';
import { Route, Router, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '../auth/login/login.service';
import {environment} from '../../../environments/environment';
import * as fromStore from '../../store';
import {EventSourcePolyfill} from 'event-source-polyfill';
import {Store} from '@ngrx/store';
import {State} from '../../store';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private loginService: LoginService,
        private _store: Store<State>,
        private _loginService: LoginService,
        private http: HttpClient
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = this.loginService.getToken();
        if (token) {
            this.setMercure();
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });

        return false;
    }

    setMercure(): void {
        const EventSource = EventSourcePolyfill;
        const es = new EventSource(environment.mercure_hub + '?topic=' + this._loginService.getUserProfile().username,
            {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOltdfX0.R2VYhXy7uBsCqiXb9TRhEccaAiidwkZm_1sQP0JPutw'
                }
            }
        );
        es.onopen = e => {
            this.http.get(`${environment.base_url}${'mercure'}` + environment.xdebug).subscribe();
        };

        es.onmessage = e => {
            const message = JSON.parse(e.data);
            this._store.dispatch(new fromStore.Message({
                type: Object.keys(message)[0],
                content: Object.values(message)[0]
            }));
        };
    }
}

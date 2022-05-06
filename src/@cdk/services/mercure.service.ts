import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {EventSourcePolyfill} from 'event-source-polyfill';
import {LoginService} from '../../app/main/auth/login/login.service';
import {Store} from '@ngrx/store';
import {State} from '../../app/store';
import {HttpClient} from '@angular/common/http';
import * as fromStore from 'app/store';

@Injectable({
    providedIn: 'root'
})
export class MercureService
{
    topics: string[] = [];

    firstConnection = true;

    es: any;

    /**
     * @param _store
     * @param _loginService
     * @param http
     */
    constructor(
        private _store: Store<State>,
        private _loginService: LoginService,
        private http: HttpClient
    )
    {}

    subscribe(topics: string|string[]): void {
        if (!Array.isArray(topics)) {
            topics = [topics];
        }
        let connect = false;
        topics.forEach((topic: string) => {
            if (this.topics.indexOf(topic) === -1) {
                this.topics.push(topic);
                connect = true;
            }
        });
        if (connect) {
            this.connect();
        }
    }

    unsubscribe(topics: string|string[]): void {
        if (!Array.isArray(topics)) {
            topics = [topics];
        }
        let connect = false;
        topics.forEach((topic: string) => {
            const i = this.topics.indexOf(topic);
            if (i > -1) {
                this.topics.splice(i, 1);
                connect = true;
            }
        });
        if (connect) {
            this.connect();
        }
    }

    connect(): void {
        let params = '';
        const aParams = [];
        this.topics.forEach((t: string, i: number) => {
            if (aParams.indexOf(t) === -1) {
                if (i === 0) {
                    params += '?topic=' + t;
                } else {
                    params += '&topic=' + t;
                }
            }
        });

        if (this.es) {
            this.es.close();
        }

        try {
            const EventSource = EventSourcePolyfill;
            this.es = new EventSource(environment.mercure_hub + params,
                {
                    headers: {
                        Authorization: 'Bearer ' + this._loginService.getUserProfile().jwt
                    }
                }
            );
            this.es.onopen = (e) => {
                if (this.firstConnection) {
                    this.http.get(`${environment.base_url}${'mercure'}` + environment.xdebug).subscribe();
                    this.firstConnection = false;
                }
            };

            this.es.onmessage = (e) => {
                let message = JSON.parse(e.data);
                if (message.hasOwnProperty('uuid')) {
                    // novo assinador
                    if (message.action === 'SIGN_START') {
                        message = {
                            action: 'assinatura_iniciada',
                            ...message.payload,
                        };
                    }
                    if (message.action === 'SIGN_FINISHED') {
                        message = {
                            action: 'assinatura_finalizada',
                            ...message.payload,
                        };
                    }
                    if (message.action === 'SIGN_CANCEL') {
                        message = {
                            action: 'assinatura_cancelada',
                            ...message.payload,
                        };
                    }
                    if (message.action === 'SIGN_ERROR') {
                        message = {
                            action: 'assinatura_erro',
                            ...message.payload,
                        };
                    }
                    this._store.dispatch(new fromStore.Message({
                        type: 'assinatura',
                        content: message
                    }));
                } else {
                    this._store.dispatch(new fromStore.Message({
                        type: Object.keys(message)[0],
                        content: Object.values(message)[0]
                    }));
                }
            };
        } catch (e) {
            console.log (e);
        }
    }
}

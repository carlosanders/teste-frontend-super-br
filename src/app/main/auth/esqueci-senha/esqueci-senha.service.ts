import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from 'app/store';
import {environment} from '../../../../environments/environment';

@Injectable()
export class EsqueciSenhaService {

    constructor(private http: HttpClient, private _store: Store<State>) {
    }

    esqueciSenha(username: string, email: string): Observable<any> {
        const url = `${environment.base_url}auth/recover_password` + environment.xdebug;
        return this.http.post(url, {username, email});
    }
}


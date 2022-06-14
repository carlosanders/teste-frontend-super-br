import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from 'app/store';
import {environment} from 'environments/environment';

@Injectable()
export class UpdatePasswordService {

    constructor(private http: HttpClient, private _store: Store<State>) {
    }

    updatePassword(token: string, old_password: string, new_password: string): Observable<any> {
        const url = `${environment.base_url}auth/update_password` + environment.xdebug;
        return this.http.post(url, {token, old_password, new_password});
    }
}


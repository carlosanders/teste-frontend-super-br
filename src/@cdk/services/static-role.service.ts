import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'environments/environment';

@Injectable()
export class StaticRoleService {

    constructor(
        private http: HttpClient
    ) {}

    getStaticRoles(): Observable<any> {
        return this.http.get(`${environment.base_url}get_static_roles` + environment.xdebug);
    }

}

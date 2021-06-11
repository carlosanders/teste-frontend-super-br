import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'environments/environment';

@Injectable()
export class ModelService {

    constructor(
        public http: HttpClient
    ) {}

    getOne(path: string, id: number, params: HttpParams = new HttpParams()): Observable<any> {
        if (environment.test) {
            params = null;
        }
        return this.http.get(`${environment.api_url}${path}/${id}` + environment.xdebug, { params });
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        if (environment.test) {
            params = null;
        }
        return this.http.get(`${environment.api_url}${path}` + environment.xdebug, { params });
    }

    search(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        if (environment.test) {
            params = null;
        }
        return this.http.get(`${environment.api_url}${path}` + '/search' + environment.xdebug, { params });
    }

    count(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        if (environment.test) {
            params = null;
        }
        return this.http.get(`${environment.api_url}${path}/count` + environment.xdebug, { params });
    }

    put(path: string, id: number, body: Object = {}, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.put(
            `${environment.api_url}${path}/${id}` + environment.xdebug,
            JSON.stringify(body),
            { params }
        );
    }

    patch(path: string, id: number, body: Object = {}, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.patch(
            `${environment.api_url}${path}/${id}` + environment.xdebug,
            JSON.stringify(body),
            { params }
        );
    }

    post(path: string, body: Object = {}, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.post(
            `${environment.api_url}${path}` + environment.xdebug,
            JSON.stringify(body),
            { params }
        );
    }

    delete(path: string, id: number, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.delete(`${environment.api_url}${path}/${id}` + environment.xdebug, { params });
    }
}

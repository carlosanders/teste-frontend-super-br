import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'environments/environment';

@Injectable()
export class DownloadService {

    constructor(
        private http: HttpClient
    ) {}

    getOne(id: number, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${environment.api_url}administrativo/componente_digital/${id}/download` + environment.xdebug, { params });
    }

}

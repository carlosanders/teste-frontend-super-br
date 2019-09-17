import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class LogEntryService {

    constructor(
        private http: HttpClient
    ) {
    }

    getLog(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<any> {

        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        const url = `${environment.base_url}v1/logEntry/logentry` + environment.xdebug;
        return this.http.get(url, {params});
    }

}

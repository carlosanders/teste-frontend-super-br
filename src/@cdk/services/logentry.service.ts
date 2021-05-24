import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {LogEntry, PaginatedResponse} from '../models';

@Injectable()
export class LogEntryService {

    constructor(
        private http: HttpClient
    ) {
    }

    getLogs(filters: any = '{}', limit: number = 25, offset: number = 0, order: any = '{}', populate: any = '[]', context: any = '{}'): Observable<any> {

        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        const url = `${environment.base_url}v1/administrativo/logEntry/logentry` + environment.xdebug;
        return this.http.get(url, {params}).pipe(
            map(response => new PaginatedResponse(plainToClass(LogEntry, response['entities']), response['total']))
        );
    }

}

import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelService } from '@cdk/services/model.service';
import { plainToClass, classToPlain } from 'class-transformer';
import { PaginatedResponse } from '@cdk/models/paginated.response';
import {StatusBarramento} from "../models/status-barramento";

@Injectable()
export class StatusBarramentoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<StatusBarramento> {
        return this.modelService.getOne('administrativo/status_barramento', id)
            .pipe(
                map(response => plainToClass(StatusBarramento, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('administrativo/status_barramento', new HttpParams({ fromObject: params }))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(StatusBarramento, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('administrativo/status_barramento', new HttpParams({fromObject: params}));
    }

    save(statusBarramento: StatusBarramento): Observable<StatusBarramento> {
        if (statusBarramento.id) {
            return this.modelService.put('administrativo/status_barramento', statusBarramento.id, classToPlain(statusBarramento))
                .pipe(
                    map(response => {
                        response = plainToClass(StatusBarramento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new StatusBarramento(), {...statusBarramento, ...response});
                    })
                );
        } else {
            return this.modelService.post('administrativo/status_barramento', classToPlain(statusBarramento))
                .pipe(
                    map(response => {
                        response = plainToClass(StatusBarramento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new StatusBarramento(), {...statusBarramento, ...response});
                    })
                );
        }
    }
}

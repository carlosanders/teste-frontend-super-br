import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Estado} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class EstadoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<Estado> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('estado', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Estado, response)[0])
            );
    }

    query(filters: any = '{}', limit: number = 25, offset: number = 0, order: any = '{}', populate: any = '[]', context: any = '{}'): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.get('estado', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Estado, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('estado', new HttpParams({fromObject: params}));
    }

    save(estado: Estado, context: any = '{}'): Observable<Estado> {
        const params = {};
        params['context'] = context;
        if (estado.id) {
            return this.modelService.put('estado', estado.id, classToPlain(estado), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Estado, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Estado(), {...estado, ...response});
                    })
                );
        } else {
            return this.modelService.post('estado', classToPlain(estado), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Estado, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Estado(), {...estado, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<Estado> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('estado', id, new HttpParams({fromObject: params}));
    }
}

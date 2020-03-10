import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Interessado} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class InteressadoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<Interessado> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('interessado', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Interessado, response)[0])
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

        return this.modelService.get('interessado', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Interessado, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('interessado', new HttpParams({fromObject: params}));
    }

    save(interessado: Interessado, context: any = '{}'): Observable<Interessado> {
        const params = {};
        params['context'] = context;
        if (interessado.id) {
            return this.modelService.put('interessado', interessado.id, classToPlain(interessado), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Interessado, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Interessado(), {...interessado, ...response});
                    })
                );
        } else {
            return this.modelService.post('interessado', classToPlain(interessado), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Interessado, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Interessado(), {...interessado, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<Interessado> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('interessado', id, new HttpParams({fromObject: params}));
    }
}

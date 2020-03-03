import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Municipio} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class MunicipioService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<Municipio> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('municipio', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Municipio, response)[0])
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

        return this.modelService.get('municipio', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Municipio, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('municipio', new HttpParams({fromObject: params}));
    }

    save(municipio: Municipio, context: any = '{}'): Observable<Municipio> {
        const params = {};
        params['context'] = context;
        if (municipio.id) {
            return this.modelService.put('municipio', municipio.id, classToPlain(municipio), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Municipio, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Municipio(), {...municipio, ...response});
                    })
                );
        } else {
            return this.modelService.post('municipio', classToPlain(municipio), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Municipio, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Municipio(), {...municipio, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<Municipio> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('municipio', id, new HttpParams({fromObject: params}));
    }
}

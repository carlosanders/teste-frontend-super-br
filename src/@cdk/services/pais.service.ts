import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Pais} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class PaisService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<Pais> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('pais', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Pais, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = [], context: any = {}): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.get('pais', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Pais, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('pais', new HttpParams({fromObject: params}));
    }

    save(pais: Pais, context: any = {}): Observable<Pais> {
        const params = {};
        params['context'] = context;
        if (pais.id) {
            return this.modelService.put('pais', pais.id, classToPlain(pais), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Pais, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Pais(), {...pais, ...response});
                    })
                );
        } else {
            return this.modelService.post('pais', classToPlain(pais), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Pais, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Pais(), {...pais, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<Pais> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('pais', id, new HttpParams({fromObject: params}));
    }
}

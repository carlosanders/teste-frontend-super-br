import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GeneroRelevancia} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class GeneroRelevanciaService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<GeneroRelevancia> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('genero_relevancia', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(GeneroRelevancia, response)[0])
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

        return this.modelService.get('genero_relevancia', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(GeneroRelevancia, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('genero_relevancia', new HttpParams({fromObject: params}));
    }

    save(generoRelevancia: GeneroRelevancia, context: any = {}): Observable<GeneroRelevancia> {
        const params = {};
        params['context'] = context;
        if (generoRelevancia.id) {
            return this.modelService.put('genero_relevancia', generoRelevancia.id, classToPlain(generoRelevancia), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(GeneroRelevancia, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new GeneroRelevancia(), {...generoRelevancia, ...response});
                    })
                );
        } else {
            return this.modelService.post('genero_relevancia', classToPlain(generoRelevancia), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(GeneroRelevancia, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new GeneroRelevancia(), {...generoRelevancia, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<GeneroRelevancia> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('genero_relevancia', id, new HttpParams({fromObject: params}));
    }
}

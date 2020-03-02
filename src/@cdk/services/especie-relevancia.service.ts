import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {EspecieRelevancia} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class EspecieRelevanciaService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<EspecieRelevancia> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('especie_relevancia', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(EspecieRelevancia, response)[0])
            );
    }

    query(filters: any = '{}', limit: number = 25, offset: number = 0, order: any = '{}', populate: any = '[]', context: any = '{}'): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('especie_relevancia', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(EspecieRelevancia, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('especie_relevancia', new HttpParams({fromObject: params}));
    }

    save(especieRelevancia: EspecieRelevancia, context: any = '{}'): Observable<EspecieRelevancia> {
        const params = {};
        params['context'] = context;
        if (especieRelevancia.id) {
            return this.modelService.put('especie_relevancia', especieRelevancia.id, classToPlain(especieRelevancia), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(EspecieRelevancia, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new EspecieRelevancia(), {...especieRelevancia, ...response});
                    })
                );
        } else {
            return this.modelService.post('especie_relevancia', classToPlain(especieRelevancia), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(EspecieRelevancia, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new EspecieRelevancia(), {...especieRelevancia, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<EspecieRelevancia> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('especie_relevancia', id, new HttpParams({fromObject: params}));
    }
}

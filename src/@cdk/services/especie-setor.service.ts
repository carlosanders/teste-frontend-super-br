import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {EspecieSetor} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class EspecieSetorService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<EspecieSetor> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('especie_setor', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(EspecieSetor, response)[0])
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

        return this.modelService.get('especie_setor', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(EspecieSetor, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('especie_setor', new HttpParams({fromObject: params}));
    }

    save(especieSetor: EspecieSetor, context: any = '{}'): Observable<EspecieSetor> {
        const params = {};
        params['context'] = context;
        if (especieSetor.id) {
            return this.modelService.put('especie_setor', especieSetor.id, classToPlain(especieSetor), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(EspecieSetor, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new EspecieSetor(), {...especieSetor, ...response});
                    })
                );
        } else {
            return this.modelService.post('especie_setor', classToPlain(especieSetor), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(EspecieSetor, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new EspecieSetor(), {...especieSetor, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<EspecieSetor> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('especie_setor', id, new HttpParams({fromObject: params}));
    }
}

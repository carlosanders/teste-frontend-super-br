import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {EspecieProcesso} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class EspecieProcessoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<EspecieProcesso> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('especie_processo', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(EspecieProcesso, response)[0])
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

        return this.modelService.get('especie_processo', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(EspecieProcesso, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('especie_processo', new HttpParams({fromObject: params}));
    }

    save(especieProcesso: EspecieProcesso, context: any = '{}'): Observable<EspecieProcesso> {
        const params = {};
        params['context'] = context;
        if (especieProcesso.id) {
            return this.modelService.put('especie_processo', especieProcesso.id, classToPlain(especieProcesso), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(EspecieProcesso, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new EspecieProcesso(), {...especieProcesso, ...response});
                    })
                );
        } else {
            return this.modelService.post('especie_processo', classToPlain(especieProcesso), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(EspecieProcesso, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new EspecieProcesso(), {...especieProcesso, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<EspecieProcesso> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('especie_processo', id, new HttpParams({fromObject: params}));
    }
}

import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EspecieRelevancia} from '@cdk/models/especie-relevancia.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class EspecieRelevanciaService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<EspecieRelevancia> {
        return this.modelService.getOne('especie_relevancia', id)
            .map(response => plainToClass(EspecieRelevancia, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('especie_relevancia', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(EspecieRelevancia, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('especie_relevancia', new HttpParams({fromObject: params}));
    }

    save(especieRelevancia: EspecieRelevancia): Observable<EspecieRelevancia> {
        if (especieRelevancia.id) {
            return this.modelService.put('especie_relevancia', especieRelevancia.id, classToPlain(especieRelevancia))
                .map(response => {
                    response = plainToClass(EspecieRelevancia, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new EspecieRelevancia(), {...especieRelevancia, ...response});
                });
        } else {
            return this.modelService.post('especie_relevancia', classToPlain(especieRelevancia))
                .map(response => {
                    response = plainToClass(EspecieRelevancia, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new EspecieRelevancia(), {...especieRelevancia, ...response});
                });
        }
    }

    destroy(id: number): Observable<EspecieRelevancia> {
        return this.modelService.delete('especie_relevancia', id);
    }
}
